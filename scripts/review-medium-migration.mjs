#!/usr/bin/env node

import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { emptyReviewDecisions, placementKey, validateReviewDecisions } from './lib/medium-review.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(SCRIPTS_DIR);
const INVENTORY_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'inventory.json');
const MEDIA_MANIFEST_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'media-manifest.json');
const REVIEW_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'review-decisions.json');
const RAW_STORIES_DIR = path.join(SCRIPTS_DIR, '_artifacts', 'medium', 'raw', 'stories');
const BLOG_MEDIA_DIR = path.join(ROOT, 'public', 'blog-media');
const PORT = Number(process.env.PORT || 4174);
const HOST = process.env.HOST || '0.0.0.0';
const MAX_BODY_BYTES = 2 * 1024 * 1024;

async function readJson(file) {
	return JSON.parse(await readFile(file, 'utf8'));
}

async function loadReview() {
	try {
		return validateReviewDecisions(await readJson(REVIEW_PATH));
	} catch (error) {
		if (error?.code === 'ENOENT') return emptyReviewDecisions();
		throw error;
	}
}

function sourceImageDecision(placement) {
	const sourceAlt = placement.sourceAlt?.trim();
	if (sourceAlt) return { decision: 'meaningful', alt: sourceAlt, source: 'medium-alt' };
	const caption = placement.caption?.trim();
	if (caption) return { decision: 'meaningful', alt: caption, source: 'caption' };
	return { decision: 'review-required', alt: '', source: null };
}

function paragraphContext(paragraphs, index) {
	const nearby = [];
	for (let offset = 1; offset <= 3 && nearby.length < 2; offset += 1) {
		for (const candidate of [paragraphs[index - offset], paragraphs[index + offset]]) {
			const text = candidate?.text?.trim();
			if (text && candidate.type !== 4 && !nearby.includes(text)) nearby.push(text.slice(0, 500));
			if (nearby.length === 2) break;
		}
	}
	return nearby;
}

async function buildReviewData() {
	const [inventory, mediaManifest, review] = await Promise.all([
		readJson(INVENTORY_PATH),
		readJson(MEDIA_MANIFEST_PATH),
		loadReview(),
	]);
	const storiesById = new Map(inventory.stories.map((story) => [story.id, story]));
	const paragraphsByStory = new Map();
	for (const story of inventory.stories) {
		const raw = await readJson(path.join(RAW_STORIES_DIR, `${story.id}.json`));
		paragraphsByStory.set(story.id, raw.payload.value.content.bodyModel.paragraphs ?? []);
	}

	const stories = inventory.stories
		.map((story) => ({
			id: story.id,
			legacyPath: story.legacyPath,
			title: story.title,
			author: story.author,
			publishedAt: story.publishedAt,
			canonicalUrl: story.canonicalUrl,
			sourceMediumUrl: story.sourceMediumUrl,
			sourceStatus: story.rightsStatus,
			decision: review.rights[story.legacyPath] ?? null,
		}))
		.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));

	const images = mediaManifest.assets.flatMap((asset) =>
		asset.placements.map((placement) => {
			const story = storiesById.get(placement.storyId);
			const key = placementKey(placement);
			return {
				key,
				storyId: placement.storyId,
				legacyPath: placement.legacyPath,
				storyTitle: story.title,
				authorName: story.author.name,
				paragraph: placement.paragraph,
				sourceImageId: asset.sourceImageId,
				localPath: asset.localPath,
				width: asset.width,
				height: asset.height,
				animated: asset.animated,
				caption: placement.caption,
				sourceAlt: placement.sourceAlt,
				sourceDecision: sourceImageDecision(placement),
				context: paragraphContext(paragraphsByStory.get(placement.storyId), placement.paragraph),
				canonicalUrl: story.canonicalUrl,
				sourceMediumUrl: story.sourceMediumUrl,
				decision: review.images[key] ?? null,
			};
		}),
	).sort((a, b) => {
		const aUnresolved = (a.decision?.decision ?? a.sourceDecision.decision) === 'review-required';
		const bUnresolved = (b.decision?.decision ?? b.sourceDecision.decision) === 'review-required';
		return Number(bUnresolved) - Number(aUnresolved) || a.storyTitle.localeCompare(b.storyTitle) || a.paragraph - b.paragraph;
	});

	return { review, stories, images };
}

async function readRequestJson(request) {
	if (!(request.headers['content-type'] || '').startsWith('application/json')) {
		throw new Error('Review saves require application/json');
	}
	const chunks = [];
	let bytes = 0;
	for await (const chunk of request) {
		bytes += chunk.length;
		if (bytes > MAX_BODY_BYTES) throw new Error('Review save is too large');
		chunks.push(chunk);
	}
	return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function saveReview(value) {
	validateReviewDecisions(value);
	const data = await buildReviewData();
	const validRights = new Set(data.stories.map(({ legacyPath }) => legacyPath));
	const validImages = new Set(data.images.map(({ key }) => key));
	for (const key of Object.keys(value.rights)) {
		if (!validRights.has(key)) throw new Error(`Unknown story in rights review: ${key}`);
	}
	for (const key of Object.keys(value.images)) {
		if (!validImages.has(key)) throw new Error(`Unknown image placement in review: ${key}`);
	}
	await mkdir(path.dirname(REVIEW_PATH), { recursive: true });
	const temporary = `${REVIEW_PATH}.${process.pid}.${randomUUID()}.tmp`;
	await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`);
	await rename(temporary, REVIEW_PATH);
}

function sendJson(response, status, value) {
	response.writeHead(status, {
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'no-store',
		'X-Content-Type-Options': 'nosniff',
	});
	response.end(JSON.stringify(value));
}

async function serveMedia(pathname, response) {
	const match = pathname.match(/^\/blog-media\/([a-f0-9]{64}\.(?:jpg|png|gif|webp))$/u);
	if (!match) return false;
	const extension = path.extname(match[1]).slice(1);
	const types = { jpg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp' };
	const bytes = await readFile(path.join(BLOG_MEDIA_DIR, match[1]));
	response.writeHead(200, {
		'Content-Type': types[extension],
		'Cache-Control': 'public, max-age=3600',
		'X-Content-Type-Options': 'nosniff',
	});
	response.end(bytes);
	return true;
}

const HTML = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Medium migration review</title>
  <style>
    :root { color-scheme: light; font-family: system-ui, sans-serif; --ink:#252238; --muted:#696579; --line:#dcd9e6; --brand:#342c68; --hold:#9a3412; --ok:#166534; }
    * { box-sizing:border-box; }
    body { margin:0; color:var(--ink); background:#f6f5f8; }
    a { color:#4338a0; }
    button, input, select, textarea { font:inherit; }
    .top { position:sticky; z-index:10; top:0; padding:1rem clamp(1rem,3vw,2.5rem); color:white; background:var(--brand); box-shadow:0 2px 8px #0002; }
    .top-row { display:flex; flex-wrap:wrap; align-items:center; gap:.75rem 1.25rem; max-width:90rem; margin:auto; }
    h1 { margin:0; font-size:1.35rem; }
    .reviewer { display:flex; align-items:center; gap:.5rem; margin-left:auto; }
    .reviewer input { width:14rem; padding:.5rem .65rem; border:1px solid #ffffff55; border-radius:.4rem; }
    button { cursor:pointer; border:1px solid var(--line); border-radius:.45rem; padding:.55rem .8rem; background:white; color:var(--ink); }
    button.primary { border-color:white; font-weight:700; color:var(--brand); }
    button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible { outline:3px solid #fbbf24; outline-offset:2px; }
    .save-status { min-width:10rem; font-size:.86rem; }
    .shell { width:min(90rem,100%); margin:auto; padding:1.5rem clamp(1rem,3vw,2.5rem) 5rem; }
    .intro { max-width:75ch; line-height:1.55; }
    .tabs { display:flex; flex-wrap:wrap; gap:.5rem; margin:1.5rem 0; }
    .tabs button[aria-selected="true"] { border-color:var(--brand); color:white; background:var(--brand); }
    .toolbar { display:flex; flex-wrap:wrap; align-items:center; gap:.75rem; margin:1rem 0; }
    .progress { font-weight:700; }
    .hold { color:var(--hold); }
    .ok { color:var(--ok); }
    .cards { display:grid; gap:1rem; }
    .card { padding:1rem; border:1px solid var(--line); border-radius:.75rem; background:white; box-shadow:0 1px 2px #0000000d; }
    .card h2 { margin:.15rem 0 .4rem; font-size:1.05rem; }
    .meta { margin:.25rem 0; color:var(--muted); font-size:.88rem; }
    .links { display:flex; flex-wrap:wrap; gap:1rem; margin:.6rem 0; font-size:.88rem; }
    .fields { display:grid; grid-template-columns:minmax(12rem,18rem) minmax(16rem,1fr); gap:.75rem; margin-top:.85rem; }
    label { display:grid; align-content:start; gap:.3rem; font-size:.84rem; font-weight:650; }
    input, select, textarea { width:100%; padding:.55rem .65rem; border:1px solid #aaa6b8; border-radius:.4rem; background:white; color:var(--ink); }
    textarea { min-height:4.5rem; resize:vertical; font-weight:400; }
    .guidance { margin:.7rem 0; padding:.7rem; border-left:4px solid #8b82bd; background:#f3f0ff; font-size:.88rem; line-height:1.45; }
    .image-card { display:grid; grid-template-columns:minmax(16rem,28rem) minmax(18rem,1fr); gap:1.25rem; }
    .image-wrap { display:grid; place-items:center; min-height:16rem; overflow:hidden; border-radius:.55rem; background:#e9e7ee; }
    .image-wrap img { display:block; max-width:100%; max-height:32rem; object-fit:contain; }
    .context { margin:.55rem 0; padding:.65rem; border-left:3px solid var(--line); color:#4d495b; background:#faf9fc; font-size:.88rem; white-space:pre-wrap; }
    .source-copy { font-size:.86rem; color:var(--muted); }
    .actions { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.7rem; }
    .empty { padding:3rem; text-align:center; color:var(--muted); }
    [hidden] { display:none !important; }
    @media (max-width:760px) {
      .reviewer { width:100%; margin-left:0; }
      .reviewer input { flex:1; width:auto; }
      .fields, .image-card { grid-template-columns:1fr; }
      .top { position:static; }
    }
  </style>
</head>
<body>
  <header class="top">
    <div class="top-row">
      <h1>Medium migration review</h1>
      <label class="reviewer">Reviewer name <input id="reviewer" autocomplete="name" placeholder="Your name"></label>
      <button class="primary" id="save">Save progress</button>
      <span class="save-status" id="save-status" role="status">Loading…</span>
    </div>
  </header>
  <main class="shell">
    <p class="intro">Use this private review tool to clear the migration’s release holds. Decisions save directly to <code>docs/migrations/medium/review-decisions.json</code>. If ownership or permission is uncertain, leave the item as <strong>Review required</strong>. Nothing here changes Medium or production.</p>
    <div class="tabs" role="tablist" aria-label="Review sections">
      <button id="rights-tab" role="tab" aria-selected="true">Story rights</button>
      <button id="images-tab" role="tab" aria-selected="false">Image accessibility</button>
    </div>
    <section id="rights-panel" role="tabpanel" aria-labelledby="rights-tab">
      <div class="guidance"><strong>Rights:</strong> choose Organisation-owned only with supporting records. Choose Permission-recorded when the contributor retains copyright and republication permission is documented. Choose Author-owned only when the credited author is personally approving publication. “All rights reserved” is not ownership evidence.</div>
      <div class="toolbar"><strong class="progress" id="rights-progress"></strong><label>Show <select id="rights-filter"><option value="unresolved">Unresolved</option><option value="all">All</option><option value="resolved">Resolved</option></select></label></div>
      <div class="cards" id="rights-cards"></div>
    </section>
    <section id="images-panel" role="tabpanel" aria-labelledby="images-tab" hidden>
      <div class="guidance"><strong>Images:</strong> meaningful images need concise text describing what matters in this story. Decorative means the surrounding text already conveys everything the image contributes; decorative images use empty alt text. Captions and credits are separate.</div>
      <div class="toolbar"><strong class="progress" id="images-progress"></strong><label>Show <select id="images-filter"><option value="unresolved">Unresolved</option><option value="all">All placements</option><option value="resolved">Resolved</option></select></label></div>
      <div class="cards" id="image-cards"></div>
    </section>
  </main>
  <script>
    let data;
    let review;
    const dirtyRights = new Set();
    const dirtyImages = new Set();
    const $ = (selector) => document.querySelector(selector);
    const escapeHtml = (value='') => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
    const statusLabels = { 'review-required':'Review required', 'permission-recorded':'Permission recorded', 'organisation-owned':'Organisation-owned', 'author-owned':'Author-owned / author approval' };
    const imageLabels = { 'review-required':'Review required', meaningful:'Meaningful', decorative:'Decorative' };
    const effectiveRights = (story) => review.rights[story.legacyPath]?.status || story.sourceStatus;
    const effectiveImage = (image) => review.images[image.key]?.decision || image.sourceDecision.decision;

    function rightsEntry(path) {
      return review.rights[path] ||= { status:'review-required', basis:'', notes:'' };
    }
    function imageEntry(image) {
      return review.images[image.key] ||= { decision:image.sourceDecision.decision, alt:image.sourceDecision.alt || '', credit:'', notes:'' };
    }
    function optionList(labels, selected) {
      return Object.entries(labels).map(([value,label]) => '<option value="'+value+'" '+(value===selected?'selected':'')+'>'+escapeHtml(label)+'</option>').join('');
    }
    function progress() {
      const unresolvedRights = data.stories.filter((story) => effectiveRights(story)==='review-required').length;
      const unresolvedImages = data.images.filter((image) => effectiveImage(image)==='review-required').length;
      $('#rights-progress').innerHTML = '<span class="'+(unresolvedRights?'hold':'ok')+'">'+unresolvedRights+' unresolved</span> of '+data.stories.length+' stories';
      $('#images-progress').innerHTML = '<span class="'+(unresolvedImages?'hold':'ok')+'">'+unresolvedImages+' unresolved</span> of '+data.images.length+' image placements';
      $('#rights-tab').textContent = 'Story rights ('+unresolvedRights+' unresolved)';
      $('#images-tab').textContent = 'Image accessibility ('+unresolvedImages+' unresolved)';
    }
    function renderRights() {
      const filter = $('#rights-filter').value;
      const stories = data.stories.filter((story) => filter==='all' || (filter==='unresolved') === (effectiveRights(story)==='review-required'));
      $('#rights-cards').innerHTML = stories.length ? stories.map((story) => {
        const entry = review.rights[story.legacyPath] || { status:story.sourceStatus, basis:'', notes:'' };
        return '<article class="card" data-right="'+escapeHtml(story.legacyPath)+'">'+
          '<p class="meta">'+escapeHtml(new Date(story.publishedAt).toLocaleDateString('en-SG',{dateStyle:'medium'}))+' · '+escapeHtml(story.author.name)+'</p>'+
          '<h2>'+escapeHtml(story.title)+'</h2>'+
          '<div class="links"><a target="_blank" rel="noopener" href="'+escapeHtml(story.sourceMediumUrl)+'">Original Medium article</a><a target="_blank" rel="noopener" href="'+escapeHtml(story.canonicalUrl)+'">Planned blog URL</a></div>'+
          '<div class="fields"><label>Status<select data-field="status">'+optionList(statusLabels,entry.status)+'</select></label>'+
          '<label>Rights basis or evidence reference<textarea data-field="basis" placeholder="For example: written permission dated…, employment agreement…, or author approval reference">'+escapeHtml(entry.basis||'')+'</textarea></label>'+
          '<label>Internal notes<textarea data-field="notes" placeholder="Optional notes; do not paste credentials or unnecessary personal data">'+escapeHtml(entry.notes||'')+'</textarea></label></div>'+
          '<div class="actions"><button data-author="'+escapeHtml(story.author.id)+'">Apply this decision to unresolved stories by '+escapeHtml(story.author.name)+'</button></div></article>';
      }).join('') : '<p class="empty">No stories match this filter.</p>';
      $('#rights-cards').querySelectorAll('[data-field]').forEach((field) => field.addEventListener('input', updateRight));
      $('#rights-cards').querySelectorAll('[data-author]').forEach((button) => button.addEventListener('click', bulkRights));
    }
    function updateRight(event) {
      const card = event.target.closest('[data-right]');
      const entry = rightsEntry(card.dataset.right);
      entry[event.target.dataset.field] = event.target.value;
      dirtyRights.add(card.dataset.right);
      $('#save-status').textContent = 'Unsaved changes';
      progress();
    }
    function bulkRights(event) {
      const sourceCard = event.target.closest('[data-right]');
      const source = rightsEntry(sourceCard.dataset.right);
      const authorId = event.target.dataset.author;
      let count = 0;
      for (const story of data.stories.filter((item) => item.author.id===authorId && effectiveRights(item)==='review-required')) {
        review.rights[story.legacyPath] = { status:source.status, basis:source.basis||'', notes:source.notes||'' };
        dirtyRights.add(story.legacyPath);
        count += 1;
      }
      $('#save-status').textContent = 'Applied to '+count+' stories; save when ready.';
      progress(); renderRights();
    }
    function renderImages() {
      const filter = $('#images-filter').value;
      const images = data.images.filter((image) => filter==='all' || (filter==='unresolved') === (effectiveImage(image)==='review-required'));
      $('#image-cards').innerHTML = images.length ? images.map((image) => {
        const entry = review.images[image.key] || { decision:image.sourceDecision.decision, alt:image.sourceDecision.alt||'', credit:'', notes:'' };
        const context = image.context.length ? image.context.join('\n\n') : 'No nearby text was available.';
        return '<article class="card image-card" data-image="'+escapeHtml(image.key)+'"><div>'+
          '<div class="image-wrap"><img loading="lazy" src="'+escapeHtml(image.localPath)+'" alt=""></div>'+
          '<p class="source-copy">'+escapeHtml(String(image.width||'?'))+'×'+escapeHtml(String(image.height||'?'))+(image.animated?' · animated GIF':'')+' · source image '+escapeHtml(image.sourceImageId)+'</p></div><div>'+
          '<p class="meta">'+escapeHtml(image.authorName)+' · image '+(image.paragraph+1)+'</p><h2>'+escapeHtml(image.storyTitle)+'</h2>'+
          '<div class="links"><a target="_blank" rel="noopener" href="'+escapeHtml(image.sourceMediumUrl)+'">Original Medium article</a><a target="_blank" rel="noopener" href="'+escapeHtml(image.canonicalUrl)+'">Planned blog URL</a></div>'+
          '<p class="source-copy"><strong>Source caption:</strong> '+escapeHtml(image.caption||'None')+'<br><strong>Source alt:</strong> '+escapeHtml(image.sourceAlt||'None')+'</p>'+
          '<div class="context"><strong>Nearby story text</strong>\n'+escapeHtml(context)+'</div>'+
          '<div class="fields"><label>Decision<select data-field="decision">'+optionList(imageLabels,entry.decision)+'</select></label>'+
          '<label>Meaningful alt text<textarea data-field="alt" placeholder="Describe what matters in the context of this story" '+(entry.decision==='meaningful'?'':'disabled')+'>'+escapeHtml(entry.alt||'')+'</textarea></label>'+
          '<label>Credit, if needed<input data-field="credit" value="'+escapeHtml(entry.credit||'')+'"></label>'+
          '<label>Internal notes<textarea data-field="notes" placeholder="Optional editorial note">'+escapeHtml(entry.notes||'')+'</textarea></label></div>'+
          '<div class="actions"><button data-same-image="'+escapeHtml(image.sourceImageId)+'">Apply this choice to unresolved placements of the identical source image</button></div></div></article>';
      }).join('') : '<p class="empty">No images match this filter.</p>';
      $('#image-cards').querySelectorAll('[data-field]').forEach((field) => field.addEventListener('input', updateImage));
      $('#image-cards').querySelectorAll('[data-same-image]').forEach((button) => button.addEventListener('click', bulkImages));
    }
    function updateImage(event) {
      const card = event.target.closest('[data-image]');
      const image = data.images.find((item) => item.key===card.dataset.image);
      const entry = imageEntry(image);
      entry[event.target.dataset.field] = event.target.value;
      if (event.target.dataset.field==='decision') {
        if (entry.decision==='decorative') entry.alt='';
        const alt = card.querySelector('[data-field="alt"]');
        alt.disabled = entry.decision!=='meaningful';
        alt.value = entry.alt || '';
      }
      dirtyImages.add(image.key);
      $('#save-status').textContent = 'Unsaved changes';
      progress();
    }
    function bulkImages(event) {
      const sourceCard = event.target.closest('[data-image]');
      const sourceImage = data.images.find((item) => item.key===sourceCard.dataset.image);
      const source = imageEntry(sourceImage);
      let count = 0;
      for (const image of data.images.filter((item) => item.sourceImageId===sourceImage.sourceImageId && effectiveImage(item)==='review-required')) {
        review.images[image.key] = { decision:source.decision, alt:source.alt||'', credit:source.credit||'', notes:source.notes||'' };
        dirtyImages.add(image.key);
        count += 1;
      }
      $('#save-status').textContent = 'Applied to '+count+' placements; save when ready.';
      progress(); renderImages();
    }
    function validateAndStamp() {
      const reviewer = $('#reviewer').value.trim();
      const now = new Date().toISOString();
      const problems = [];
      for (const path of dirtyRights) {
        const entry = review.rights[path];
        if (entry.status!=='review-required') {
          if (!entry.basis?.trim()) problems.push('A completed rights decision is missing its evidence reference.');
          if (!reviewer) problems.push('Enter your reviewer name before completing rights decisions.');
          entry.reviewer = reviewer;
          entry.reviewedAt = now;
        }
      }
      for (const key of dirtyImages) {
        const entry = review.images[key];
        if (entry.decision==='meaningful' && !entry.alt?.trim()) problems.push('A meaningful image is missing alt text.');
        if (entry.decision!=='review-required') {
          if (!reviewer) problems.push('Enter your reviewer name before completing image decisions.');
          entry.reviewer = reviewer;
          entry.reviewedAt = now;
        }
      }
      if (problems.length) throw new Error([...new Set(problems)].join(' '));
    }
    async function save() {
      try {
        validateAndStamp();
        $('#save').disabled = true; $('#save-status').textContent = 'Saving…';
        const response = await fetch('/api/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(review)});
        const result = await response.json();
        if (!response.ok) throw new Error(result.error||'Save failed');
        dirtyRights.clear(); dirtyImages.clear();
        $('#save-status').textContent = 'Saved at '+new Date().toLocaleTimeString();
        progress();
      } catch (error) {
        $('#save-status').textContent = error.message;
      } finally { $('#save').disabled = false; }
    }
    function switchTab(section) {
      const rights = section==='rights';
      $('#rights-tab').setAttribute('aria-selected',String(rights));
      $('#images-tab').setAttribute('aria-selected',String(!rights));
      $('#rights-panel').hidden = !rights; $('#images-panel').hidden = rights;
      if (!rights) renderImages();
    }
    async function init() {
      const response = await fetch('/api/review');
      if (!response.ok) throw new Error('Could not load review data');
      data = await response.json(); review = data.review;
      $('#reviewer').value = localStorage.getItem('medium-reviewer') || '';
      $('#reviewer').addEventListener('input',(event)=>localStorage.setItem('medium-reviewer',event.target.value));
      $('#save').addEventListener('click',save);
      $('#rights-filter').addEventListener('change',renderRights);
      $('#images-filter').addEventListener('change',renderImages);
      $('#rights-tab').addEventListener('click',()=>switchTab('rights'));
      $('#images-tab').addEventListener('click',()=>switchTab('images'));
      window.addEventListener('beforeunload',(event)=>{ if (dirtyRights.size || dirtyImages.size) event.preventDefault(); });
      progress(); renderRights(); $('#save-status').textContent = 'Ready';
    }
    init().catch((error)=>{$('#save-status').textContent=error.message;});
  </script>
</body>
</html>`;

const server = createServer(async (request, response) => {
	try {
		const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
		if (request.method === 'GET' && url.pathname === '/') {
			response.writeHead(200, {
				'Content-Type': 'text/html; charset=utf-8',
				'Cache-Control': 'no-store',
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'DENY',
			});
			response.end(HTML);
			return;
		}
		if (request.method === 'GET' && url.pathname === '/api/review') {
			sendJson(response, 200, await buildReviewData());
			return;
		}
		if (request.method === 'POST' && url.pathname === '/api/review') {
			await saveReview(await readRequestJson(request));
			sendJson(response, 200, { status: 'saved' });
			return;
		}
		if (request.method === 'GET' && await serveMedia(url.pathname, response)) return;
		response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
		response.end('Not found');
	} catch (error) {
		sendJson(response, 400, { error: error instanceof Error ? error.message : String(error) });
	}
});

server.listen(PORT, HOST, () => {
	console.log(`Medium migration review listening on http://${HOST}:${PORT}`);
});
