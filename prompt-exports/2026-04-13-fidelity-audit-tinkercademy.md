> **Historical prompt export.** This audit describes the retired pre-rebuild Framer site and its old typography; it is not evidence of the current Astro design.

<file_map>
/Users/yingjie/Developer/tt-projects/tinkercademy.com
├── scripts
│   ├── lib
│   │   └── framer.mjs *
│   ├── build-crm-data.mjs *
│   ├── crawl-site.mjs *
│   └── download-remote-images.py * +
├── src
│   ├── components
│   │   ├── ContentBlocks.astro *
│   │   ├── CourseGrid.astro *
│   │   ├── CtaBanner.astro *
│   │   ├── HeroMedia.astro *
│   │   ├── PageHero.astro *
│   │   ├── ProgrammeCard.astro *
│   │   ├── RichContent.astro *
│   │   ├── SiteFooter.astro *
│   │   ├── SiteHeader.astro *
│   │   └── TutorialStory.astro *
│   ├── data
│   │   ├── crm
│   │   │   ├── audiences.yml *
│   │   │   ├── contacts.yml *
│   │   │   ├── forms.yml *
│   │   │   ├── locations.yml *
│   │   │   ├── programmes.yml *
│   │   │   ├── site-settings.yml *
│   │   │   ├── social-links.yml *
│   │   │   ├── topics.yml *
│   │   │   ├── cta-destinations.yml
│   │   │   └── tutorials.yml
│   │   ├── pages
│   │   │   ├── audiences.json *
│   │   │   ├── contacts.json *
│   │   │   ├── forms.json *
│   │   │   ├── locations.json *
│   │   │   ├── site-settings.json *
│   │   │   ├── social-links.json *
│   │   │   ├── static-pages.json *
│   │   │   ├── topics.json *
│   │   │   ├── assets.json
│   │   │   ├── cta-destinations.json
│   │   │   ├── programmes.json
│   │   │   └── tutorials.json
│   │   └── team.yaml *
│   ├── layouts
│   │   └── BaseLayout.astro *
│   ├── lib
│   │   ├── data.js * +
│   │   ├── links.js * +
│   │   └── site-media.js * +
│   └── pages
│       ├── programmes
│       │   └── [slug].astro *
│       ├── tutorials
│       │   └── [slug].astro *
│       ├── [slug].astro *
│       ├── about-us.astro *
│       ├── contact-us.astro *
│       ├── courses.astro *
│       ├── index.astro *
│       ├── infocomm-club.astro *
│       ├── microbit.astro *
│       ├── showcase.astro *
│       └── tinker-x.astro *
├── .codex
│   └── SCRATCHPAD.md
├── .ruff_cache
├── output
│   └── playwright
│       ├── live-about.png
│       ├── live-home.png
│       ├── live-programme.png
│       ├── live-tutorial.png
│       ├── local-about.png
│       ├── local-home.png
│       ├── local-programme.png
│       └── local-tutorial.png
├── prompt-exports
├── public
│   ├── images
│   │   ├── certifications
│   │   │   ├── adwsassoc.png
│   │   │   ├── adwscu.png
│   │   │   ├── ai900.png
│   │   │   ├── apls.png
│   │   │   ├── cip.svg
│   │   │   ├── mct1.png
│   │   │   ├── mct2.png
│   │   │   ├── mie.png
│   │   │   └── ucu.png
│   │   ├── courses
│   │   │   ├── chatgpt.png
│   │   │   ├── lovable.png
│   │   │   └── react-native.png
│   │   ├── flagship
│   │   │   ├── code-for-fun.webp
│   │   │   ├── imda-learn.png
│   │   │   └── swift-accelerator.webp
│   │   ├── institutions
│   │   │   ├── apple.png
│   │   │   ├── cornell.png
│   │   │   ├── mit.png
│   │   │   ├── moe.png
│   │   │   ├── nie.png
│   │   │   ├── paypal.png
│   │   │   ├── stanford.webp
│   │   │   └── wharton.png
│   │   ├── logos
│   │   │   ├── favicon.png
│   │   │   ├── tinkercademy-black.png
│   │   │   └── tinkercademy-white.png
│   │   ├── partners
│   │   │   ├── apple-consultant.svg
│   │   │   ├── figma.png
│   │   │   ├── imda.svg
│   │   │   ├── isca.png
│   │   │   ├── microsoft-gtp.png
│   │   │   ├── smu-academy.webp
│   │   │   └── unity.png
│   │   ├── remote
│   │   │   ├── 0FMSOS9N2gwOswQhlqDArwwjUps.png
│   │   │   ├── 0Gt03RQogGUuqpIICB7MR02Qbw.png
│   │   │   ├── 0OOu86wVjbq3jXKiC0xVgRJWZg.png
│   │   │   ├── 0VuQt1etV8pgVECVVkjvvddbg.jpg
│   │   │   ├── 11KSGbIZoRSg4pjdnUoif6MKHI.svg
│   │   │   ├── 19CYlknp9407PkeDhDOh020G6M.jpg
│   │   │   ├── 1K3r4Yn1wQUL2X7dBiPdqIRtdUY.png
│   │   │   ├── 1KxCnot1QQizN66nQjsoIUGA.jpg
│   │   │   ├── 1L8mNfXQRavNvPRdHivIa4JrxI.jpg
│   │   │   ├── 1QBHB8ypQ3erWXDDpHcQlYDU14.png
│   │   │   ├── 1jFP3sMj646nR6WeywtZNo9oto.png
│   │   │   ├── 1mmWhHMr6MnhWIa0MEoHFHdS4I.jpg
│   │   │   ├── 1wk1e4xWVOzslZgdjkNsnHjM4U.gif
│   │   │   ├── 1xc3FItBakESuhI1fzJCI7cTX1M.png
│   │   │   ├── 1y571LbpI6D5oOBFULGkiwOkc8.png
│   │   │   ├── 2IJHKhOHFQ9pE2lLvJr8RLIeCd0.png
│   │   │   ├── 2JTh75md6jU1IiSqM9ayZ2pt8Ss.png
│   │   │   ├── 2LYDGOlVS6xqRCSxPz9Go91zbE.jpg
│   │   │   ├── 2NpNJXdo2tuUILUJ69j5Vd5kXA.png
│   │   │   ├── 2cRVvI06dKtgpPi8cuzOWGAWk.jpg
│   │   │   ├── 2o10ZPETjdjUQpQoqTp8peufY.jpg
│   │   │   ├── 32DzKtvqHxA9nlgkvXZGtjdmujY.png
│   │   │   ├── 3Iy0tiNcx6GQ1D8zsjP8p7GCxE.png
│   │   │   ├── 3NJ7ecKCxqJSaCpYCFC77Xqh4KU.jpg
│   │   │   ├── 3cybNehmDehCXeBSMBiUWGpbgI.jpg
│   │   │   ├── 3giBkE2iEVEPlhpuuIvcBqFDw.jpg
│   │   │   ├── 3kg5CT7qKsmehew05r2MIUeuSI.png
│   │   │   ├── 3wvrDe3ohG9X1GAVgOtYRjkdWCs.jpg
│   │   │   ├── 3yRYhM7SJbDUMgNuzhiVLvXkfg.png
│   │   │   ├── 42ilGCDwRROKnq6qzr3GnZCrVLM.png
│   │   │   ├── 4JTEHpnqm2o008J6lk5HdzIAkyo.jpg
│   │   │   ├── 4U11jUVNcHgIxI8C5gVdObp4.jpeg
│   │   │   ├── 5MEzqXIGdWHTEKNjM6MMNimMU8.jpg
│   │   │   ├── 5bbGWnKG79Wysm5aSAbpyxdp4.jpg
│   │   │   ├── 5lUlMn2yi5S5KDkBEGDYH5wkN8I.png
│   │   │   ├── 5zCs9y7Q6KxtQpIRt2KQDT7IXLQ.png
│   │   │   ├── 6AquPe6snR8cp5io7SOUGbf8eGU.png
│   │   │   ├── 6GTpyqYfkxN3lbZ6VEblJaGDcU.png
│   │   │   ├── 6NH5uFn1Vvqva0lzwRAhxXW8g.jpg
│   │   │   ├── 6gctHPSd4luM1PjI9WIcmXL25k.jpg
│   │   │   ├── 6mWF0Ccva5IdpRXpNINPYcRgYE.png
│   │   │   ├── 6qCqn9IAvDAcdyyDxpRNqnjsc.jpg
│   │   │   ├── 6tTbkXggWgQCAJ4DO2QEdXXmgM.svg
│   │   │   ├── 6yF8GEox10cMWfAo3Gz3kOxP30.jpg
│   │   │   ├── 7BSVj6Q4r7YRJqFN8xjGfbBWA4g.png
│   │   │   ├── 7JzS84mvFUEd3VM3WRXC2AaWn4k.svg
│   │   │   ├── 7SoVlCsTaQWSWuDRzCULLs20Ho8.png
│   │   │   ├── 7cRxG8FAtvLFi4k7hPB4h4sNtQ.jpg
│   │   │   ├── 7ef0VqystNLYofgvW65ZeDfTwQ.png
│   │   │   ├── 7qe4NmxcUDg8AMroar1KPLPIk.jpg
│   │   │   ├── 83ed9IQ9FwSWXdx0nJrQSV0LU.jpg
│   │   │   ├── 88NlnwNdHVp2nXxpL87d03gX7s.png
│   │   │   ├── 8JGmHAtPoekXM12RpFdS0vPw18.jpg
│   │   │   ├── 8NBneMNAa5wQqlDuwQQZA1Mg8.png
│   │   │   ├── 8l8e9TpNF14Z9cuK9Bp2hfX95EM.jpg
│   │   │   ├── 8yUGGQJPdobsYwsfsNmH0KQ7Uk.jpg
│   │   │   ├── 96iA8nlYJg2iuokLU2JMF0Lsc.jpg
│   │   │   ├── 9A0fFmizcZLrgMWVHKs2nmbcmp8.png
│   │   │   ├── 9DEMPvtdTMo3y3fhSuVB31fzBg.png
│   │   │   ├── 9G76jSuViuPzWDFa25R399dWY.png
│   │   │   ├── 9NO4kHaPZA5ZVeKMmeHbbqHY.jpg
│   │   │   ├── 9Vdt33oJUx2qSruXlu1mkfKGw.png
│   │   │   ├── 9pTCEuFTcwKrf2gt36NPGPoctgQ.jpg
│   │   │   ├── A5Dd868Qo1geG7lsgR36QkJm9c.png
│   │   │   ├── ACa7VkzrA0yN5tZuAG6uGW6GHM.png
│   │   │   ├── APnCxkJ8m7aoazrHMQeh9wEQpI.gif
│   │   │   ├── AQPG4X31UkdSLjpdxRHHyOs.png
│   │   │   ├── AVeafstscGQQkVK0CyLpy3Uc0.png
│   │   │   ├── AW3bQ3c9TVwK1z0hWlPAdz6o.png
│   │   │   ├── AcyKvCqXBblmvGC8X1c86dmnxa4.png
│   │   │   ├── AqPpSJgQGTw0QlTgYktxZ2909EY.jpg
│   │   │   ├── BDt3R80YV6FiInYlrnHOw8DQ.svg
│   │   │   ├── BOiodvo0wSVC8sMGohMR1qWmAxk.png
│   │   │   ├── BPcWkLszbcWVMEaeXfRnQ9yMk.png
│   │   │   ├── BmGg73kIJD1MxxJB5bTRT7iSZn8.png
│   │   │   ├── C07Omh5chuk2EiR2CdaWmdUE6I.png
│   │   │   ├── C1irPqmZ6wGZcOkk52Yavbz6CI.jpg
│   │   │   ├── C6YM21KXpchozSKz1Z1KKRMGD0.png
│   │   │   ├── C7yenZGOmFIgdUioxvssA4AD7ZA.png
│   │   │   ├── CCm9KLcZAl5jP2xF7l8cpdKqW4.png
│   │   │   ├── CKeGoJOZaVnNVERr6e0RGmKEfpI.png
│   │   │   ├── CO2stskLNWzntWeYIhJmkSaYo.png
│   │   │   ├── CWEUByX8jZirfimW0jEPQHS62w.jpg
│   │   │   ├── CXpllcbj0g5lLepfvJuYNCwN7c.jpg
│   │   │   ├── Cca2InAAE5dsoT4Bfgd97mJlPBY.jpg
│   │   │   ├── CgClkqD8Wq0hwjYJxlwwEMsPZLI.png
│   │   │   ├── CkdqLNWsQfRYffR6WYwziG7cU.jpg
│   │   │   ├── D1WiZefA3XyQOu6xRPt5RocAuc.jpg
│   │   │   ├── D2gdnToMVVW0kN4F8iql8ivpLE.jpeg
│   │   │   ├── D7rnliPAgSJ20uq2RmGUXQwWUs0.webp
│   │   │   ├── D9DV6zCkQwFFAB6npPXdibxPnw.jpg
│   │   │   ├── DDl0KNXbAnRrmhYEZ1XM5mJvy40.gif
│   │   │   ├── DYffUNTKvjHf2wF1BsJXIS60VsY.jpg
│   │   │   ├── DalhBZLwNBpqcovN4tqvnw6ahqM.png
│   │   │   ├── Dbakk2QHX0IBT2M74QmO8XS1ZIc.jpg
│   │   │   ├── DdFoZd9sfSwBtbQaEEAVapOvvd4.png
│   │   │   ├── DpOBnZ09CRXXgXc0fPYlHdh8GQI.png
│   │   │   ├── DxeGLZ3Spx3PET8teOKVbLvrg.jpg
│   │   │   ├── E8REPxfDIMr6Z1CeiqAn5ZMmTw.png
│   │   │   └── EOhXyZP1VCvUwxVeYdBZte1X8M.jpg
│   │   ├── social
│   │   └── hero-bg.jpg
│   ├── favicon.ico
│   └── favicon.svg
├── README.md *
├── astro.config.mjs *
├── package.json *
├── package-lock.json
└── tsconfig.json


(* denotes selected files)
(+ denotes code-map available)
</file_map>
<file_contents>
File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/CtaBanner.astro
```astro
---
/**
 * CtaBanner — dark gradient CTA section used at the bottom of every page.
 *
 * Props:
 *   text?  — closing statement (defaults to the standard Tinkercademy blurb)
 *   ctas?  — array of { label, url } pill links (defaults to Our Courses / Our Projects / Contact Us)
 */
import { toSiteHref } from '../lib/links.js';

type Cta = { label: string; url: string };

interface Props {
	text?: string;
	ctas?: Cta[];
}

const DEFAULT_TEXT =
	'Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond.';

const DEFAULT_CTAS: Cta[] = [
	{ label: 'Our Courses', url: '/courses-all' },
	{ label: 'Our Projects', url: '/showcase' },
	{ label: 'Contact Us', url: '/contact-us' },
];

const text = Astro.props.text ?? DEFAULT_TEXT;
const ctas = Astro.props.ctas?.length ? Astro.props.ctas : DEFAULT_CTAS;
---

<section class="cta-banner">
	<div class="shell cta-banner__inner">
		<p class="cta-banner__text">{text}</p>
		<div class="cta-banner__actions">
			{ctas.map((cta) => (
				<a class="cta-pill" href={cta.url.startsWith('/') ? cta.url : toSiteHref(cta.url)}>
					{cta.label}
				</a>
			))}
		</div>
	</div>
</section>

<style>
	.cta-banner {
		padding: 0 0 3rem;
		width: 100vw;
		margin-inline: calc(50% - 50vw);
	}

	.cta-banner__inner {
		max-width: 1160px;
		margin: 0 auto;
		padding: 2.5rem clamp(1.5rem, 4vw, 3rem);
		border-radius: 16px;
		background: linear-gradient(180deg, rgb(84, 84, 84) 0%, rgb(0, 0, 0) 100%);
		display: grid;
		gap: 1.25rem;
	}

	.cta-banner__text {
		margin: 0;
		max-width: 50rem;
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		line-height: 1.7;
		color: #ffffff;
	}

	.cta-banner__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.cta-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.55rem 1rem;
		border-radius: 30px;
		border: 1px solid rgba(255, 255, 255, 0.6);
		background: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		text-decoration: none;
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		font-weight: 400;
		transition: background 0.15s;
	}

	.cta-pill:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	@media (max-width: 809px) {
		.cta-banner__inner {
			margin: 0 0.75rem;
			border-radius: 12px;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/audiences.json
```json
[
  {
    "id": "businesses",
    "label": "Businesses",
    "source_id": "p8PkwQy89"
  },
  {
    "id": "tech-productivity",
    "label": "Professional Productivity with Technology",
    "source_id": "K2owTpq3X"
  },
  {
    "id": "public",
    "label": "Public",
    "source_id": "rXBtbZtEa"
  },
  {
    "id": "students",
    "label": "Students",
    "source_id": "n52QjkyZI"
  },
  {
    "id": "teachers",
    "label": "Teachers",
    "source_id": "ElFXo_lob"
  }
]
```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/showcase.astro
```astro
---
/**
 * /showcase — rebuilt to match the live Framer site.
 *
 * Sections:
 *  1. Hero — full-bleed bg image with dark overlay + title
 *  2. Students — horizontal carousel of 4 student photos
 *  3. Testimonials — intern testimonial cards (draggable carousel on live site, grid here)
 *  4. Meet Jia Chen — feature story with image
 *  5. Build Log — CTA linking to blog.tinkercademy.com
 *  6. CTA Banner
 */
import CtaBanner from '../components/CtaBanner.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getStaticPage } from '../lib/data.js';

const page = getStaticPage('/showcase');
if (!page) return Astro.redirect('/404');

const canonical = new URL('/showcase', 'https://tinkercademy.com').toString();

/* ── Student photos ── */
const studentPhotos = [
	'/images/remote/VyH1UxmLf2vV96I5UpoW6fdCIX4.png',
	'/images/remote/LjzcGlcbBy47m6VWBhXgwT53kG8.png',
	'/images/remote/C6YM21KXpchozSKz1Z1KKRMGD0.png',
	'/images/remote/iQDC66gJozrvjzr4rpnG0Epl1s.png',
];

/* ── Intern testimonials ── */
const testimonials = [
	{
		name: 'Raynold',
		role: 'Software Development Intern, 2017',
		quote: 'This internship was so much than just a programming task. As the project owner, I went through all stages of product development. From the idea generation, discussion with end users, development, live demonstrations to troubleshooting and maintenance.',
	},
	{
		name: 'Colin',
		role: 'Machine Learning & Data Science Intern, 2017',
		quote: "Being at Tinkertanker gave me the drive and motivation to push through the courses on a very tight schedule, thanks to the mentors who were there to provide not just answers, but the right questions and resources to find out myself.",
	},
	{
		name: 'Joelle',
		role: 'Computer Engineering Intern, 2017',
		quote: "I am really happy to have worked on several projects that were put to life. It was a little nerve-wrecking and mind boggling but I'm glad everything turned out okay. Through this experience, I have learnt how to appreciate and enjoy the building process apart from looking at the end product.",
	},
	{
		name: 'Mark',
		role: 'Teaching & Curriculum Design Intern, 2023',
		quote: "Due to the nature of Tinkertanker as a tech education company, it has a wealth of resources you can make use of to expand your technical knowledge. It's a different experience from the traditional software engineering job, and I appreciate its role in broadening my horizons.",
	},
	{
		name: 'Enric',
		role: 'Computer Science Intern, 2023',
		quote: 'All in all, interning at Tinkertanker was a very enriching experience. I was able to take part in the teaching of classes and even try out many different coding languages and programs such as VMs. And all of these have helped me improve and grow as a Computer Science undergraduate.',
	},
	{
		name: 'Yun Xuan',
		role: 'Software Development Intern, 2024',
		quote: 'Overall, all these experiences have made my internship a thoroughly enjoyable and educational experience. I believe it provided me with a diverse set of skills and insights that I will carry forward in my professional journey. I am very grateful to everyone who helped make this enriching experience possible.',
	},
];
---

<BaseLayout
	title={page.seo?.title ?? 'Showcase — Tinkercademy'}
	description={page.seo?.description ?? page.description ?? ''}
	canonical={canonical}
	image={page.hero_image ?? undefined}
>
	{/* ═══════ 1. Hero ══════════════════════════════════════════════════ */}
	<section class="showcase-hero">
		<img
			class="showcase-hero__bg"
			src="/images/remote/1mmWhHMr6MnhWIa0MEoHFHdS4I.jpg"
			alt="Showcase"
			loading="eager"
		/>
		<div class="showcase-hero__overlay"></div>
		<div class="showcase-hero__text shell">
			<h1 class="showcase-hero__title">
				Showcase of Our <span class="highlight">Coders</span>, <span class="highlight">Tinkerers</span>, <span class="highlight">Makers</span>, and their Journeys
			</h1>
			<p class="showcase-hero__subtitle">Meet the bright minds who've learned, built, and grown with us, from classroom projects to professional success.</p>
		</div>
	</section>

	{/* ═══════ 2. Our Students — Carousel ═══════════════════════════════ */}
	<section class="showcase-students">
		<div class="shell">
			<h2 class="showcase-students__heading">Our Students</h2>
		</div>
		<div class="carousel-wrapper">
			<div class="carousel" id="student-carousel">
				{studentPhotos.map((src, i) => (
					<div class="carousel__slide">
						<img src={src} alt={`Student ${i + 1}`} loading="lazy" />
					</div>
				))}
			</div>
			<button class="carousel__btn carousel__btn--prev" data-carousel="student-carousel" data-dir="-1" aria-label="Previous">
				<img src="/images/remote/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" alt="" width="24" height="24" />
			</button>
			<button class="carousel__btn carousel__btn--next" data-carousel="student-carousel" data-dir="1" aria-label="Next">
				<img src="/images/remote/11KSGbIZoRSg4pjdnUoif6MKHI.svg" alt="" width="24" height="24" />
			</button>
		</div>
	</section>

	{/* ═══════ 3. Our Interns — Testimonials ═════════════════════════════ */}
	<section class="showcase-testimonials">
		<div class="shell">
			<h2 class="showcase-section__heading">Our Interns</h2>
			<p class="showcase-section__desc">Through hands-on experience and mentorship, our interns work on real projects that shape the future of education and technology. Here are what they have to say about their experiences!</p>

			<div class="testimonials-grid">
				{testimonials.map((t) => (
					<div class="testimonial-card">
						<div class="testimonial-card__avatar">
							<span>{t.name.charAt(0)}</span>
						</div>
						<h3 class="testimonial-card__name">{t.name}</h3>
						<p class="testimonial-card__role">{t.role}</p>
						<blockquote class="testimonial-card__quote">{t.quote}</blockquote>
					</div>
				))}
			</div>
		</div>
	</section>

	{/* ═══════ 4. Meet Jia Chen ══════════════════════════════════════════ */}
	<section class="showcase-feature">
		<div class="shell showcase-feature__inner">
			<div class="showcase-feature__media">
				<img
					src="/images/remote/yYM9MCFxtou9IT7a8ENaXgPmUY.png"
					alt="Jia Chen, as featured on apple.com"
					loading="lazy"
				/>
			</div>
			<div class="showcase-feature__content">
				<h2 class="showcase-feature__heading">Meet Jia Chen</h2>
				<p class="showcase-feature__subtitle">Swift Accelerator Programme Trainer at Tinkertanker</p>
				<p class="showcase-feature__text">Meet Jia Chen, a young visionary from Singapore whose journey into the world of technology began with childhood exploration and the transformative power of mobile apps. Inspired by the seamless fusion of science and technology, Jia Chen embarked on a swift learning curve, mastering the Swift programming language and unveiling his debut iOS app on the App Store at a remarkably young age.</p>
				<p class="showcase-feature__text">Now, an Information Technology diploma graduate from Ngee Ann Polytechnic, Jia Chen's creative process is seamlessly integrated into the Apple ecosystem, from sketching app designs on iPad to bringing them to life with Xcode on Mac. His commitment to inclusivity is palpable through projects such as 'ExploreAbility,' designed to empower users with accessibility features.</p>
				<p class="showcase-feature__text">Collaborating with renowned brands like Bernina, Jia Chen showcases his innovative spirit with apps like 'Bianco,' demonstrating the potential of ARKit and iPad. With six apps already gracing the App Store and two Swift Student Challenge triumphs under his belt, Jia Chen epitomises the next generation of creators and innovators, harnessing the power of Swift to realise his boundless ideas with precision and flair.</p>
				<p class="showcase-feature__apple">
					As featured on Apple:
					<a href="https://www.apple.com/education/college-students/success-stories/yee/" target="_blank" rel="noopener">apple.com/education</a>
				</p>
			</div>
		</div>
	</section>

	{/* ═══════ 5. Build Log ══════════════════════════════════════════════ */}
	<section class="showcase-buildlog">
		<img
			class="showcase-buildlog__bg"
			src="/images/remote/JKscUSf6W4RYRx9NZVXTg1xxeVs.png"
			alt=""
			loading="lazy"
		/>
		<div class="showcase-buildlog__overlay"></div>
		<div class="showcase-buildlog__text shell">
			<h2 class="showcase-buildlog__heading">Learn more about what our alumni have done!</h2>
			<p class="showcase-buildlog__subtitle">We're building software, electronics, curriculum — and the next generation of coders, makers, and creators. Come check out our build log and contribute to it one day!</p>
			<a class="showcase-buildlog__btn" href="https://blog.tinkercademy.com/" target="_blank" rel="noopener">Build Log</a>
		</div>
	</section>

	<CtaBanner />
</BaseLayout>

<script>
	/* Student photo carousel: scroll-snap with prev/next buttons */
	document.querySelectorAll('.carousel__btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-carousel');
			const dir = Number(btn.getAttribute('data-dir'));
			const carousel = document.getElementById(id!);
			if (!carousel) return;
			const slide = carousel.querySelector('.carousel__slide');
			if (!slide) return;
			const slideWidth = (slide as HTMLElement).offsetWidth + 60; /* gap */
			carousel.scrollBy({ left: dir * slideWidth, behavior: 'smooth' });
		});
	});
</script>

<style>
	/* ─── Hero ──────────────────────────────────────────────── */
	.showcase-hero {
		position: relative;
		min-height: 400px;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
	}

	.showcase-hero__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.showcase-hero__overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.showcase-hero__text {
		position: relative;
		z-index: 1;
		padding-top: 100px;
		padding-bottom: 50px;
	}

	.showcase-hero__title {
		font-family: 'Oswald', sans-serif;
		font-size: clamp(1.5rem, 3.5vw, 2.5rem);
		font-weight: 500;
		color: #fff;
		margin: 0 0 0.75rem;
		max-width: 700px;
		line-height: 1.35;
	}

	.showcase-hero__title .highlight {
		color: rgb(240, 93, 87);
	}

	.showcase-hero__subtitle {
		font-family: 'Rubik', sans-serif;
		font-size: clamp(0.9rem, 1.5vw, 1.05rem);
		color: rgba(255, 255, 255, 0.85);
		margin: 0;
		max-width: 600px;
		line-height: 1.6;
	}

	/* ─── Students carousel ───────────────────────────────── */
	.showcase-students {
		padding: 3rem 0 2rem;
	}

	.showcase-students__heading {
		font-family: 'Oswald', sans-serif;
		font-size: 1.5rem;
		font-weight: 500;
		color: rgb(23, 23, 23);
		margin: 0 0 1.5rem;
	}

	.carousel-wrapper {
		position: relative;
		padding: 0 max(1rem, calc((100vw - 1160px) / 2));
	}

	.carousel {
		display: flex;
		gap: 60px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		padding: 0 0 1rem;
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	.carousel__slide {
		flex: 0 0 calc(50% - 30px);
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}

	.carousel__slide img {
		width: 100%;
		height: auto;
		border-radius: 12px;
		display: block;
	}

	.carousel__btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid #ddd;
		border-radius: 50%;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		z-index: 2;
		transition: background 0.15s;
	}

	.carousel__btn:hover {
		background: #fff;
	}

	.carousel__btn--prev {
		left: max(0.5rem, calc((100vw - 1160px) / 2 - 8px));
	}

	.carousel__btn--next {
		right: max(0.5rem, calc((100vw - 1160px) / 2 - 8px));
	}

	@media (max-width: 809px) {
		.carousel__slide {
			flex: 0 0 calc(100% - 60px);
		}
	}

	/* ─── Sections shared ─────────────────────────────────── */
	.showcase-section__heading {
		font-family: 'Oswald', sans-serif;
		font-size: 1.5rem;
		font-weight: 500;
		color: rgb(23, 23, 23);
		margin: 0 0 0.5rem;
	}

	.showcase-section__desc {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.65;
		color: rgb(51, 51, 51);
		margin: 0 0 2rem;
		max-width: 700px;
	}

	/* ─── Testimonials grid ────────────────────────────────── */
	.showcase-testimonials {
		padding: 2rem 0 3rem;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.testimonial-card {
		background: #fafafa;
		border: 1px solid #e3e3e3;
		border-radius: 10px;
		padding: 1.5rem;
	}

	.testimonial-card__avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: rgb(240, 93, 87);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Oswald', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.testimonial-card__name {
		font-family: 'Rubik', sans-serif;
		font-size: 1.1rem;
		font-weight: 600;
		color: rgb(240, 93, 87);
		margin: 0 0 0.25rem;
	}

	.testimonial-card__role {
		font-family: 'Fragment Mono', monospace;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: rgb(110, 110, 110);
		margin: 0 0 0.75rem;
	}

	.testimonial-card__quote {
		font-family: 'Rubik', sans-serif;
		font-size: 13px;
		line-height: 1.65;
		color: rgb(110, 110, 110);
		margin: 0;
		font-style: normal;
	}

	@media (max-width: 1199px) {
		.testimonials-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 809px) {
		.testimonials-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ─── Feature story (Meet Jia Chen) ───────────────────── */
	.showcase-feature {
		padding: 3rem 0;
		background: #f5f5f5;
	}

	.showcase-feature__inner {
		display: flex;
		gap: 3rem;
		align-items: flex-start;
	}

	.showcase-feature__media {
		flex: 0 0 40%;
	}

	.showcase-feature__media img {
		width: 100%;
		height: auto;
		border-radius: 12px;
		display: block;
	}

	.showcase-feature__content {
		flex: 1;
	}

	.showcase-feature__heading {
		font-family: 'Oswald', sans-serif;
		font-size: 1.8rem;
		font-weight: 500;
		color: rgb(23, 23, 23);
		margin: 0 0 0.5rem;
	}

	.showcase-feature__subtitle {
		font-family: 'Fragment Mono', monospace;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: rgb(240, 93, 87);
		margin: 0 0 1.25rem;
	}

	.showcase-feature__text {
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		line-height: 1.7;
		color: rgb(51, 51, 51);
		margin: 0 0 0.75rem;
	}

	.showcase-feature__apple {
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		line-height: 1.7;
		color: rgb(51, 51, 51);
		margin: 1rem 0 0;
	}

	.showcase-feature__apple a {
		color: rgb(240, 93, 87);
		text-decoration: none;
	}

	.showcase-feature__apple a:hover {
		text-decoration: underline;
	}

	@media (max-width: 809px) {
		.showcase-feature__inner {
			flex-direction: column;
		}

		.showcase-feature__media {
			flex: none;
			width: 100%;
		}
	}

	/* ─── Build Log CTA ───────────────────────────────────── */
	.showcase-buildlog {
		position: relative;
		min-height: 320px;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.showcase-buildlog__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.showcase-buildlog__overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.showcase-buildlog__text {
		position: relative;
		z-index: 1;
		text-align: center;
		padding-top: 3rem;
		padding-bottom: 3rem;
		width: 100%;
	}

	.showcase-buildlog__heading {
		font-family: 'Oswald', sans-serif;
		font-size: clamp(1.3rem, 2.5vw, 1.8rem);
		font-weight: 500;
		color: #fff;
		margin: 0 0 0.75rem;
	}

	.showcase-buildlog__subtitle {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.85);
		margin: 0 auto 1.5rem;
		max-width: 600px;
	}

	.showcase-buildlog__btn {
		display: inline-flex;
		align-items: center;
		padding: 10px 28px;
		border-radius: 30px;
		background: #fff;
		color: rgb(240, 93, 87);
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		transition: opacity 0.15s;
	}

	.showcase-buildlog__btn:hover {
		opacity: 0.85;
	}

	@media (max-width: 809px) {
		.showcase-hero {
			min-height: 280px;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/contact-us.astro
```astro
---
/**
 * /contact-us — rebuilt to match the live Framer site.
 *
 * Layout: Two-column — JotForm embed (left) + Find Us (right).
 * Find Us contains: Address + Google Maps, Directions with images, Parking with image.
 */
import CtaBanner from '../components/CtaBanner.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getStaticPage } from '../lib/data.js';

const page = getStaticPage('/contact-us');
if (!page) return Astro.redirect('/404');

const canonical = new URL('/contact-us', 'https://tinkercademy.com').toString();
---

<BaseLayout
	title={page.seo?.title ?? 'Contact Us — Tinkercademy'}
	description={page.seo?.description ?? page.description ?? ''}
	canonical={canonical}
	image={page.hero_image ?? undefined}
>
	<section class="contact">
		<div class="shell contact__inner">
			{/* ── Left: JotForm embed ── */}
			<div class="contact__form">
				<h1 class="contact__title">Get in touch</h1>
				<iframe
					class="contact__jotform"
					src="https://form.jotform.com/223001013827440"
					title="Contact Form"
					loading="lazy"
					allow="geolocation; microphone; camera"
					allowfullscreen
				></iframe>
			</div>

			{/* ── Right: Find Us ── */}
			<div class="contact__find">
				<h2 class="contact__find-title">Find Us</h2>

				{/* Address */}
				<div class="contact-card">
					<h3 class="contact-card__heading">Address</h3>
					<p class="contact-card__text">59 Jalan Pemimpin #04-01, L&Y Building, Singapore 577218</p>
					<p class="contact-card__text"><strong>Weekdays:</strong> 10 am – 5.30 pm</p>
					<p class="contact-card__text"><strong>Weekends:</strong> 10 am – 1 pm</p>
					<p class="contact-card__text">
						<a href="mailto:hello@tk.sg">hello@tk.sg</a> ·
						<a href="tel:+6569176920">6917 6920</a>
					</p>
				</div>

				{/* Google Maps */}
				<div class="contact-map">
					<iframe
						class="contact-map__iframe"
						src="https://maps.google.com/maps?q=Tinkercademy&z=15&output=embed"
						title="Tinkercademy on Google Maps"
						loading="lazy"
						allowfullscreen
					></iframe>
				</div>

				{/* Directions */}
				<div class="contact-card contact-card--round">
					<h3 class="contact-card__heading">Directions</h3>
					<p class="contact-card__text"><strong>Nearest MRT:</strong> Marymount</p>
					<p class="contact-card__text"><strong>By Bus:</strong> From Bishan MRT and Bus Stop 53239 (Bus 13, 50, 52, 54, 55, 55B, 58, 71, 88, 156). From Bus Stop 53131 (Bus 54, 74, 851, 852).</p>
					<p class="contact-card__text">Once you reach the L&Y Building, go around the building to find the entrance. Take the lift to the 4th floor and turn right. You made it!</p>
					<div class="contact-card__images">
						<img src="/images/remote/ruSDPHaMjLP5DCdMnqVrqSp0Fs.png" alt="Entrance directions" loading="lazy" />
						<img src="/images/remote/b0uc8kk9c3m8176vXRgsJwEWk.png" alt="Building entrance" loading="lazy" />
					</div>
				</div>

				{/* Parking */}
				<div class="contact-card contact-card--round">
					<h3 class="contact-card__heading">Parking</h3>
					<p class="contact-card__text">The car park is accessible from the front entrance, beside Jackie's yellow and blue building.</p>
					<div class="contact-card__rates">
						<p class="contact-card__text"><strong>Mon – Sat</strong></p>
						<p class="contact-card__text">8 am – 6 pm: $1.20 per hour or part thereof</p>
						<p class="contact-card__text">6 pm – 8 am: $2.00 per entry</p>
						<p class="contact-card__text"><strong>Sunday &amp; Public Holidays</strong></p>
						<p class="contact-card__text">$2.00 per entry</p>
					</div>
					<div class="contact-card__images">
						<img src="/images/remote/GcgNecJtTyHUa4L23kutskeQQ.png" alt="Parking area" loading="lazy" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<CtaBanner />
</BaseLayout>

<style>
	.contact {
		padding: 3rem 0;
	}

	.contact__inner {
		display: flex;
		gap: 2.5rem;
		align-items: flex-start;
	}

	.contact__title {
		font-family: 'Oswald', sans-serif;
		font-size: clamp(1.8rem, 3.5vw, 2.8rem);
		font-weight: 500;
		color: rgb(23, 23, 23);
		margin: 0 0 1.5rem;
	}

	/* ── Left column: Form ─────────────────────────────────── */
	.contact__form {
		flex: 0 0 auto;
		width: 50%;
		max-width: 764px;
	}

	.contact__jotform {
		width: 100%;
		height: 1170px;
		border: none;
		border-radius: 8px;
	}

	/* ── Right column: Find Us ─────────────────────────────── */
	.contact__find {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.contact__find-title {
		font-family: 'Oswald', sans-serif;
		font-size: 1.8rem;
		font-weight: 500;
		color: rgb(23, 23, 23);
		margin: 0;
	}

	/* ── Cards ─────────────────────────────────────────────── */
	.contact-card {
		background: #fafafa;
		border: 1px solid #e3e3e3;
		border-radius: 8px;
		padding: 1.5rem;
	}

	.contact-card--round {
		border-radius: 20px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
	}

	.contact-card__heading {
		font-family: 'Oswald', sans-serif;
		font-size: 1.2rem;
		font-weight: 500;
		color: rgb(240, 93, 87);
		margin: 0 0 0.75rem;
	}

	.contact-card__text {
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		line-height: 1.7;
		color: rgb(51, 51, 51);
		margin: 0 0 0.4rem;
	}

	.contact-card__text a {
		color: rgb(240, 93, 87);
		text-decoration: none;
	}

	.contact-card__text a:hover {
		text-decoration: underline;
	}

	.contact-card__images {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-card__images img {
		width: 100%;
		border-radius: 12px;
		height: auto;
	}

	.contact-card__rates {
		margin-top: 0.75rem;
	}

	/* ── Google Maps ───────────────────────────────────────── */
	.contact-map {
		border-radius: 12px;
		overflow: hidden;
	}

	.contact-map__iframe {
		width: 100%;
		height: 300px;
		border: none;
	}

	/* ── Responsive ────────────────────────────────────────── */
	@media (max-width: 1199px) {
		.contact__inner {
			flex-direction: column;
		}

		.contact__form {
			width: 100%;
		}

		.contact__jotform {
			height: 1000px;
		}
	}

	@media (max-width: 809px) {
		.contact__jotform {
			height: 900px;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/ContentBlocks.astro
```astro
---
/**
 * ContentBlocks — renders an array of content blocks (headings, paragraphs,
 * lists, images, and richtext HTML).
 *
 * This component merges the capabilities of the old ContentBlocks (h/p/list)
 * with image and richtext support.
 */
type Block = {
	type: string;
	text?: string;
	items?: string[];
	html?: string;
	label?: string | null;
	src?: string;
	alt?: string;
	width?: number | null;
	height?: number | null;
};

const props = Astro.props as { blocks?: Block[] };
const blocks = props.blocks ?? [];

/* Coalesce consecutive li blocks into a single list group */
const groups: Block[] = [];
let currentList: string[] = [];

for (const block of blocks) {
	if (block.type === 'list') {
		groups.push(block);
		continue;
	}

	if (block.type === 'li') {
		if (block.text) currentList.push(block.text);
		continue;
	}

	if (currentList.length > 0) {
		groups.push({ type: 'list', items: currentList });
		currentList = [];
	}

	groups.push(block);
}

if (currentList.length > 0) {
	groups.push({ type: 'list', items: currentList });
}
---

<section class="shell prose content-blocks">
	{groups.map((block: Block) => {
		/* ── Images ─────────────────────────────── */
		if (block.type === 'image' && block.src) {
			return (
				<figure class="content-image">
					<img
						src={block.src}
						alt={block.alt ?? ''}
						loading="lazy"
						width={block.width ?? undefined}
						height={block.height ?? undefined}
					/>
				</figure>
			);
		}

		/* ── Richtext HTML ─────────────────────── */
		if (block.type === 'richtext' && block.html) {
			return (
				<div class="rich-section">
					{block.label ? <p class="section-label">{block.label}</p> : null}
					<div set:html={block.html} />
				</div>
			);
		}

		/* ── Lists ─────────────────────────────── */
		if (block.type === 'list' && block.items) {
			return (
				<ul>
					{block.items.map((item: string) => <li>{item}</li>)}
				</ul>
			);
		}

		/* ── Headings ─────────────────────────── */
		const text = block.text ?? '';
		if (block.type === 'h1') return <h1>{text}</h1>;
		if (block.type === 'h2') return <h2>{text}</h2>;
		if (block.type === 'h3') return <h3>{text}</h3>;
		if (block.type === 'h4') return <h4>{text}</h4>;

		/* ── Default: paragraph ───────────────── */
		return <p>{text}</p>;
	})}
</section>

<style>
	.content-image {
		margin: 1.5rem 0;
	}

	.content-image img {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		display: block;
	}

	.rich-section {
		margin: 1rem 0;
	}

	.section-label {
		font-family: 'Fragment Mono', monospace;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6e6e6e;
		margin-bottom: 0.25rem;
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/infocomm-club.astro
```astro
---
/**
 * /infocomm-club — Infocomm Club courses for MOE schools.
 * Uses Inter font throughout to match live Framer page.
 */
import CtaBanner from '../components/CtaBanner.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getStaticPage } from '../lib/data.js';

const page = getStaticPage('/infocomm-club');
if (!page) return Astro.redirect('/404');

const canonical = new URL('/infocomm-club', 'https://tinkercademy.com').toString();

/* ─── Course card data (hardcoded to match live site exactly) ──── */
const appleCourses = [
	{
		title: 'App Development - Prototype',
		description: "Apply Apple's design principles and create beautiful prototypes using Keynote.",
		image: '/images/remote/Tbd2iDiGCy90PETNYs9UPYft3fs.png',
	},
	{
		title: 'App Development - Basic',
		description: 'Learn Swift & SwiftUI on iPad and build real apps, explore UI design, navigation, and more!',
		image: '/images/remote/BmGg73kIJD1MxxJB5bTRT7iSZn8.png',
	},
	{
		title: 'App Development - Exploration',
		description: 'Dive deep into AR, ML, and cutting-edge tech to build next-gen apps!',
		image: '/images/remote/cqnxe0aFRed2z9pPOVAT1OYUDQ.png',
	},
];

const figmaCourse = {
	title: 'UI/UX Design',
	description: 'Learn design thinking and UI/UX tools. Create interactive prototypes! No coding experience needed!',
	image: '/images/remote/Z7BJ3azplvkMs5Ng0yeGKgpE.jpg',
	link: '/programmes/imda-figma-2025',
};

const registrationLinks = [
	{
		full: 'Registration for MOE Primary Schools',
		short: 'Registration for MOE Pri Schools',
		url: 'https://form.gov.sg/6704f86a5c3070b1b3c9c1b2',
	},
	{
		full: 'Registration for MOE Secondary Schools / Junior College',
		short: 'Registration for MOE Sec Schools / JC',
		url: 'https://form.gov.sg/6704f97536fa07f9b3e3a283',
	},
];
---

<BaseLayout
	title={page.seo?.title ?? 'Infocomm Club Courses'}
	description={page.seo?.description ?? page.description ?? ''}
	canonical={canonical}
	image={page.hero_image ?? undefined}
>
	{/* ═══════ Hero / Header ════════════════════════════════════════════ */}
	<section class="ic-hero">
		<div class="ic-hero__inner">
			<h1 class="ic-hero__title">Infocomm Club Courses</h1>
			<img
				class="ic-hero__image"
				src="/images/remote/HcdNlviMb6etFvqiKcJkxSLAtHQ.jpeg"
				alt="Infocomm Club Courses"
				loading="eager"
			/>
			<p class="ic-hero__subtitle">
				We've created training courses designed specifically for Infocomm Club students.
				These courses are held during CCA hours at MOE schools. They help build fundamental
				skills in topics across tech and media domains such as App Design, Development, UI/UX.
				Each MOE school receives support for up to two classes annually, where{' '}
				<a href="https://www.imda.gov.sg/how-we-can-help/infocomm-media-clubs/learn-roadmaps" target="_blank" rel="noopener noreferrer">
					the training cost is fully funded by IMDA.
				</a>{' '}
				To find out more, speak to us at{' '}
				<a href="mailto:hello@tinkercademy.com" target="_blank" rel="noopener noreferrer">
					hello@tinkercademy.com. 🙋🏻‍♀️
				</a>
			</p>
		</div>
	</section>

	{/* ═══════ Logos row ════════════════════════════════════════════════ */}
	<section class="ic-logos">
		<div class="ic-logos__row">
			<img src="/images/remote/zoEuPfoFyUypOVJmnUfxZgZgcc.png" alt="Apple" class="ic-logos__logo ic-logos__logo--apple" />
			<img src="/images/remote/Zg926MlOSHqoFw57CYanmzmIY.svg" alt="Figma" class="ic-logos__logo ic-logos__logo--figma" />
			<img src="/images/remote/XzY3fFO6arK8Ng7Ti9ArzsM1TDs.webp" alt="IMDA" class="ic-logos__logo ic-logos__logo--imda" />
		</div>
	</section>

	{/* ═══════ Apple: App Development ═══════════════════════════════════ */}
	<section class="ic-category">
		<div class="ic-category__inner">
			<h2 class="ic-category__heading">Apple: App Development</h2>
			<div class="ic-cards-grid ic-cards-grid--three">
				{appleCourses.map((course) => (
					<div class="ic-card">
						<div class="ic-card__image-wrap">
							<img src={course.image} alt={course.title} class="ic-card__image" loading="lazy" />
						</div>
						<div class="ic-card__body">
							<h3 class="ic-card__title">{course.title}</h3>
							<p class="ic-card__desc">{course.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>

	{/* ═══════ Figma: UI/UX Design ═════════════════════════════════════ */}
	<section class="ic-category">
		<div class="ic-category__inner">
			<h2 class="ic-category__heading">Figma: UI/UX Design</h2>
			<div class="ic-cards-grid ic-cards-grid--one">
				<div class="ic-card">
					<div class="ic-card__image-wrap">
						<img src={figmaCourse.image} alt={figmaCourse.title} class="ic-card__image" loading="lazy" />
					</div>
					<div class="ic-card__body">
						<h3 class="ic-card__title">{figmaCourse.title}</h3>
						<p class="ic-card__desc">{figmaCourse.description}</p>
						<a class="ic-card__read-more" href={figmaCourse.link}>READ MORE</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	{/* ═══════ Sign up today! ═══════════════════════════════════════════ */}
	<section class="ic-signup">
		<div class="ic-signup__inner">
			<h2 class="ic-signup__heading">Sign up today!</h2>
			<div class="ic-signup__buttons">
				{registrationLinks.map((link) => (
					<a class="ic-signup__btn" href={link.url} target="_blank" rel="noopener noreferrer">
						<span class="ic-signup__btn-full">{link.full}</span>
						<span class="ic-signup__btn-short">{link.short}</span>
					</a>
				))}
			</div>
		</div>
	</section>

	<CtaBanner />
</BaseLayout>

<style>
	/* ─── Hero / Header ──────────────────────────────────── */
	.ic-hero {
		padding: 100px 0 0;
		background: #fff;
	}

	.ic-hero__inner {
		max-width: 1160px;
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 2vw, 1.5rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.ic-hero__title {
		font-family: 'Inter', sans-serif;
		font-weight: 700;
		font-size: 72px;
		color: #171717;
		margin: 0 0 32px;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.ic-hero__image {
		width: 100%;
		max-width: 1080px;
		border-radius: 20px;
		margin-bottom: 32px;
		object-fit: cover;
	}

	.ic-hero__subtitle {
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		font-size: 24px;
		line-height: 1.6;
		color: #6e6e6e;
		margin: 0;
		max-width: 900px;
		text-align: center;
	}

	.ic-hero__subtitle a {
		color: #6e6e6e;
		text-decoration: underline;
		text-decoration-color: rgba(110, 110, 110, 0.4);
		text-underline-offset: 2px;
	}

	.ic-hero__subtitle a:hover {
		color: #171717;
		text-decoration-color: #171717;
	}

	@media (max-width: 1199px) {
		.ic-hero__title {
			font-size: 66px;
		}
	}

	@media (max-width: 809px) {
		.ic-hero {
			padding-top: 80px;
		}

		.ic-hero__title {
			font-size: 42px;
		}

		.ic-hero__subtitle {
			font-size: 18px;
		}
	}

	/* ─── Logos row ───────────────────────────────────────── */
	.ic-logos {
		padding: 48px 0;
	}

	.ic-logos__row {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 48px;
	}

	.ic-logos__logo--apple {
		height: 40px;
		width: auto;
	}

	.ic-logos__logo--figma {
		height: 36px;
		width: auto;
	}

	.ic-logos__logo--imda {
		height: 36px;
		width: auto;
	}

	@media (max-width: 809px) {
		.ic-logos__row {
			gap: 32px;
		}

		.ic-logos__logo--apple {
			height: 30px;
		}

		.ic-logos__logo--figma,
		.ic-logos__logo--imda {
			height: 28px;
		}
	}

	/* ─── Course categories ──────────────────────────────── */
	.ic-category {
		padding: 24px 0;
	}

	.ic-category__inner {
		max-width: 1160px;
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 2vw, 1.5rem);
	}

	.ic-category__heading {
		font-family: 'Inter', sans-serif;
		font-weight: 700;
		font-size: 50px;
		color: #171717;
		margin: 0 0 32px;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	/* ─── Course cards ───────────────────────────────────── */
	.ic-cards-grid {
		display: grid;
		gap: 24px;
	}

	.ic-cards-grid--three {
		grid-template-columns: repeat(3, 1fr);
	}

	.ic-cards-grid--one {
		grid-template-columns: minmax(0, 380px);
	}

	.ic-card {
		background: #fff;
		border-radius: 16px;
		overflow: hidden;
		box-shadow:
			0 0.796192px 2.38858px -0.625px rgba(0, 0, 0, 0.05),
			0 2.41451px 7.24352px -1.25px rgba(0, 0, 0, 0.05),
			0 6.38265px 19.148px -1.875px rgba(0, 0, 0, 0.05),
			0 20px 60px -2.5px rgba(0, 0, 0, 0.05);
	}

	.ic-card__image-wrap {
		aspect-ratio: 1.33;
		overflow: hidden;
	}

	.ic-card__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.ic-card__body {
		padding: 20px 24px 24px;
	}

	.ic-card__title {
		font-family: 'Inter', sans-serif;
		font-weight: 600;
		font-size: 23px;
		color: #171717;
		margin: 0 0 8px;
		line-height: 1.3;
	}

	.ic-card__desc {
		font-family: 'Inter', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 1.6;
		color: #6e6e6e;
		margin: 0;
	}

	.ic-card__read-more {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-top: 16px;
		padding: 10px 24px;
		border-radius: 30px;
		background-color: #f05d57;
		color: #fff;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: opacity 0.15s;
	}

	.ic-card__read-more:hover {
		opacity: 0.85;
	}

	@media (max-width: 1199px) {
		.ic-category__heading {
			font-size: 40px;
		}

		.ic-cards-grid--three {
			grid-template-columns: 1fr;
			max-width: 420px;
		}
	}

	@media (max-width: 809px) {
		.ic-category__heading {
			font-size: 33px;
		}

		.ic-card__title {
			font-size: 20px;
		}
	}

	/* ─── Sign up section ────────────────────────────────── */
	.ic-signup {
		padding: 48px 0;
	}

	.ic-signup__inner {
		max-width: 1160px;
		margin: 0 auto;
		padding: 60px clamp(1.5rem, 4vw, 3rem);
		border-radius: 16px;
		background: conic-gradient(from 179deg at -18.8% -75.4%, #fff 0deg, #f05d57 360deg);
		text-align: center;
	}

	.ic-signup__heading {
		font-family: 'Inter', sans-serif;
		font-weight: 700;
		font-size: 50px;
		color: #fff;
		margin: 0 0 32px;
		line-height: 1.15;
	}

	.ic-signup__buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 16px;
	}

	.ic-signup__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 14px 28px;
		border-radius: 30px;
		background: #fff;
		color: #171717;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.ic-signup__btn:hover {
		transform: translateY(-1px);
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
	}

	.ic-signup__btn-short {
		display: none;
	}

	@media (max-width: 1199px) {
		.ic-signup__heading {
			font-size: 40px;
		}
	}

	@media (max-width: 809px) {
		.ic-signup__heading {
			font-size: 32px;
		}

		.ic-signup__btn {
			font-size: 14px;
			padding: 12px 24px;
		}

		.ic-signup__btn-full {
			display: none;
		}

		.ic-signup__btn-short {
			display: inline;
		}

		.ic-signup__buttons {
			flex-direction: column;
			align-items: center;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/team.yaml
```yaml
# Team member data for /about-us
# Each entry: name, role, bio, photo (local path), linkedin (optional)

- name: YJ
  role: Master Trainer
  bio: >-
    Stanford CS graduate, YJ, trusted by tech giants like Apple and Microsoft,
    spearheads our corporate training programs with unparalleled expertise.
  photo: /images/remote/AqPpSJgQGTw0QlTgYktxZ2909EY.jpg
  linkedin: https://www.linkedin.com/in/yjsoon/

- name: Mike
  role: Master Trainer
  bio: >-
    Wharton MBA turned Master Trainer. Mike distils complex topics into clear
    actionable takeaways for diverse audiences.
  photo: /images/remote/Fjwf5hoaQJqS78UgKSyygmVp8.jpg
  linkedin: https://www.linkedin.com/in/mikejgonsalves/

- name: Akmal
  role: Master Trainer
  bio: >-
    Your friendly tech guru! Cornell grad (CS & EE) with government consulting
    experience.
  photo: /images/remote/fwt97yqa7UmP7Bnf9lKxyyjs04.jpg
  linkedin: https://www.linkedin.com/in/akmalabdulrahman/

- name: Yixue
  role: Associate Trainer
  bio: >-
    Lucasfilm alum with 15+ years in media brings real-world expertise to your
    tinkering journey.
  photo: /images/remote/qt0RAp6385PEY4yTE91U9Wfgsc.jpg

- name: Win
  role: Associate Trainer
  bio: >-
    MBA in Automation & Control (NUS). Makes learning tech fun and
    collaborative.
  photo: /images/remote/VezqXkvlxhe4VX9Psme2iC8iRs.jpg

- name: Ben
  role: Lead Trainer
  bio: >-
    With 15 years of diverse experience spanning tech, finance, and education,
    Ben makes learning accessible to all, blending real-world insights with
    engaging instruction.
  photo: /images/remote/Pu1dBwUoLq1avwW9evSZnAQ.jpg
  linkedin: https://www.linkedin.com/in/keesweepengbenjamin/

- name: Tracey
  role: Lead Trainer
  bio: >-
    Santa Clara University graduate with over 15 years of experience in coding
    and education. Enlists engaging coding instruction to bring robots to life.
  photo: /images/remote/KwvTjh335J5P5Xa3PT4fE1gt49w.jpg
  linkedin: https://www.linkedin.com/in/tracey-the-tinkerer/

- name: Steven
  role: Lead Trainer
  bio: >-
    MIT alum and tech guru, Steven sets you on a transformative tech path with
    his profound knowledge and innovative insights.
  photo: /images/remote/DxeGLZ3Spx3PET8teOKVbLvrg.jpg
  linkedin: https://www.linkedin.com/in/stevencjchan/

- name: Grace
  role: Education Marketing
  bio: >-
    NTU alum and ex-Apple employee, Grace leads impactful campaigns to empower
    learning through technology.
  photo: /images/remote/a30diESkHyoGIgdzYg4dQoU5vHA.jpg
  linkedin: https://www.linkedin.com/in/graceyan808/

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/lib/links.js
```js
const SITE_ORIGIN = 'https://tinkercademy.com';

export function toSiteHref(href) {
	if (!href) return '/';
	if (href.startsWith('#')) return href;

	try {
		const url = new URL(href, SITE_ORIGIN);
		if (url.origin !== SITE_ORIGIN) return href;

		const path = `${url.pathname}${url.search}${url.hash}`;
		return path || '/';
	} catch {
		return href;
	}
}

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/README.md
```md
# tinkercademy.com

Astro rebuild of the live `tinkercademy.com` Framer site. The workflow is crawl-first:

1. Crawl the public site and save raw artefacts under `scripts/_artifacts/`.
2. Normalise the crawl into CRM-like YAML/JSON under `src/data/`.
3. Render Astro routes from those structured files instead of mirroring Framer DOM.

## Commands

- `npm run import:live` crawls the public site and regenerates the structured data files.
- `npm run dev` starts the Astro dev server.
- `npm run build` builds the site.
- `npm run check` runs `astro check`.

## Data model

CRM-like files live under `src/data/crm/`:

- `programmes.yml`
- `tutorials.yml`
- `audiences.yml`
- `topics.yml`
- `contacts.yml`
- `locations.yml`
- `social-links.yml`
- `cta-destinations.yml`
- `forms.yml`
- `site-settings.yml`

Static page payloads and asset inventories live under `src/data/pages/`.

The imported home page payload now carries explicit landing-page fields such as hero copy, focus areas, flagship cards, and featured course ordering so the Astro front end does not have to infer those from raw Framer blocks at render time.

## Notes

- `scripts/_artifacts/` is generated and ignored.
- The current implementation keeps remote image URLs from Framer while the migration is still in progress.
- `src/lib/site-media.js` maps the current live homepage brand, partner, badge, and compact course imagery used for the higher-fidelity front-page rebuild.
- Tutorial pages are rendered as grouped story sections from the imported Framer handover sequence rather than a flat HTML dump.
- Visual parity checks should be run against both the live site and the local Astro build after each substantial import/render pass.

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/SiteFooter.astro
```astro
---
import { LOGO_WHITE } from '../lib/site-media.js';

type Contact = { label: string; channel_type: string; value: string };
type Location = { address: string };
type SocialLink = { id?: string; platform?: string; label: string; url: string };

const props = Astro.props as {
	contacts?: Contact[];
	locations?: Location[];
	socialLinks?: SocialLink[];
};
const contacts = props.contacts ?? [];
const locations = props.locations ?? [];
const socialLinks = props.socialLinks ?? [];

const email = contacts.find((c) => c.channel_type === 'email')?.value ?? 'hello@tk.sg';
const phone = contacts.find((c) => c.channel_type === 'phone')?.value ?? '6917 6920';
const phoneDisplay = phone.replace(/\D/g, '').replace(/^(\d{4})(\d{4})$/, '$1 $2');
const address = locations[0]?.address ?? '59 Jalan Pemimpin #04-01, L&Y Building, Singapore 577218';

const SOCIAL_ICONS: Record<string, string> = {
	'x': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
	'facebook': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
	'instagram': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
	'linkedin': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
	'github': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
	'blog': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15H3V6h18v13zM4 9h5v6H4z"/></svg>`,
	'medium': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
	'email': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
};

function getSocialIcon(link: { id?: string; platform?: string; label: string }): string {
	const platform = (link.platform ?? link.id ?? '').toLowerCase();
	return SOCIAL_ICONS[platform] ?? SOCIAL_ICONS['email'];
}
---

<footer class="site-footer">
	<div class="shell footer-columns">
		<!-- Column 1: Brand -->
		<div class="footer-col footer-col--brand">
			<a href="/" class="footer-logo-link">
				<img src={LOGO_WHITE} alt="Tinkercademy" class="footer-logo" />
			</a>
			<p class="footer-body">
				Tinkercademy is the education brand of
				<a href="http://tinkertanker.com/" class="footer-link">Tinkertanker Pte Ltd</a>,
				based in Singapore.
			</p>
		</div>

		<!-- Column 2: Mailing List -->
		<div class="footer-col">
			<h3 class="footer-heading">Sign up for our mailing list!</h3>
			<p class="footer-body">
				Teachers will receive a monthly (or so we hope) email with news & thoughts on
				tech education; free workshops, resources, and competitions for students; and other
				newsworthy messages.
			</p>
			<p class="footer-body">
				For students and professionals, we'll send information about free learning
				resources we publish, and occasionally ask you to check out our new courses and
				offerings.
			</p>
			<a class="footer-cta" href="https://form.jotform.com/223001013827440">Sign Up</a>
		</div>

		<!-- Column 3: Our Brands -->
		<div class="footer-col">
			<h3 class="footer-heading">Our Brands</h3>
			<p class="footer-body">
				Looking for educational toys and kits? That's our
				<a href="https://gethacking.com/" class="footer-link">Get Hacking Store</a>,
				run by our subsidiary
				<a href="https://tinkerclass.tech" class="footer-link">Tinker Class Pte Ltd</a>.
			</p>
			<p class="footer-body">
				We're a proud investor in, and collaborator with,
				<a href="https://tinkermind.sg" class="footer-link">Tinkermind</a>,
				a maker-centric tech education company, because we like their name.
			</p>
		</div>

		<!-- Column 4: Contact -->
		<div class="footer-col">
			<h3 class="footer-heading">Get in touch!</h3>
			<p class="footer-body footer-address">{address}</p>
			<p class="footer-body">
				<a href={`mailto:${email}`} class="footer-link">{email}</a>
			</p>
			<p class="footer-body">
				<a href={`tel:${phone}`} class="footer-link">{phoneDisplay}</a>
			</p>
			<a class="footer-cta" href="/contact-us">Contact Us</a>
		</div>
	</div>

	<!-- Bottom bar -->
	<div class="shell footer-bottom">
		<div class="footer-bottom__left">
			<span>&copy; 2026 Tinkertanker Pte Ltd.</span>
			<span class="footer-bottom__tagline">Teaching and coding in Singapore since 2006!</span>
		</div>
		<div class="footer-bottom__social">
			{socialLinks.map((link) => (
				<a href={link.url} aria-label={link.label} class="social-icon" set:html={getSocialIcon(link)} />
			))}
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background: rgb(51, 51, 51);
		color: #ffffff;
		padding: 3rem 0 2rem;
	}

	.footer-columns {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}

	.footer-logo {
		height: 22px;
		width: auto;
		opacity: 0.9;
	}

	.footer-logo-link {
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.footer-heading {
		margin: 0 0 0.75rem;
		font-family: 'Rubik', sans-serif;
		font-size: 0.95rem;
		font-weight: 500;
		color: #ffffff;
	}

	.footer-body {
		margin: 0 0 0.75rem;
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.7);
	}

	.footer-link {
		color: rgb(0, 153, 255);
		text-decoration: none;
	}

	.footer-link:hover {
		text-decoration: underline;
	}

	.footer-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.55rem 1.1rem;
		border-radius: 30px;
		background: rgb(240, 93, 87);
		color: #ffffff;
		text-decoration: none;
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		font-weight: 500;
		margin-top: 0.25rem;
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
	}

	.footer-bottom__left {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		font-family: 'Rubik', sans-serif;
		font-size: 0.78rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.footer-bottom__tagline {
		font-style: italic;
	}

	.footer-bottom__social {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.social-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.5);
		transition: color 0.15s;
	}

	.social-icon:hover {
		color: rgb(240, 93, 87);
	}

	@media (max-width: 1199px) {
		.footer-columns {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 809px) {
		.footer-columns {
			grid-template-columns: 1fr;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/package.json
```json
{
  "name": "tinkercademy.com",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "crawl:site": "node scripts/crawl-site.mjs",
    "build:crm": "node scripts/build-crm-data.mjs",
    "import:live": "npm run crawl:site && npm run build:crm",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^6.1.5",
    "cheerio": "^1.2.0",
    "yaml": "^2.8.3"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.8",
    "@types/node": "^25.6.0",
    "typescript": "^5.9.3"
  }
}

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/site-settings.json
```json
{
  "site_name": "Tinkercademy",
  "base_url": "https://tinkercademy.com",
  "default_seo": {
    "title": "Tinkercademy: Coding and Making for Schools and Professionals",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "canonical": "https://tinkercademy.com/",
    "openGraph": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "image": null
    },
    "twitter": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "image": null
    },
    "robots": "max-image-preview:large"
  },
  "breakpoints": [
    {
      "hash": "i8hhhf",
      "mediaQuery": "(min-width: 1600px)"
    },
    {
      "hash": "kdtqod",
      "mediaQuery": "(min-width: 1200px) and (max-width: 1599.98px)"
    },
    {
      "hash": "okv3ti",
      "mediaQuery": "(min-width: 810px) and (max-width: 1199.98px)"
    },
    {
      "hash": "o1myt0",
      "mediaQuery": "(max-width: 809.98px)"
    }
  ],
  "navigation": [
    {
      "label": "ABOUT US",
      "href": "https://tinkercademy.com/about-us"
    },
    {
      "label": "SHOWCASE",
      "href": "https://tinkercademy.com/showcase"
    },
    {
      "label": "STORE",
      "href": "https://gethacking.com/"
    },
    {
      "label": "CONTACT US",
      "href": "https://tinkercademy.com/contact-us"
    }
  ],
  "contact_ids": [
    "email-hello-tk-sg",
    "phone-69176920",
    "email-hello-tinkercademy-com",
    "email-imda-codesg-imda-gov-sg",
    "email-hello-tinkerclass-tech",
    "email-yjsoon-tk-sg"
  ],
  "location_ids": [
    "jalan-pemimpin-office"
  ],
  "social_link_ids": [
    "x",
    "facebook",
    "instagram",
    "linkedin",
    "github",
    "blog",
    "medium"
  ]
}
```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/contacts.yml
```yml
- id: email-hello-tk-sg
  label: Email
  channel_type: email
  value: hello@tk.sg
- id: phone-69176920
  label: Phone
  channel_type: phone
  value: "69176920"
- id: email-hello-tinkercademy-com
  label: Email
  channel_type: email
  value: hello@tinkercademy.com
- id: email-imda-codesg-imda-gov-sg
  label: Email
  channel_type: email
  value: imda_codesg@imda.gov.sg
- id: email-hello-tinkerclass-tech
  label: Email
  channel_type: email
  value: hello@tinkerclass.tech
- id: email-yjsoon-tk-sg
  label: Email
  channel_type: email
  value: yjsoon@tk.sg

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/SiteHeader.astro
```astro
---
import { toSiteHref } from '../lib/links.js';
import { LOGO_BLACK } from '../lib/site-media.js';

type NavLink = { label: string; href: string; hasDropdown?: boolean };

const props = Astro.props as { navigation?: NavLink[] };
const rawNav = props.navigation ?? [];

/* Inject "COURSES" as first nav item with a dropdown chevron if not already present */
const coursesItem: NavLink = { label: 'COURSES', href: '/courses-all', hasDropdown: true };
const navigation: NavLink[] = rawNav.some((n) => n.label.toUpperCase() === 'COURSES')
	? rawNav
	: [coursesItem, ...rawNav];

/* Dropdown sub-links for COURSES */
const coursesDropdown = [
	{ label: 'All Courses', href: '/courses-all' },
	{ label: 'For Schools', href: '/courses-schools' },
	{ label: 'For Professionals', href: '/courses-professionals' },
];
---

<header class="site-header">
	<div class="shell header-inner">
		<a class="brand" href="/">
			<img src={LOGO_BLACK} alt="Tinkercademy" class="brand__logo" />
		</a>

		<nav class="nav-desktop" aria-label="Primary">
			<ul>
				{navigation.map((link) => (
					<li class={link.hasDropdown ? 'has-dropdown' : ''}>
						<a href={toSiteHref(link.href)}>
							{link.label}
							{link.hasDropdown && (
								<svg class="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
									<path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							)}
						</a>
						{link.hasDropdown && (
							<ul class="dropdown">
								{coursesDropdown.map((sub) => (
									<li><a href={sub.href}>{sub.label}</a></li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</nav>

		<button class="nav-search" aria-label="Search">
			<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor">
				<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
			</svg>
		</button>

		<button class="nav-toggle" aria-label="Open menu" aria-expanded="false">
			<span class="nav-toggle__bar"></span>
			<span class="nav-toggle__bar"></span>
			<span class="nav-toggle__bar"></span>
		</button>
	</div>

	<nav class="nav-mobile" aria-label="Primary mobile" hidden>
		<ul>
			{navigation.map((link) => (
				<li class={link.hasDropdown ? 'has-dropdown-mobile' : ''}>
					{link.hasDropdown ? (
						<button class="mobile-dropdown-toggle" type="button">
							{link.label}
							<svg class="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
								<path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
					) : (
						<a href={toSiteHref(link.href)}>{link.label}</a>
					)}
					{link.hasDropdown && (
						<ul class="mobile-dropdown" hidden>
							{coursesDropdown.map((sub) => (
								<li><a href={sub.href}>{sub.label}</a></li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	</nav>
</header>

<script>
	/* Hamburger toggle */
	const toggle = document.querySelector('.nav-toggle');
	const mobileNav = document.querySelector('.nav-mobile');
	if (toggle && mobileNav) {
		toggle.addEventListener('click', () => {
			const isOpen = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!isOpen));
			(mobileNav as HTMLElement).hidden = isOpen;
		});
	}

	/* Mobile dropdown toggles */
	document.querySelectorAll('.mobile-dropdown-toggle').forEach((btn) => {
		btn.addEventListener('click', () => {
			const submenu = btn.nextElementSibling;
			if (submenu && submenu.classList.contains('mobile-dropdown')) {
				const isOpen = !(submenu as HTMLElement).hidden;
				(submenu as HTMLElement).hidden = isOpen;
				btn.classList.toggle('is-open', !isOpen);
			}
		});
	});
</script>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		background: rgb(255, 255, 255);
		border-bottom: 1px solid rgb(181, 181, 181);
		box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 0.75rem 0;
	}

	.brand__logo {
		height: 22px;
		width: auto;
	}

	/* ── Desktop nav ── */
	.nav-desktop ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: 1.8rem;
	}

	.nav-desktop a {
		text-decoration: none;
		font-family: 'Oswald', sans-serif;
		font-size: 0.82rem;
		font-weight: 400;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgb(23, 23, 23);
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.nav-desktop a:hover {
		color: rgb(240, 93, 87);
	}

	.nav-chevron {
		flex-shrink: 0;
		margin-top: 1px;
		transition: transform 0.2s;
	}

	/* ── Desktop dropdown ── */
	.has-dropdown {
		position: relative;
	}

	.dropdown {
		display: none;
		position: absolute;
		top: 100%;
		left: -12px;
		list-style: none;
		margin: 0.5rem 0 0;
		padding: 0.5rem 0;
		background: #fff;
		border: 1px solid rgb(220, 220, 220);
		border-radius: 6px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		min-width: 180px;
		z-index: 30;
	}

	.dropdown li {
		padding: 0;
	}

	.dropdown a {
		display: block;
		padding: 0.5rem 1rem;
		font-size: 0.78rem;
		font-weight: 400;
		white-space: nowrap;
	}

	.dropdown a:hover {
		background: #f5f5f5;
		color: rgb(240, 93, 87);
	}

	.has-dropdown:hover .dropdown {
		display: block;
	}

	.has-dropdown:hover .nav-chevron {
		transform: rotate(180deg);
	}

	/* ── Search icon ── */
	.nav-search {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		border: none;
		background: none;
		cursor: pointer;
		color: rgb(23, 23, 23);
		transition: color 0.15s;
	}

	.nav-search:hover {
		color: rgb(240, 93, 87);
	}

	/* ── Hamburger toggle ── */
	.nav-toggle {
		display: none;
		flex-direction: column;
		gap: 4px;
		padding: 6px;
		border: none;
		background: none;
		cursor: pointer;
	}

	.nav-toggle__bar {
		display: block;
		width: 22px;
		height: 2px;
		background: rgb(23, 23, 23);
		border-radius: 1px;
		transition: transform 0.2s, opacity 0.2s;
	}

	/* ── Mobile nav ── */
	.nav-mobile {
		border-top: 1px solid rgb(220, 220, 220);
		padding: 1rem 0;
	}

	.nav-mobile > ul {
		list-style: none;
		padding: 0 max(0.75rem, calc((100vw - 1160px) / 2));
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.nav-mobile a {
		text-decoration: none;
		font-family: 'Oswald', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgb(23, 23, 23);
	}

	/* Mobile dropdown toggle button */
	.mobile-dropdown-toggle {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-family: 'Oswald', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgb(23, 23, 23);
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.mobile-dropdown-toggle.is-open .nav-chevron {
		transform: rotate(180deg);
	}

	.mobile-dropdown {
		list-style: none;
		padding: 0.4rem 0 0 1rem;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.mobile-dropdown a {
		font-size: 0.9rem;
	}

	@media (max-width: 809px) {
		.nav-desktop {
			display: none;
		}
		.nav-toggle {
			display: flex;
		}
		.nav-search {
			margin-left: auto;
		}
	}

	@media (min-width: 810px) {
		.nav-mobile {
			display: none !important;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/locations.json
```json
[
  {
    "id": "jalan-pemimpin-office",
    "name": "Tinkercademy Office",
    "address": "59 Jalan Pemimpin #04-01, L&Y Building, Singapore 577218",
    "delivery_modes": [
      "in-person"
    ]
  }
]
```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/about-us.astro
```astro
---
/**
 * /about-us — fully rebuilt to match the live Framer site.
 *
 * Sections (in order):
 *  1. Hero — H1 + subtitle (white bg, no image)
 *  2. Intro — Tinkertanker logo + company blurb
 *  3. Certifications — dark gradient strip with 7 certification logos
 *  4. Partners — heading + blurb + logo images
 *  5. Our Clients — heading + blurb + logo strip images
 *  6. Stats — dark gradient, 3 white stat cards (50+, 160+, 3000+)
 *  7. Our Team — loaded from src/data/team.yaml
 *  8. CTA Banner
 */
import CtaBanner from '../components/CtaBanner.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getStaticPage } from '../lib/data.js';
import { parse as parseYaml } from 'yaml';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const page = getStaticPage('/about-us');
if (!page) return Astro.redirect('/404');

const canonical = new URL('/about-us', 'https://tinkercademy.com').toString();

/* ── Load team data from YAML ── */
interface TeamMember {
	name: string;
	role: string;
	bio: string;
	photo: string;
	linkedin?: string;
}
const teamYaml = readFileSync(
	resolve(process.cwd(), 'src/data/team.yaml'),
	'utf-8'
);
const team: TeamMember[] = parseYaml(teamYaml);

/* ── Certification logos ── */
const certLogos = [
	'/images/remote/BDt3R80YV6FiInYlrnHOw8DQ.svg',
	'/images/remote/EeQgsZhGeo5B8SsOriPf6iEbpU.webp',
	'/images/remote/ZYZcVNiPEg6tMjHGhU520Ord5uI.webp',
	'/images/remote/nI5l61MSsRmuWTFJqVH4cpNjfqY.webp',
	'/images/remote/icLJqUI2otyj00sfJ4Dvlfxbo.webp',
	'/images/remote/m4aQlLtGTef2FbAG9CTD4ReFE.png',
	'/images/remote/W5TrPI4TQ7ldyHjx1tFRClDkVI.png',
];

/* ── Partner logo images ── */
const partnerLogos = [
	'/images/remote/OHbHnfvpGLsxcntGKsueCChDt4.png',
	'/images/remote/JKscUSf6W4RYRx9NZVXTg1xxeVs.png',
];

/* ── Client logo strip images ── */
const clientLogos = [
	'/images/remote/HR5MXeyvhzWLMXmEUiYKqaqO7SQ.png',
	'/images/remote/Rl2dNu7CjKUj50GoHP4FX8cpA.png',
	'/images/remote/LydlXepPt0aCpKoojvKQE0StlU.png',
	'/images/remote/YmCHyVKMOmlcKuOEanrBWtOFp00.png',
	'/images/remote/xHwcdydT3oqZNLuEPhUYed1o.gif',
];

/* ── Stats data ── */
const stats = [
	{ number: '50+', description: 'Primary and Secondary Schools We\'ve Taught at for IMDA Infocomm Club' },
	{ number: '160+', description: 'Preschools We\'ve Developed Curriculum for in the Playmaker Programme' },
	{ number: '3000+', description: 'Students We\'ve Reached Through the Code@SG Movement' },
];
---

<BaseLayout
	title={page.seo?.title ?? 'About Us — Tinkercademy'}
	description={page.seo?.description ?? page.description ?? ''}
	canonical={canonical}
	image={page.hero_image ?? undefined}
>
	{/* ═══════ 1. Hero ══════════════════════════════════════════════════ */}
	<section class="about-hero">
		<div class="shell">
			<h1 class="about-hero__title">We're coders and tinkerers who teach coding and tinkering to schools, corporations, and the public in Singapore.</h1>
			<p class="about-hero__subtitle">We bring an unparalleled depth of experience in education <em>and</em> technology to our classes and curriculum.</p>
		</div>
	</section>

	{/* ═══════ 2. Intro ═════════════════════════════════════════════════ */}
	<section class="about-intro">
		<div class="shell about-intro__inner">
			<img
				class="about-intro__logo"
				src="/images/remote/hbuTZqmS4AOlBdh6Ydrkt9tN4o.png"
				alt="Tinkertanker"
				loading="lazy"
			/>
			<div class="about-intro__text">
				<p><a href="http://tinkertanker.com/" target="_blank" rel="noopener">Tinkertanker Pte Ltd</a> is a technology and education company of tinkerers and teachers. We run <strong>Tinkercademy</strong>, where we teach coding and digital making to students of all ages — as well as professionals and corporations who want to stay up-to-date on the latest technologies.</p>
				<p>We also run the <a href="https://gethacking.com" target="_blank" rel="noopener">Get Hacking</a> store, where we sell educational technology kits and tools, and build products like <strong>GuestDay</strong>, <strong>IC Photo</strong>, and <strong>Spickify/Helpling</strong> to solve everyday problems.</p>
			</div>
		</div>
	</section>

	{/* ═══════ 3. Certifications ════════════════════════════════════════ */}
	<section class="about-certs">
		<div class="shell">
			<h2 class="about-certs__heading">We are certified</h2>
			<div class="about-certs__grid">
				{certLogos.map((src) => (
					<img class="about-certs__logo" src={src} alt="Certification" loading="lazy" />
				))}
			</div>
		</div>
	</section>

	{/* ═══════ 4. Partners ══════════════════════════════════════════════ */}
	<section class="about-section">
		<div class="shell">
			<h2 class="about-section__heading">Partners</h2>
			<p class="about-section__body">We collaborate with industry leaders and educational institutions to bring world-class learning experiences to Singapore and beyond.</p>
			<div class="about-partners__logos">
				{partnerLogos.map((src) => (
					<img class="about-partners__logo" src={src} alt="Partner" loading="lazy" />
				))}
			</div>
		</div>
	</section>

	{/* ═══════ 5. Our Clients ═══════════════════════════════════════════ */}
	<section class="about-section">
		<div class="shell">
			<h2 class="about-section__heading">Our Clients</h2>
			<p class="about-section__body">We've had the privilege of teaching, and working with, many preschools, primary schools, secondary schools, polytechnics, universities, government agencies, and corporations.</p>
			<div class="about-clients__logos">
				{clientLogos.map((src) => (
					<img class="about-clients__logo" src={src} alt="Client" loading="lazy" />
				))}
			</div>
		</div>
	</section>

	{/* ═══════ 6. Stats (dark gradient) ═════════════════════════════════ */}
	<section class="about-stats">
		<div class="shell about-stats__grid">
			{stats.map((stat) => (
				<div class="about-stat">
					<span class="about-stat__number">{stat.number}</span>
					<p class="about-stat__label">{stat.description}</p>
				</div>
			))}
		</div>
	</section>

	{/* ═══════ 7. Our Team ══════════════════════════════════════════════ */}
	<section class="about-team">
		<div class="shell">
			<h2 class="about-section__heading">Our Team</h2>
			<p class="about-section__body">Meet the people behind Tinkercademy.</p>

			<div class="about-team__grid">
				{team.map((member) => (
					<div class="team-card">
						<img
							class="team-card__photo"
							src={member.photo}
							alt={member.name}
							loading="lazy"
						/>
						<div class="team-card__body">
							<h3 class="team-card__name">
								{member.linkedin ? (
									<a href={member.linkedin} target="_blank" rel="noopener">{member.name}</a>
								) : (
									member.name
								)}
							</h3>
							<p class="team-card__role">{member.role}</p>
							<p class="team-card__bio">{member.bio}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>

	<CtaBanner />
</BaseLayout>

<style>
	/* ─── Hero ──────────────────────────────────────────────── */
	.about-hero {
		padding: 4rem 0 2rem;
	}

	.about-hero__title {
		font-family: 'Oswald', sans-serif;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
		font-weight: 500;
		line-height: 1.35;
		color: rgb(23, 23, 23);
		margin: 0 0 1.25rem;
		max-width: 850px;
	}

	.about-hero__subtitle {
		font-family: 'Rubik', sans-serif;
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		line-height: 1.65;
		color: rgb(61, 61, 61);
		margin: 0;
		max-width: 700px;
	}

	.about-hero__subtitle em {
		font-style: italic;
	}

	/* ─── Intro ────────────────────────────────────────────── */
	.about-intro {
		padding: 0 0 3rem;
	}

	.about-intro__inner {
		display: flex;
		align-items: flex-start;
		gap: 2.5rem;
	}

	.about-intro__logo {
		width: 100px;
		height: auto;
		flex-shrink: 0;
		border-radius: 12px;
	}

	.about-intro__text {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.7;
		color: rgb(51, 51, 51);
	}

	.about-intro__text p {
		margin: 0 0 1rem;
	}

	.about-intro__text a {
		color: rgb(240, 93, 87);
		text-decoration: none;
	}

	.about-intro__text a:hover {
		text-decoration: underline;
	}

	@media (max-width: 809px) {
		.about-intro__inner {
			flex-direction: column;
			gap: 1.5rem;
		}

		.about-intro__logo {
			width: 80px;
		}
	}

	/* ─── Certifications (dark gradient) ───────────────────── */
	.about-certs {
		padding: 3rem 0;
		background: linear-gradient(180deg, rgb(84, 84, 84) 0%, rgb(24, 24, 26) 100%);
	}

	.about-certs__heading {
		font-family: 'Oswald', sans-serif;
		font-size: 1.5rem;
		font-weight: 500;
		color: #fff;
		margin: 0 0 1.5rem;
		text-align: center;
	}

	.about-certs__grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.about-certs__logo {
		height: 60px;
		width: auto;
		object-fit: contain;
		filter: brightness(0) invert(1);
		opacity: 0.85;
	}

	@media (max-width: 809px) {
		.about-certs__grid {
			gap: 1.25rem;
		}

		.about-certs__logo {
			height: 45px;
		}
	}

	/* ─── Generic section ──────────────────────────────────── */
	.about-section {
		padding: 3rem 0;
	}

	.about-section__heading {
		font-family: 'Oswald', sans-serif;
		font-size: 1.5rem;
		font-weight: 500;
		color: rgb(23, 23, 23);
		margin: 0 0 0.75rem;
	}

	.about-section__body {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.7;
		color: rgb(51, 51, 51);
		margin: 0 0 1.5rem;
		max-width: 800px;
	}

	/* ─── Partner logos ────────────────────────────────────── */
	.about-partners__logos {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 2rem;
	}

	.about-partners__logo {
		height: 40px;
		width: auto;
		object-fit: contain;
	}

	/* ─── Client logos ─────────────────────────────────────── */
	.about-clients__logos {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem;
	}

	.about-clients__logo {
		max-width: 100%;
		height: auto;
		object-fit: contain;
	}

	/* ─── Stats (dark gradient) ────────────────────────────── */
	.about-stats {
		padding: 4rem 0;
		background: linear-gradient(180deg, rgb(84, 84, 84) 0%, rgb(0, 0, 0) 100%);
	}

	.about-stats__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		text-align: center;
	}

	.about-stat__number {
		display: block;
		font-family: 'Oswald', sans-serif;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 600;
		color: rgb(240, 93, 87);
		line-height: 1;
		margin-bottom: 0.75rem;
	}

	.about-stat__label {
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.75);
		margin: 0;
	}

	@media (max-width: 809px) {
		.about-stats__grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	/* ─── Team ─────────────────────────────────────────────── */
	.about-team {
		padding: 3rem 0;
	}

	.about-team__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.team-card {
		background: #fafafa;
		border: 1px solid #e3e3e3;
		border-radius: 10px;
		overflow: hidden;
		text-align: center;
	}

	.team-card__photo {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		display: block;
	}

	.team-card__body {
		padding: 1.25rem 1rem;
	}

	.team-card__name {
		font-family: 'Rubik', sans-serif;
		font-size: 1.1rem;
		font-weight: 600;
		color: rgb(23, 23, 23);
		margin: 0 0 0.25rem;
	}

	.team-card__name a {
		color: inherit;
		text-decoration: none;
	}

	.team-card__name a:hover {
		color: rgb(240, 93, 87);
	}

	.team-card__role {
		font-family: 'Fragment Mono', monospace;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: rgb(240, 93, 87);
		margin: 0 0 0.75rem;
	}

	.team-card__bio {
		font-family: 'Rubik', sans-serif;
		font-size: 13px;
		line-height: 1.65;
		color: rgb(110, 110, 110);
		margin: 0;
	}

	@media (max-width: 1199px) {
		.about-team__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 809px) {
		.about-team__grid {
			grid-template-columns: 1fr;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/astro.config.mjs
```mjs
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://tinkercademy.com',
});

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/RichContent.astro
```astro
---
type ContentItem = {
	type: string;
	text?: string;
	label?: string | null;
	html?: string;
	items?: string[];
	src?: string;
	alt?: string;
	width?: number | null;
	height?: number | null;
};

const props = Astro.props as { items?: ContentItem[] };
const items = props.items ?? [];
---

<section class="shell prose rich-content">
	{items.map((item: ContentItem) => {
		if (item.type === 'image' && item.src) {
			return (
				<figure class="content-image">
					<img
						src={item.src}
						alt={item.alt ?? ''}
						loading="lazy"
						width={item.width ?? undefined}
						height={item.height ?? undefined}
					/>
				</figure>
			);
		}

		if (item.type === 'richtext' && item.html) {
			return (
				<div class="rich-section">
					{item.label ? <p class="section-label">{item.label}</p> : null}
					<div set:html={item.html} />
				</div>
			);
		}

		if (item.type === 'list' && item.items) {
			return (
				<ul>
					{item.items.map((entry: string) => <li>{entry}</li>)}
				</ul>
			);
		}

		if (item.text && item.type.startsWith('h')) {
			const Tag = item.type;
			return <Tag>{item.text}</Tag>;
		}

		return item.text ? <p>{item.text}</p> : null;
	})}
</section>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/scripts/download-remote-images.py
```py
#!/usr/bin/env python3
"""Download all framerusercontent.com images referenced in data files to public/images/remote/."""

import os
import sys
import json
import re
import asyncio
import aiohttp
from pathlib import Path
from urllib.parse import urlparse

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "src" / "data"
OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "remote"
MAX_CONCURRENT = 20
TIMEOUT = 30


def find_all_urls(directory: Path) -> set[str]:
    """Scan all JSON/YML files for framerusercontent.com image URLs."""
    urls = set()
    pattern = re.compile(r'https://framerusercontent\.com/images/[^"?\s]+')
    for root, _, files in os.walk(directory):
        for fname in files:
            if fname.endswith((".json", ".yml", ".yaml")):
                fpath = Path(root) / fname
                text = fpath.read_text(encoding="utf-8")
                urls.update(pattern.findall(text))
    return urls


def url_to_filename(url: str) -> str:
    """Extract filename from URL: the hash+extension part."""
    path = urlparse(url).path  # e.g. /images/RxSGzAwHnPNmiolhpN9izHUQdvs.webp
    return path.split("/")[-1]


async def download_one(
    session: aiohttp.ClientSession, url: str, dest: Path, sem: asyncio.Semaphore
) -> tuple[str, bool, str]:
    """Download a single image. Returns (url, success, message)."""
    async with sem:
        try:
            async with session.get(
                url, timeout=aiohttp.ClientTimeout(total=TIMEOUT)
            ) as resp:
                if resp.status == 200:
                    data = await resp.read()
                    dest.write_bytes(data)
                    return (url, True, f"{len(data)} bytes")
                else:
                    return (url, False, f"HTTP {resp.status}")
        except Exception as e:
            return (url, False, str(e))


async def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Scanning data files for image URLs...")
    urls = find_all_urls(DATA_DIR)
    print(f"Found {len(urls)} unique image URLs")

    # Also scan astro source files for any direct references
    src_dir = PROJECT_ROOT / "src"
    src_pattern = re.compile(r'https://framerusercontent\.com/images/[^"?\s\)]+')
    for root, _, files in os.walk(src_dir):
        for fname in files:
            if fname.endswith((".astro", ".js", ".ts", ".jsx", ".tsx")):
                fpath = Path(root) / fname
                text = fpath.read_text(encoding="utf-8")
                urls.update(src_pattern.findall(text))

    print(f"Total unique URLs (including source files): {len(urls)}")

    # Filter out already-downloaded
    to_download = []
    already_exists = 0
    for url in sorted(urls):
        filename = url_to_filename(url)
        dest = OUTPUT_DIR / filename
        if dest.exists() and dest.stat().st_size > 0:
            already_exists += 1
        else:
            to_download.append((url, dest))

    print(f"Already downloaded: {already_exists}")
    print(f"To download: {len(to_download)}")

    if not to_download:
        print("Nothing to download!")
        return

    sem = asyncio.Semaphore(MAX_CONCURRENT)
    success_count = 0
    fail_count = 0

    async with aiohttp.ClientSession() as session:
        tasks = [download_one(session, url, dest, sem) for url, dest in to_download]
        for i, coro in enumerate(asyncio.as_completed(tasks), 1):
            url, ok, msg = await coro
            filename = url_to_filename(url)
            if ok:
                success_count += 1
                status = "OK"
            else:
                fail_count += 1
                status = f"FAIL: {msg}"
            print(f"[{i}/{len(to_download)}] {status} - {filename}")

    print(f"\nDone! Downloaded: {success_count}, Failed: {fail_count}")


if __name__ == "__main__":
    asyncio.run(main())

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/tinker-x.astro
```astro
---
/**
 * /tinker-x — Tinker X programme page with hero, feature cards with icons,
 * photo carousel, blog link, FAQ accordion, pricing tiers, and scholars section.
 */
import CtaBanner from '../components/CtaBanner.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getStaticPage } from '../lib/data.js';

const page = getStaticPage('/tinker-x');
if (!page) return Astro.redirect('/404');

const canonical = new URL('/tinker-x', 'https://tinkercademy.com').toString();

/* ─── Feature cards ─────────────────────────────────────────────── */
const features = [
	{
		heading: 'Extensive Materials',
		icon: '/images/remote/FpohkStZvk0gR2Nq3kguZF36w4.png',
		text: 'We provide a wide range of materials to cater to learners of all levels.',
	},
	{
		heading: 'Maker Library',
		icon: '/images/remote/aEj0OcmEq9r7bC2Tt5G9mAwFQ.png',
		text: 'We have an extensive library of kits and robots you can tinker and play with.',
	},
	{
		heading: 'Community',
		icon: '/images/remote/hmHMpidMcuxsdcTJFmNEZb8CY.png',
		text: 'Join other like-minded tinkerers and learners.',
	},
];

/* ─── Carousel images ───────────────────────────────────────────── */
const carouselImages = [
	'7cRxG8FAtvLFi4k7hPB4h4sNtQ.jpg',
	'aDMlAfr1wDRgD0kYOnqRfrsYPWA.jpg',
	'SJRBZb9o5rRON6eqDxyAND8PME.jpg',
	'hzbnpzSMsraQyambZtZiJlTgT4.jpg',
	'Oaxksci0HVWffjcZeHoMeLqQm5o.jpg',
	'9NO4kHaPZA5ZVeKMmeHbbqHY.jpg',
	'5MEzqXIGdWHTEKNjM6MMNimMU8.jpg',
	'JYaZeJHT5IIylCsQBHRPvZ62E3Q.jpg',
	'3giBkE2iEVEPlhpuuIvcBqFDw.jpg',
	'rvcP8r6eJeXlJJospq0hlIC8kb4.jpg',
	'kdn7iQjSIDerFNsu6vJ1UWSV8.jpg',
	'FMIpMq9ppOwe5S3iYTbjC5fhfs.jpg',
].map((f) => `/images/remote/${f}`);

/* ─── FAQ questions ─────────────────────────────────────────────── */
const faqItems = [
	{
		question: 'Is there a curriculum?',
		answer: 'We offer a wide range of structured course materials across topics like app development, game design, AI, data science, and electronics. But we also support learners who want to bring their own projects. Our approach is flexible — you can follow a guided path or work on something you\'re passionate about, with our trainers ready to help along the way.',
	},
	{
		question: 'What can I choose to learn?',
		answer: 'You can explore topics ranging from introductory coding (Swift, Python, JavaScript) to more advanced areas like AI, machine learning, data science, and electronics. We also support creative projects involving 3D printing, laser cutting, and robotics.',
	},
	{
		question: 'Is this suitable for my child?',
		answer: 'Tinker X is designed for learners of all ages, but it works best for those who are curious and motivated to learn independently. Younger students (10+) can thrive here with our trainer support, while older students and adults will enjoy the self-directed learning environment.',
	},
	{
		question: 'Am I too old for your program?',
		answer: 'Absolutely not! Tinker X welcomes learners of all ages. Whether you\'re a student, a working professional, or a retiree looking to pick up new skills, our flexible format accommodates everyone.',
	},
	{
		question: 'Why should I go for this over a traditional enrichment centre?',
		answer: 'Unlike traditional enrichment centres that follow a rigid, one-size-fits-all curriculum, Tinker X offers a personalised, project-based learning experience. You learn what you need, when you need it. Plus, you get access to our maker library with equipment like 3D printers, laser cutters, and electronics — tools you won\'t find at a typical enrichment centre.',
	},
];

/* ─── Pricing tiers ─────────────────────────────────────────────── */
const tiers = [
	{
		name: 'Trial Session',
		frequency: 'New to us',
		price: '$0',
		currency: 'SGD',
		features: ['New here? Try us out!', 'Write in to us for details'],
		url: '/contact-us',
	},
	{
		name: 'Single Session',
		frequency: 'Weekly',
		price: '$50',
		currency: 'SGD',
		features: ['Full access for one day', 'Great for small projects'],
		url: 'https://app.acuityscheduling.com/schedule/b7469ae8/category/Tinker%2520X%2520Single%2520Sessions/appointment/9896622/calendar/2925143',
	},
	{
		name: '4 Sessions',
		frequency: 'Monthly',
		price: '$180',
		currency: 'SGD',
		features: ['Save $20!', '120-day validity'],
		url: 'https://app.acuityscheduling.com/catalog/b7469ae8?categories=Packages',
	},
	{
		name: '12 Sessions',
		frequency: 'Quarterly',
		price: '$480',
		currency: 'SGD',
		features: ['Save $120!!', '180-day validity'],
		url: 'https://app.acuityscheduling.com/catalog/b7469ae8?categories=Packages',
	},
];
---

<BaseLayout
	title={page.seo?.title ?? 'Tinker X'}
	description={page.seo?.description ?? page.description ?? ''}
	canonical={canonical}
	image={page.hero_image ?? undefined}
>
	{/* ═══════ Hero ═══════════════════════════════════════════════════ */}
	<section class="tx-hero">
		<img
			class="tx-hero__bg"
			src="/images/remote/3cybNehmDehCXeBSMBiUWGpbgI.jpg"
			alt="Tinker X"
			loading="eager"
		/>
		<div class="tx-hero__overlay" />
		<div class="tx-hero__content">
			<h1 class="tx-hero__title">Tinker X</h1>
			<h3 class="tx-hero__subtitle">
				A flexible program for hands-on learning in coding and making.
			</h3>
		</div>
	</section>

	{/* ═══════ Intro paragraphs ═════════════════════════════════════ */}
	<section class="tx-intro">
		<div class="shell tx-intro__stack">
			<p class="tx-intro__text">
				Welcome to Tinker X, an open-ended program for anyone interested in coding and engineering.
				Unlike a traditional classroom, we offer a flexible mix of hands-on instruction and independent work.
				We give you the resources and support to learn at your own pace, whether you're following a structured
				curriculum or bringing your own project to life.
			</p>
			<p class="tx-intro__text">
				AI is already disrupting traditional education, moving it away from a rigid, one-size-fits-all model
				toward a more personalized and efficient system. We've embraced this change. Our program uses a flipped
				classroom approach where you actively engage with materials on your own, applying a "just-in-time"
				learning approach. This means you focus on learning the skills you need to complete a project you're
				excited about.
			</p>
			<p class="tx-intro__text">
				This process is designed to be challenging and, at times, frustrating—and that's by design. By learning
				to push through obstacles and solve problems on your own, you'll develop grit, critical thinking, and
				initiative — skills that are essential for a future where technology is constantly changing. We seek to
				nurture independent, motivated, and skilled learners and creators who adapt and thrive in a rapidly
				changing world.
			</p>
		</div>
	</section>

	{/* ═══════ Feature cards with icons ═════════════════════════════ */}
	<section class="tx-features">
		<div class="shell tx-features__grid">
			{features.map((feat) => (
				<div class="tx-feat-card">
					<img class="tx-feat-card__icon" src={feat.icon} alt={feat.heading} loading="lazy" />
					<h3 class="tx-feat-card__heading">{feat.heading}</h3>
					<p class="tx-feat-card__text">{feat.text}</p>
				</div>
			))}
		</div>
	</section>

	{/* ═══════ Photo carousel ═══════════════════════════════════════ */}
	<section class="tx-carousel">
		<div class="shell tx-carousel__wrap">
			<button class="tx-carousel__arrow tx-carousel__arrow--prev" aria-label="Previous" type="button">
				<img src="/images/remote/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" alt="" width="24" height="24" />
			</button>
			<div class="tx-carousel__track" id="tx-carousel-track">
				{carouselImages.map((src, i) => (
					<img
						class="tx-carousel__slide"
						src={src}
						alt={`Tinker X photo ${i + 1}`}
						loading="lazy"
					/>
				))}
			</div>
			<button class="tx-carousel__arrow tx-carousel__arrow--next" aria-label="Next" type="button">
				<img src="/images/remote/11KSGbIZoRSg4pjdnUoif6MKHI.svg" alt="" width="24" height="24" />
			</button>
		</div>
	</section>

	{/* ═══════ Blog link ════════════════════════════════════════════ */}
	<section class="tx-blog-link">
		<div class="shell">
			<p class="tx-blog-link__text">
				Read more project updates on our{' '}
				<a href="https://ghost.tk.sg" target="_blank" rel="noopener noreferrer">blog</a>.
			</p>
		</div>
	</section>

	{/* ═══════ FAQ Accordion ═══════════════════════════════════════ */}
	<section class="tx-faq">
		<div class="shell">
			<h2 class="tx-faq__heading">Frequently Asked Questions</h2>
			<div class="tx-faq__list">
				{faqItems.map((item) => (
					<details class="tx-faq__item">
						<summary class="tx-faq__question">
							<span>{item.question}</span>
							<svg class="tx-faq__icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
						</summary>
						<div class="tx-faq__answer">
							<p>{item.answer}</p>
						</div>
					</details>
				))}
			</div>
		</div>
	</section>

	{/* ═══════ Pricing ══════════════════════════════════════════════ */}
	<section class="tx-pricing">
		<div class="shell">
			<p class="tx-pricing__lead">
				Try a free trial session and see what we're all about! After that, you can continue
				with individual sessions, or sign up for a package for additional savings.
			</p>
			<div class="tx-pricing__grid">
				{tiers.map((tier, idx) => (
					<div class:list={['tx-tier', idx === 0 && 'tx-tier--highlight']}>
						<h3 class="tx-tier__name">{tier.name}</h3>
						<p class="tx-tier__frequency">{tier.frequency}</p>
						<div class="tx-tier__price-row">
							<span class="tx-tier__amount">{tier.price}</span>
							<span class="tx-tier__currency">{tier.currency}</span>
						</div>
						<ul class="tx-tier__features">
							{tier.features.map((f) => <li>{f}</li>)}
						</ul>
						<a
							class="tx-tier__cta"
							href={tier.url}
							target={tier.url.startsWith('/') ? undefined : '_blank'}
							rel={tier.url.startsWith('/') ? undefined : 'noopener noreferrer'}
						>
							Get Started
						</a>
					</div>
				))}
			</div>
		</div>
	</section>

	{/* ═══════ Tinker X Scholars ════════════════════════════════════ */}
	<section class="tx-scholars">
		<div class="shell tx-scholars__grid">
			<div class="tx-scholars__image-col">
				<img
					class="tx-scholars__image"
					src="/images/remote/Lr9F4nS0jKHbnDjx2xFbejNdIts.png"
					alt="Tinker X Scholars"
					loading="lazy"
				/>
			</div>
			<div class="tx-scholars__text-col">
				<h2 class="tx-scholars__title">Tinker X Scholars</h2>
				<p class="tx-scholars__subtitle">
					A scholarship opportunity for students who demonstrate a passion for technology.
				</p>
				<p class="tx-scholars__text">
					Technology education is often treated as an enrichment activity, which can create inequality
					in who has access to it. To help make technology education more equitable and accessible,
					we are offering Tinker X scholarships for students.
				</p>
				<p class="tx-scholars__text">
					These scholarships provide highly subsidized membership to students who are passionate about
					technology but lack access to expert mentors, guidance, or tools.
				</p>
				<p class="tx-scholars__text">
					To be considered, students should submit a portfolio of their previous tech-related work.
					We're not looking for perfect results, but rather a clear demonstration of effort and passion.
					Applicants must also show a need for financial assistance.
				</p>
				<p class="tx-scholars__text">
					In return, Tinker X scholars will be expected to give back to the community, helping to
					inspire the next generation of learners.
				</p>
				<p class="tx-scholars__text">
					If you or someone you know might be a good fit, please contact us at{' '}
					<a href="mailto:hello@tinkercademy.com">hello@tinkercademy.com</a>{' '}
					to learn more or to apply. We are accepting applications now.
				</p>
			</div>
		</div>
	</section>

	<CtaBanner />
</BaseLayout>

{/* ═══════ Carousel JS ═════════════════════════════════════════════ */}
<script>
	const track = document.getElementById('tx-carousel-track');
	if (track) {
		const prevBtn = track.parentElement?.querySelector('.tx-carousel__arrow--prev');
		const nextBtn = track.parentElement?.querySelector('.tx-carousel__arrow--next');
		const scrollAmount = () => {
			const slide = track.querySelector('.tx-carousel__slide') as HTMLElement | null;
			return slide ? slide.offsetWidth + 16 : 320;
		};
		prevBtn?.addEventListener('click', () => {
			track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
		});
		nextBtn?.addEventListener('click', () => {
			track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
		});
	}
</script>

<style>
	/* ─── Hero ──────────────────────────────────────────────── */
	.tx-hero {
		position: relative;
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.tx-hero__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.tx-hero__overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.tx-hero__content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 80px 1.5rem 60px;
		max-width: 800px;
	}

	.tx-hero__title {
		font-family: 'Rubik', sans-serif;
		font-weight: 700;
		font-size: clamp(2.5rem, 5vw, 4rem);
		color: #f05d57;
		margin: 0 0 12px;
		line-height: 1.1;
	}

	.tx-hero__subtitle {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: #fff;
		margin: 0;
		line-height: 1.5;
	}

	/* ─── Intro ────────────────────────────────────────────── */
	.tx-intro {
		padding: 48px 0 32px;
	}

	.tx-intro__stack {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 800px;
	}

	.tx-intro__text {
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
		line-height: 1.75;
		color: rgb(51, 51, 51);
		margin: 0;
	}

	/* ─── Feature cards with icon images ──────────────────── */
	.tx-features {
		padding: 32px 0 48px;
	}

	.tx-features__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.tx-feat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 32px 20px;
	}

	.tx-feat-card__icon {
		width: 200px;
		height: 200px;
		object-fit: contain;
		margin-bottom: 20px;
	}

	.tx-feat-card__heading {
		font-family: 'Rubik', sans-serif;
		font-weight: 600;
		font-size: 1.25rem;
		color: #f05d57;
		margin: 0 0 8px;
	}

	.tx-feat-card__text {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.65;
		color: rgb(51, 51, 51);
		margin: 0;
	}

	@media (max-width: 1199px) {
		.tx-features__grid {
			grid-template-columns: 1fr;
			max-width: 480px;
			margin: 0 auto;
		}
	}

	/* ─── Photo carousel ──────────────────────────────────── */
	.tx-carousel {
		padding: 0 0 32px;
	}

	.tx-carousel__wrap {
		position: relative;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.tx-carousel__track {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		padding: 8px 0;
	}

	.tx-carousel__track::-webkit-scrollbar {
		display: none;
	}

	.tx-carousel__slide {
		flex: 0 0 auto;
		width: 320px;
		height: 240px;
		object-fit: cover;
		border-radius: 12px;
		scroll-snap-align: start;
	}

	.tx-carousel__arrow {
		flex: 0 0 auto;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: none;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s;
		z-index: 2;
	}

	.tx-carousel__arrow:hover {
		background: rgba(0, 0, 0, 0.8);
	}

	.tx-carousel__arrow img {
		width: 20px;
		height: 20px;
		filter: invert(1);
	}

	@media (max-width: 809px) {
		.tx-carousel__slide {
			width: 260px;
			height: 195px;
		}

		.tx-carousel__arrow {
			width: 32px;
			height: 32px;
		}
	}

	/* ─── Blog link ───────────────────────────────────────── */
	.tx-blog-link {
		padding: 0 0 48px;
	}

	.tx-blog-link__text {
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
		color: rgb(51, 51, 51);
		margin: 0;
		text-align: center;
	}

	.tx-blog-link__text a {
		color: #f05d57;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	/* ─── FAQ ──────────────────────────────────────────────── */
	.tx-faq {
		padding: 48px 0;
	}

	.tx-faq__heading {
		font-family: 'Rubik', sans-serif;
		font-weight: 600;
		font-size: 2rem;
		color: #171717;
		margin: 0 0 24px;
	}

	.tx-faq__list {
		max-width: 750px;
	}

	.tx-faq__item {
		border-bottom: 1px solid #e3e3e3;
	}

	.tx-faq__question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 18px 0;
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
		font-weight: 500;
		color: rgb(51, 51, 51);
		cursor: pointer;
		list-style: none;
	}

	.tx-faq__question::-webkit-details-marker {
		display: none;
	}

	.tx-faq__icon {
		flex-shrink: 0;
		color: rgb(117, 117, 117);
		transition: transform 0.2s;
	}

	.tx-faq__item[open] .tx-faq__icon {
		transform: rotate(45deg);
	}

	.tx-faq__answer {
		padding: 0 0 18px;
	}

	.tx-faq__answer p {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.7;
		color: rgb(117, 117, 117);
		margin: 0;
	}

	/* ─── Pricing ──────────────────────────────────────────── */
	.tx-pricing {
		padding: 48px 0;
		background: #f5f5f5;
	}

	.tx-pricing__lead {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 1rem;
		color: rgb(51, 51, 51);
		text-align: center;
		margin: 0 0 32px;
		max-width: 700px;
		margin-inline: auto;
		line-height: 1.6;
	}

	.tx-pricing__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}

	.tx-tier {
		background: #fff;
		border: 1px solid #e3e3e3;
		border-radius: 12px;
		padding: 28px 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tx-tier--highlight {
		border-color: #f05d57;
		box-shadow: 0 4px 16px rgba(240, 93, 87, 0.15);
	}

	.tx-tier__name {
		font-family: 'Rubik', sans-serif;
		font-weight: 600;
		font-size: 1.15rem;
		color: rgb(51, 51, 51);
		margin: 0 0 4px;
	}

	.tx-tier__frequency {
		font-family: 'Rubik', sans-serif;
		font-size: 13px;
		color: rgb(117, 117, 117);
		margin: 0 0 16px;
	}

	.tx-tier__price-row {
		margin-bottom: 16px;
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 4px;
	}

	.tx-tier__amount {
		font-family: 'Rubik', sans-serif;
		font-size: 2.5rem;
		font-weight: 700;
		color: rgb(51, 51, 51);
		line-height: 1;
	}

	.tx-tier__currency {
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		color: rgb(117, 117, 117);
	}

	.tx-tier__features {
		list-style: none;
		padding: 0;
		margin: 0 0 20px;
	}

	.tx-tier__features li {
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		color: rgb(117, 117, 117);
		margin-bottom: 4px;
		line-height: 1.5;
	}

	.tx-tier__cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 10px 28px;
		border-radius: 30px;
		background-color: #f05d57;
		color: #fff;
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		margin-top: auto;
		transition: opacity 0.15s;
	}

	.tx-tier__cta:hover {
		opacity: 0.85;
	}

	@media (max-width: 1199px) {
		.tx-pricing__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 809px) {
		.tx-pricing__grid {
			grid-template-columns: 1fr;
			max-width: 380px;
			margin: 0 auto;
		}
	}

	/* ─── Scholars (two-column) ───────────────────────────── */
	.tx-scholars {
		padding: 60px 0;
	}

	.tx-scholars__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: start;
	}

	.tx-scholars__image {
		width: 100%;
		max-width: 500px;
		border-radius: 16px;
	}

	.tx-scholars__title {
		font-family: 'Rubik', sans-serif;
		font-weight: 700;
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		color: #171717;
		margin: 0 0 8px;
	}

	.tx-scholars__subtitle {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 1rem;
		color: #f05d57;
		margin: 0 0 20px;
		line-height: 1.5;
	}

	.tx-scholars__text {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.75;
		color: rgb(51, 51, 51);
		margin: 0 0 12px;
	}

	.tx-scholars__text a {
		color: #f05d57;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (max-width: 1199px) {
		.tx-scholars__grid {
			grid-template-columns: 1fr;
		}

		.tx-scholars__image-col {
			display: flex;
			justify-content: center;
		}

		.tx-scholars__image {
			max-width: 400px;
		}
	}

	@media (max-width: 809px) {
		.tx-hero {
			min-height: 280px;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/topics.yml
```yml
- id: ai
  label: AI and Machine Learning with Data Science
  source_id: vpWDOwfOJ
- id: ai-and-machine-learning-with-data-science
  label: AI and Machine Learning with Data Science
  source_id: ai-and-machine-learning-with-data-science
- id: cs
  label: Computer Science Fundamentals
  source_id: uMQrqiRw1
- id: computer-science-fundamentals
  label: Computer Science Fundamentals
  source_id: computer-science-fundamentals
- id: making
  label: Creativity, Craft, and Making
  source_id: e_A2k1nRU
- id: creativity-craft-and-making
  label: Creativity, Craft, and Making
  source_id: creativity-craft-and-making
- id: cryptography
  label: Cryptography
  source_id: V6cZ3Rf_S
- id: design-thinking
  label: Design Thinking
  source_id: Tykfon5ZF
- id: uiux
  label: Design, Prototyping, and UI/UX
  source_id: R7ku5ShhB
- id: design-prototyping-and-ui-ux
  label: Design, Prototyping, and UI/UX
  source_id: design-prototyping-and-ui-ux
- id: gamedev
  label: Game Development
  source_id: JJfAJSl1s
- id: game-development
  label: Game Development
  source_id: game-development
- id: iot
  label: Microcontrollers & IoT
  source_id: y29slfr8O
- id: microcontrollers-iot
  label: Microcontrollers & IoT
  source_id: microcontrollers-iot
- id: appdev
  label: Mobile App Development
  source_id: sBqWC3exH
- id: mobile-app-development
  label: Mobile App Development
  source_id: mobile-app-development
- id: professional-productivity-with-technology
  label: Professional Productivity with Technology
  source_id: professional-productivity-with-technology
- id: software-engineering
  label: Software Engineering
  source_id: IgMVqCDv3
- id: webdev
  label: Web Development
  source_id: I6HoEEJFg
- id: web-development
  label: Web Development
  source_id: web-development

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/scripts/crawl-site.mjs
```mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { parseFramerHandover } from './lib/framer.mjs';

const SITE_ORIGIN = 'https://tinkercademy.com';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const ARTIFACTS_DIR = path.join(ROOT, '_artifacts', 'crawl');
const HTML_DIR = path.join(ARTIFACTS_DIR, 'html');

const NAV_TEXT = new Set(['courses', 'about us', 'showcase', 'store', 'contact us']);
const FOOTER_SENTINELS = [
	'Sign up for our mailing list!',
	'Tinkercademy is the education brand of',
	'© 2026 Tinkertanker Pte Ltd.',
	'© 2025 Tinkertanker Pte Ltd.',
];
const SOCIAL_HOSTS = new Set([
	'x.com',
	'twitter.com',
	'facebook.com',
	'instagram.com',
	'linkedin.com',
	'github.com',
	'medium.com',
	'blog.tinkercademy.com',
]);

function cleanText(value) {
	return value.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function uniqueBy(items, keyFn) {
	const seen = new Set();
	return items.filter((item) => {
		const key = keyFn(item);
		if (!key || seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

function slugForPath(pagePath) {
	if (pagePath === '/') return 'index';
	return pagePath.replace(/^\/|\/$/g, '').replace(/\//g, '__');
}

function classifyPath(pagePath) {
	if (pagePath === '/') return 'root';
	if (pagePath.startsWith('/programmes/')) return 'programme';
	if (pagePath.startsWith('/tutorials/')) return 'tutorial';
	return 'static';
}

async function fetchText(url) {
	let lastError = null;

	for (let attempt = 1; attempt <= 4; attempt += 1) {
		try {
			const response = await fetch(url, {
				headers: {
					'user-agent': 'Mozilla/5.0 (compatible; Codex crawler)',
					accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				},
			});

			return {
				status: response.status,
				text: await response.text(),
				finalUrl: response.url,
			};
		} catch (error) {
			lastError = error;
			if (attempt === 4) break;
			await new Promise((resolve) => setTimeout(resolve, attempt * 500));
		}
	}

	throw lastError;
}

async function getSitemapUrls() {
	const { text } = await fetchText(`${SITE_ORIGIN}/sitemap.xml`);
	const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).filter(Boolean);
	return uniqueBy(urls, (url) => url);
}

function extractHydration($) {
	const raw = $('#main').attr('data-framer-hydrate-v2');
	if (!raw) return null;

	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

function extractSeo($) {
	const meta = (selector, attr = 'content') => $(selector).attr(attr) ?? null;
	return {
		title: cleanText($('title').first().text()),
		description: meta('meta[name="description"]'),
		canonical: meta('link[rel="canonical"]', 'href'),
		openGraph: {
			title: meta('meta[property="og:title"]'),
			description: meta('meta[property="og:description"]'),
			image: meta('meta[property="og:image"]'),
		},
		twitter: {
			title: meta('meta[name="twitter:title"]'),
			description: meta('meta[name="twitter:description"]'),
			image: meta('meta[name="twitter:image"]'),
		},
		robots: meta('meta[name="robots"]'),
	};
}

function extractAnchors($) {
	return uniqueBy(
		$('a[href]')
			.toArray()
			.map((element) => {
				const href = $(element).attr('href');
				if (!href) return null;
				try {
					const url = new URL(href, SITE_ORIGIN);
					return {
						label: cleanText($(element).text()),
						href: url.toString(),
						internal: url.origin === SITE_ORIGIN,
					};
				} catch {
					return null;
				}
			})
			.filter(Boolean),
		(anchor) => `${anchor.href}::${anchor.label}`,
	);
}

function extractNavLinks($) {
	return uniqueBy(
		$('nav a[href]')
			.toArray()
			.map((element) => {
				const href = $(element).attr('href');
				const label = cleanText($(element).text());
				if (!href || !label) return null;
				try {
					return { label, href: new URL(href, SITE_ORIGIN).toString() };
				} catch {
					return null;
				}
			})
			.filter(Boolean),
		(link) => `${link.href}::${link.label}`,
	);
}

function extractImages($) {
	return uniqueBy(
		$('img')
			.toArray()
			.map((element) => {
				const src = $(element).attr('src');
				if (!src) return null;
				try {
					const url = new URL(src, SITE_ORIGIN);
					return {
						src: url.toString(),
						alt: $(element).attr('alt') ?? '',
						width: $(element).attr('width') ?? null,
						height: $(element).attr('height') ?? null,
					};
				} catch {
					return null;
				}
			})
			.filter(Boolean),
		(image) => image.src,
	);
}

function extractAssetUrls($) {
	const assetUrls = new Set();
	const collect = (value, base = SITE_ORIGIN) => {
		if (!value || value.startsWith('data:') || value.startsWith('javascript:')) return;
		try {
			assetUrls.add(new URL(value, base).toString());
		} catch {
			// Ignore malformed asset references.
		}
	};

	$('[src]').each((_, element) => collect($(element).attr('src')));
	$('link[href], script[src]').each((_, element) => collect($(element).attr('href') ?? $(element).attr('src')));
	$('[srcset]').each((_, element) => {
		const srcset = $(element).attr('srcset') ?? '';
		for (const candidate of srcset.split(',')) {
			const [url] = candidate.trim().split(/\s+/);
			collect(url);
		}
	});

	return [...assetUrls].sort();
}

function extractContacts(anchors) {
	return anchors
		.filter((anchor) => anchor.href.startsWith('mailto:') || anchor.href.startsWith('tel:'))
		.map((anchor) => {
			if (anchor.href.startsWith('mailto:')) {
				return { type: 'email', value: anchor.href.replace('mailto:', '') };
			}
			return { type: 'phone', value: anchor.href.replace('tel:', '') };
		});
}

function extractSocialLinks(anchors) {
	return uniqueBy(
		anchors
			.filter((anchor) => {
				try {
					return SOCIAL_HOSTS.has(new URL(anchor.href).hostname.replace(/^www\./, ''));
				} catch {
					return false;
				}
			})
			.map((anchor) => {
				const hostname = new URL(anchor.href).hostname.replace(/^www\./, '');
				return {
					label: anchor.label || hostname,
					platform: hostname.split('.')[0],
					url: anchor.href,
				};
			}),
		(link) => link.url,
	);
}

function extractForms($, anchors) {
	const formNodes = $('form')
		.toArray()
		.map((element, index) => ({
			id: $(element).attr('id') ?? `form-${index + 1}`,
			action: $(element).attr('action') ?? null,
			method: ($(element).attr('method') ?? 'get').toLowerCase(),
		}));

	const providerLinks = anchors
		.filter((anchor) => /jotform|typeform|hubspot|airtable|formstack/i.test(anchor.href))
		.map((anchor, index) => ({
			id: `external-form-${index + 1}`,
			action: anchor.href,
			method: 'link',
			label: anchor.label,
		}));

	return uniqueBy([...formNodes, ...providerLinks], (form) => `${form.action}::${form.id}`);
}

function extractCtas(anchors) {
	return uniqueBy(
		anchors
			.filter((anchor) => anchor.label)
			.filter((anchor) => !NAV_TEXT.has(anchor.label.toLowerCase()))
			.filter((anchor) => !anchor.href.endsWith('#'))
			.filter((anchor) => !SOCIAL_HOSTS.has(new URL(anchor.href).hostname.replace(/^www\./, '')))
			.map((anchor) => ({
				label: anchor.label,
				url: anchor.href,
				type: anchor.href.startsWith('mailto:')
					? 'email'
					: anchor.href.startsWith('tel:')
						? 'phone'
						: /jotform|typeform|hubspot|airtable|formstack/i.test(anchor.href)
							? 'form'
							: anchor.internal
								? 'internal'
								: 'external',
			})),
		(cta) => `${cta.url}::${cta.label}`,
	);
}

function shouldStart(tag, text) {
	if (/^h[1-4]$/.test(tag)) return true;
	return text.length >= 40;
}

function extractContentBlocks($) {
	const blocks = [];
	let started = false;

	for (const element of $('#main').find('h1, h2, h3, h4, p, li').toArray()) {
		if ($(element).closest('nav').length) continue;
		const tag = element.tagName;
		if (tag === 'p' && $(element).closest('li').length) continue;
		const text = cleanText($(element).text());
		if (!text) continue;
		if (NAV_TEXT.has(text.toLowerCase())) continue;
		if (FOOTER_SENTINELS.some((sentinel) => text.includes(sentinel))) break;
		if (!started) {
			if (!shouldStart(tag, text)) continue;
			started = true;
		}
		const last = blocks.at(-1);
		if (last?.tag === tag && last?.text === text) continue;
		blocks.push({ tag, text });
	}

	return blocks;
}

async function crawlPage(url) {
	const { status, text: html, finalUrl } = await fetchText(url);
	const $ = load(html);
	const finalPath = new URL(finalUrl).pathname || '/';
	const anchors = extractAnchors($);
	const handoverRaw = $('script#\\__framer__handoverData').html() ?? null;

	await writeFile(path.join(HTML_DIR, `${slugForPath(finalPath)}.html`), html);

	return {
		url: finalUrl,
		path: finalPath,
		type: classifyPath(finalPath),
		status,
		seo: extractSeo($),
		hydrate: extractHydration($),
		navLinks: extractNavLinks($),
		links: anchors,
		images: extractImages($),
		assets: extractAssetUrls($),
		contacts: extractContacts(anchors),
		socialLinks: extractSocialLinks(anchors),
		forms: extractForms($, anchors),
		ctas: extractCtas(anchors),
		contentBlocks: extractContentBlocks($),
		framer: {
			hasHandover: Boolean(handoverRaw),
			structured: parseFramerHandover(handoverRaw),
		},
	};
}

async function mapPool(values, concurrency, mapper) {
	const results = new Array(values.length);
	let nextIndex = 0;

	await Promise.all(
		Array.from({ length: Math.min(concurrency, values.length) }, async () => {
			while (nextIndex < values.length) {
				const current = nextIndex;
				nextIndex += 1;
				results[current] = await mapper(values[current], current);
			}
		}),
	);

	return results;
}

await mkdir(HTML_DIR, { recursive: true });

const urls = await getSitemapUrls();
console.log(`Crawling ${urls.length} public routes from the sitemap...`);

const pages = await mapPool(urls, 6, async (url, index) => {
	console.log(`[${index + 1}/${urls.length}] ${url}`);
	return crawlPage(url);
});

const assetReferences = new Map();
for (const page of pages) {
	for (const asset of page.assets) {
		const current = assetReferences.get(asset) ?? { url: asset, pages: [] };
		current.pages.push(page.path);
		assetReferences.set(asset, current);
	}
}

const payload = {
	site: SITE_ORIGIN,
	crawledAt: new Date().toISOString(),
	pageCount: pages.length,
	pages,
	assets: [...assetReferences.values()].map((entry) => ({
		...entry,
		pages: [...new Set(entry.pages)].sort(),
	})),
};

await writeFile(path.join(ARTIFACTS_DIR, 'site.json'), JSON.stringify(payload, null, 2));
console.log(`Saved crawl output to ${path.join(ARTIFACTS_DIR, 'site.json')}`);

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/TutorialStory.astro
```astro
---
type ContentItem = {
	type: string;
	label?: string | null;
	html?: string;
	src?: string;
	width?: number | null;
	height?: number | null;
};

type StorySection = {
	copy: ContentItem | null;
	images: ContentItem[];
};

const props = Astro.props as { items?: ContentItem[] };
const items = props.items ?? [];
const sections: StorySection[] = [];
let current: StorySection | null = null;

for (const item of items) {
	if (item.type === 'richtext' && item.html) {
		if (current?.copy || current?.images.length) sections.push(current);
		current = { copy: item, images: [] };
		continue;
	}

	if (item.type === 'image' && item.src) {
		if (!current) current = { copy: null, images: [] };
		current.images.push(item);
	}
}

if (current?.copy || current?.images.length) sections.push(current);
---

<section class="shell tutorial-story">
	{sections.map((section, index) => (
		<article class:list={['tutorial-section', index % 2 === 1 && 'tutorial-section--reverse']}>
			<div class="tutorial-section__copy">
				{section.copy?.html && <div class="tutorial-section__body" set:html={section.copy.html} />}
			</div>
			{
				section.images.length > 0 && (
					<div class="tutorial-section__media">
						{section.images.map((image, imageIndex) => (
							<figure class:list={['tutorial-media', imageIndex === 0 && section.images.length > 1 && 'tutorial-media--lead']}>
								<img
									src={image.src}
									alt={section.copy?.label ?? ''}
									loading="eager"
									width={image.width ?? undefined}
									height={image.height ?? undefined}
								/>
							</figure>
						))}
					</div>
				)
			}
		</article>
	))}
</section>

<style>
	.tutorial-story {
		display: grid;
		gap: 1.5rem;
		padding-bottom: 4rem;
	}

	.tutorial-section {
		display: grid;
		gap: 1.5rem;
		padding: clamp(1.5rem, 4vw, 3rem) 0;
		border-top: 1px solid rgba(45, 42, 38, 0.1);
	}

	.tutorial-section:first-child {
		border-top: none;
		padding-top: 0;
	}

	.tutorial-section__copy {
		min-width: 0;
	}

	.tutorial-section__media {
		display: grid;
		gap: 1rem;
		align-content: start;
	}

	.tutorial-media {
		margin: 0;
		padding: 0.8rem;
		border-radius: 1.1rem;
		border: 1px solid rgba(45, 42, 38, 0.1);
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 16px 36px rgba(45, 42, 38, 0.07);
	}

	.tutorial-media--lead img {
		max-width: min(320px, 100%);
		max-height: 320px;
	}

	.tutorial-media img {
		width: 100%;
		height: auto;
		max-height: 360px;
		object-fit: contain;
		object-position: top left;
	}

	.tutorial-section__body :global(h1),
	.tutorial-section__body :global(h2),
	.tutorial-section__body :global(h3),
	.tutorial-section__body :global(h4) {
		margin: 0 0 0.85rem;
		font-family: var(--heading);
		line-height: 1.05;
		text-transform: uppercase;
	}

	.tutorial-section__body :global(h1) {
		font-size: clamp(1.8rem, 3.2vw, 2.8rem);
	}

	.tutorial-section__body :global(h2) {
		font-size: clamp(1.4rem, 2.4vw, 2rem);
	}

	.tutorial-section__body :global(h3),
	.tutorial-section__body :global(h4) {
		font-size: 1rem;
		color: var(--accent-dark);
	}

	.tutorial-section__body :global(p),
	.tutorial-section__body :global(li) {
		margin: 0 0 1rem;
		line-height: 1.75;
		color: var(--text);
	}

	.tutorial-section__body :global(ul) {
		margin: 0 0 1rem;
		padding-left: 1.1rem;
	}

	.tutorial-section__body :global(a) {
		color: var(--accent-dark);
		text-decoration-thickness: 0.08em;
	}

	@media (min-width: 920px) {
		.tutorial-section {
			grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
			align-items: start;
			gap: 2rem;
		}

		.tutorial-section--reverse {
			grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1.2fr);
		}

		.tutorial-section--reverse .tutorial-section__copy {
			order: 2;
		}

		.tutorial-section--reverse .tutorial-section__media {
			order: 1;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/contacts.json
```json
[
  {
    "id": "email-hello-tk-sg",
    "label": "Email",
    "channel_type": "email",
    "value": "hello@tk.sg"
  },
  {
    "id": "phone-69176920",
    "label": "Phone",
    "channel_type": "phone",
    "value": "69176920"
  },
  {
    "id": "email-hello-tinkercademy-com",
    "label": "Email",
    "channel_type": "email",
    "value": "hello@tinkercademy.com"
  },
  {
    "id": "email-imda-codesg-imda-gov-sg",
    "label": "Email",
    "channel_type": "email",
    "value": "imda_codesg@imda.gov.sg"
  },
  {
    "id": "email-hello-tinkerclass-tech",
    "label": "Email",
    "channel_type": "email",
    "value": "hello@tinkerclass.tech"
  },
  {
    "id": "email-yjsoon-tk-sg",
    "label": "Email",
    "channel_type": "email",
    "value": "yjsoon@tk.sg"
  }
]
```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/courses.astro
```astro
---
/**
 * /courses — redirects to /courses-all
 */
return Astro.redirect('/courses-all', 301);
---

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/CourseGrid.astro
```astro
---
/**
 * CourseGrid — programme card grid with page title, search placeholder,
 * and the "Let's Work Together!" nav pill section at the bottom.
 *
 * Props:
 *   programmes     — array of { slug, title, heroImage, audienceLabel, audienceId, duration, shortDescription }
 *   pageTitle      — heading above the grid (e.g. "All Courses")
 *   navPills?      — array of { label, url } for the bottom navigation row
 */
import ProgrammeCard from './ProgrammeCard.astro';

interface Programme {
	slug: string;
	title: string;
	heroImage?: string | null;
	audienceLabel?: string;
	audienceId?: string;
	duration?: string;
	shortDescription?: string;
}

interface NavPill {
	label: string;
	url: string;
}

interface Props {
	programmes: Programme[];
	pageTitle?: string;
	navPills?: NavPill[];
}

const { programmes, pageTitle = 'All Courses', navPills = [] } = Astro.props;
---

<section class="course-listing">
	<div class="shell">
		{/* Heading + search bar */}
		<div class="course-listing__header">
			<h2 class="course-listing__title">{pageTitle}</h2>
			<div class="course-listing__search" aria-label="Search courses">
				<svg viewBox="0 0 256 256" width="20" height="20" fill="currentColor">
					<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
				</svg>
				<span>Search</span>
			</div>
		</div>

		{/* Card grid */}
		<div class="course-listing__grid">
			{programmes.map((prog) => (
				<ProgrammeCard
					slug={prog.slug}
					title={prog.title}
					heroImage={prog.heroImage}
					audienceLabel={prog.audienceLabel}
					audienceId={prog.audienceId}
					duration={prog.duration}
					shortDescription={prog.shortDescription}
				/>
			))}
		</div>
	</div>
</section>

{/* Bottom "Let's Work Together!" nav section */}
{navPills.length > 0 && (
	<section class="pivot-section">
		<div class="shell">
			<h2 class="pivot-section__heading">Let's Work Together!</h2>
			<div class="pivot-section__pills">
				{navPills.map((pill) => (
					<a class="pivot-pill" href={pill.url}>{pill.label}</a>
				))}
			</div>
		</div>
	</section>
)}

<style>
	/* ─── Header ─────────────────────────────────────────── */
	.course-listing {
		padding: 2rem 0 0;
	}

	.course-listing__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.course-listing__title {
		font-family: 'Oswald', sans-serif;
		font-weight: 500;
		font-size: 1.6rem;
		color: rgb(51, 51, 51);
		margin: 0;
	}

	.course-listing__search {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgb(247, 247, 247);
		border-radius: 20px;
		padding: 0.5rem 1rem;
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		color: rgb(117, 117, 117);
		cursor: pointer;
		user-select: none;
	}

	.course-listing__search svg {
		color: rgb(240, 93, 87);
		flex-shrink: 0;
	}

	/* ─── Grid ───────────────────────────────────────────── */
	.course-listing__grid {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(4, minmax(200px, 1fr));
	}

	@media (min-width: 1600px) {
		.course-listing__grid {
			grid-template-columns: repeat(5, minmax(200px, 1fr));
		}
	}

	@media (max-width: 1199px) {
		.course-listing__grid {
			grid-template-columns: repeat(2, minmax(200px, 1fr));
		}
	}

	@media (max-width: 809px) {
		.course-listing__grid {
			grid-template-columns: repeat(1, minmax(200px, 1fr));
		}
	}

	/* ─── Pivot / Nav Section ────────────────────────────── */
	.pivot-section {
		padding: 3rem 0;
	}

	.pivot-section__heading {
		font-family: 'Oswald', sans-serif;
		font-weight: 500;
		font-size: 1.6rem;
		color: rgb(51, 51, 51);
		text-align: center;
		margin: 0 0 1.25rem;
	}

	.pivot-section__pills {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
	}

	.pivot-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 10px 20px;
		border-radius: 30px;
		background-color: rgb(240, 93, 87);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
		color: #fff;
		font-family: 'Rubik', sans-serif;
		font-size: 0.85rem;
		font-weight: 400;
		text-decoration: none;
		cursor: pointer;
		transition: opacity 0.15s;
	}

	.pivot-pill:hover {
		opacity: 0.85;
	}

	@media (max-width: 809px) {
		.pivot-section__pills {
			flex-direction: column;
			align-items: center;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/lib/data.js
```js
import assets from '../data/pages/assets.json';
import audiences from '../data/pages/audiences.json';
import contacts from '../data/pages/contacts.json';
import ctaDestinations from '../data/pages/cta-destinations.json';
import forms from '../data/pages/forms.json';
import locations from '../data/pages/locations.json';
import programmes from '../data/pages/programmes.json';
import siteSettings from '../data/pages/site-settings.json';
import socialLinks from '../data/pages/social-links.json';
import staticPages from '../data/pages/static-pages.json';
import topics from '../data/pages/topics.json';
import tutorials from '../data/pages/tutorials.json';

function indexBy(items) {
	return new Map((items ?? []).map((item) => [item.id, item]));
}

export function getSiteData() {
	const audienceById = indexBy(audiences);
	const topicById = indexBy(topics);
	const ctaById = indexBy(ctaDestinations);

	return {
		siteSettings,
		audiences,
		topics,
		contacts,
		locations,
		socialLinks,
		ctaDestinations,
		forms,
		staticPages,
		assets,
		programmes: programmes.map((programme) => ({
			...programme,
			audiences: (programme.audience_ids ?? []).map((id) => audienceById.get(id)).filter(Boolean),
			topics: (programme.topic_ids ?? []).map((id) => topicById.get(id)).filter(Boolean),
			ctas: (programme.cta_ids ?? []).map((id) => ctaById.get(id)).filter(Boolean),
		})),
		tutorials: tutorials.map((tutorial) => ({
			...tutorial,
			audiences: (tutorial.audience_ids ?? []).map((id) => audienceById.get(id)).filter(Boolean),
			topics: (tutorial.topic_ids ?? []).map((id) => topicById.get(id)).filter(Boolean),
		})),
	};
}

export function getStaticPage(pagePath) {
	return getSiteData().staticPages.find((page) => page.path === pagePath) ?? null;
}

/**
 * Extract programme slugs referenced by a static page's CTAs.
 * CTAs whose URL matches `https://tinkercademy.com/programmes/<slug>`
 * are treated as programme references.
 */
function extractProgrammeSlugsFromCtas(ctas) {
	const PROGRAMME_RE = /^https?:\/\/tinkercademy\.com\/programmes\/([^/?#]+)/;
	const slugs = [];
	for (const cta of ctas ?? []) {
		const match = cta.url?.match(PROGRAMME_RE);
		if (match) slugs.push(match[1]);
	}
	return slugs;
}

/**
 * Extract a short description from a CTA label by stripping the known
 * programme title, audience names, "Age Group" artefact, and duration.
 * Returns the remaining text or an empty string.
 */
function extractShortDescription(ctaLabel, programmeTitle, programmeDuration) {
	if (!ctaLabel || !programmeTitle) return '';

	// Everything after the title
	const idx = ctaLabel.indexOf(programmeTitle);
	if (idx < 0) return '';
	let rest = ctaLabel.substring(idx + programmeTitle.length);

	// Strip leading "Age Group" artefact
	rest = rest.replace(/^Age Group/, '');

	// If we know the duration, find it and take everything after
	if (programmeDuration) {
		const durIdx = rest.indexOf(programmeDuration);
		if (durIdx >= 0) {
			return rest.substring(durIdx + programmeDuration.length).trim();
		}
	}

	// Fallback: strip known audience labels
	const AUDIENCE_LABELS = ['Businesses', 'Public', 'Students', 'Teachers'];
	for (const label of AUDIENCE_LABELS) {
		if (rest.startsWith(label)) {
			rest = rest.substring(label.length);
			break;
		}
	}

	return rest.trim();
}

/**
 * For a given static page, resolve the list of programmes it references
 * (via CTA URLs), enriched with card-display data.
 *
 * Returns an array of objects ready for <ProgrammeCard> / <CourseGrid>:
 *   { slug, title, heroImage, audienceLabel, audienceId, duration, shortDescription }
 */
export function getProgrammesForPage(page) {
	if (!page?.ctas) return [];

	const site = getSiteData();
	const programmeBySlug = new Map(site.programmes.map((p) => [p.slug, p]));
	const ctaSlugs = extractProgrammeSlugsFromCtas(page.ctas);

	// Build a map from slug → CTA label for short-description extraction
	const ctaLabelBySlug = new Map();
	const PROGRAMME_RE = /^https?:\/\/tinkercademy\.com\/programmes\/([^/?#]+)/;
	for (const cta of page.ctas ?? []) {
		const match = cta.url?.match(PROGRAMME_RE);
		if (match) ctaLabelBySlug.set(match[1], cta.label);
	}

	return ctaSlugs.reduce((items, slug) => {
		const prog = programmeBySlug.get(slug);
		if (!prog) return items;

		const primaryAudience = prog.audiences?.[0];
		const ctaLabel = ctaLabelBySlug.get(slug) ?? '';
		const shortDesc = extractShortDescription(ctaLabel, prog.title, prog.duration);

		items.push({
			slug: prog.slug,
			title: prog.title,
			heroImage: prog.hero_image ?? null,
			audienceLabel: primaryAudience?.label ?? 'Programme',
			audienceId: primaryAudience?.id ?? '',
			duration: prog.duration ?? '',
			shortDescription: shortDesc,
		});

		return items;
	}, []);
}

/**
 * Extract non-programme navigation CTA pills from a page's CTAs.
 * These are internal links that don't point to /programmes/ and aren't
 * footer/utility links (external, form, email, phone).
 */
export function getNavPillsForPage(page) {
	if (!page?.ctas) return [];

	const PROGRAMME_RE = /\/programmes\//;
	return (page.ctas ?? [])
		.filter((cta) => {
			if (cta.type !== 'internal') return false;
			if (PROGRAMME_RE.test(cta.url ?? '')) return false;
			// Skip generic footer links that appear on every page
			const label = (cta.label ?? '').toLowerCase();
			if (['our courses', 'our projects'].includes(label)) return false;
			return true;
		})
		.map((cta) => {
			let url = cta.url ?? '/';
			// Normalise tinkercademy.com URLs to relative paths
			try {
				const parsed = new URL(url, 'https://tinkercademy.com');
				if (parsed.origin === 'https://tinkercademy.com') {
					url = parsed.pathname || '/';
				}
			} catch {
				// keep as-is
			}
			return { label: cta.label, url };
		});
}

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/PageHero.astro
```astro
---
type PageHeroProps = {
	eyebrow?: string | null;
	title: string;
	lead?: string | null;
	badges?: string[];
};

const props = Astro.props as PageHeroProps;
const eyebrow = props.eyebrow ?? null;
const title = props.title;
const lead = props.lead ?? null;
const badges = props.badges ?? [];
---

<section class="hero">
	<div class="shell hero-inner">
		{eyebrow && <p class="eyebrow">{eyebrow}</p>}
		<h1>{title}</h1>
		{lead && <p class="lead">{lead}</p>}
		{badges.length > 0 && (
			<ul class="badge-row">
				{badges.map((badge) => <li>{badge}</li>)}
			</ul>
		)}
	</div>
</section>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/social-links.yml
```yml
- id: x
  platform: x
  label: x.com
  url: https://x.com/tinkercademy
- id: facebook
  platform: facebook
  label: facebook.com
  url: https://www.facebook.com/tinkercademy/
- id: instagram
  platform: instagram
  label: instagram.com
  url: https://www.instagram.com/tinkercademy/
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/company/tinkertanker/
- id: github
  platform: github
  label: github.com
  url: https://github.com/tinkertanker
- id: blog
  platform: blog
  label: blog.tinkercademy.com
  url: https://blog.tinkercademy.com/
- id: blog
  platform: blog
  label: Read more about our Digital Maker Programme initiatives at our blog
  url: https://blog.tinkercademy.com/digital-maker-programme-998927090ddc
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/in/yjsoon/
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/in/mikejgonsalves/?originalSubdomain=sg
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/in/akmalabdulrahman/?originalSubdomain=sg
- id: medium
  platform: medium
  label: medium.com
  url: https://medium.com/@Anzomtx
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/in/keesweepengbenjamin/
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/in/tracey-the-tinkerer/?originalSubdomain=sg
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/in/stevencjchan/?originalSubdomain=sg
- id: linkedin
  platform: linkedin
  label: linkedin.com
  url: https://www.linkedin.com/in/graceyan808/
- id: github
  platform: github
  label: Download and extract this project
  url: https://github.com/MrPudin/ureMorse/archive/master.zip
- id: github
  platform: github
  label: here
  url: https://github.com/microbit-playground/microbit-servo-class/blob/master/servo.py
- id: github
  platform: github
  label: This link
  url: https://github.com/fizban99/microbit_ssd1306
- id: github
  platform: github
  label: GitHub Edu pack
  url: https://github.com/edu

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/locations.yml
```yml
- id: jalan-pemimpin-office
  name: Tinkercademy Office
  address: "59 Jalan Pemimpin #04-01, L&Y Building, Singapore 577218"
  delivery_modes:
    - in-person

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/forms.json
```json
[
  {
    "id": "https-form-jotform-com-223001013827440",
    "provider": "jotform",
    "endpoint": "https://form.jotform.com/223001013827440",
    "method": "link"
  }
]
```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/index.astro
```astro
---
import CtaBanner from '../components/CtaBanner.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getSiteData, getStaticPage } from '../lib/data.js';
import { toSiteHref } from '../lib/links.js';
import {
	HOME_CERTIFICATION_BADGES,
	HOME_COURSE_DOMAINS,
	HOME_FLAGSHIP_IMAGES,
	HOME_INSTITUTION_LOGOS,
	HOME_PARTNER_LOGOS,
	HOME_POPULAR_COURSE_ICONS,
} from '../lib/site-media.js';

const site = getSiteData();
const page = getStaticPage('/');
const featuredProgrammeOrder = new Map(
	(page?.featured_programme_slugs ?? []).map((slug, index) => [slug, index]),
);
const featuredProgrammes =
	featuredProgrammeOrder.size > 0
		? site.programmes
				.filter((programme) => featuredProgrammeOrder.has(programme.slug))
				.sort(
					(left, right) =>
						(featuredProgrammeOrder.get(left.slug) ?? 0) -
						(featuredProgrammeOrder.get(right.slug) ?? 0),
				)
		: site.programmes.slice(0, 5);
const heroActions = page?.hero_actions ?? [];
const flagshipItems = page?.flagship_items ?? [];
const closingCtas = page?.closing_ctas ?? [];

// Partner logos — duplicated for seamless marquee
const partnerLogosDouble = [...HOME_PARTNER_LOGOS, ...HOME_PARTNER_LOGOS];
// Institution logos — duplicated for seamless marquee
const institutionLogosDouble = [...HOME_INSTITUTION_LOGOS, ...HOME_INSTITUTION_LOGOS];
// Certification badges — duplicated for seamless marquee
const certBadgesDouble = [...HOME_CERTIFICATION_BADGES, ...HOME_CERTIFICATION_BADGES];

const flagshipLinks: Record<string, string> = {
	'Swift Accelerator': 'https://swiftinsg.org/',
	'IMDA LEARN Roadmap':
		'https://www.imda.gov.sg/how-we-can-help/infocomm-media-clubs/learn-roadmaps',
	'Code For Fun': 'https://codeforfun.sg/',
};
const flagshipCards = flagshipItems.map((item) => ({
	...item,
	image: HOME_FLAGSHIP_IMAGES[item.title] ?? item.image ?? null,
	url: flagshipLinks[item.title] ?? null,
}));

const popularCourseThumbs = featuredProgrammes.map((programme) => {
	const mapped = HOME_POPULAR_COURSE_ICONS[programme.slug];
	if (mapped) {
		return { ...programme, thumb: { kind: 'icon' as const, src: mapped } };
	}
	if (programme.slug === 'building-agents-with-openclaw' && programme.hero_image) {
		return { ...programme, thumb: { kind: 'hero' as const, src: programme.hero_image } };
	}
	return {
		...programme,
		thumb: {
			kind: 'label' as const,
			label: programme.title.split(/\s+/).slice(0, 2).join(' '),
		},
	};
});
---

<BaseLayout
	title={page?.seo?.title ?? 'Tinkercademy: Coding and Making for Schools and Professionals'}
	description={page?.seo?.description ??
		"We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide."}
	canonical="https://tinkercademy.com/"
	image={page?.hero_image ?? undefined}
>
	<!-- ━━ 1. Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	<section class="home-hero">
		<img class="home-hero__bg" src="/images/hero-bg.jpg" alt="" />
		<div class="home-hero__gradient"></div>
		<div class="home-hero__content shell">
			<h1>
				<span class="home-hero__line1">Learn coding and digital making</span>
				<span class="home-hero__line2">from expert coders and makers.</span>
			</h1>
			{heroActions.length > 0 && (
				<div class="hero-actions">
					{heroActions.map((cta) => (
						<a class="hero-pill" href={toSiteHref(cta.url)}>
							{cta.label}
						</a>
					))}
				</div>
			)}
		</div>
	</section>

	<!-- ━━ 2. Partners ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	<section class="section-marquee">
		<div class="shell">
			<p class="marquee-label">
				Official training partner for tech companies, universities, and the Singapore
				government.
			</p>
		</div>
		<div class="marquee-track-wrap" aria-label="Training partners">
			<div class="marquee-track marquee-track--partners">
				{partnerLogosDouble.map((logo, i) => (
					<a
						href={logo.url}
						target="_blank"
						rel="noopener noreferrer"
						class="marquee-logo-link"
					>
						<img
							class="marquee-logo"
							src={logo.src}
							alt={i < HOME_PARTNER_LOGOS.length ? logo.label : ''}
							aria-hidden={i >= HOME_PARTNER_LOGOS.length ? 'true' : undefined}
							loading="lazy"
						/>
					</a>
				))}
			</div>
		</div>
	</section>

	<!-- ━━ 3. Course Domains ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	<section class="section-domains">
		<div class="shell">
			<p class="marquee-label">
				Courses available in a wide variety of modern, practical domains.
			</p>
			<div class="domain-bubbles">
				{HOME_COURSE_DOMAINS.map((domain) => (
					<span class="domain-bubble">{domain}</span>
				))}
			</div>
		</div>
	</section>

	<!-- ━━ 4. Expertise / Institutions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	<section class="section-marquee">
		<div class="shell">
			<p class="marquee-label">
				Led by experts with qualifications and experience from world-class institutions.
			</p>
		</div>
		<div class="marquee-track-wrap" aria-label="Institutions">
			<div class="marquee-track marquee-track--institutions">
				{institutionLogosDouble.map((logo, i) => (
					<img
						class="marquee-logo"
						src={logo.src}
						alt={i < HOME_INSTITUTION_LOGOS.length ? logo.label : ''}
						aria-hidden={i >= HOME_INSTITUTION_LOGOS.length ? 'true' : undefined}
						loading="lazy"
					/>
				))}
			</div>
		</div>
	</section>

	<!-- ━━ 5. Certifications ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	<section class="section-marquee">
		<div class="shell">
			<p class="marquee-label">
				Curriculum designed and delivered by officially certified instructors.
			</p>
		</div>
		<div class="marquee-track-wrap" aria-label="Certifications">
			<div class="marquee-track marquee-track--certs">
				{certBadgesDouble.map((badge, i) => (
					<img
						class="marquee-logo marquee-logo--cert"
						src={badge.src}
						alt={i < HOME_CERTIFICATION_BADGES.length ? badge.label : ''}
						aria-hidden={i >= HOME_CERTIFICATION_BADGES.length ? 'true' : undefined}
						loading="lazy"
					/>
				))}
			</div>
		</div>
	</section>

	<!-- ━━ 6. Flagship Programmes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	{flagshipCards.length > 0 && (
		<section class="flagship-section shell">
			<div class="flagship-section__intro">
				<p class="section-kicker">
					Our Flagship<br />Programmes
				</p>
			</div>
			<div class="flagship-section__stack">
				{flagshipCards.map((item) => (
					<article class="flagship-card">
						{item.image && (
							<img
								class="flagship-card__image"
								src={item.image}
								alt={item.title}
								loading="lazy"
							/>
						)}
						<div class="flagship-card__copy">
							<h2>{item.title}</h2>
							<p>{item.description}</p>
							{item.url && (
								<a class="flagship-card__link" href={item.url}>
									Read More
								</a>
							)}
						</div>
					</article>
				))}
			</div>
		</section>
	)}

	<!-- ━━ 7. Popular Courses ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	<section class="popular-section shell" id="programmes">
		<div class="popular-section__header">
			<p class="section-kicker">Popular Courses</p>
			<a href="/courses-all" class="popular-section__viewall">View all</a>
		</div>
		<div class="popular-carousel-wrap">
			<div class="popular-carousel">
				{popularCourseThumbs.map((programme) => (
					<a class="course-card" href={`/programmes/${programme.slug}`}>
						<div class="course-card__image-wrap">
							{programme.thumb.kind === 'label' ? (
								<span class="course-card__label-text">{programme.thumb.label}</span>
							) : (
								<img
									class:list={[
										'course-card__image',
										programme.thumb.kind === 'hero' && 'course-card__image--cover',
									]}
									src={programme.thumb.src}
									alt={programme.title}
									loading="lazy"
								/>
							)}
						</div>
						<div class="course-card__body">
							<span class="course-card__tag">
								{programme.audiences[0]?.label ?? 'Programme'}
							</span>
							<h3 class="course-card__title">{programme.title}</h3>
						</div>
					</a>
				))}
			</div>
		</div>
	</section>

	<!-- ━━ 8. CTA Banner ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
	<CtaBanner
		text={page?.closing_statement}
		ctas={closingCtas.length > 0
			? closingCtas.map((cta) => ({ label: cta.label, url: toSiteHref(cta.url) }))
			: undefined}
	/>
</BaseLayout>

<style>
	/* ═══════════════════════════════════════════════════════════════════
	   1. HERO
	   ═══════════════════════════════════════════════════════════════════ */
	.home-hero {
		position: relative;
		width: 100vw;
		margin-inline: calc(50% - 50vw);
		min-height: clamp(460px, 65vh, 680px);
		overflow: clip;
		background: #000;
	}

	.home-hero__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.home-hero__gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0.7) 10%,
			rgba(36, 36, 36, 0) 54%,
			rgba(0, 0, 0, 0.7) 90%
		);
	}

	.home-hero__content {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 1.25rem;
		min-height: inherit;
		padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
		padding-top: 2rem;
	}

	.home-hero h1 {
		margin: 0;
		font-family: 'Oswald', sans-serif;
		text-transform: uppercase;
		color: #ffffff;
		line-height: 0.92;
	}

	.home-hero__line1 {
		display: block;
		font-size: clamp(2.6rem, 6.5vw, 5.2rem);
		font-weight: 500;
		max-width: 8ch;
	}

	.home-hero__line2 {
		display: block;
		font-size: clamp(1.1rem, 2vw, 1.5rem);
		font-weight: 300;
		margin-top: 0.5rem;
		opacity: 0.85;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.hero-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.55rem 1rem;
		border-radius: 30px;
		border: 1px solid rgba(255, 255, 255, 0.6);
		background: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		text-decoration: none;
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		font-weight: 400;
		transition: background 0.15s;
	}

	.hero-pill:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	/* ═══════════════════════════════════════════════════════════════════
	   2–5. MARQUEE SECTIONS (Partners, Institutions, Certifications)
	   ═══════════════════════════════════════════════════════════════════ */
	.section-marquee {
		padding: 2rem 0;
	}

	.marquee-label {
		margin: 0 0 1.5rem;
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		font-weight: 400;
		line-height: 1.6;
		text-align: center;
		color: rgb(110, 110, 110);
	}

	.marquee-track-wrap {
		overflow: clip;
		mask-image: linear-gradient(
			90deg,
			transparent 0%,
			#000 8%,
			#000 92%,
			transparent 100%
		);
	}

	.marquee-track {
		display: flex;
		align-items: center;
		gap: 3.5rem;
		width: max-content;
		animation: marquee-scroll 40s linear infinite;
	}

	.marquee-track--partners {
		animation-duration: 35s;
	}

	.marquee-track--institutions {
		animation-duration: 30s;
	}

	.marquee-track--certs {
		animation-duration: 38s;
	}

	.marquee-logo-link {
		display: inline-flex;
		flex: none;
	}

	.marquee-logo {
		flex: none;
		width: auto;
		height: clamp(32px, 4vw, 56px);
		object-fit: contain;
		opacity: 0.55;
	}

	.marquee-logo--cert {
		height: clamp(48px, 6vw, 80px);
		opacity: 0.75;
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-50% - 1.75rem));
		}
	}

	/* ═══════════════════════════════════════════════════════════════════
	   3. COURSE DOMAINS
	   ═══════════════════════════════════════════════════════════════════ */
	.section-domains {
		padding: 1.5rem 0 2rem;
	}

	.domain-bubbles {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.domain-bubble {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: 30px;
		border: 1px solid rgb(200, 200, 200);
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		font-weight: 400;
		color: rgb(61, 61, 61);
		white-space: nowrap;
	}

	/* ═══════════════════════════════════════════════════════════════════
	   6. FLAGSHIP PROGRAMMES
	   ═══════════════════════════════════════════════════════════════════ */
	.flagship-section {
		display: grid;
		grid-template-columns: 200px minmax(0, 1fr);
		gap: 2rem;
		padding: 3rem 0;
	}

	.section-kicker {
		margin: 0;
		font-family: 'Oswald', sans-serif;
		font-size: clamp(2rem, 3.5vw, 2.8rem);
		font-weight: 500;
		line-height: 0.95;
		text-transform: uppercase;
		color: rgb(240, 93, 87);
	}

	.flagship-section__stack {
		display: grid;
		gap: 1rem;
	}

	.flagship-card {
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		gap: 1.25rem;
		align-items: center;
		padding: 1rem;
		border-radius: 16px;
		background: #ffffff;
		border: 1px solid rgb(230, 230, 230);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
	}

	.flagship-card__image {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 8px;
	}

	.flagship-card__copy {
		display: grid;
		gap: 0.5rem;
	}

	.flagship-card__copy h2 {
		margin: 0;
		font-family: 'Oswald', sans-serif;
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		color: rgb(23, 23, 23);
	}

	.flagship-card__copy p {
		margin: 0;
		font-family: 'Rubik', sans-serif;
		font-size: 0.88rem;
		line-height: 1.7;
		color: rgb(110, 110, 110);
	}

	.flagship-card__link {
		display: inline-flex;
		align-items: center;
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: 30px;
		background: rgb(240, 93, 87);
		color: #ffffff;
		text-decoration: none;
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		font-weight: 500;
		margin-top: 0.25rem;
		transition: background 0.15s;
	}

	.flagship-card__link:hover {
		background: rgb(210, 73, 67);
	}

	/* ═══════════════════════════════════════════════════════════════════
	   7. POPULAR COURSES (Carousel)
	   ═══════════════════════════════════════════════════════════════════ */
	.popular-section {
		padding: 2rem 0 3rem;
	}

	.popular-section__header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.popular-section__viewall {
		font-family: 'Rubik', sans-serif;
		font-size: 0.82rem;
		color: rgb(110, 110, 110);
		text-decoration: none;
	}

	.popular-section__viewall:hover {
		color: rgb(240, 93, 87);
	}

	.popular-carousel-wrap {
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		margin: 0 calc(-0.75rem);
		padding: 0 0.75rem;
	}

	.popular-carousel {
		display: flex;
		gap: 1rem;
		width: max-content;
	}

	.course-card {
		display: flex;
		flex-direction: column;
		width: 240px;
		flex: none;
		text-decoration: none;
		border-radius: 12px;
		overflow: clip;
		border: 1px solid rgb(34, 34, 34);
		background: rgb(23, 23, 23);
		transition: transform 0.2s;
	}

	.course-card:hover {
		transform: translateY(-2px);
	}

	.course-card__image-wrap {
		display: grid;
		place-items: center;
		aspect-ratio: 16 / 10;
		padding: 1rem;
		background: rgb(23, 23, 23);
		overflow: clip;
	}

	.course-card__label-text {
		font-family: 'Oswald', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		text-transform: uppercase;
		color: #ffffff;
		text-align: center;
		line-height: 1;
	}

	.course-card__image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.course-card__image--cover {
		object-fit: cover;
	}

	.course-card__body {
		padding: 0.75rem 1rem 1rem;
		display: grid;
		gap: 0.4rem;
	}

	.course-card__tag {
		font-family: 'Rubik', sans-serif;
		font-size: 0.72rem;
		font-weight: 400;
		color: rgb(153, 153, 153);
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.course-card__title {
		margin: 0;
		font-family: 'Oswald', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		text-transform: uppercase;
		color: #ffffff;
		line-height: 1.15;
	}

	/* ═══════════════════════════════════════════════════════════════════
	   RESPONSIVE
	   ═══════════════════════════════════════════════════════════════════ */
	@media (max-width: 1199px) {
		.flagship-section {
			grid-template-columns: 160px minmax(0, 1fr);
		}
	}

	@media (max-width: 809px) {
		.home-hero {
			min-height: 420px;
		}

		.home-hero__line1 {
			max-width: 6ch;
		}

		.flagship-section {
			grid-template-columns: 1fr;
		}

		.flagship-card {
			grid-template-columns: 1fr;
		}

		.flagship-card__image {
			aspect-ratio: 16 / 9;
		}

		.course-card {
			width: 200px;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/tutorials/[slug].astro
```astro
---
import CtaBanner from '../../components/CtaBanner.astro';
import HeroMedia from '../../components/HeroMedia.astro';
import TutorialStory from '../../components/TutorialStory.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getSiteData } from '../../lib/data.js';

export function getStaticPaths() {
	return getSiteData().tutorials.map((tutorial) => ({
		params: { slug: tutorial.slug },
		props: { tutorial },
	}));
}

const { tutorial } = Astro.props;
const canonical = new URL(`/tutorials/${tutorial.slug}`, 'https://tinkercademy.com').toString();
const contentItems =
	tutorial.content?.[0]?.type === 'image' && tutorial.content[0]?.src === tutorial.hero_image
		? tutorial.content.slice(1)
		: tutorial.content;
---

<BaseLayout
	title={tutorial.seo?.title ?? tutorial.title}
	description={tutorial.seo?.description ?? tutorial.description ?? ''}
	canonical={canonical}
	image={tutorial.hero_image ?? undefined}
>
	<section class="tutorial-banner">
		<div class="shell tutorial-banner__inner">
			<p class="eyebrow">Tutorial</p>
			<h1>{tutorial.title}</h1>
			{tutorial.subtitle && <p class="tutorial-banner__subtitle">{tutorial.subtitle}</p>}
			{tutorial.description && <p class="tutorial-banner__lead">{tutorial.description}</p>}
		</div>
	</section>
	<HeroMedia src={tutorial.hero_image} alt={tutorial.title} compact />
	<TutorialStory items={contentItems} />
	<CtaBanner />
</BaseLayout>

<style>
	.tutorial-banner {
		padding: 3.5rem 0 2rem;
		background:
			radial-gradient(circle at top left, rgba(242, 93, 87, 0.22), transparent 42%),
			linear-gradient(135deg, #342c68 0%, #453881 42%, #251e51 100%);
		color: #fffdf8;
	}

	.tutorial-banner__inner {
		display: grid;
		gap: 0.75rem;
		padding: 0.5rem 0;
	}

	.tutorial-banner h1 {
		margin: 0;
		max-width: 10ch;
		font-family: var(--heading);
		font-size: clamp(2.6rem, 6vw, 4.8rem);
		line-height: 0.95;
		text-transform: uppercase;
	}

	.tutorial-banner :global(.eyebrow) {
		color: rgba(255, 253, 248, 0.72);
	}

	.tutorial-banner__subtitle,
	.tutorial-banner__lead {
		max-width: 56ch;
		margin: 0;
		line-height: 1.7;
	}

	.tutorial-banner__subtitle {
		font-size: 1.05rem;
		font-family: var(--meta);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: rgba(255, 253, 248, 0.82);
	}

	.tutorial-banner__lead {
		color: rgba(255, 253, 248, 0.92);
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/programmes.yml
```yml
- id: imda-phaser-2025
  slug: imda-phaser-2025
  title: AI-Driven Game Development on Phaser
  subtitle: null
  duration: 24 hours
  description: Students will learn game development using Phaser.js, a powerful
    HTML5 framework for creating interactive 2D games. Through hands-on
    projects, they will explore game design fundamentals, including sprite
    animation, physics, user input, and level creation. They will apply
    structured development workflows—planning, prototyping, and testing—to build
    engaging browser-based games from scratch.
  hero_image: /images/remote/RxSGzAwHnPNmiolhpN9izHUQdvs.webp"AI-Driven Game Development on Phaser - Tinkercademy: Coding and Making
      for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-phaser-2025
    openGraph:
      title: "AI-Driven Game Development on Phaser - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "AI-Driven Game Development on Phaser - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/RxSGzAwHnPNmiolhpN9izHUQdvs.webp"https://zenitanteducation.com/"><a>Zenitant</a></a> is a
        fellow Microsoft Global Training Partner, with whom we are happy to
        partner to offer these courses to primary schools. Through our close
        collaboration, we have brought the annual <a
        href="https://3dtronics.asia/"><a>3d-tronics Micro-controller
        Challenge</a></a> from 2018 to 2022. Students will be guided through the
        process of signing up for their free <a
        href="https://github.com/edu"><a>GitHub Edu pack</a></a>, offering
        GitHub Copilot licenses for AI-assisted coding (usually US$10/month).
        Training is provided under Zenitant Pte Ltd., with curriculum designed
        by Tinkercademy — <a href="mailto:yjsoon@tk.sg"><a>email us</a></a> to
        find out
        more.</p><h5><strong>Requirements</strong></h5><p><strong>Hardware:</strong>
        Windows, Mac, or Chromebook<br
        /><strong>Software:</strong></p><ul><li><p>VS Code (via <a
        href="https://vscodeedu.com/" target="_blank" rel="noopener
        noreferrer"><a>vscodeedu.com</a></a>)</p></li><li><p>A modern browser
        (Chrome, Firefox, Edge, or
        Safari)</p></li><li><p>Padlet</p></li><li><p>Phaser (via <a
        href="https://phaser.io/download" target="_blank" rel="noopener
        noreferrer"><a>phaser.io/download</a></a>)</p></li></ul>
      text: "Zenitant is a fellow Microsoft Global Training Partner, with whom we are
        happy to partner to offer these courses to primary schools. Through our
        close collaboration, we have brought the annual 3d-tronics
        Micro-controller Challenge from 2018 to 2022. Students will be guided
        through the process of signing up for their free GitHub Edu pack,
        offering GitHub Copilot licenses for AI-assisted coding (usually
        US$10/month). Training is provided under Zenitant Pte Ltd., with
        curriculum designed by Tinkercademy — email us to find out
        more.RequirementsHardware: Windows, Mac, or ChromebookSoftware:VS Code
        (via vscodeedu.com)A modern browser (Chrome, Firefox, Edge, or
        Safari)PadletPhaser (via phaser.io/download)"
- id: imda-apple-2025-b
  slug: imda-apple-2025-b
  title: App Development Basics with Swift Playgrounds
  subtitle: null
  duration: 26 hours
  description: In this course, suitable for beginning coders and students who have
    learned coding and are interested in mobile app development, students will
    learn coding fundamentals using Swift and SwiftUI, the same language and
    framework used by professional mobile app developers worldwide to build apps
    for iPhone, iPad, and even the Apple Vision Pro.
  hero_image: /images/remote/MieXrGTvm2GnVsHnT6TfYWd9w.png"App Development Basics with Swift Playgrounds - Tinkercademy: Coding and
      Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-apple-2025-b
    openGraph:
      title: "App Development Basics with Swift Playgrounds - Tinkercademy: Coding and
        Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "App Development Basics with Swift Playgrounds - Tinkercademy: Coding and
        Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/MieXrGTvm2GnVsHnT6TfYWd9w.png"https://swiftexplorers.sg" target="_blank" rel="noopener
        noreferrer"><a>Swift Explorers
        Challenge</a></a>.</p><p><strong>Requirements</strong></p><ul><li><p><strong>Hardware:
        </strong> iPad with iPadOS 17 or newer: minimum iPad 6th Gen, iPad Air
        3rd Gen, iPad mini 5th Gen, iPad Pro 12” 2nd Gen, any iPad Pro 11”,
        <em>or </em>Mac devices with macOS Ventura or newer: MacBook Pro 2017 or
        later, MacBook Air 2018 or later, iMac 2017 or later, Mac mini 2018 or
        later.</p></li><li><p><strong>Software</strong>: Keynote 14 or newer;
        Swift Playgrounds 4.5 or newer. Both free from Apple App
        Store.</p></li></ul>'
      text: "ProjectStudents will create an app prototype or experience, which can be
        submitted for the Swift Explorers Challenge.RequirementsHardware: iPad
        with iPadOS 17 or newer: minimum iPad 6th Gen, iPad Air 3rd Gen, iPad
        mini 5th Gen, iPad Pro 12” 2nd Gen, any iPad Pro 11”, or Mac devices
        with macOS Ventura or newer: MacBook Pro 2017 or later, MacBook Air 2018
        or later, iMac 2017 or later, Mac mini 2018 or later.Software: Keynote
        14 or newer; Swift Playgrounds 4.5 or newer. Both free from Apple App
        Store."
- id: imda-apple-2025-c
  slug: imda-apple-2025-c
  title: App Development Explorations with Swift Playgrounds
  subtitle: null
  duration: 26 hours
  description: This course, suitable for students with programming experience in
    Swift or web/game/mobile development, empowers interested students to go
    further in SwiftUI with Augmented Reality, Machine Learning, and more.
  hero_image: /images/remote/MieXrGTvm2GnVsHnT6TfYWd9w.png"App Development Explorations with Swift Playgrounds - Tinkercademy:
      Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-apple-2025-c
    openGraph:
      title: "App Development Explorations with Swift Playgrounds - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "App Development Explorations with Swift Playgrounds - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/MieXrGTvm2GnVsHnT6TfYWd9w.png"https://swiftexplorers.sg" target="_blank" rel="noopener
        noreferrer"><a>Swift Explorers
        Challenge</a></a>.</p><p><strong>Requirements</strong></p><ul><li><p><strong>Hardware:
        </strong> iPad with iPadOS 17 or newer: minimum iPad 6th Gen, iPad Air
        3rd Gen, iPad mini 5th Gen, iPad Pro 12” 2nd Gen, any iPad Pro 11”,
        <em>or </em>Mac devices with macOS Ventura or newer: MacBook Pro 2017 or
        later, MacBook Air 2018 or later, iMac 2017 or later, Mac mini 2018 or
        later.</p></li><li><p><strong>Software</strong>: Swift Playgrounds 4.5
        or newer. Free from Apple App Store.</p></li></ul>'
      text: "ProjectStudents will create an app prototype or experience, which can be
        submitted for the Swift Explorers Challenge.RequirementsHardware: iPad
        with iPadOS 17 or newer: minimum iPad 6th Gen, iPad Air 3rd Gen, iPad
        mini 5th Gen, iPad Pro 12” 2nd Gen, any iPad Pro 11”, or Mac devices
        with macOS Ventura or newer: MacBook Pro 2017 or later, MacBook Air 2018
        or later, iMac 2017 or later, Mac mini 2018 or later.Software: Swift
        Playgrounds 4.5 or newer. Free from Apple App Store."
- id: imda-apple-2025-a
  slug: imda-apple-2025-a
  title: App Prototyping with Keynote and Swift Playgrounds
  subtitle: null
  duration: 26 hours
  description: Get started with prototyping for building mobile apps using
    real-world design principles from Apple’s Human Interface Guidelines.
  hero_image: /images/remote/MieXrGTvm2GnVsHnT6TfYWd9w.png"App Prototyping with Keynote and Swift Playgrounds - Tinkercademy:
      Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-apple-2025-a
    openGraph:
      title: "App Prototyping with Keynote and Swift Playgrounds - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "App Prototyping with Keynote and Swift Playgrounds - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/MieXrGTvm2GnVsHnT6TfYWd9w.png"https://swiftexplorers.sg" target="_blank" rel="noopener
        noreferrer"><a>Swift Explorers
        Challenge</a></a>.</p><p><strong>Requirements</strong></p><ul><li><p><strong>Hardware:
        </strong> iPad with iPadOS 17 or newer: minimum iPad 6th Gen, iPad Air
        3rd Gen, iPad mini 5th Gen, iPad Pro 12” 2nd Gen, any iPad Pro 11”,
        <em>or </em>Mac devices with macOS Ventura or newer: MacBook Pro 2017 or
        later, MacBook Air 2018 or later, iMac 2017 or later, Mac mini 2018 or
        later.</p></li><li><p><strong>Software</strong>: Keynote 14 or newer;
        Swift Playgrounds 4.5 or newer. Both free from Apple App
        Store.</p></li></ul>'
      text: "ProjectStudents will create an app prototype or experience, which can be
        submitted for the Swift Explorers Challenge.RequirementsHardware: iPad
        with iPadOS 17 or newer: minimum iPad 6th Gen, iPad Air 3rd Gen, iPad
        mini 5th Gen, iPad Pro 12” 2nd Gen, any iPad Pro 11”, or Mac devices
        with macOS Ventura or newer: MacBook Pro 2017 or later, MacBook Air 2018
        or later, iMac 2017 or later, Mac mini 2018 or later.Software: Keynote
        14 or newer; Swift Playgrounds 4.5 or newer. Both free from Apple App
        Store."
- id: build-for-mobile-with-react-native
  slug: build-for-mobile-with-react-native
  title: "Build for Mobile: App Development with React Native"
  subtitle: null
  duration: 2 days
  description: Jump into mobile app development and build real apps that work on
    both iOS and Android!
  hero_image: /images/remote/Xr4xIVKeDdiCsMuiP4gMzxzWM.jpg"Build for Mobile: App Development with React Native - Tinkercademy:
      Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/build-for-mobile-with-react-native
    openGraph:
      title: "Build for Mobile: App Development with React Native - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Build for Mobile: App Development with React Native - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/Xr4xIVKeDdiCsMuiP4gMzxzWM.jpg"<p>Jump into mobile app development and build real apps that work on both
        iOS and Android!</p><p>Ever wondered how apps like Instagram, Airbnb,
        and Discord create native mobile experiences that run seamlessly across
        platforms? The secret is React Native: Meta's powerful framework that
        lets you write code once, and deploy everywhere.</p><p>This hands-on
        course takes you from JavaScript fundamentals through building complete
        mobile applications. You'll start with React Native basics and styling,
        then dive into interactive features with state management, before
        finally creating a full multi-screen info app with navigation and
        real-world functionality.</p><p>Perfect for web developers looking to
        expand into mobile, or anyone wanting to prototype app ideas quickly. By
        the end, you'll have three working apps in your portfolio and the
        confidence to build your own mobile projects. No prior mobile
        development experience required; just bring your curiosity and a
        laptop.</p>"
      text: "Jump into mobile app development and build real apps that work on both
        iOS and Android!Ever wondered how apps like Instagram, Airbnb, and
        Discord create native mobile experiences that run seamlessly across
        platforms? The secret is React Native: Meta's powerful framework that
        lets you write code once, and deploy everywhere.This hands-on course
        takes you from JavaScript fundamentals through building complete mobile
        applications. You'll start with React Native basics and styling, then
        dive into interactive features with state management, before finally
        creating a full multi-screen info app with navigation and real-world
        functionality.Perfect for web developers looking to expand into mobile,
        or anyone wanting to prototype app ideas quickly. By the end, you'll
        have three working apps in your portfolio and the confidence to build
        your own mobile projects. No prior mobile development experience
        required; just bring your curiosity and a laptop."
    - type: richtext
      label: null
      html: <p>This comprehensive React Native program will teach you modern mobile
        app development using JavaScript and industry-standard
        tools.</p><p>You'll gain practical experience building three
        progressively complex applications, learning essential mobile
        development patterns and best practices along the way. The course
        emphasises hands-on coding with immediate feedback through live device
        testing.</p><p><strong>By the end of the program, you
        will:</strong></p><ul><li><p><strong>Try React Native
        fundamentals</strong> including components, JSX syntax, and styling with
        React Native's CSS-like StyleSheet system</p></li><li><p><strong>Build
        interactive mobile UIs</strong> using state management with React hooks,
        event handling, and conditional
        rendering</p></li><li><p><strong>Navigate between screens</strong> using
        React Navigation with stack and tab navigators for professional app
        flows</p></li><li><p><strong>Work with real data</strong> by importing
        JSON data, mapping arrays to UI components, and building dynamic
        lists</p></li><li><p><strong>Create reusable components</strong>
        following React patterns for maintainable, scalable mobile
        applications</p></li><li><p><strong>Deploy and test apps</strong> on
        physical devices using Expo, plus set up local development
        environments</p></li><li><p><strong>Integrate third-party
        libraries</strong> like React Native Paper for polished UI components
        and vector icons</p></li><li><p><strong>Use modern JavaScript
        features</strong> including ES6+ syntax, destructuring, template
        literals, and arrow functions</p></li></ul>
      text: This comprehensive React Native program will teach you modern mobile app
        development using JavaScript and industry-standard tools.You'll gain
        practical experience building three progressively complex applications,
        learning essential mobile development patterns and best practices along
        the way. The course emphasises hands-on coding with immediate feedback
        through live device testing.By the end of the program, you will:Try
        React Native fundamentals including components, JSX syntax, and styling
        with React Native's CSS-like StyleSheet systemBuild interactive mobile
        UIs using state management with React hooks, event handling, and
        conditional renderingNavigate between screens using React Navigation
        with stack and tab navigators for professional app flowsWork with real
        data by importing JSON data, mapping arrays to UI components, and
        building dynamic listsCreate reusable components following React
        patterns for maintainable, scalable mobile applicationsDeploy and test
        apps on physical devices using Expo, plus set up local development
        environmentsIntegrate third-party libraries like React Native Paper for
        polished UI components and vector iconsUse modern JavaScript features
        including ES6+ syntax, destructuring, template literals, and arrow
        functions
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times</strong>: 1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups.</p><p><strong>Location</strong>: CT HUB 2, 114
        Lavender Street.</p><p><strong>Requirements</strong>: Bring your own
        laptop! Modern Windows, Mac or Linux laptops are supported, as
        development will take place in the browser. (iPads and Chromebooks
        provide suboptimal experiences, and are
        discouraged.)</p><p><strong>Fees</strong> (figures in parantheses
        include GST)<br />• Individual sign-up: $1,600 ($1,744)<br />• Groups of
        up to 7: $11,200 ($12,208)<br />• Groups of 8-15: $12,400 ($13,516)<br
        />• Groups of 16 and above: Please email for more information</p><p>All
        quoted prices are in SGD. Invoicing terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups.Location: CT HUB 2, 114 Lavender Street.Requirements: Bring
        your own laptop! Modern Windows, Mac or Linux laptops are supported, as
        development will take place in the browser. (iPads and Chromebooks
        provide suboptimal experiences, and are discouraged.)Fees (figures in
        parantheses include GST)• Individual sign-up: $1,600 ($1,744)• Groups of
        up to 7: $11,200 ($12,208)• Groups of 8-15: $12,400 ($13,516)• Groups of
        16 and above: Please email for more informationAll quoted prices are in
        SGD. Invoicing terms available."
- id: building-agents-with-openclaw
  slug: building-agents-with-openclaw
  title: Building Agents with OpenClaw
  subtitle: null
  duration: 2 days
  description: Stop building chatbots. Start deploying autonomous systems. The
    future of AI isn't a text box; it’s an Agentic Loop. This intensive course
    dives deep into OpenClaw, the premier open-source framework for building
    agents that can plan, use tools, and self-correct in real-time.
  hero_image: /images/remote/puKHc1oZqW1A2vZUd0Qo46mBR5I.webp"Building Agents with OpenClaw - Tinkercademy: Coding and Making for
      Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/building-agents-with-openclaw
    openGraph:
      title: "Building Agents with OpenClaw - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Building Agents with OpenClaw - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/puKHc1oZqW1A2vZUd0Qo46mBR5I.webp"prompt-and-hope" cycles, you will learn to build
        systems that possess agency—the ability to decompose complex goals,
        interact with external APIs, and execute long-horizon tasks without
        constant human intervention.
    - type: richtext
      label: null
      html: <p>By the end of this course, you will:</p><ul><li><p><strong>The Agentic
        Loop:</strong> Mastering the <em>Plan → Act → Observe → Re-plan</em>
        cycle.</p></li><li><p><strong>Tool-Augmented Generation (TAG):</strong>
        Building secure interfaces between OpenClaw and your private
        data/APIs.</p></li><li><p><strong>Multi-Agent Orchestration:</strong>
        Learning when one agent isn't enough and how to manage a
        &quot;swarm&quot; of OpenClaw instances.</p></li><li><p><strong>Local
        &amp; Cloud Deployment:</strong> Leveraging the open-source nature of
        OpenClaw to deploy on your own infrastructure for maximum data
        privacy.</p></li></ul>
      text: "By the end of this course, you will:The Agentic Loop: Mastering the Plan
        → Act → Observe → Re-plan cycle.Tool-Augmented Generation (TAG):
        Building secure interfaces between OpenClaw and your private
        data/APIs.Multi-Agent Orchestration: Learning when one agent isn't
        enough and how to manage a \"swarm\" of OpenClaw instances.Local & Cloud
        Deployment: Leveraging the open-source nature of OpenClaw to deploy on
        your own infrastructure for maximum data privacy."
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times</strong>: 1-2 days; can be configured over
        multiple sessions. Please write in to enquire.
        </p><p><strong>Location</strong>: CT HUB 2, 114 Lavender
        Street.</p><p><strong>Requirements</strong>: Bring your own laptop!
        Modern Windows, Mac or Linux laptops are supported. Participants will be
        provided with paid ChatGPT Business and Lovable plans for the duration
        of the course. </p><p><strong>Fees</strong> (excl. GST) per
        participant:</p><ul><li><p>16 participants and above:
        $650</p></li><li><p>12-15 participants: $750 </p></li><li><p>8-11
        participants: $870</p></li></ul><p>For 7 or fewer participants, we
        charge a flat fee of S$6,800 total. </p><p>All quoted prices are in SGD.
        Invoicing terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. Location: CT HUB 2, 114 Lavender
        Street.Requirements: Bring your own laptop! Modern Windows, Mac or Linux
        laptops are supported. Participants will be provided with paid ChatGPT
        Business and Lovable plans for the duration of the course. Fees (excl.
        GST) per participant:16 participants and above: $65012-15 participants:
        $750 8-11 participants: $870For 7 or fewer participants, we charge a
        flat fee of S$6,800 total. All quoted prices are in SGD. Invoicing terms
        available."
- id: certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making
  slug: certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making
  title: "Certificate in Technology Foundations: Harnessing the Power of Internet
    of Things and Creative Digital Making"
  subtitle: null
  duration: 17 days
  description: More companies are integrating technology into their products
    through innovative ways. From home appliances to lifestyle products, we are
    surrounded by digital toys that enhance our standards of living. Welcome to
    the world of digital making, where collision of ideas and technology can
    either make or break. Participants in this programme can find their stroke
    of genius as they learn the building blocks of digital making from coding
    concepts and microcontrollers (Micro:bit, Arduino, and Raspberry Pi) and
    create prototypes that respond to sound, touch and light. Click here for
    more info.
  hero_image: /images/remote/yAICKDgrNghg1JyWMSy5gXh7DOQ.jpg"Certificate in Technology Foundations: Harnessing the Power of Internet
      of Things and Creative Digital Making - Tinkercademy: Coding and Making
      for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making
    openGraph:
      title: "Certificate in Technology Foundations: Harnessing the Power of Internet
        of Things and Creative Digital Making - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Certificate in Technology Foundations: Harnessing the Power of Internet
        of Things and Creative Digital Making - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/yAICKDgrNghg1JyWMSy5gXh7DOQ.jpg"https://academy.smu.edu.sg/courses/certificate-technology-foundations-harnessing-power-internet-things-and-creative-digital"
        target="_blank" rel="noopener noreferrer"><a>here</a></a> for more
        info.</p>
      text: More companies are integrating technology into their products through
        innovative ways. From home appliances to lifestyle products, we are
        surrounded by digital toys that enhance our standards of living. Welcome
        to the world of digital making, where collision of ideas and technology
        can either make or break. Participants in this programme can find their
        stroke of genius as they learn the building blocks of digital making
        from coding concepts and microcontrollers (Micro:bit, Arduino, and
        Raspberry Pi) and create prototypes that respond to sound, touch and
        light. Click here for more info.
    - type: richtext
      label: null
      html: <ul><li><p>Understand what “digital making” is, and how it applies to
        modern prototyping with electronics</p></li><li><p>Appreciate the world
        of “Internet of Things” by sending sensor data online for practical
        applications</p></li></ul>
      text: Understand what “digital making” is, and how it applies to modern
        prototyping with electronicsAppreciate the world of “Internet of Things”
        by sending sensor data online for practical applications
    - type: richtext
      label: null
      html: <p><strong>Topic/Structure</strong></p><ul><li><p>Learn and apply
        introductory coding concepts, such as loops, variables, and functions,
        through block-based languages and PythonLearn to programme
        microcontrollers such as the micro:bit, Arduino, and Raspberry
        Pi</p></li><li><p>Connect a variety of input sensors and output devices
        to microcontrollers, and control them through
        code</p></li></ul><p><strong>Assessment</strong></p><ul><li><p>Project
        presentations</p></li></ul><ul><li><p>Group assignments</p></li></ul>
      text: Topic/StructureLearn and apply introductory coding concepts, such as
        loops, variables, and functions, through block-based languages and
        PythonLearn to programme microcontrollers such as the micro:bit,
        Arduino, and Raspberry PiConnect a variety of input sensors and output
        devices to microcontrollers, and control them through
        codeAssessmentProject presentationsGroup assignments
- id: certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology
  slug: certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology
  title: "Certificate in Technology Foundations: Unleash the Potential of
    Blockchain Technology"
  subtitle: null
  duration: 17 days
  description: Blockchain has garnered worldwide attention since the birth of
    cryptocurrency. Through an interactive exploration on its building blocks,
    discover how blockchain came about and what makes it so intriguing. This
    programme discusses real-world examples and contrasts between specific
    blockchain implementations, such as Bitcoin, Ethereum and Stellar, for a
    better understanding to the concept of blockchain technology. Click here to
    find out more.
  hero_image: /images/remote/WPfvSE5w5gyB6ippvoGs2pZN8.jpg"Certificate in Technology Foundations: Unleash the Potential of
      Blockchain Technology - Tinkercademy: Coding and Making for Schools and
      Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology
    openGraph:
      title: "Certificate in Technology Foundations: Unleash the Potential of
        Blockchain Technology - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Certificate in Technology Foundations: Unleash the Potential of
        Blockchain Technology - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/WPfvSE5w5gyB6ippvoGs2pZN8.jpg"https://academy.smu.edu.sg/courses/certificate-technology-foundations-unleash-potential-blockchain-technology"
        target="_blank" rel="noopener noreferrer"><a>here</a></a> to find out
        more.</p>
      text: Blockchain has garnered worldwide attention since the birth of
        cryptocurrency. Through an interactive exploration on its building
        blocks, discover how blockchain came about and what makes it so
        intriguing. This programme discusses real-world examples and contrasts
        between specific blockchain implementations, such as Bitcoin, Ethereum
        and Stellar, for a better understanding to the concept of blockchain
        technology. Click here to find out more.
    - type: richtext
      label: null
      html: <ul><li><p>Understand what is a blockchain, how and why it
        works</p></li><li><p>Explain relevant concepts such as cryptography and
        signatures that make blockchain relevant</p></li></ul>
      text: Understand what is a blockchain, how and why it worksExplain relevant
        concepts such as cryptography and signatures that make blockchain
        relevant
    - type: richtext
      label: null
      html: <p><strong>Topic/Structure</strong></p><ul><li><p>Appreciate mathematical
        underpinnings of the blockchain</p></li><li><p>Create a simple
        decentralised app on the Blockchain with Stellar</p></li><li><p>Discuss
        meaningfully applications of blockchain in various
        industries</p></li></ul><p><strong>Assessment</strong></p><ul><li><p>Project
        presentations</p></li><li><p>Group assignments</p></li></ul>
      text: Topic/StructureAppreciate mathematical underpinnings of the
        blockchainCreate a simple decentralised app on the Blockchain with
        StellarDiscuss meaningfully applications of blockchain in various
        industriesAssessmentProject presentationsGroup assignments
- id: code-for-fun-ai-workshop
  slug: code-for-fun-ai-workshop
  title: Code For Fun AI Workshop
  subtitle: null
  duration: 10 hours
  description: Our CFF 2025 Scheme of WorkOur programme is designed around the
    See, Think and Act framework. This is a structured approach used to enhance
    understanding, decision-making, and action whilst helping students develop
    critical thinking and problem-solving skills. We believe adoption of this
    framework will help spark curiosity about technology and allows students to
    see how technology is used in the real world, providing them confidence in
    using technology in work and life and to solve problems for their community.
    We will be using Padlet for all lessons. We believe that using Padlet in the
    classroom can significantly enhance student engagement, provide flexibility
    for different learning abilities, and support meaningful formative
    assessments.
  hero_image: /images/remote/uB9togx2WZjo52kW3eDPGODhN8.png"Code For Fun AI Workshop - Tinkercademy: Coding and Making for Schools
      and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/code-for-fun-ai-workshop
    openGraph:
      title: "Code For Fun AI Workshop - Tinkercademy: Coding and Making for Schools
        and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Code For Fun AI Workshop - Tinkercademy: Coding and Making for Schools
        and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/uB9togx2WZjo52kW3eDPGODhN8.png"mailto:imda_codesg@imda.gov.sg"><a>imda_codesg@imda.gov.sg</a></a>.</p>
      text: How to apply?All Ministry of Education (MOE) government and
        government-aided secondary schools are eligible to apply for the AI for
        Fun module. Students are required to complete the Code for Fun programme
        or a comparable programme before they are eligible to participate in the
        AI for Fun module. If schools are on Code for Fun, AI for Fun may be
        taken up by the same cohort (e.g. Secondary 1 cohort to do both CFF and
        AIFF) or a later cohort (e.g. Secondary 1 cohort to do CFF, Secondary 2
        cohort to do AIFF). Application instructions will be sent to all MOE
        government and government-aided secondary schools between September to
        October annually. Schools keen to apply for the programme should submit
        their application within the application window stated. For enquires
        regarding AI for Fun for secondary schools, please contact us at
        imda_codesg@imda.gov.sg.
- id: code-for-fun-baseline-workshop
  slug: code-for-fun-baseline-workshop
  title: Code For Fun Baseline Workshop
  subtitle: null
  duration: 10 hours
  description: Our CFF 2025 Scheme of WorkOur programme is designed around the
    See, Think and Act framework. This is a structured approach used to enhance
    understanding, decision-making, and action whilst helping students develop
    critical thinking and problem-solving skills. We believe adoption of this
    framework will help spark curiosity about technology and allows students to
    see how technology is used in the real world, providing them confidence in
    using technology in work and life and to solve problems for their community.
    We will be using Padlet for all lessons. We believe that using Padlet in the
    classroom can significantly enhance student engagement, provide flexibility
    for different learning abilities, and support meaningful formative
    assessments.
  hero_image: /images/remote/uB9togx2WZjo52kW3eDPGODhN8.png"Code For Fun Baseline Workshop - Tinkercademy: Coding and Making for
      Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/code-for-fun-baseline-workshop
    openGraph:
      title: "Code For Fun Baseline Workshop - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Code For Fun Baseline Workshop - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/uB9togx2WZjo52kW3eDPGODhN8.png"mailto:imda_codesg@imda.gov.sg"><a>imda_codesg@imda.gov.sg</a></a>.</p>
      text: How to apply?All MOE government and government-aided secondary schools are
        eligible to apply for the Code for Fun programme for secondary schools.
        Application instructions will be sent to all Ministry of Education (MOE)
        government and government-aided secondary schools between September to
        October annually. Schools applying for the programme should submit their
        application within the application period provided. For enquiries
        regarding Code for Fun for secondary schools, please contact us at
        imda_codesg@imda.gov.sg.
- id: code-exp-2025
  slug: code-exp-2025
  title: CODE_EXP 2025
  subtitle: null
  duration: 4 days
  description: "CODE_EXP is a mobile dev hackathon spread over three phases:"
  hero_image: /images/remote/AW3bQ3c9TVwK1z0hWlPAdz6o.png"CODE_EXP 2025 - Tinkercademy: Coding and Making for Schools and
      Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/code-exp-2025
    openGraph:
      title: "CODE_EXP 2025 - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "CODE_EXP 2025 - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/AW3bQ3c9TVwK1z0hWlPAdz6o.png"<p>CODE_EXP is a <strong>mobile dev hackathon </strong>spread over three
        phases:</p><ul><li><p>Phase 1: <strong>Training
        sessions</strong></p></li><li><p>Phase 2:
        <strong>Qualifiers</strong></p></li><li><p>Phase 3:
        <strong>Finals</strong></p></li></ul>"
      text: "CODE_EXP is a mobile dev hackathon spread over three phases:Phase 1:
        Training sessionsPhase 2: QualifiersPhase 3: Finals"
    - type: richtext
      label: null
      html: <ol><li><p><strong>Gain Hands-on Experience with React
        Native</strong></p><ul><li><p>Understand the fundamentals of React
        Native for cross-platform mobile development.</p></li><li><p>Build
        functional mobile UI components and integrate backend
        services.</p></li></ul></li><li><p><strong>Master the End-to-End
        Prototyping Process</strong></p><ul><li><p>Learn how to ideate,
        wireframe, and prototype a mobile app concept
        effectively.</p></li><li><p>Translate user needs into intuitive app
        designs.</p></li></ul></li><li><p><strong>Integrate Generative AI into
        Mobile Apps</strong></p><ul><li><p>Explore how to leverage generative AI
        tools (e.g. LLMs) to enhance app
        functionality.</p></li><li><p>Understand practical use cases and best
        practices for AI integration.</p></li></ul></li><li><p><strong>Work with
        Edge LLMs</strong></p><ul><li><p>Learn about deploying LLMs on-device or
        on the edge for faster, privacy-preserving AI
        features.</p></li><li><p>Understand the trade-offs and constraints of
        edge computing in mobile
        environments.</p></li></ul></li><li><p><strong>Develop Communication
        &amp; Pitching Skills</strong></p><ul><li><p>Craft a compelling 1-minute
        elevator pitch video.</p></li><li><p>Create a persuasive slide deck that
        clearly articulates the value proposition and architecture of your
        app.</p></li></ul></li><li><p><strong>Learn Agile, Time-Conscious
        Product Development</strong></p><ul><li><p>Practice working within tight
        deadlines to ideate, develop, and iterate on a mobile app
        concept.</p></li><li><p>Experience what it's like to build MVPs in a
        fast-paced, real-world
        scenario.</p></li></ul></li><li><p><strong>Compete and Collaborate Under
        Pressure</strong></p><ul><li><p>Improve teamwork and decision-making in
        a live, competitive setting.</p></li><li><p>Receive feedback from judges
        and peers to iterate on your project.</p></li></ul></li></ol><p><br
        /></p>
      text: Gain Hands-on Experience with React NativeUnderstand the fundamentals of
        React Native for cross-platform mobile development.Build functional
        mobile UI components and integrate backend services.Master the
        End-to-End Prototyping ProcessLearn how to ideate, wireframe, and
        prototype a mobile app concept effectively.Translate user needs into
        intuitive app designs.Integrate Generative AI into Mobile AppsExplore
        how to leverage generative AI tools (e.g. LLMs) to enhance app
        functionality.Understand practical use cases and best practices for AI
        integration.Work with Edge LLMsLearn about deploying LLMs on-device or
        on the edge for faster, privacy-preserving AI features.Understand the
        trade-offs and constraints of edge computing in mobile
        environments.Develop Communication & Pitching SkillsCraft a compelling
        1-minute elevator pitch video.Create a persuasive slide deck that
        clearly articulates the value proposition and architecture of your
        app.Learn Agile, Time-Conscious Product DevelopmentPractice working
        within tight deadlines to ideate, develop, and iterate on a mobile app
        concept.Experience what it's like to build MVPs in a fast-paced,
        real-world scenario.Compete and Collaborate Under PressureImprove
        teamwork and decision-making in a live, competitive setting.Receive
        feedback from judges and peers to iterate on your project.
    - type: richtext
      label: "Phase 1: Levelling Up"
      html: '<h2>Phase 1: Levelling Up</h2><p>Training Schedule:</p><ul><li><p>Welcome
        Brief and Intro to Prototyping • 11 May (Sun) •
        9:30am-12:30pm</p></li><li><p>React Native 1 • 11 May (Sun) • 2pm -
        5pm</p></li><li><p>React Native 2 • 12 May (Mon) •
        9:30am-12:30pm</p></li><li><p>React Native 3 • 12 May (Mon) • 2pm -
        5pm</p></li><li><p>Working with Generative AI • 13 May (Tue) •
        9:30am-12:30pm</p></li><li><p>Edge LLMs • 14 May (Wed) •
        9:30am-12:30pm</p></li></ul><h2>Phase 2:
        Qualifiers</h2><p><strong>Deadline:</strong> 1200hrs, 24 May
        2025</p><p><strong>Submission: </strong><a
        href="https://tk.sg/codeexp25_qualifiers"><a>https://tk.sg/codeexp25_qualifiers</a></a></p><p><strong>Submission
        requirements:</strong></p><ol><li><p>Proposal (Value proposition slide
        deck, no more than 15 slides)</p></li><li><p>Elevator Pitch (1-minute
        video)</p></li><li><p>Architecture</p></li><li><p>Wireframe</p></li></ol><h2>Phase
        3: Finals</h2><p><strong>Marina Bay Sands Expo &amp; Convention
        Centre</strong></p><p><strong>11 &amp; 12 June
        2024</strong></p><ul><li><p>40 teams will compete live for cash
        prizes</p></li><li><p>Put in the final touches to your mobile
        app</p></li><li><p>Pitch and impress the Panel of Judges</p></li></ul>'
      text: "Phase 1: Levelling UpTraining Schedule:Welcome Brief and Intro to
        Prototyping • 11 May (Sun) • 9:30am-12:30pmReact Native 1 • 11 May (Sun)
        • 2pm - 5pmReact Native 2 • 12 May (Mon) • 9:30am-12:30pmReact Native 3
        • 12 May (Mon) • 2pm - 5pmWorking with Generative AI • 13 May (Tue) •
        9:30am-12:30pmEdge LLMs • 14 May (Wed) • 9:30am-12:30pmPhase 2:
        QualifiersDeadline: 1200hrs, 24 May 2025Submission:
        https://tk.sg/codeexp25_qualifiersSubmission requirements:Proposal
        (Value proposition slide deck, no more than 15 slides)Elevator Pitch
        (1-minute video)ArchitectureWireframePhase 3: FinalsMarina Bay Sands
        Expo & Convention Centre11 & 12 June 202440 teams will compete live for
        cash prizesPut in the final touches to your mobile appPitch and impress
        the Panel of Judges"
- id: iotmaker
  slug: iotmaker
  title: "Digital Maker: Create with 3D Printing and IOT"
  subtitle: null
  duration: 2 days
  description: Ever wondered how things are made, or how smart fridges, smart
    doorbells, Amazon Echo, Google Home devices, and other "Internet of Things"
    tech gadgets work? These devices are transforming our daily routines, making
    life more convenient and connected.
  hero_image: /images/remote/mBTJUdJzeoxQDjnmm5gXFKkOIM4.png"Digital Maker: Create with 3D Printing and IOT - Tinkercademy: Coding
      and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/iotmaker
    openGraph:
      title: "Digital Maker: Create with 3D Printing and IOT - Tinkercademy: Coding
        and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Digital Maker: Create with 3D Printing and IOT - Tinkercademy: Coding
        and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/mBTJUdJzeoxQDjnmm5gXFKkOIM4.png"https://iotmaker.tk.sg/" target="_blank" rel="noopener
        noreferrer"><a>here</a></a>.</p>
      text: Ever wondered how things are made, or how smart fridges, smart doorbells,
        Amazon Echo, Google Home devices, and other "Internet of Things" tech
        gadgets work? These devices are transforming our daily routines, making
        life more convenient and connected.In this programme, you’ll start by
        learning the basics of coding and get hands-on with programmable
        microcontrollers such as the M5Go to craft practical prototypes that
        react to sound, touch, and light. Then, you'll have a chance to build
        your own physical devices with 3D printing. This course is perfect
        whether you’re looking to start a new project, boost your tech skills,
        or just have some fun creating. It’s practical, engaging, and designed
        to help you bring your ideas to life. Come join us and experience the
        thrill of digital making! Find out more here.
    - type: richtext
      label: null
      html: <p>In this introductory course to digital making, you'll dive into the
        core technologies that power smart devices like smart fridges, smart
        doorbells, Amazon Echo, and Google Home first using programmable
        microcontrollers. </p><p>For a complete learning journey, you'll also
        explore beginning techniques in 3D printing and digital fabrication,
        with an interactive experience designing, sourcing, and fabricating
        practical projects. This hands-on approach ensures you gain practical
        experience and a solid foundation in digital maker development.</p><p>By
        the end of the program, you will have learned
        to:</p><ul><li><p>﻿﻿Understand what &quot;digital making&quot; is, and
        how it applies to modern prototyping and
        crafting</p></li><li><p>﻿﻿Appreciate the world of &quot;Internet of
        Things&quot; (loT) by sending sensor data online for practical
        applications</p></li><li><p>﻿﻿Learn and apply introductory coding
        concepts to program microcontrollers</p></li><li><p>Understand the
        fundamentals of 3D modelling for practical
        applications</p></li><li><p>﻿﻿Design and 3D print custom
        components</p></li></ul>
      text: "In this introductory course to digital making, you'll dive into the core
        technologies that power smart devices like smart fridges, smart
        doorbells, Amazon Echo, and Google Home first using programmable
        microcontrollers. For a complete learning journey, you'll also explore
        beginning techniques in 3D printing and digital fabrication, with an
        interactive experience designing, sourcing, and fabricating practical
        projects. This hands-on approach ensures you gain practical experience
        and a solid foundation in digital maker development.By the end of the
        program, you will have learned to: Understand what \"digital making\"
        is, and how it applies to modern prototyping and crafting Appreciate the
        world of \"Internet of Things\" (loT) by sending sensor data online for
        practical applications Learn and apply introductory coding concepts to
        program microcontrollersUnderstand the fundamentals of 3D modelling for
        practical applications Design and 3D print custom components"
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times</strong>: 1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups.</p><p><strong>Location</strong>: CT HUB 2, 114
        Lavender Street.</p><p><strong>Requirements</strong>: Bring your own
        laptop! Modern Windows or Mac laptops are supported. (iPads and
        Chromebooks are supported, though not for all
        applications.)</p><p><strong>Fees</strong> (figures in parantheses
        include GST)<br />• Individual sign-up: $1,600 ($1,744)<br />• Groups of
        up to 7: $11,200 ($12,208)<br />• Groups of 8-15: $12,400 ($13,516)<br
        />• Groups of 16 and above: Please email for more information</p><p>All
        quoted prices are in SGD. Invoicing terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups.Location: CT HUB 2, 114 Lavender Street.Requirements: Bring
        your own laptop! Modern Windows or Mac laptops are supported. (iPads and
        Chromebooks are supported, though not for all applications.)Fees
        (figures in parantheses include GST)• Individual sign-up: $1,600
        ($1,744)• Groups of up to 7: $11,200 ($12,208)• Groups of 8-15: $12,400
        ($13,516)• Groups of 16 and above: Please email for more informationAll
        quoted prices are in SGD. Invoicing terms available."
- id: imda-microbit-2025
  slug: imda-microbit-2025
  title: Digital Making with micro:bit
  subtitle: null
  duration: 24 hours
  description: In this programme, students will get started with the micro:bit, a
    programmable microcontroller that serves to introduce coding, electronics,
    and hands-on digital making to learners of all ages. The micro:bit can be
    easily programmed through a block-based coding language called MakeCode.
    Students will explore computational thinking through the use of the
    micro:bit and various other external components designed to engage and
    enthrall students. With components that move (servo), light up (LED strip)
    and make noise (buzzer), students will wield the power to control the
    physical world in code.
  hero_image: /images/remote/URlCPC41VwVGXM7WtFXQcFo4yE.png"Digital Making with micro:bit - Tinkercademy: Coding and Making for
      Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-microbit-2025
    openGraph:
      title: "Digital Making with micro:bit - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Digital Making with micro:bit - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/URlCPC41VwVGXM7WtFXQcFo4yE.png"https://zenitanteducation.com/"><a>Zenitant</a></a> is a
        fellow Microsoft Global Training Partner, with whom we are happy to
        partner to offer these courses to primary schools. Through our close
        collaboration, we have brought the annual <a
        href="https://3dtronics.asia/"><a>3d-tronics Micro-controller
        Challenge</a></a> from 2018 to 2022. Please note that for the
        microcontroller course, schools will need to have their own micro:bit
        kits. Tinker Class is a distributor for micro:bit and accessories;
        please contact us at <a
        href="mailto:hello@tinkerclass.tech"><a>hello@tinkerclass.tech</a></a>
        to place orders at a discounted education pricing. Training is provided
        under Zenitant Pte Ltd. — <a href="mailto:yjsoon@tk.sg"><a>email
        us</a></a> to find out
        more.</p><div><div><div><div><div><p>Course</p></div><div><p>Course
        Code</p></div><div><p>Hours</p></div><div><p>Details</p></div></div><div><div><p>Digital
        Making with micro:bit</p></div><div><p>P-MICROSOFT-MAKE-BASIC /
        P-MICROSOFT-MAKE-INTM</p></div><div><p>24
        hours</p></div><div><p>Suitable for schools with PCs, Macs, iPads, and
        Chromebooks. micro:bit required.</p></div></div></div></div></div>
      text: Zenitant is a fellow Microsoft Global Training Partner, with whom we are
        happy to partner to offer these courses to primary schools. Through our
        close collaboration, we have brought the annual 3d-tronics
        Micro-controller Challenge from 2018 to 2022. Please note that for the
        microcontroller course, schools will need to have their own micro:bit
        kits. Tinker Class is a distributor for micro:bit and accessories;
        please contact us at hello@tinkerclass.tech to place orders at a
        discounted education pricing. Training is provided under Zenitant Pte
        Ltd. — email us to find out more.CourseCourse CodeHoursDetailsDigital
        Making with micro:bitP-MICROSOFT-MAKE-BASIC / P-MICROSOFT-MAKE-INTM24
        hoursSuitable for schools with PCs, Macs, iPads, and Chromebooks.
        micro:bit required.
- id: digital-making-with-micro-bit-iot
  slug: digital-making-with-micro-bit-iot
  title: Digital Making with micro:bit & IoT
  subtitle: null
  duration: 2 days
  description: Dive into the exciting world of digital making with micro:bit and
    IoT! This powerful combination empowers you to create interactive projects
    that bridge the gap between the digital and physical world. With micro:bit's
    user-friendly interface and IoT's vast connectivity, learners can build
    smart devices, automate tasks, and explore endless possibilities.
  hero_image: /images/remote/NwJDnH6HoIQPm3sf8sCAsXvidM.png"Digital Making with micro:bit & IoT - Tinkercademy: Coding and Making
      for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/digital-making-with-micro-bit-iot
    openGraph:
      title: "Digital Making with micro:bit & IoT - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Digital Making with micro:bit & IoT - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/NwJDnH6HoIQPm3sf8sCAsXvidM.png"<ul><li><p>Understand the fundamentals of micro:bit programming: Students
        will learn basic programming concepts and how to use the micro:bit's
        built-in features to create simple interactive projects.
        </p></li><li><p>Explore the basics of IoT and its applications: Students
        will gain knowledge about the Internet of Things, its components, and
        real-world examples of IoT devices. </p></li><li><p>Design and implement
        a small-scale IoT project: Students will apply their understanding of
        micro:bit programming and IoT concepts to create a functional IoT
        project, such as a remote-controlled device or a sensor-based automation
        system.</p></li></ul>"
      text: "Understand the fundamentals of micro:bit programming: Students will learn
        basic programming concepts and how to use the micro:bit's built-in
        features to create simple interactive projects. Explore the basics of
        IoT and its applications: Students will gain knowledge about the
        Internet of Things, its components, and real-world examples of IoT
        devices. Design and implement a small-scale IoT project: Students will
        apply their understanding of micro:bit programming and IoT concepts to
        create a functional IoT project, such as a remote-controlled device or a
        sensor-based automation system."
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times:</strong> 1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups. </p><p><strong>Location:</strong> TBC
        </p><p><strong>Requirements:</strong> Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.)
        </p><p><strong>Fees</strong> (figures in parantheses include
        GST)</p><ul><li><p> Individual sign-up: $1,600
        ($1,744) </p></li><li><p>Groups of up to 7: $11,200
        ($12,208)</p></li><li><p> Groups of 8-15: $12,400
        ($13,516)</p></li><li><p> Groups of 16 and above: Please email for more
        information All quoted prices are in SGD. Invoicing terms
        available.</p></li></ul>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups. Location: TBC Requirements: Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.) Fees (figures in
        parantheses include GST) Individual sign-up: $1,600 ($1,744) Groups of
        up to 7: $11,200 ($12,208) Groups of 8-15: $12,400 ($13,516) Groups of
        16 and above: Please email for more information All quoted prices are in
        SGD. Invoicing terms available."
- id: unityarvr
  slug: unityarvr
  title: "Enter the Metaverse: Get started with Unity for AR/VR"
  subtitle: null
  duration: 2 days
  description: Unity isn't just the world's leading mobile game development engine
    — it's a gateway to the future of immersive technology. Whether you're
    dreaming up AR/VR experiences or working on detailed digital twins, Unity is
    the tool you need to turn your big ideas into reality.
  hero_image: /images/remote/A5Dd868Qo1geG7lsgR36QkJm9c.png"Enter the Metaverse: Get started with Unity for AR/VR - Tinkercademy:
      Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/unityarvr
    openGraph:
      title: "Enter the Metaverse: Get started with Unity for AR/VR - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Enter the Metaverse: Get started with Unity for AR/VR - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/A5Dd868Qo1geG7lsgR36QkJm9c.png"https://unityarvr.tk.sg/" target="_blank" rel="noopener
        noreferrer"><a>here</a></a>.</p>
      text: Unity isn't just the world's leading mobile game development engine — it's
        a gateway to the future of immersive technology. Whether you're dreaming
        up AR/VR experiences or working on detailed digital twins, Unity is the
        tool you need to turn your big ideas into reality.In this course, we'll
        guide you through Unity's core features and functionalities. On Day 1,
        you'll get familiar with the Unity interface, learn some C# scripting,
        and start creating interactive 3D environments. Then on Day 2, we'll
        dive into advanced AR/VR techniques and show you how to build amazing
        experiences for the metaverse.This hands-on, intuitive course is perfect
        for aspiring developers, tech enthusiasts, and innovators. By the end,
        you'll have the skills to make the most of Unity, whether you're aiming
        to develop the next hit game, an innovative AR app, or a captivating
        virtual world.Join us and transform your ideas into reality with Unity!
        Find out more here.
    - type: richtext
      label: null
      html: <p>In this broad introduction to Unity development, you'll dive into the
        core technologies that power interactive 3D experiences and get hands-on
        experience building your own versatile projects using Unity.</p><p>For a
        complete learning journey, you'll also explore advanced techniques in
        AR/VR development through practical projects, gaining exposure to
        Unity's powerful capabilities for creating immersive experiences. This
        hands-on approach ensures you gain practical experience and a solid
        foundation in Unity development.</p><p>By the end of the programme, you
        will learn to:</p><ul><li><p>Understand the fundamentals of Unity
        development, including the Unity interface, C# scripting, and creating
        interactive 3D environments.</p></li><li><p>Create a basic AR/VR
        application using Unity's advanced features (Day
        2).</p></li><li><p>Learn how to integrate physics, animations, and user
        interactions to create compelling and immersive experiences (Day
        2).</p></li></ul>
      text: In this broad introduction to Unity development, you'll dive into the core
        technologies that power interactive 3D experiences and get hands-on
        experience building your own versatile projects using Unity.For a
        complete learning journey, you'll also explore advanced techniques in
        AR/VR development through practical projects, gaining exposure to
        Unity's powerful capabilities for creating immersive experiences. This
        hands-on approach ensures you gain practical experience and a solid
        foundation in Unity development.By the end of the programme, you will
        learn to:Understand the fundamentals of Unity development, including the
        Unity interface, C# scripting, and creating interactive 3D
        environments.Create a basic AR/VR application using Unity's advanced
        features (Day 2).Learn how to integrate physics, animations, and user
        interactions to create compelling and immersive experiences (Day 2).
    - type: richtext
      label: null
      html: '<p><strong>Dates and Times</strong>: 1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups.</p><p><strong>Location</strong>: CT HUB 2, 114
        Lavender Street.</p><p><strong>Requirements</strong>: Bring your own
        laptop! Modern Windows, Mac or Linux laptops are supported. (iPads and
        Chromebooks are <em>not </em>supported.) Read more about the <a
        href="https://docs.unity3d.com/Manual/system-requirements.html"
        target="_blank" rel="noopener noreferrer"><a>Unity hardware requirements
        at unity3d.com</a></a>.</p><p><strong>Fees</strong> (figures in
        parantheses include GST)<br />• Individual sign-up: $1,600 ($1,744)<br
        />• Groups of up to 7: $11,200 ($12,208)<br />• Groups of 8-15: $12,400
        ($13,516)<br />• Groups of 16 and above: Please email for more
        information</p><p>All quoted prices are in SGD. Invoicing terms
        available.</p>'
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups.Location: CT HUB 2, 114 Lavender Street.Requirements: Bring
        your own laptop! Modern Windows, Mac or Linux laptops are supported.
        (iPads and Chromebooks are not supported.) Read more about the Unity
        hardware requirements at unity3d.com.Fees (figures in parantheses
        include GST)• Individual sign-up: $1,600 ($1,744)• Groups of up to 7:
        $11,200 ($12,208)• Groups of 8-15: $12,400 ($13,516)• Groups of 16 and
        above: Please email for more informationAll quoted prices are in SGD.
        Invoicing terms available."
- id: imda-unity-2025
  slug: imda-unity-2025
  title: Game Development Bootcamp with Unity
  subtitle: null
  duration: 32 hours
  description: In 2023 and 2024, we ran a 5-day holiday bootcamp for students,
    teaching game development with Unity! Please stay tuned for updates.
  hero_image: /images/remote/kuS9B3BanadFYL050aWsShzhoM.webp"Game Development Bootcamp with Unity - Tinkercademy: Coding and Making
      for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-unity-2025
    openGraph:
      title: "Game Development Bootcamp with Unity - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Game Development Bootcamp with Unity - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/kuS9B3BanadFYL050aWsShzhoM.webp"In this programme, students will learn computational thinking
    skills and develop their own games on two widely popular platforms. Using
    the MakeCode Arcade platform, a beginner-friendly game development platform
    from Microsoft, students will be exposed to basic coding concepts and
    challenged to use code to solve logic programming problems in order to
    create their own retro-style games. Using Minecraft: Education's integrated
    coding editor, students will apply block-based coding to create exciting
    virtual 3D world environments. We believe that as students see their code
    take effect in a virtual 3D world environment, they will be excited to
    understand, explore and exploit the full capabilities of coding constructs
    such as variables, iterations and conditionals to create complex
    interactions. In 2025, schools will be able to sign up for beginner- and
    intermediate-level courses, for a total of 2 × 24-hour programmes."
  hero_image: /images/remote/aoVkrZOD4jCL9uq91wRjB4Z5KY.jpg"Game Development in MakeCode Arcade & MineCraft - Tinkercademy: Coding
      and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-minecraft-2025
    openGraph:
      title: "Game Development in MakeCode Arcade & MineCraft - Tinkercademy: Coding
        and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Game Development in MakeCode Arcade & MineCraft - Tinkercademy: Coding
        and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/aoVkrZOD4jCL9uq91wRjB4Z5KY.jpg"<p>In this programme, students will learn computational thinking skills
        and develop their own games on two widely popular platforms. Using the
        MakeCode Arcade platform, a beginner-friendly game development platform
        from Microsoft, students will be exposed to basic coding concepts and
        challenged to use code to solve logic programming problems in order to
        create their own retro-style games. Using Minecraft: Education's
        integrated coding editor, students will apply block-based coding to
        create exciting virtual 3D world environments. We believe that as
        students see their code take effect in a virtual 3D world environment,
        they will be excited to understand, explore and exploit the full
        capabilities of coding constructs such as variables, iterations and
        conditionals to create complex interactions. In 2025, schools will be
        able to sign up for beginner- and intermediate-level courses, for a
        total of 2 × 24-hour programmes.</p>"
      text: "In this programme, students will learn computational thinking skills and
        develop their own games on two widely popular platforms. Using the
        MakeCode Arcade platform, a beginner-friendly game development platform
        from Microsoft, students will be exposed to basic coding concepts and
        challenged to use code to solve logic programming problems in order to
        create their own retro-style games. Using Minecraft: Education's
        integrated coding editor, students will apply block-based coding to
        create exciting virtual 3D world environments. We believe that as
        students see their code take effect in a virtual 3D world environment,
        they will be excited to understand, explore and exploit the full
        capabilities of coding constructs such as variables, iterations and
        conditionals to create complex interactions. In 2025, schools will be
        able to sign up for beginner- and intermediate-level courses, for a
        total of 2 × 24-hour programmes."
    - type: richtext
      label: null
      html: "<ul><li><p>Equip computational thinking skills</p></li><li><p>Learn the
        MakeCode Arcade platform and explore basic doing
        concepts</p></li><li><p>Use Minecraft: Education's coding editor to
        apply block-based coding to create virtual 3D world
        environments</p></li><li><p>Explore variables, iterations, and
        conditionals to create complex interactions</p></li></ul>"
      text: "Equip computational thinking skillsLearn the MakeCode Arcade platform and
        explore basic doing conceptsUse Minecraft: Education's coding editor to
        apply block-based coding to create virtual 3D world environmentsExplore
        variables, iterations, and conditionals to create complex interactions"
    - type: richtext
      label: null
      html: <p><a href="https://zenitanteducation.com/"><a>Zenitant</a></a> is a
        fellow Microsoft Global Training Partner, with whom we are happy to
        partner to offer these courses to primary schools. Through our close
        collaboration, we have brought the annual <a
        href="https://3dtronics.asia/"><a>3d-tronics Micro-controller
        Challenge</a></a> from 2018 to 2022. Please note that for the
        microcontroller course, schools will need to have their own micro:bit
        kits. Tinker Class is a distributor for micro:bit and accessories;
        please contact us at <a
        href="mailto:hello@tinkerclass.tech"><a>hello@tinkerclass.tech</a></a>
        to place orders at a discounted education pricing. Training is provided
        under Zenitant Pte Ltd. — <a href="mailto:yjsoon@tk.sg"><a>email
        us</a></a> to find out
        more.</p><div><div><div><div><div><p>Course</p></div><div><p>Course
        Code</p></div><div><p>Hours</p></div><div><p>Details</p></div></div><div><div><p>Game
        Development in MakeCode Arcade &amp;
        MineCraft</p></div><div><p>P-MICROSOFT-GAME-BASIC /
        P-MICROSOFT-GAME-INTM</p></div><div><p>24
        hours</p></div><div><p>Suitable for schools with PCs, Macs, iPads, and
        Chromebooks.</p></div></div></div></div></div>
      text: Zenitant is a fellow Microsoft Global Training Partner, with whom we are
        happy to partner to offer these courses to primary schools. Through our
        close collaboration, we have brought the annual 3d-tronics
        Micro-controller Challenge from 2018 to 2022. Please note that for the
        microcontroller course, schools will need to have their own micro:bit
        kits. Tinker Class is a distributor for micro:bit and accessories;
        please contact us at hello@tinkerclass.tech to place orders at a
        discounted education pricing. Training is provided under Zenitant Pte
        Ltd. — email us to find out more.CourseCourse CodeHoursDetailsGame
        Development in MakeCode Arcade & MineCraftP-MICROSOFT-GAME-BASIC /
        P-MICROSOFT-GAME-INTM24 hoursSuitable for schools with PCs, Macs, iPads,
        and Chromebooks.
- id: knowledge-powered-ai-with-chatgpt
  slug: knowledge-powered-ai-with-chatgpt
  title: Knowledge-Powered AI with ChatGPT
  subtitle: null
  duration: ½, 1, 2 days
  description: Generative AI isn't just transforming how we create content. It's
    revolutionising how organisations access and leverage their knowledge.
    Whether you're looking to enhance customer service, automate content
    creation, or develop intelligent knowledge systems, this workshop will equip
    you with the tools to harness AI's full potential within your organization.
  hero_image: /images/remote/rQGUvAhb4dw3WuL7MIz9a8GOg.jpg"Knowledge-Powered AI with ChatGPT - Tinkercademy: Coding and Making for
      Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/knowledge-powered-ai-with-chatgpt
    openGraph:
      title: "Knowledge-Powered AI with ChatGPT - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Knowledge-Powered AI with ChatGPT - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/rQGUvAhb4dw3WuL7MIz9a8GOg.jpg"<p><strong>Dates and Times</strong>: ½, 1, or 2 days; can be configured
        over multiple sessions. Please write in to enquire.
        </p><p><strong>Location</strong>: CT HUB 2, 114 Lavender Street, or your
        preferred venue. </p><p><strong>Requirements</strong>: Bring your own
        laptop! Modern Windows, Mac or Linux laptops are supported. Participants
        should have a ChatGPT account (free tier sufficient; Plus or Business
        tier recommended) — or we can provide access during the
        workshop.</p><p><strong>Fees</strong> (with GST in
        parantheses):</p><div><div><div><div><div><p><strong>Participants</stro\
        ng></p></div><div><p><strong>2 day</strong></p></div><div><p><strong>1
        day</strong></p></div><div><p><strong>½
        day</strong></p></div></div><div><div><p>1 to 9 (flat
        fee)</p></div><div><p>$6,600 ($7,194)</p></div><div><p>$3,630
        ($3,956.70)</p></div><div><p>$1,980
        ($2,158.20)</p></div></div><div><div><p>10 to 19 (per
        pax)*</p></div><div><p>$690 ($752.10)</p></div><div><p>$380
        ($414.20)</p></div><div><p>$210
        ($228.90)</p></div></div><div><div><p>20+ (per
        pax)</p></div><div><p>$600 ($654)</p></div><div><p>$330
        ($359.70)</p></div><div><p>$160
        ($174.40)</p></div></div></div></div></div><p>*Price capped at cost of
        20 pax.</p><p>We can provide ChatGPT Business Plan access to
        participants for the duration of the workshop for an additional fee of
        $50 ($54.50 with GST) per participant. Please note that participants'
        chats will not be retained once access expires — this is due to the
        nature of the ChatGPT Business Plan. </p><p>All quoted prices are in
        SGD. Invoicing terms available.</p>"
      text: "Dates and Times: ½, 1, or 2 days; can be configured over multiple
        sessions. Please write in to enquire. Location: CT HUB 2, 114 Lavender
        Street, or your preferred venue. Requirements: Bring your own laptop!
        Modern Windows, Mac or Linux laptops are supported. Participants should
        have a ChatGPT account (free tier sufficient; Plus or Business tier
        recommended) — or we can provide access during the workshop.Fees (with
        GST in parantheses):Participants2 day1 day½ day1 to 9 (flat fee)$6,600
        ($7,194)$3,630 ($3,956.70)$1,980 ($2,158.20)10 to 19 (per pax)*$690
        ($752.10)$380 ($414.20)$210 ($228.90)20+ (per pax)$600 ($654)$330
        ($359.70)$160 ($174.40)*Price capped at cost of 20 pax.We can provide
        ChatGPT Business Plan access to participants for the duration of the
        workshop for an additional fee of $50 ($54.50 with GST) per participant.
        Please note that participants' chats will not be retained once access
        expires — this is due to the nature of the ChatGPT Business Plan. All
        quoted prices are in SGD. Invoicing terms available."
- id: vibe-coding-for-digital-builders-lovable-replit
  slug: vibe-coding-for-digital-builders-lovable-replit
  title: Level Up Your Vibe Coding (Lovable and Replit)
  subtitle: null
  duration: 2 days
  description: Stop writing code line-by-line. This intensive 2-day course is
    designed for those ready to move beyond "AI demos" and into the era of
    agentic coding. We leverage the symbiotic power of Lovable for rapid UI
    generation and Replit’s professional cloud environment to build, secure, and
    deploy.
  hero_image: /images/remote/oOitMFgLeulDejOAmyZwxgWuxg.jpg"Level Up Your Vibe Coding (Lovable and Replit) - Tinkercademy: Coding
      and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/vibe-coding-for-digital-builders-lovable-replit
    openGraph:
      title: "Level Up Your Vibe Coding (Lovable and Replit) - Tinkercademy: Coding
        and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Level Up Your Vibe Coding (Lovable and Replit) - Tinkercademy: Coding
        and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/oOitMFgLeulDejOAmyZwxgWuxg.jpg"<p>Stop writing code line-by-line. This intensive 2-day course is
        designed for those ready to move beyond &quot;AI demos&quot; and into
        the era of <strong>agentic coding</strong>. We leverage the symbiotic
        power of <strong>Lovable</strong> for rapid UI generation and
        <strong>Replit’s</strong> professional cloud environment to build,
        secure, and deploy.</p><p>You won't just learn to prompt; you’ll learn
        to manage a fleet of AI agents to handle the heavy lifting of the
        development lifecycle, from initial scaffold to production release.<br
        /><br />We focus on the <strong>agentic critical path</strong>: moving a
        project from a conceptual UI into a hardened, data-persistent
        application. You will learn to transition seamlessly from AI-driven
        design to professional backend logic, ensuring your
        &quot;AI-generated&quot; code meets enterprise standards for security
        and stability.</p><p><br /></p>"
      text: "Stop writing code line-by-line. This intensive 2-day course is designed
        for those ready to move beyond \"AI demos\" and into the era of agentic
        coding. We leverage the symbiotic power of Lovable for rapid UI
        generation and Replit’s professional cloud environment to build, secure,
        and deploy.You won't just learn to prompt; you’ll learn to manage a
        fleet of AI agents to handle the heavy lifting of the development
        lifecycle, from initial scaffold to production release.We focus on the
        agentic critical path: moving a project from a conceptual UI into a
        hardened, data-persistent application. You will learn to transition
        seamlessly from AI-driven design to professional backend logic, ensuring
        your \"AI-generated\" code meets enterprise standards for security and
        stability."
    - type: richtext
      label: null
      html: <p>By the end of this course, you will:</p><ul><li><p><strong>Agentic UI
        Orchestration:</strong> Rapidly iterating frontends with
        Lovable.</p></li><li><p><strong>Backend Hardening:</strong> Using Replit
        Agents to bridge UI to secure
        databases.</p></li><li><p><strong>Production Guardrails:</strong>
        Implementing environment security and data
        persistence.</p></li><li><p><strong>The Handoff:</strong> Creating
        clean, modular codebases that are human-readable and easy to
        maintain.</p></li></ul><h3><br /></h3>
      text: "By the end of this course, you will:Agentic UI Orchestration: Rapidly
        iterating frontends with Lovable.Backend Hardening: Using Replit Agents
        to bridge UI to secure databases.Production Guardrails: Implementing
        environment security and data persistence.The Handoff: Creating clean,
        modular codebases that are human-readable and easy to maintain."
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times</strong>: 1-2 days; can be configured over
        multiple sessions. Please write in to enquire.
        </p><p><strong>Location</strong>: CT HUB 2, 114 Lavender
        Street.</p><p><strong>Requirements</strong>: Bring your own laptop!
        Modern Windows, Mac or Linux laptops are supported. Participants will be
        provided with paid ChatGPT Business and Lovable plans for the duration
        of the course. </p><p><strong>Fees</strong> (excl. GST) per
        participant:</p><ul><li><p>16 participants and above:
        $650</p></li><li><p>12-15 participants: $750 </p></li><li><p>8-11
        participants: $870</p></li></ul><p>For 7 or fewer participants, we
        charge a flat fee of S$6,800 total. </p><p>All quoted prices are in SGD.
        Invoicing terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. Location: CT HUB 2, 114 Lavender
        Street.Requirements: Bring your own laptop! Modern Windows, Mac or Linux
        laptops are supported. Participants will be provided with paid ChatGPT
        Business and Lovable plans for the duration of the course. Fees (excl.
        GST) per participant:16 participants and above: $65012-15 participants:
        $750 8-11 participants: $870For 7 or fewer participants, we charge a
        flat fee of S$6,800 total. All quoted prices are in SGD. Invoicing terms
        available."
- id: mastering-the-web
  slug: mastering-the-web
  title: "Mastering the Web: Understand Full-Stack Development"
  subtitle: null
  duration: 2 days
  description: Discover the inner workings of web applications in just 1-2 days!
  hero_image: /images/remote/LvTrPWE98zoDD5wX1uoP1UGit4.png"Mastering the Web: Understand Full-Stack Development - Tinkercademy:
      Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/mastering-the-web
    openGraph:
      title: "Mastering the Web: Understand Full-Stack Development - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Mastering the Web: Understand Full-Stack Development - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/LvTrPWE98zoDD5wX1uoP1UGit4.png"https://webmaster.tk.sg/" target="_blank" rel="noopener
        noreferrer"><a>here</a></a>.</p>
      text: Discover the inner workings of web applications in just 1-2 days!Web apps
        are part of everyday life, from banking, to email, to shopping, and
        productivity. What actually happens, though, between the moment you
        click on a URL, and when a fully-fledged web app shows up in your
        favourite browser?This programme takes you from the basics of HTML, CSS,
        and JavaScript on the frontend (day 1), to servers and databases on the
        backend (day 2). Get a taste of web development, and gain the skills to
        communicate effectively with tech teams and understand the web's
        potential.Perfect for fuelling your startup idea or web app prototype,
        this hands-on, intuitive course will have you interfacing confidently
        with developers in no time. Join us and unlock the power of web
        technologies! Find out more here.
    - type: richtext
      label: null
      html: "<p>In this broad web development programme, you will learn to appreciate
        core technologies that power the internet, and get hands-on building
        your own versatile websites with core front-end web technologies: HTML,
        CSS, and JavaScript.</p><p>Gain exposure too to server-side web
        development through hands-on projects involving Python and Flask, a
        flexible web development framework. Through this process, you will gain
        practical experience and a solid foundation in web development.</p><p>By
        the end of the programme, you will learn:</p><ul><li><p>Understand the
        fundamentals of front-end web development with the HTML, CSS, and
        JavaScript languages</p></li><li><p>Create a basic back-end web
        application using Flask and Python programming (day
        2)</p></li><li><p>What application programming interfaces (APIs) are,
        and how they let you access complex capabilities from providers such as
        Google and OpenAI (day 2)</p></li></ul>"
      text: "In this broad web development programme, you will learn to appreciate
        core technologies that power the internet, and get hands-on building
        your own versatile websites with core front-end web technologies: HTML,
        CSS, and JavaScript.Gain exposure too to server-side web development
        through hands-on projects involving Python and Flask, a flexible web
        development framework. Through this process, you will gain practical
        experience and a solid foundation in web development.By the end of the
        programme, you will learn:Understand the fundamentals of front-end web
        development with the HTML, CSS, and JavaScript languagesCreate a basic
        back-end web application using Flask and Python programming (day 2)What
        application programming interfaces (APIs) are, and how they let you
        access complex capabilities from providers such as Google and OpenAI
        (day 2)"
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times</strong>: 1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups.</p><p><strong>Location</strong>: CT HUB 2, 114
        Lavender Street.</p><p><strong>Requirements</strong>: Bring your own
        laptop! Modern Windows, Mac or Linux laptops are supported, as
        development will take place in the browser. (iPads and Chromebooks
        provide suboptimal experiences, and are
        discouraged.)</p><p><strong>Fees</strong> (figures in parantheses
        include GST)<br />• Individual sign-up: $1,600 ($1,744)<br />• Groups of
        up to 7: $11,200 ($12,208)<br />• Groups of 8-15: $12,400 ($13,516)<br
        />• Groups of 16 and above: Please email for more information</p><p>All
        quoted prices are in SGD. Invoicing terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups.Location: CT HUB 2, 114 Lavender Street.Requirements: Bring
        your own laptop! Modern Windows, Mac or Linux laptops are supported, as
        development will take place in the browser. (iPads and Chromebooks
        provide suboptimal experiences, and are discouraged.)Fees (figures in
        parantheses include GST)• Individual sign-up: $1,600 ($1,744)• Groups of
        up to 7: $11,200 ($12,208)• Groups of 8-15: $12,400 ($13,516)• Groups of
        16 and above: Please email for more informationAll quoted prices are in
        SGD. Invoicing terms available."
- id: microsoft-copilot
  slug: microsoft-copilot
  title: "Microsoft Copilot "
  subtitle: null
  duration: 2 days
  description: Microsoft Copilot is an advanced AI assistant integrated into
    Singapore’s Ministry of Education (MOE) and other leading corporations. This
    innovative tool harnesses the power of artificial intelligence to
    revolutionize the way you work. By automating routine tasks, providing
    intelligent suggestions, and enhancing creativity, Copilot empowers you to
    focus on strategic initiatives and achieve greater productivity.
  hero_image: /images/remote/IRgW5yEXLnHZADRC2V0Chd9ogrc.png"Microsoft Copilot - Tinkercademy: Coding and Making for Schools and
      Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/microsoft-copilot
    openGraph:
      title: "Microsoft Copilot  - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Microsoft Copilot  - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/IRgW5yEXLnHZADRC2V0Chd9ogrc.png"<ul><li><p>Understand the basics of AI and its applications: Learn about
        the fundamentals of artificial intelligence, its capabilities, and how
        it can be used to enhance productivity and decision-making.
        </p></li><li><p>Explore the features and benefits of Microsoft Copilot:
        Discover the various features of Microsoft Copilot, including its
        ability to generate text, summarize information, and provide intelligent
        suggestions. </p></li><li><p>Apply Copilot to real-world tasks: Learn
        how to effectively use Copilot to automate routine tasks, improve
        efficiency, and enhance creativity in your daily work.</p></li></ul>"
      text: "Understand the basics of AI and its applications: Learn about the
        fundamentals of artificial intelligence, its capabilities, and how it
        can be used to enhance productivity and decision-making. Explore the
        features and benefits of Microsoft Copilot: Discover the various
        features of Microsoft Copilot, including its ability to generate text,
        summarize information, and provide intelligent suggestions. Apply
        Copilot to real-world tasks: Learn how to effectively use Copilot to
        automate routine tasks, improve efficiency, and enhance creativity in
        your daily work."
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times:</strong> 1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups. </p><p><strong>Location:</strong> TBC
        </p><p><strong>Requirements:</strong> Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.)
        </p><p><strong>Fees</strong> (figures in parantheses include
        GST)</p><ul><li><p> Individual sign-up: $1,600
        ($1,744) </p></li><li><p>Groups of up to 7: $11,200
        ($12,208) </p></li><li><p>Groups of 8-15: $12,400
        ($13,516) </p></li><li><p>Groups of 16 and above: Please email for more
        information</p></li></ul><p>All quoted prices are in SGD. Invoicing
        terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups. Location: TBC Requirements: Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.) Fees (figures in
        parantheses include GST) Individual sign-up: $1,600 ($1,744) Groups of
        up to 7: $11,200 ($12,208) Groups of 8-15: $12,400 ($13,516) Groups of
        16 and above: Please email for more informationAll quoted prices are in
        SGD. Invoicing terms available."
- id: no-code-machine-learning
  slug: no-code-machine-learning
  title: No-Code Machine Learning
  subtitle: null
  duration: 2 days
  description: No-code machine learning empowers you to harness the power of AI
    without writing a single line of code. With user-friendly platforms like
    Orange, you can easily build, train, and deploy sophisticated machine
    learning models. This course will guide you through the entire process, from
    data preparation to model deployment, enabling you to unlock the potential
    of AI and drive data-driven insights.
  hero_image: /images/remote/JxXpAu98LjIbh9p6qymMH0UUMRA.png"No-Code Machine Learning - Tinkercademy: Coding and Making for Schools
      and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/no-code-machine-learning
    openGraph:
      title: "No-Code Machine Learning - Tinkercademy: Coding and Making for Schools
        and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "No-Code Machine Learning - Tinkercademy: Coding and Making for Schools
        and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/JxXpAu98LjIbh9p6qymMH0UUMRA.png"<ul><li><p>Master the fundamentals of machine learning: Understand core
        concepts such as supervised and unsupervised learning, classification,
        regression, and clustering. </p></li><li><p>Gain proficiency in using
        Orange: Learn how to navigate the Orange interface, import and clean
        data, build and train machine learning models, and evaluate their
        performance. </p></li><li><p>Apply machine learning to real-world
        problems: Use Orange to solve practical problems, such as predicting
        customer churn, identifying fraudulent transactions, or categorising
        text documents.</p></li></ul>"
      text: "Master the fundamentals of machine learning: Understand core concepts
        such as supervised and unsupervised learning, classification,
        regression, and clustering. Gain proficiency in using Orange: Learn how
        to navigate the Orange interface, import and clean data, build and train
        machine learning models, and evaluate their performance. Apply machine
        learning to real-world problems: Use Orange to solve practical problems,
        such as predicting customer churn, identifying fraudulent transactions,
        or categorising text documents."
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times: </strong>1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups. </p><p><strong>Location:</strong> TBC
        </p><p><strong>Requirements:</strong> Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.)</p><ul><li><p>
        <strong>Fees</strong> (figures in parantheses include
        GST) </p></li><li><p>Individual sign-up: $1,600
        ($1,744) </p></li><li><p>Groups of up to 7: $11,200
        ($12,208) </p></li><li><p>Groups of 8-15: $12,400
        ($13,516) </p></li><li><p>Groups of 16 and above: Please email for more
        information </p></li></ul><p>All quoted prices are in SGD. Invoicing
        terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups. Location: TBC Requirements: Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.) Fees (figures in
        parantheses include GST) Individual sign-up: $1,600 ($1,744) Groups of
        up to 7: $11,200 ($12,208) Groups of 8-15: $12,400 ($13,516) Groups of
        16 and above: Please email for more information All quoted prices are in
        SGD. Invoicing terms available."
- id: no-code-web-design-framer
  slug: no-code-web-design-framer
  title: No-code Web Design (Framer)
  subtitle: null
  duration: 2 days
  description: In today's digital age, a strong online presence is essential for
    organisations of all sizes. A well-designed website can captivate your
    audience, enhance user experience, and drive conversions. This course
    empowers you to create stunning, user-friendly websites without writing a
    single line of code. Learn the principles of UI/UX design and leverage the
    power of no-code tools like Framer to bring your digital visions to life.
  hero_image: /images/remote/6AquPe6snR8cp5io7SOUGbf8eGU.png"No-code Web Design (Framer) - Tinkercademy: Coding and Making for
      Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/no-code-web-design-framer
    openGraph:
      title: "No-code Web Design (Framer) - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "No-code Web Design (Framer) - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/6AquPe6snR8cp5io7SOUGbf8eGU.png"<ul><li><p>Master the fundamentals of UI/UX design: Students will learn
        the core principles of user interface and user experience design,
        including layout, typography, color theory, and information hierarchy.
        </p></li><li><p>Gain proficiency in using no-code tools, specifically
        Framer: Students will develop practical skills in using Framer to create
        interactive prototypes and design web applications without coding.
        </p></li><li><p>Design and prototype a functional website or web
        application: Students will apply their knowledge of UI/UX design and
        no-code tools to create a real-world project, showcasing their ability
        to design user-centered digital experiences.</p></li></ul>"
      text: "Master the fundamentals of UI/UX design: Students will learn the core
        principles of user interface and user experience design, including
        layout, typography, color theory, and information hierarchy. Gain
        proficiency in using no-code tools, specifically Framer: Students will
        develop practical skills in using Framer to create interactive
        prototypes and design web applications without coding. Design and
        prototype a functional website or web application: Students will apply
        their knowledge of UI/UX design and no-code tools to create a real-world
        project, showcasing their ability to design user-centered digital
        experiences."
    - type: richtext
      label: null
      html: "<p><strong>Dates and Times:</strong> 1-2 days; can be configured over
        multiple sessions. Please write in to enquire. We start a class with a
        minimum of 5 sign-ups. </p><p><strong>Location:</strong> TBC
        </p><p><strong>Requirements:</strong> Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.)
        </p><ul><li><p><strong>Fees</strong> (figures in parantheses include
        GST)</p></li><li><p>Individual sign-up: $1,600
        ($1,744) </p></li><li><p>Groups of up to 7: $11,200
        ($12,208) </p></li><li><p>Groups of 8-15: $12,400
        ($13,516) </p></li><li><p>Groups of 16 and above: Please email for more
        information</p></li></ul><p> All quoted prices are in SGD. Invoicing
        terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. We start a class with a minimum of 5
        sign-ups. Location: TBC Requirements: Bring your own laptop! Modern
        Windows or Mac laptops are supported. (iPads and Chromebooks are
        supported, though not for all applications.) Fees (figures in
        parantheses include GST)Individual sign-up: $1,600 ($1,744) Groups of up
        to 7: $11,200 ($12,208) Groups of 8-15: $12,400 ($13,516) Groups of 16
        and above: Please email for more information All quoted prices are in
        SGD. Invoicing terms available."
- id: professional-certificate-in-mobile-application-development
  slug: professional-certificate-in-mobile-application-development
  title: Professional Certificate in Mobile Application Development
  subtitle: null
  duration: 2 days/module
  description: In today's digital age, mobile apps have become an integral part of
    our daily lives. This course empowers you to harness the power of mobile
    technology and create innovative apps for iOS and Android platforms. You'll
    learn essential programming languages, design principles, and development
    tools to bring your app ideas to life.
  hero_image: /images/remote/PuT46Rc7thhhYyLZrhYVo6wObE.png"Professional Certificate in Mobile Application Development -
      Tinkercademy: Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/professional-certificate-in-mobile-application-development
    openGraph:
      title: "Professional Certificate in Mobile Application Development -
        Tinkercademy: Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Professional Certificate in Mobile Application Development -
        Tinkercademy: Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/PuT46Rc7thhhYyLZrhYVo6wObE.png"<p>In today's digital age, mobile apps have become an integral part of
        our daily lives. This course empowers you to harness the power of mobile
        technology and create innovative apps for iOS and Android platforms.
        You'll learn essential programming languages, design principles, and
        development tools to bring your app ideas to life.</p><h3>Who Should
        Attend</h3><p>Aspiring app developers who want to build full-stack
        mobile applications that can be published online for download or
        saleAnyone with an interest in learning the fundamentals of mobile app
        design and developmentProfessionals with coding experience, but new to
        mobile app development.</p><p><strong>PREREQUISITES: </strong>Experience
        in other programming languages</p>"
      text: "In today's digital age, mobile apps have become an integral part of our
        daily lives. This course empowers you to harness the power of mobile
        technology and create innovative apps for iOS and Android platforms.
        You'll learn essential programming languages, design principles, and
        development tools to bring your app ideas to life.Who Should
        AttendAspiring app developers who want to build full-stack mobile
        applications that can be published online for download or saleAnyone
        with an interest in learning the fundamentals of mobile app design and
        developmentProfessionals with coding experience, but new to mobile app
        development.PREREQUISITES: Experience in other programming languages"
    - type: richtext
      label: null
      html: "<ul><li><p>Understand and apply basic app design and prototyping concepts
        such as mock-ups, typography, iconography</p></li><li><p>Install and run
        a basic app using Android Studio on PC or Mac, and (if available) Xcode
        on Mac</p></li><li><p>Explain the difference between a relational (SQL)
        and document-based (No SQL) database, and be able to select one for a
        given project</p></li><li><p>Understand what an Application Programming
        Interface (API) is, and how to read the documentation when working with
        common APIs</p></li><li><p>Understand how apps and websites use APIs and
        Representational State Transfer (REST) web services to
        communicate</p></li><li><p>Understand and use modern JavaScript language
        features from the ES6 specification, such as arrow functions, spread
        operators, and destructuring</p></li><li><p>Demonstrate a solid
        foundation in back-end and front-end mobile app
        development</p></li><li><p>Master Mobile App Development Fundamentals:
        Learn the core concepts of mobile app development, including programming
        languages like Swift (for iOS) and Kotlin/Java (for Android), as well as
        essential frameworks and tools. </p></li><li><p>Design User-Centric
        Mobile Apps: Understand the principles of user interface and user
        experience design, and apply them to create intuitive and visually
        appealing mobile apps. </p></li><li><p>Build and Deploy Mobile Apps:
        Learn how to build, test, and deploy mobile apps to the Apple App Store
        and Google Play Store</p></li></ul>"
      text: "Understand and apply basic app design and prototyping concepts such as
        mock-ups, typography, iconographyInstall and run a basic app using
        Android Studio on PC or Mac, and (if available) Xcode on MacExplain the
        difference between a relational (SQL) and document-based (No SQL)
        database, and be able to select one for a given projectUnderstand what
        an Application Programming Interface (API) is, and how to read the
        documentation when working with common APIsUnderstand how apps and
        websites use APIs and Representational State Transfer (REST) web
        services to communicateUnderstand and use modern JavaScript language
        features from the ES6 specification, such as arrow functions, spread
        operators, and destructuringDemonstrate a solid foundation in back-end
        and front-end mobile app developmentMaster Mobile App Development
        Fundamentals: Learn the core concepts of mobile app development,
        including programming languages like Swift (for iOS) and Kotlin/Java
        (for Android), as well as essential frameworks and tools. Design
        User-Centric Mobile Apps: Understand the principles of user interface
        and user experience design, and apply them to create intuitive and
        visually appealing mobile apps. Build and Deploy Mobile Apps: Learn how
        to build, test, and deploy mobile apps to the Apple App Store and Google
        Play Store"
    - type: richtext
      label: null
      html: '<p><strong>Topic/Structure:</strong></p><p><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-module-designing-and-prototyping"><a>Module
        1: Designing and Prototyping App User Interfaces for Mobile App
        Development</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-module-introduction-mobile-app"><a>Module
        2: Introduction to Mobile App Development</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-module-building-database-driven"><a>Module
        3: Building Database-Driven Mobile Apps</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-module-interfacing-mobile-apps-web"><a>Module
        4: Interfacing Mobile Apps with Web Back-Ends</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-module-building-full-stack-mobile"><a>Module
        5: Building a Full-Stack Mobile Application</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-module-further-mobile-app"><a>Module
        6: Further Mobile App Development</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-module-executing-projects-mobile"><a>Module
        7: Executing Projects in Mobile App Development</a></a><br /><br />This
        course is also a part of the following programmes: <a
        href="https://academy.smu.edu.sg/advanced-diploma-mobile-web-application-development-4131"><a>Advanced
        Diploma in Web &amp; Mobile Application Development</a></a><br /><a
        href="https://academy.smu.edu.sg/advanced-diploma-multiplatform-mobile-app-development-and-cloud-management-7886"><a>Advanced
        Diploma in Multiplatform Mobile App Development and Cloud
        Management</a></a></p><p><strong>Assessment: </strong>Individual
        assessment, project presentations.<br /><br /><strong>Certification:
        </strong>Upon completion of all 7 modules within a maximum duration of 3
        years, participants will be awarded a digital Professional Certificate
        in Mobile Application Development.</p><p><strong>Dates and
        Times:</strong> Please write in to enquire.
        </p><p><strong>Location:</strong> Singapore Management University (SMU)
        </p><p><strong>Fees:</strong> As low as $1,422.40. For more information
        refer to: <a
        href="https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-pcmob#fee-table"
        target="_blank" rel="noopener
        noreferrer"><a>https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-pcmob#fee-table</a></a></p>'
      text: "Topic/Structure:Module 1: Designing and Prototyping App User Interfaces
        for Mobile App DevelopmentModule 2: Introduction to Mobile App
        DevelopmentModule 3: Building Database-Driven Mobile AppsModule 4:
        Interfacing Mobile Apps with Web Back-EndsModule 5: Building a
        Full-Stack Mobile ApplicationModule 6: Further Mobile App
        DevelopmentModule 7: Executing Projects in Mobile App DevelopmentThis
        course is also a part of the following programmes: Advanced Diploma in
        Web & Mobile Application DevelopmentAdvanced Diploma in Multiplatform
        Mobile App Development and Cloud ManagementAssessment: Individual
        assessment, project presentations.Certification: Upon completion of all
        7 modules within a maximum duration of 3 years, participants will be
        awarded a digital Professional Certificate in Mobile Application
        Development.Dates and Times: Please write in to enquire. Location:
        Singapore Management University (SMU) Fees: As low as $1,422.40. For
        more information refer to:
        https://academy.smu.edu.sg/courses/professional-certificate-mobile-appl\
        ication-development-pcmob#fee-table"
- id: professional-certificate-in-web-application-development
  slug: professional-certificate-in-web-application-development
  title: Professional Certificate in Web Application Development
  subtitle: null
  duration: 2 days/module
  description: In today's digital age, a well-designed and intuitive user
    interface is crucial for the success of any web application. This course
    will equip you with the essential skills to create stunning and functional
    user interfaces using powerful no-code tools like Framer and Bubble. By
    mastering prototyping techniques and UI/UX design principles, you'll be able
    to build exceptional web applications that captivate your users and drive
    business results.
  hero_image: /images/remote/fWouEVvBE4OgXcNYbaPWP57gdM.png"Professional Certificate in Web Application Development - Tinkercademy:
      Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/professional-certificate-in-web-application-development
    openGraph:
      title: "Professional Certificate in Web Application Development - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Professional Certificate in Web Application Development - Tinkercademy:
        Coding and Making for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/fWouEVvBE4OgXcNYbaPWP57gdM.png"<p>In today's digital age, a well-designed and intuitive user interface
        is crucial for the success of any web application. This course will
        equip you with the essential skills to create stunning and functional
        user interfaces using powerful no-code tools like Framer and Bubble. By
        mastering prototyping techniques and UI/UX design principles, you'll be
        able to build exceptional web applications that captivate your users and
        drive business
        results.</p><p><strong>PREREQUISITES</strong></p><ul><li><p>Must have at
        least a Polytechnic Diploma</p></li><li><p>Must have basic HTML/ CSS
        knowledge</p></li><li><p>Must be computer
        literate</p></li></ul><p><strong>SYSTEM
        REQUIREMENTS</strong></p><p>Functional Laptop: (1) CPU must be of at
        least intel core I3, (2) GPU must have an integrated graphics card and
        (3) RAM must be of at least 4GB </p>"
      text: "In today's digital age, a well-designed and intuitive user interface is
        crucial for the success of any web application. This course will equip
        you with the essential skills to create stunning and functional user
        interfaces using powerful no-code tools like Framer and Bubble. By
        mastering prototyping techniques and UI/UX design principles, you'll be
        able to build exceptional web applications that captivate your users and
        drive business results.PREREQUISITESMust have at least a Polytechnic
        DiplomaMust have basic HTML/ CSS knowledgeMust be computer
        literateSYSTEM REQUIREMENTSFunctional Laptop: (1) CPU must be of at
        least intel core I3, (2) GPU must have an integrated graphics card and
        (3) RAM must be of at least 4GB"
    - type: richtext
      label: null
      html: "<ul><li><p>Introduction to CSS Syntax, and how to select HTML with
        classes and IDs</p></li><li><p>Design fundamentals and resources for
        icons and typography</p></li><li><p>Getting started with Bubble to build
        simple web app prototypes</p></li><li><p>A brief introduction to
        JavaScript and jQuery for simple manipulation</p></li><li><p>Understand
        the need for software source control, and how it applies to usage in
        teams</p></li><li><p>Understand and implement roles in a software
        development team</p></li><li><p>Master Prototyping Techniques: Learn how
        to create interactive prototypes using Framer to visualize and validate
        your web application ideas. </p></li><li><p>Understand UI/UX Design
        Principles: Gain a solid understanding of user interface and user
        experience design principles, including layout, typography, color
        theory, and information architecture. </p></li><li><p>Build Functional
        Web Applications with Bubble &amp; Framer: Learn how to use web tools to
        build fully functional web applications without writing code, focusing
        on user interface design and data management.</p></li></ul>"
      text: "Introduction to CSS Syntax, and how to select HTML with classes and
        IDsDesign fundamentals and resources for icons and typographyGetting
        started with Bubble to build simple web app prototypesA brief
        introduction to JavaScript and jQuery for simple manipulationUnderstand
        the need for software source control, and how it applies to usage in
        teamsUnderstand and implement roles in a software development teamMaster
        Prototyping Techniques: Learn how to create interactive prototypes using
        Framer to visualize and validate your web application ideas. Understand
        UI/UX Design Principles: Gain a solid understanding of user interface
        and user experience design principles, including layout, typography,
        color theory, and information architecture. Build Functional Web
        Applications with Bubble & Framer: Learn how to use web tools to build
        fully functional web applications without writing code, focusing on user
        interface design and data management."
    - type: richtext
      label: null
      html: '<p><strong>Topic/Structure:</strong></p><p><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-module-prototyping-and-user-interface"><a>Module
        1: Prototyping and User Interface Design for Web App
        Development</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-module-introduction-front-end-web-app"><a>Module
        2: Introduction to Front End Web App Development</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-module-building-database-driven-web"><a>Module
        3: Building Database-Driven Web Apps</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-module-back-end-web-app-development"><a>Module
        4: Back-End Web App Development with Databases</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-module-building-full-stack-web"><a>Module
        5: Building a Full-Stack Web Application</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-module-frameworks-full-stack-web-app"><a>Module
        6: Frameworks for Full-Stack Web App Development</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-module-practical-tools-web-app"><a>Module
        7: Practical Tools for Web App Development Project</a></a></p><p>This
        course is also a part of the following programmes: <a
        href="https://academy.smu.edu.sg/courses/advanced-diploma-web-and-mobile-application-development"><a>Advanced
        Diploma in Web &amp; Mobile Application Development</a></a><br /><a
        href="https://academy.smu.edu.sg/courses/advanced-diploma-full-stack-web-app-development-and-cloud-management"><a>Advanced
        Diploma in Full Stack Web App Development and Cloud
        Management</a></a></p><p><strong>Assessment:</strong> Individual
        assessments, project presentations. </p><p><strong>Dates and
        Times</strong>: Weeknights (7pm - 10:30pm), Saturday (9am - 12.30pm).
        Please write in to enquire.</p><p><strong>Location:</strong> Singapore
        Management University (SMU). This programme is conducted
        online.</p><p><strong>Fees:</strong> SGD12,208* (as low as SGD1,422.40
        after maximum funding). Learn more <a
        href="https://academy.smu.edu.sg/courses/professional-certificate-web-application-development-pcweb#fee-table"><a>here</a></a>.</p>'
      text: "Topic/Structure:Module 1: Prototyping and User Interface Design for Web
        App DevelopmentModule 2: Introduction to Front End Web App
        DevelopmentModule 3: Building Database-Driven Web AppsModule 4: Back-End
        Web App Development with DatabasesModule 5: Building a Full-Stack Web
        ApplicationModule 6: Frameworks for Full-Stack Web App DevelopmentModule
        7: Practical Tools for Web App Development ProjectThis course is also a
        part of the following programmes: Advanced Diploma in Web & Mobile
        Application DevelopmentAdvanced Diploma in Full Stack Web App
        Development and Cloud ManagementAssessment: Individual assessments,
        project presentations. Dates and Times: Weeknights (7pm - 10:30pm),
        Saturday (9am - 12.30pm). Please write in to enquire.Location: Singapore
        Management University (SMU). This programme is conducted online.Fees:
        SGD12,208* (as low as SGD1,422.40 after maximum funding). Learn more
        here."
- id: ri-futurecreate-maker-programme-2025
  slug: ri-futurecreate-maker-programme-2025
  title: RI FutureCreate Maker Programme 2025
  subtitle: null
  duration: 4 years
  description: The RI FutureCreate Maker Programme is a hands-on exploration of
    creativity, design, and engineering, where students transform ideas into
    tangible creations. Across seven interactive sessions, participants will
    dive into fabrication techniques, structural design, motion mechanics, and
    sensory experiences like sound and light. From crafting everyday solutions
    to building whimsical contraptions, students will experiment with materials,
    tools, and innovative processes to bring their visions to life. Whether
    shaping, assembling, coding, or storytelling through movement, this
    programme encourages a maker’s mindset—blending art, science, and
    problem-solving to inspire the next generation of inventors.
  hero_image: /images/remote/wqyxF3zF22qYEH16VE70ko2CEak.jpg"RI FutureCreate Maker Programme 2025 - Tinkercademy: Coding and Making
      for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/ri-futurecreate-maker-programme-2025
    openGraph:
      title: "RI FutureCreate Maker Programme 2025 - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "RI FutureCreate Maker Programme 2025 - Tinkercademy: Coding and Making
        for Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/wqyxF3zF22qYEH16VE70ko2CEak.jpg"<p><strong>Broad Overview of Curriculum<br /><br />Year 1: Analog
        Fabrication Skills Development</strong></p><ul><li><p>pick up a wide
        variety of maker skills</p></li><li><p>get accustomed to getting hands
        dirty</p></li><li><p>adopt a culture of try first, worry
        later</p></li><li><p>cultivating ‘let’s make our own!, instead of just
        buy lah’ mindset</p></li><li><p>inspire fulfilment in designing &amp;
        making for oneself</p></li></ul><p><strong>Year 2: Digital Fabrication
        Skills Development</strong></p><ul><li><p>acquire basic electronics
        know-how</p></li><li><p>bridging electronics, code &amp; physical making
        to create real-world objects</p></li><li><p>making as a ‘superpower’, to
        customise the world around you; solving daily challenges or making
        beautiful/quirky things for amusement</p></li><li><p>understanding how
        the real world works vs ‘passive consumption &amp; studying theoretical
        concepts’</p></li></ul><p><strong>Year 3: Craftsmanship,
        Self-Reflection, Making &amp; Tinkering as a Way of
        Life</strong></p><ul><li><p>identify areas of interest and further
        develop skills in that area(analog + digital)</p></li><li><p>small
        focused projects that develop new skills or improve
        competencies</p></li><li><p>reflect what drives one’s desire to create;
        pleasure, purpose or profit?</p></li><li><p>choose and explore 1-2 areas
        which is not part of core interest; trying something that is beyond
        comfort-zone, stimulate experimentation.</p></li><li><p>self research +
        experimentation, instructor can help troubleshoot/provide additional
        resources on request/consult</p></li></ul><p><strong>Year 4:
        Self-Discovery Project; Exploration and
        Expression</strong></p><ul><li><p>identifying one’s core interests; art,
        science, music etc.</p></li><li><p>explore existing works for
        inspiration</p></li><li><p>prototype small experiments to test ideas and
        techniques</p></li><li><p>refine craftsmanship and acquire required new
        skills</p></li><li><p>execution, refinement and
        polish</p></li><li><p>show and tell</p></li></ul>"
      text: "Broad Overview of CurriculumYear 1: Analog Fabrication Skills
        Developmentpick up a wide variety of maker skillsget accustomed to
        getting hands dirtyadopt a culture of try first, worry latercultivating
        ‘let’s make our own!, instead of just buy lah’ mindsetinspire fulfilment
        in designing & making for oneselfYear 2: Digital Fabrication Skills
        Developmentacquire basic electronics know-howbridging electronics, code
        & physical making to create real-world objectsmaking as a ‘superpower’,
        to customise the world around you; solving daily challenges or making
        beautiful/quirky things for amusementunderstanding how the real world
        works vs ‘passive consumption & studying theoretical concepts’Year 3:
        Craftsmanship, Self-Reflection, Making & Tinkering as a Way of
        Lifeidentify areas of interest and further develop skills in that
        area(analog + digital)small focused projects that develop new skills or
        improve competenciesreflect what drives one’s desire to create;
        pleasure, purpose or profit?choose and explore 1-2 areas which is not
        part of core interest; trying something that is beyond comfort-zone,
        stimulate experimentation.self research + experimentation, instructor
        can help troubleshoot/provide additional resources on
        request/consultYear 4: Self-Discovery Project; Exploration and
        Expressionidentifying one’s core interests; art, science, music
        etc.explore existing works for inspirationprototype small experiments to
        test ideas and techniquesrefine craftsmanship and acquire required new
        skillsexecution, refinement and polishshow and tell"
    - type: richtext
      label: null
      html: <p><strong>Location:</strong> Raffles Institution </p>
      text: "Location: Raffles Institution"
- id: swift-accelerator
  slug: swift-accelerator
  title: Swift Accelerator
  subtitle: null
  duration: 8 months
  description: The Swift Accelerator is a rigorous program designed to empower
    aspiring developers with the skills and knowledge necessary to create
    exceptional iOS and macOS applications. Through hands-on projects and expert
    mentorship, participants will master the Swift programming language, adhere
    to Apple's Human Interface Guidelines, and leverage the latest development
    tools. The program culminates in the development and publishing of a fully
    functional iOS app on the App Store.
  hero_image: /images/remote/pzZfgIklaSw80TJTGemWvQyrCLo.png"Swift Accelerator - Tinkercademy: Coding and Making for Schools and
      Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/swift-accelerator
    openGraph:
      title: "Swift Accelerator - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Swift Accelerator - Tinkercademy: Coding and Making for Schools and
        Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/pzZfgIklaSw80TJTGemWvQyrCLo.png"<ul><li><p>Master Swift Programming: Gain a deep understanding of the
        Swift programming language, including its syntax, data structures,
        control flow, and object-oriented programming principles.
        </p></li><li><p>Apply Apple's Human Interface Guidelines: Learn how to
        design and develop user-friendly and visually appealing iOS and macOS
        apps that adhere to Apple's design standards and best practices.
        </p></li><li><p>Build and Deploy iOS Apps: Develop and test iOS apps,
        integrate with Apple's frameworks and APIs, and successfully deploy them
        to the App Store.</p></li></ul>"
      text: "Master Swift Programming: Gain a deep understanding of the Swift
        programming language, including its syntax, data structures, control
        flow, and object-oriented programming principles. Apply Apple's Human
        Interface Guidelines: Learn how to design and develop user-friendly and
        visually appealing iOS and macOS apps that adhere to Apple's design
        standards and best practices. Build and Deploy iOS Apps: Develop and
        test iOS apps, integrate with Apple's frameworks and APIs, and
        successfully deploy them to the App Store."
    - type: richtext
      label: null
      html: <p><strong>Location:</strong> Apple Singapore Office
        </p><p><strong>Fees:</strong> This innovative program is fully
        subsidised by the Infocomm Media Development Authority (IMDA) for
        eligible participants.</p>
      text: "Location: Apple Singapore Office Fees: This innovative program is fully
        subsidised by the Infocomm Media Development Authority (IMDA) for
        eligible participants."
- id: imda-figma-2025
  slug: imda-figma-2025
  title: UI/UX Design with Figma
  subtitle: null
  duration: 26 hours
  description: "Students will learn visual and interactive prototyping through a
    design thinking process involving brainstorming, idea generation, and
    prototyping. They will make use of UI/UX tools utilised by professionals:
    FigJam for collaborative brainstorming, Figma for creating visually
    appealing interactive UI/UX designs, and Figma Slides to effectively
    communicate their design solutions."
  hero_image: /images/remote/3Iy0tiNcx6GQ1D8zsjP8p7GCxE.png"UI/UX Design with Figma - Tinkercademy: Coding and Making for Schools
      and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/imda-figma-2025
    openGraph:
      title: "UI/UX Design with Figma - Tinkercademy: Coding and Making for Schools
        and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "UI/UX Design with Figma - Tinkercademy: Coding and Making for Schools
        and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/3Iy0tiNcx6GQ1D8zsjP8p7GCxE.png"<p>Students will learn visual and interactive prototyping through a
        design thinking process involving brainstorming, idea generation, and
        prototyping. They will make use of UI/UX tools utilised by
        professionals: FigJam for collaborative brainstorming, Figma for
        creating visually appealing interactive UI/UX designs, and Figma Slides
        to effectively communicate their design solutions. </p><p>This course is
        suitable for students with no programming or design experience, but are
        interested in developing instincts for building web and mobile
        applications for users.</p>"
      text: "Students will learn visual and interactive prototyping through a design
        thinking process involving brainstorming, idea generation, and
        prototyping. They will make use of UI/UX tools utilised by
        professionals: FigJam for collaborative brainstorming, Figma for
        creating visually appealing interactive UI/UX designs, and Figma Slides
        to effectively communicate their design solutions. This course is
        suitable for students with no programming or design experience, but are
        interested in developing instincts for building web and mobile
        applications for users."
    - type: richtext
      label: null
      html: <ul><li><p>Understand the design thinking process</p></li><li><p>Explore
        FigJam for brainstorming</p></li><li><p>Utilise Figma for visual and
        interactive prototyping</p></li><li><p>Explore and understand UI/UX
        concepts</p></li><li><p>Create visually appealing and intuitive digital
        designs for web and mobile apps</p></li><li><p>Communicate design
        solutions</p></li></ul>
      text: Understand the design thinking processExplore FigJam for
        brainstormingUtilise Figma for visual and interactive prototypingExplore
        and understand UI/UX conceptsCreate visually appealing and intuitive
        digital designs for web and mobile appsCommunicate design solutions
    - type: richtext
      label: null
      html: '<p><strong>Project</strong></p><p>Students will create an app prototype
        or experience, which can be submitted for the <a
        href="https://swiftexplorers.sg" target="_blank" rel="noopener
        noreferrer"><a>Swift Explorers
        Challenge</a></a>.</p><p><strong>Requirements</strong></p><ul><li><p><strong>Hardware:
        </strong> Windows, Mac, Chromebook,
        iPad</p></li><li><p><strong>Software</strong>: Chrome, Firefox, Safari,
        or Edge. Figma is a web-based application. For iPad, we recommend the
        free <a href="https://figurative.design/" target="_blank" rel="noopener
        noreferrer"><a>Figurative</a></a> app.</p></li></ul>'
      text: "ProjectStudents will create an app prototype or experience, which can be
        submitted for the Swift Explorers Challenge.RequirementsHardware:
        Windows, Mac, Chromebook, iPadSoftware: Chrome, Firefox, Safari, or
        Edge. Figma is a web-based application. For iPad, we recommend the free
        Figurative app."
- id: vibe-coding-for-digital-builders
  slug: vibe-coding-for-digital-builders
  title: Vibe Coding for Digital Builders
  subtitle: null
  duration: 2 days
  description: Generative AI is reshaping the way organisations approach digital
    transformation, product design, and application development. This workshop
    provides hands-on experience in leveraging AI-driven tools like ChatGPT,
    Figma, and Lovable to rapidly prototype, design, and deploy web
    applications.
  hero_image: /images/remote/ZquQacjrBD49fcKSa0LrIs5hQU.jpg"Vibe Coding for Digital Builders - Tinkercademy: Coding and Making for
      Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    canonical: https://tinkercademy.com/programmes/vibe-coding-for-digital-builders
    openGraph:
      title: "Vibe Coding for Digital Builders - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    twitter:
      title: "Vibe Coding for Digital Builders - Tinkercademy: Coding and Making for
        Schools and Professionals"
      description: "We're Singapore-based expert coders and makers who teach coding
        and making to schools, companies, and professionals worldwide. "
      image: null
    robots: max-image-preview:large
  content:
    - type: image
      src: /images/remote/ZquQacjrBD49fcKSa0LrIs5hQU.jpg"<p><strong>Dates and Times</strong>: 1-2 days; can be configured over
        multiple sessions. Please write in to enquire.
        </p><p><strong>Location</strong>: CT HUB 2, 114 Lavender
        Street.</p><p><strong>Requirements</strong>: Bring your own laptop!
        Modern Windows, Mac or Linux laptops are supported. Participants will be
        provided with paid ChatGPT Business and Lovable plans for the duration
        of the course. </p><p><strong>Fees</strong> (excl. GST) per
        participant:</p><ul><li><p>16 participants and above:
        $650</p></li><li><p>12-15 participants: $750 </p></li><li><p>8-11
        participants: $870</p></li></ul><p>For 7 or fewer participants, we
        charge a flat fee of S$6,800 total. </p><p>All quoted prices are in SGD.
        Invoicing terms available.</p>"
      text: "Dates and Times: 1-2 days; can be configured over multiple sessions.
        Please write in to enquire. Location: CT HUB 2, 114 Lavender
        Street.Requirements: Bring your own laptop! Modern Windows, Mac or Linux
        laptops are supported. Participants will be provided with paid ChatGPT
        Business and Lovable plans for the duration of the course. Fees (excl.
        GST) per participant:16 participants and above: $65012-15 participants:
        $750 8-11 participants: $870For 7 or fewer participants, we charge a
        flat fee of S$6,800 total. All quoted prices are in SGD. Invoicing terms
        available."

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/audiences.yml
```yml
- id: businesses
  label: Businesses
  source_id: p8PkwQy89
- id: tech-productivity
  label: Professional Productivity with Technology
  source_id: K2owTpq3X
- id: public
  label: Public
  source_id: rXBtbZtEa
- id: students
  label: Students
  source_id: n52QjkyZI
- id: teachers
  label: Teachers
  source_id: ElFXo_lob

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/lib/site-media.js
```js
// ── Brand ──────────────────────────────────────────────────────────
export const LOGO_BLACK = '/images/logos/tinkercademy-black.png';
export const LOGO_WHITE = '/images/logos/tinkercademy-white.png';

// ── Partner logos (official training partners) ────────────────────
export const HOME_PARTNER_LOGOS = [
	{ label: 'Unity', src: '/images/partners/unity.png', url: 'https://unity.com/' },
	{
		label: 'Microsoft Global Training Partner',
		src: '/images/partners/microsoft-gtp.png',
		url: 'https://partner.microsoft.com/en-US/explore/education/gtp',
	},
	{ label: 'Figma', src: '/images/partners/figma.png', url: 'https://figma.com/education' },
	{
		label: 'Apple Consultants Network',
		src: '/images/partners/apple-consultant.svg',
		url: 'https://consultants.apple.com/sg/profile/2408934',
	},
	{ label: 'IMDA', src: '/images/partners/imda.svg', url: 'https://www.imda.gov.sg/' },
	{
		label: 'SMU Academy',
		src: '/images/partners/smu-academy.webp',
		url: 'https://www.smu.edu.sg/',
	},
	{ label: 'ISCA', src: '/images/partners/isca.png', url: 'https://www.isca.org.sg/' },
];

// ── Institution logos (expertise / qualifications) ────────────────
export const HOME_INSTITUTION_LOGOS = [
	{ label: 'Cornell University', src: '/images/institutions/cornell.png' },
	{ label: 'Stanford University', src: '/images/institutions/stanford.webp' },
	{ label: 'MIT', src: '/images/institutions/mit.png' },
	{ label: 'Wharton School', src: '/images/institutions/wharton.png' },
	{ label: 'National Institute of Education', src: '/images/institutions/nie.png' },
	{ label: 'Ministry of Education Singapore', src: '/images/institutions/moe.png' },
	{ label: 'Apple', src: '/images/institutions/apple.png' },
	{ label: 'PayPal', src: '/images/institutions/paypal.png' },
];

// ── Certification badges ──────────────────────────────────────────
export const HOME_CERTIFICATION_BADGES = [
	{ label: 'Apple Professional Learning Specialist', src: '/images/certifications/apls.png' },
	{
		label: 'Apple App Development with Swift Certified User',
		src: '/images/certifications/adwscu.png',
	},
	{
		label: 'App Development with Swift Associate',
		src: '/images/certifications/adwsassoc.png',
	},
	{ label: 'Microsoft Azure AI Fundamentals', src: '/images/certifications/ai900.png' },
	{ label: 'Microsoft Innovative Educator', src: '/images/certifications/mie.png' },
	{ label: 'Microsoft Certified Trainer', src: '/images/certifications/mct1.png' },
	{ label: 'Minecraft Education Trainer', src: '/images/certifications/mct2.png' },
	{
		label: 'Unity Certified Associate Game Developer',
		src: '/images/certifications/ucu.png',
	},
	{ label: 'Certified Instructional Professional', src: '/images/certifications/cip.svg' },
];

// ── Course domain bubbles ─────────────────────────────────────────
export const HOME_COURSE_DOMAINS = [
	'AI and Machine Learning with Data Science',
	'Computer Science Fundamentals',
	'Creativity, Craft, and Making',
	'Cryptography',
	'Cybersecurity',
	'Design Thinking',
	'Design, Prototyping, and UI/UX',
	'Game Development',
	'Microcontrollers & IoT',
	'Mobile App Development',
	'Professional Productivity with Technology',
	'Software Engineering',
	'Web Development',
];

// ── Flagship programme images ─────────────────────────────────────
export const HOME_FLAGSHIP_IMAGES = /** @type {Record<string, string>} */ ({
	'Swift Accelerator': '/images/flagship/swift-accelerator.webp',
	'IMDA LEARN Roadmap': '/images/flagship/imda-learn.png',
	'Code For Fun': '/images/flagship/code-for-fun.webp',
});

// ── Popular course card images ────────────────────────────────────
export const HOME_POPULAR_COURSE_ICONS = /** @type {Record<string, string>} */ ({
	'vibe-coding-for-digital-builders-lovable-replit': '/images/courses/lovable.png',
	'vibe-coding-for-digital-builders': '/images/courses/lovable.png',
	'knowledge-powered-ai-with-chatgpt': '/images/courses/chatgpt.png',
	'build-for-mobile-with-react-native': '/images/courses/react-native.png',
});

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/ProgrammeCard.astro
```astro
---
/**
 * ProgrammeCard — a single programme card matching the Framer design.
 *
 * Shows: hero image, audience badge (colour-coded), title,
 * audience + duration + short description metadata rows.
 */

interface Props {
	slug: string;
	title: string;
	heroImage?: string | null;
	audienceLabel?: string;
	audienceId?: string;
	duration?: string;
	shortDescription?: string;
}

const {
	slug,
	title,
	heroImage,
	audienceLabel = 'Programme',
	audienceId = '',
	duration = '',
	shortDescription = '',
} = Astro.props;

const href = `/programmes/${slug}`;

// Audience badge colour:  Students / Teachers → brand red,  Businesses / Public → blue
const AUDIENCE_COLOURS: Record<string, string> = {
	students: 'rgb(240, 93, 87)',
	teachers: 'rgb(240, 93, 87)',
	businesses: '#0099FF',
	public: '#0099FF',
};
const badgeColour = AUDIENCE_COLOURS[audienceId] ?? 'rgb(240, 93, 87)';
---

<a class="prog-card" href={href}>
	<div class="prog-card__inner">
		{/* Audience badge */}
		<span class="prog-card__badge" style={`background-color: ${badgeColour}`}>
			{audienceLabel}
		</span>

		{/* Hero image */}
		<div class="prog-card__image">
			{heroImage ? (
				<img src={heroImage} alt={title} loading="lazy" />
			) : (
				<div class="prog-card__image-placeholder" />
			)}
		</div>

		{/* Text content */}
		<div class="prog-card__body">
			<h2 class="prog-card__title">{title}</h2>
			<div class="prog-card__divider" />
			<div class="prog-card__meta">
				{/* Audience row */}
				<div class="prog-card__meta-row">
					<svg class="prog-card__icon" viewBox="0 0 256 256" width="16" height="16" fill="currentColor">
						<path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8C55.71,192.94,78.38,176,128,176s72.29,16.94,89.07,44a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
					</svg>
					<span>{audienceLabel}</span>
				</div>

				{/* Duration row */}
				{duration && (
					<div class="prog-card__meta-row">
						<svg class="prog-card__icon" viewBox="0 0 256 256" width="16" height="16" fill="currentColor">
							<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
						</svg>
						<span>{duration}</span>
					</div>
				)}

				{/* Description row */}
				{shortDescription && (
					<div class="prog-card__meta-row">
						<svg class="prog-card__icon" viewBox="0 0 256 256" width="16" height="16" fill="currentColor">
							<path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm0,192H56V40H200ZM176,88a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,88Zm0,40a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm0,40a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,168Z" />
						</svg>
						<span>{shortDescription}</span>
					</div>
				)}
			</div>
		</div>
	</div>
</a>

<style>
	.prog-card {
		display: flex;
		flex-flow: column wrap;
		background-color: #fafafa;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		width: 100%;
	}

	.prog-card__inner {
		position: relative;
		display: flex;
		flex-flow: column;
		border: 1px solid #e3e3e3;
		border-radius: 0;
		overflow: hidden;
		height: 100%;
	}

	.prog-card__badge {
		position: absolute;
		top: 8px;
		left: 8px;
		z-index: 1;
		border-radius: 5px;
		padding: 4px 6px;
		font-family: 'Rubik', sans-serif;
		font-size: 12px;
		font-weight: 400;
		color: #fff;
		line-height: 1;
	}

	.prog-card__image {
		width: 100%;
		height: 150px;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
	}

	.prog-card__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.prog-card__image-placeholder {
		width: 100%;
		height: 100%;
		background: #e0e0e0;
	}

	.prog-card__body {
		display: flex;
		flex-flow: column;
		gap: 10px;
		padding: 0 15px 30px;
		flex: 1;
	}

	.prog-card__title {
		margin: 15px 0 0;
		min-height: 50px;
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.4;
		color: rgb(51, 51, 51);
	}

	.prog-card__divider {
		width: 100%;
		height: 0;
		border: none;
	}

	.prog-card__meta {
		display: flex;
		flex-flow: column wrap;
		gap: 10px;
	}

	.prog-card__meta-row {
		display: flex;
		flex-flow: row;
		align-items: flex-start;
		gap: 10px;
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		color: rgb(117, 117, 117);
		line-height: 1.4;
	}

	.prog-card__icon {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		margin-top: 2px;
		color: rgb(117, 117, 117);
	}

	.prog-card:hover .prog-card__title {
		color: rgb(240, 93, 87);
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/layouts/BaseLayout.astro
```astro
---
import SiteFooter from '../components/SiteFooter.astro';
import SiteHeader from '../components/SiteHeader.astro';
import { getSiteData } from '../lib/data.js';

const site = getSiteData();
const {
	title = site.siteSettings?.default_seo?.title ?? 'Tinkercademy',
	description = site.siteSettings?.default_seo?.description ?? '',
	canonical = null,
	image = site.siteSettings?.default_seo?.openGraph?.image ?? null,
} = Astro.props;
---

<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>{title}</title>
		<meta name="description" content={description} />
		{canonical && <link rel="canonical" href={canonical} />}
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		{image && <meta property="og:image" content={image} />}
		<link rel="icon" type="image/png" href="/images/logos/favicon.png" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Inter:wght@400;500;600;700&family=Karla:wght@400;700&family=Oswald:wght@300;400;500;600;700&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
			rel="stylesheet"
		/>
	</head>
	<body>
		<SiteHeader navigation={site.siteSettings?.navigation ?? []} />
		<main>
			<slot />
		</main>
		<SiteFooter
			contacts={site.contacts}
			locations={site.locations}
			socialLinks={(() => {
				/* Only keep the first entry per platform from the canonical list in site-settings */
				const canonicalIds = site.siteSettings?.social_link_ids ?? ['x','facebook','instagram','linkedin','github','blog'];
				const seen = new Set();
				return (site.socialLinks ?? []).filter((link) => {
					if (!canonicalIds.includes(link.id)) return false;
					if (seen.has(link.id)) return false;
					seen.add(link.id);
					return true;
				});
			})()}
		/>
	</body>
</html>

<style is:global>
	:root {
		--accent: #f05d57;
		--accent-dark: #ca433d;
	}

	* {
		box-sizing: border-box;
	}

	html {
		font-family: 'Rubik', sans-serif;
		background: #ffffff;
		color: rgb(23, 23, 23);
		scroll-behavior: smooth;
	}

	body {
		margin: 0;
		min-height: 100vh;
		background: #ffffff;
	}

	a {
		color: inherit;
	}

	img {
		display: block;
		max-width: 100%;
	}

	.shell {
		width: min(1160px, calc(100vw - 1.5rem));
		margin: 0 auto;
	}

	/* ── Prose (used by sub-pages) ── */
	.prose h1,
	.prose h2,
	.prose h3,
	.prose h4 {
		font-family: 'Oswald', sans-serif;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.hero {
		padding: 4rem 0 2.5rem;
	}

	.hero-inner {
		display: grid;
		gap: 1rem;
	}

	.eyebrow,
	.section-label {
		font-family: 'Fragment Mono', monospace;
		font-size: 0.82rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--accent-dark);
	}

	.hero h1 {
		margin: 0;
		font-family: 'Oswald', sans-serif;
		font-size: clamp(2.4rem, 7vw, 5rem);
		line-height: 0.95;
		max-width: 12ch;
		text-transform: uppercase;
	}

	.lead {
		max-width: 68ch;
		font-size: 1.15rem;
		line-height: 1.7;
		color: rgb(110, 110, 110);
	}

	.badge-row {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.badge-row li {
		padding: 0.45rem 0.8rem;
		border-radius: 999px;
		background: rgba(240, 93, 87, 0.1);
		color: var(--accent-dark);
		font-size: 0.92rem;
	}

	.prose {
		padding-bottom: 3rem;
	}

	.prose h2,
	.prose h3,
	.prose h4 {
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}

	.prose p,
	.prose li {
		max-width: 70ch;
		line-height: 1.75;
	}

	.prose ul {
		padding-left: 1.2rem;
	}

	.rich-content {
		display: grid;
		gap: 2rem;
	}

	.content-image img {
		border-radius: 1.25rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		background: #ffffff;
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
		padding-bottom: 3rem;
	}

	.card {
		padding: 1.25rem;
		border-radius: 1.25rem;
		background: rgba(255, 255, 255, 0.85);
		border: 1px solid rgba(0, 0, 0, 0.08);
		text-decoration: none;
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
	}

	.card h3 {
		margin: 0 0 0.5rem;
	}

	.card p {
		margin: 0;
		color: rgb(110, 110, 110);
		line-height: 1.6;
	}

	.section {
		padding-bottom: 3rem;
	}

	.section-title {
		margin: 0 0 1rem;
		font-family: 'Oswald', sans-serif;
		font-size: 2rem;
		text-transform: uppercase;
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/scripts/lib/framer.mjs
```mjs
import { load } from 'cheerio';

const DURATION_PATTERN = /\b(\d+|half|full)\b|days?|hours?|sessions?|weeks?|months?/i;
const AUDIENCE_PATTERN = /(public|business|school|student|teacher|professional|individual|parent|club)/i;

function cleanText(text) {
	return text.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function escapeHtml(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function escapeAttr(value) {
	return escapeHtml(value).replaceAll("'", '&#39;');
}

function resolveReference(data, ref, seen = new Set()) {
	if (typeof ref !== 'number') return ref;
	if (seen.has(ref)) return '[circular]';

	seen.add(ref);
	const value = data[ref];

	if (Array.isArray(value)) {
		return value.map((entry) => resolveReference(data, entry, new Set(seen)));
	}

	if (value && typeof value === 'object') {
		if (Object.keys(value).length === 2 && 'type' in value && 'value' in value) {
			const type = resolveReference(data, value.type, new Set(seen));
			const resolvedValue = resolveReference(data, value.value, new Set(seen));

			if (
				type === 'string' ||
				type === 'boolean' ||
				type === 'number' ||
				type === 'responsiveimage' ||
				type === 'array' ||
				type === 'richtext' ||
				type === 'enum'
			) {
				return resolvedValue;
			}

			return { type, value: resolvedValue };
		}

		return Object.fromEntries(
			Object.entries(value).map(([key, entry]) => [key, resolveReference(data, entry, new Set(seen))]),
		);
	}

	return value;
}

function renderNode(node) {
	if (node == null) return '';
	if (typeof node === 'string') return escapeHtml(node);
	if (typeof node === 'number') return '';

	if (!Array.isArray(node)) return '';

	const [nodeType, value, _attrs, ...children] = node;

	if (nodeType === 1) {
		return node.slice(1).map(renderNode).join('');
	}

	if (nodeType === 5) {
		return typeof value === 'string' ? escapeHtml(value) : '';
	}

	if (nodeType === 2) {
		const link = value ?? {};
		const href = typeof link.href === 'string' ? link.href : '#';
		const target = link.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
		return `<a href="${escapeAttr(href)}"${target}>${node.slice(2).map(renderNode).join('')}</a>`;
	}

	if (nodeType === 4) {
		const tag = typeof value === 'string' ? value : 'div';
		const safeTag = /^(a|br|em|h1|h2|h3|h4|h5|h6|li|ol|p|strong|ul)$/i.test(tag) ? tag : 'div';
		if (safeTag === 'br') return '<br />';
		const inner = children.map(renderNode).join('');
		return `<${safeTag}>${inner}</${safeTag}>`;
	}

	return node.slice(1).map(renderNode).join('');
}

export function renderRichTextPointer(pointer) {
	if (!pointer || typeof pointer !== 'string') {
		return { html: '', text: '' };
	}

	try {
		const richTree = JSON.parse(pointer);
		const html = renderNode(richTree);
		const text = cleanText(load(`<div>${html}</div>`).text());
		return { html, text };
	} catch {
		const text = cleanText(pointer);
		return { html: `<p>${escapeHtml(text)}</p>`, text };
	}
}

function parseLeadingJsonObject(value) {
	if (typeof value !== 'string' || !value.startsWith('{')) return null;

	let depth = 0;
	let inString = false;
	let escaped = false;

	for (let index = 0; index < value.length; index += 1) {
		const char = value[index];

		if (inString) {
			if (escaped) {
				escaped = false;
				continue;
			}
			if (char === '\\') {
				escaped = true;
				continue;
			}
			if (char === '"') {
				inString = false;
			}
			continue;
		}

		if (char === '"') {
			inString = true;
			continue;
		}

		if (char === '{') {
			depth += 1;
			continue;
		}

		if (char === '}') {
			depth -= 1;
			if (depth === 0) {
				return value.slice(0, index + 1);
			}
		}
	}

	return null;
}

function parseQueryPairs(data) {
	const pairs = [];

	for (let index = 0; index < data.length - 1; index += 1) {
		const candidate = data[index];
		const next = data[index + 1];
		if (typeof candidate !== 'string' || !candidate.startsWith('{"from"') || !Array.isArray(next)) {
			continue;
		}

		try {
			const query = JSON.parse(parseLeadingJsonObject(candidate) ?? candidate);
			const records = next.map((entry) => resolveReference(data, entry)).filter(Boolean);
			pairs.push({ index, query, records });
		} catch {
			// Ignore malformed fragments.
		}
	}

	return pairs;
}

function isImageAsset(value) {
	return value && typeof value === 'object' && typeof value.src === 'string';
}

function isRichTextAsset(value) {
	return value && typeof value === 'object' && typeof value.pointer === 'string';
}

function classifyLookupKind(records) {
	const joined = records
		.flatMap((record) => Object.values(record))
		.filter((value) => typeof value === 'string')
		.join(' ');

	return AUDIENCE_PATTERN.test(joined) ? 'audiences' : 'topics';
}

function toLookupItems(records) {
	return records.map((record) => {
		const stringValues = Object.entries(record)
			.filter(([key, value]) => key !== 'id' && typeof value === 'string')
			.map(([, value]) => value);

		return {
			id: record.id,
			label: stringValues[0] ?? record.id,
			slug: stringValues[1] ?? cleanText((stringValues[0] ?? record.id).toLowerCase()).replace(/[^a-z0-9]+/g, '-'),
		};
	});
}

function firstTextHeading(html) {
	if (!html) return null;
	const $ = load(html);
	const heading = $('h1, h2, h3, h4').first().text();
	return cleanText(heading) || null;
}

export function parseFramerHandover(raw) {
	if (!raw) return null;

	try {
		const data = JSON.parse(raw);
		const queryPairs = parseQueryPairs(data);
		const mainPair =
			queryPairs.find((pair) => pair.records.length === 1 && Object.keys(pair.records[0] ?? {}).length >= 4) ??
			queryPairs[0];

		const mainRecord = mainPair?.records?.[0];
		if (!mainRecord || typeof mainRecord !== 'object') return null;

		const lookupById = new Map();
		const relationGroups = [];

		for (const pair of queryPairs) {
			if (pair === mainPair || pair.records.length === 0) continue;
			if (!pair.records.every((record) => record && typeof record === 'object' && typeof record.id === 'string')) {
				continue;
			}

			const items = toLookupItems(pair.records);
			const kind = classifyLookupKind(pair.records);
			relationGroups.push({ kind, items });
			for (const item of items) {
				lookupById.set(item.id, { ...item, kind });
			}
		}

		const fieldEntries = [];
		for (const [key, value] of Object.entries(mainRecord)) {
			if (value == null) continue;

			if (typeof value === 'string') {
				fieldEntries.push({ kind: 'string', key, value });
				continue;
			}

			if (Array.isArray(value) && value.every((entry) => typeof entry === 'string')) {
				const mapped = value.map((entry) => lookupById.get(entry)).filter(Boolean);
				fieldEntries.push({
					kind: mapped.length === value.length && mapped.length > 0 ? 'relation' : 'array',
					key,
					value,
					items: mapped,
				});
				continue;
			}

			if (isImageAsset(value)) {
				fieldEntries.push({ kind: 'image', key, ...value });
				continue;
			}

			if (isRichTextAsset(value)) {
				const rendered = renderRichTextPointer(value.pointer);
				fieldEntries.push({
					kind: 'richtext',
					key,
					label: firstTextHeading(rendered.html),
					...rendered,
				});
			}
		}

		const textFields = fieldEntries.filter((entry) => entry.kind === 'string').map((entry) => entry.value);
		const title = textFields[0] ?? null;
		const secondary = textFields[1] ?? null;
		const duration = secondary && DURATION_PATTERN.test(secondary) ? secondary : null;
		const subtitle = secondary && !duration ? secondary : null;

		const images = fieldEntries.filter((entry) => entry.kind === 'image');
		const content = fieldEntries
			.filter((entry) => entry.kind === 'richtext' || entry.kind === 'image')
			.map((entry, index) => ({ ...entry, order: index + 1 }));

		return {
			title,
			subtitle,
			duration,
			heroImage: images[0] ?? null,
			content,
			relations: fieldEntries
				.filter((entry) => entry.kind === 'relation')
				.map((entry) => ({
					key: entry.key,
					kind: entry.items[0]?.kind ?? 'related',
					items: entry.items,
				})),
			relationGroups,
			rawFieldCount: fieldEntries.length,
			queryCount: queryPairs.length,
		};
	} catch {
		return null;
	}
}

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/components/HeroMedia.astro
```astro
---
const props = Astro.props as { src?: string | null; alt?: string; compact?: boolean };
const src = props.src ?? null;
const alt = props.alt ?? '';
const compact = props.compact ?? false;
---

{
	src && (
		<section class:list={['hero-media', compact && 'hero-media--compact']}>
			<div class="shell">
				<img src={src} alt={alt} loading="eager" />
			</div>
		</section>
	)
}

<style>
	.hero-media {
		padding-bottom: 2rem;
	}

	.hero-media .shell {
		border-radius: 1.5rem;
		overflow: hidden;
		box-shadow: 0 22px 44px rgba(45, 42, 38, 0.12);
		border: 1px solid rgba(45, 42, 38, 0.12);
	}

	.hero-media img {
		width: 100%;
		height: clamp(280px, 48vw, 560px);
		object-fit: cover;
	}

	.hero-media--compact img {
		height: clamp(220px, 34vw, 420px);
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/scripts/build-crm-data.mjs
```mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import YAML from 'yaml';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CRAWL_FILE = path.join(ROOT, '_artifacts', 'crawl', 'site.json');
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CRM_DIR = path.join(DATA_DIR, 'crm');
const PAGES_DIR = path.join(DATA_DIR, 'pages');

function cleanText(value) {
	return value.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function slugify(value) {
	return cleanText(value.toLowerCase()).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function decodeSlug(pagePath) {
	return decodeURIComponent(pagePath.split('/').at(-1) ?? '');
}

function ensureArray(value) {
	return Array.isArray(value) ? value : [];
}

function uniqueBy(items, keyFn) {
	const seen = new Set();
	return items.filter((item) => {
		const key = keyFn(item);
		if (!key || seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

function uniqueStrings(values) {
	return [...new Set((values ?? []).filter(Boolean))];
}

function sameBlock(left, right) {
	return left?.tag === right?.tag && left?.text === right?.text;
}

function sameChunk(blocks, leftStart, rightStart, size) {
	if (rightStart + size > blocks.length) return false;

	for (let index = 0; index < size; index += 1) {
		if (!sameBlock(blocks[leftStart + index], blocks[rightStart + index])) {
			return false;
		}
	}

	return true;
}

function collapseRepeatedChunks(blocks) {
	const source = blocks ?? [];
	const collapsed = [];

	for (let cursor = 0; cursor < source.length; ) {
		let matchedChunk = false;
		const maxChunkSize = Math.min(12, Math.floor((source.length - cursor) / 2));

		for (let size = maxChunkSize; size >= 2; size -= 1) {
			if (!sameChunk(source, cursor, cursor + size, size)) continue;

			let nextCursor = cursor + size;
			while (sameChunk(source, cursor, nextCursor, size)) {
				nextCursor += size;
			}

			collapsed.push(...source.slice(cursor, cursor + size));
			cursor = nextCursor;
			matchedChunk = true;
			break;
		}

		if (!matchedChunk) {
			collapsed.push(source[cursor]);
			cursor += 1;
		}
	}

	return collapsed;
}

function getBlocks(page) {
	return collapseRepeatedChunks(page.contentBlocks ?? []);
}

function pickLead(page) {
	const firstRichText = page.framer?.structured?.content?.find((entry) => entry.kind === 'richtext');
	const richParagraph = firstRichText?.html ? cleanText(load(firstRichText.html)('p').first().text()) : '';
	const richText = richParagraph || firstRichText?.text;
	const paragraph = getBlocks(page).find((block) => block.tag === 'p' && block.text.length > 32)?.text;
	return richText || paragraph || page.seo?.description || null;
}

function pickTitle(page) {
	const blocks = getBlocks(page);
	const heroHeading = blocks.find((block) => block.tag === 'h1')?.text ?? null;
	const contentHeading =
		heroHeading ?? blocks.find((block) => block.tag === 'h2')?.text;

	if (page.path === '/' && contentHeading) return contentHeading;
	if (page.framer?.structured?.title) return page.framer.structured.title;
	if (contentHeading) return contentHeading;
	return (page.seo?.title ?? page.path).replace(/\s+-\s+Tinkercademy.*$/, '');
}

function pickHeroImage(page) {
	return (
		page.framer?.structured?.heroImage?.src ||
		page.images?.find((image) => !/OHbHnfvpGLsxcntGKsueCChDt4|Hpib447RIgaq1OV8VQAc9Vxhac/.test(image.src))?.src ||
		page.images?.[0]?.src ||
		null
	);
}

function blocksAfterLabel(blocks, label) {
	const index = (blocks ?? []).findIndex((block) => block.text === label);
	if (index === -1) return [];

	const values = [];
	for (let cursor = index + 1; cursor < (blocks ?? []).length; cursor += 1) {
		const block = blocks[cursor];
		if (/^h[1-4]$/.test(block.tag)) break;
		if (block.tag === 'p') values.push(block.text);
	}

	return values;
}

function inferProgrammeFallbacks(page) {
	const blocks = getBlocks(page);
	const duration = blocksAfterLabel(blocks, 'Duration:')[0] ?? null;
	const audiences = blocksAfterLabel(blocks, 'Audiences:').map((label) => ({
		id: slugify(label),
		label,
		source_id: slugify(label),
	}));
	const topics = blocksAfterLabel(blocks, 'Type:').map((label) => ({
		id: slugify(label),
		label,
		source_id: slugify(label),
	}));

	return { duration, audiences, topics };
}

function inferLocation(contactPage) {
	const joined = getBlocks(contactPage ?? {}).map((block) => block.text).join(' ');
	const match = joined.match(/59 Jalan Pemimpin #04-01,\s*L&Y Building,\s*Singapore 577218/i);
	if (!match) return [];

	return [
		{
			id: 'jalan-pemimpin-office',
			name: 'Tinkercademy Office',
			address: '59 Jalan Pemimpin #04-01, L&Y Building, Singapore 577218',
			delivery_modes: ['in-person'],
		},
	];
}

function classifyCtaType(url) {
	if (url.startsWith('mailto:')) return 'email';
	if (url.startsWith('tel:')) return 'phone';
	if (/jotform|typeform|hubspot|airtable|formstack/i.test(url)) return 'form';
	if (url.startsWith('https://tinkercademy.com')) return 'internal';
	return 'external';
}

function normaliseRelations(relations, kind) {
	return ensureArray(relations)
		.filter((relation) => relation.kind === kind)
		.flatMap((relation) => relation.items)
		.map((item) => ({
			id: item.slug || slugify(item.label),
			label: item.label,
			source_id: item.id,
		}));
}

function makeContentItems(page) {
	if (page.framer?.structured?.content?.length) {
		return page.framer.structured.content.map((entry) => {
			if (entry.kind === 'image') {
				return {
					type: 'image',
					src: entry.src,
					width: entry.pixelWidth ?? null,
					height: entry.pixelHeight ?? null,
				};
			}

			return {
				type: 'richtext',
				label: entry.label || null,
				html: entry.html,
				text: entry.text,
			};
		});
	}

	const sourceBlocks = getBlocks(page);
	const blocks = [];
	let currentList = null;

	for (const block of sourceBlocks) {
		if (block.tag === 'li') {
			currentList ??= [];
			currentList.push(block.text);
			continue;
		}

		if (currentList?.length) {
			blocks.push({ type: 'list', items: currentList });
			currentList = null;
		}

		blocks.push({ type: block.tag, text: block.text });
	}

	if (currentList?.length) {
		blocks.push({ type: 'list', items: currentList });
	}

	for (let size = Math.floor(blocks.length / 2); size >= 2; size -= 1) {
		const left = JSON.stringify(blocks.slice(0, size));
		const right = JSON.stringify(blocks.slice(size, size * 2));
		if (left === right) {
			return [...blocks.slice(0, size), ...blocks.slice(size * 2)];
		}
	}

	return blocks;
}

function toRenderedCta(cta) {
	return {
		label: cta.label,
		url: cta.url,
		type: classifyCtaType(cta.url),
	};
}

function pickCtasByLabel(ctas, labels) {
	const uniqueCtas = uniqueBy(ctas ?? [], (cta) => `${cta.label}::${cta.url}`);
	return labels
		.map((label) => uniqueCtas.find((cta) => cta.label === label))
		.filter(Boolean)
		.map(toRenderedCta);
}

function extractFlagshipItems(page, blocks) {
	const startIndex = blocks.findIndex((block) => /^Our Flagship/.test(block.text));
	if (startIndex === -1) return [];

	const endIndex = blocks.findIndex((block, index) => index > startIndex && /^Popular Courses?$/.test(block.text));
	const slice = blocks.slice(startIndex + 1, endIndex === -1 ? blocks.length : endIndex);
	const images = (page.images ?? [])
		.filter((image) => {
			const width = Number(image.width);
			const height = Number(image.height);
			return Number.isFinite(width) && Number.isFinite(height) && width >= 320 && width <= 720 && height >= 320 && height <= 720;
		})
		.slice(0, 3);
	const items = [];
	let currentItem = null;

	for (const block of slice) {
		if (block.tag === 'h3') {
			if (currentItem) items.push(currentItem);
			currentItem = { title: block.text, description: '' };
			continue;
		}

		if (currentItem && block.tag === 'p' && block.text !== 'Read More') {
			currentItem.description = currentItem.description
				? `${currentItem.description} ${block.text}`
				: block.text;
		}
	}

	if (currentItem) items.push(currentItem);

	return items.slice(0, 3).map((item, index) => ({
		...item,
		image: images[index]?.src ?? null,
	}));
}

function extractHomePageData(page) {
	const blocks = getBlocks(page);
	const heroHeadings = uniqueStrings(blocks.filter((block) => block.tag === 'h1').map((block) => block.text));
	const partnerStatement =
		uniqueStrings(
			blocks
				.filter((block) => /Official training partner/.test(block.text))
				.map((block) => block.text),
		)[0] ?? null;
	const focusStart = blocks.findIndex(
		(block) => block.tag === 'p' && block.text === 'Courses available in a wide variety of modern, practical domains.',
	);
	const focusAreas = [];

	for (let index = focusStart + 1; index < blocks.length; index += 1) {
		const block = blocks[index];
		if (/^Led by experts/.test(block.text) || /^Our Flagship/.test(block.text)) break;
		if (block.tag === 'p') focusAreas.push(block.text);
	}

	const proofPoints = uniqueStrings(
		blocks
			.filter((block) => /^(Led by experts|Curriculum designed)/.test(block.text))
			.map((block) => block.text),
	).slice(0, 2);

	const featuredProgrammeSlugs = uniqueBy(
		(page.ctas ?? [])
			.map((cta) => {
				const match = cta.url.match(/^https:\/\/tinkercademy\.com\/programmes\/([^/?#]+)/);
				return match ? { slug: decodeURIComponent(match[1]) } : null;
			})
			.filter(Boolean),
		(item) => item.slug,
	).map((item) => item.slug);

	const closingStatement =
		uniqueStrings(
			blocks
				.filter((block) => /^Join us for the best coding and digital making experiences/.test(block.text))
				.map((block) => block.text),
		)[0] ?? null;

	const partnerStripImage =
		(page.images ?? []).find((image, index) => {
			const width = Number(image.width);
			const height = Number(image.height);
			return index > 1 && Number.isFinite(width) && Number.isFinite(height) && width / Math.max(height, 1) > 2.5;
		})?.src ?? null;

	return {
		hero_title: heroHeadings[0] ?? pickTitle(page),
		hero_lead: heroHeadings[1] ?? page.seo?.description ?? null,
		hero_actions: pickCtasByLabel(page.ctas, ['Programmes', 'Professionals', 'Schools', 'Individuals']),
		partner_statement: partnerStatement,
		partner_strip_image: partnerStripImage,
		focus_areas: uniqueStrings(focusAreas),
		proof_points: proofPoints,
		flagship_items: extractFlagshipItems(page, blocks),
		featured_programme_slugs: featuredProgrammeSlugs,
		closing_statement: closingStatement,
		closing_ctas: pickCtasByLabel(page.ctas, ['Our Courses', 'Our Projects']),
	};
}

function toProgrammeRecord(page) {
	const slug = decodeSlug(page.path);
	const fallback = inferProgrammeFallbacks(page);
	const audiences = normaliseRelations(page.framer?.structured?.relations, 'audiences');
	const topics = normaliseRelations(page.framer?.structured?.relations, 'topics');
	const resolvedAudiences = audiences.length > 0 ? audiences : fallback.audiences;
	const resolvedTopics = topics.length > 0 ? topics : fallback.topics;

	return {
		id: slug,
		slug,
		title: pickTitle(page),
		subtitle: page.framer?.structured?.subtitle || null,
		duration: page.framer?.structured?.duration || fallback.duration,
		description: pickLead(page),
		hero_image: pickHeroImage(page),
		audience_ids: resolvedAudiences.map((audience) => audience.id),
		topic_ids: resolvedTopics.map((topic) => topic.id),
		cta_ids: uniqueBy(page.ctas ?? [], (cta) => `${cta.label}::${cta.url}`).map((cta) => slugify(`${cta.label}-${cta.url}`)),
		seo: page.seo,
		content: makeContentItems(page),
	};
}

function toTutorialRecord(page) {
	const slug = decodeSlug(page.path);
	const audiences = normaliseRelations(page.framer?.structured?.relations, 'audiences');
	const topics = normaliseRelations(page.framer?.structured?.relations, 'topics');

	return {
		id: slug,
		slug,
		title: pickTitle(page),
		subtitle: page.framer?.structured?.subtitle || null,
		description: pickLead(page),
		hero_image: pickHeroImage(page),
		audience_ids: audiences.map((audience) => audience.id),
		topic_ids: topics.map((topic) => topic.id),
		seo: page.seo,
		content: makeContentItems(page),
	};
}

function toStaticPage(page) {
	const record = {
		path: page.path,
		slug: page.path === '/' ? 'home' : page.path.replace(/^\/|\/$/g, ''),
		title: pickTitle(page),
		description: page.seo?.description || pickLead(page),
		hero_image: pickHeroImage(page),
		seo: page.seo,
		ctas: page.ctas ?? [],
		content: makeContentItems(page),
	};

	if (page.path === '/') {
		return {
			...record,
			...extractHomePageData(page),
		};
	}

	return record;
}

async function writeYamlFile(fileName, value) {
	const document = new YAML.Document(value);
	document.options.indent = 2;
	document.options.lineWidth = 0;
	await writeFile(path.join(CRM_DIR, fileName), String(document));
}

async function writeJsonFile(fileName, value) {
	await writeFile(path.join(PAGES_DIR, fileName), JSON.stringify(value, null, 2));
}

const crawl = JSON.parse(await readFile(CRAWL_FILE, 'utf8'));
const pages = crawl.pages ?? [];
const programmePages = pages.filter((page) => page.type === 'programme');
const tutorialPages = pages.filter((page) => page.type === 'tutorial');
const staticPages = pages.filter((page) => page.type === 'static' || page.type === 'root');

const contactPage = pages.find((page) => page.path === '/contact-us');
const homePage = pages.find((page) => page.path === '/');

const programmes = programmePages.map(toProgrammeRecord).sort((a, b) => a.title.localeCompare(b.title));
const tutorials = tutorialPages.map(toTutorialRecord).sort((a, b) => a.title.localeCompare(b.title));
const staticPageData = staticPages.map(toStaticPage);

const audiences = uniqueBy(
	programmePages
		.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'audiences'))
		.concat(programmePages.flatMap((page) => inferProgrammeFallbacks(page).audiences))
		.concat(tutorialPages.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'audiences'))),
	(item) => item.id,
).sort((a, b) => a.label.localeCompare(b.label));

const topics = uniqueBy(
	programmePages
		.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'topics'))
		.concat(programmePages.flatMap((page) => inferProgrammeFallbacks(page).topics))
		.concat(tutorialPages.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'topics'))),
	(item) => item.id,
).sort((a, b) => a.label.localeCompare(b.label));

const contacts = uniqueBy(
	pages
		.flatMap((page) => page.contacts ?? [])
		.map((contact) => ({
			id: slugify(`${contact.type}-${contact.value}`),
			label: contact.type === 'email' ? 'Email' : 'Phone',
			channel_type: contact.type,
			value: contact.value.trim(),
		})),
	(contact) => contact.id,
);

const locations = inferLocation(contactPage);

const socialLinks = uniqueBy(
	pages.flatMap((page) => page.socialLinks ?? []).map((link) => ({
		id: slugify(link.platform),
		platform: link.platform,
		label: link.label,
		url: link.url,
	})),
	(link) => link.url,
);

const forms = uniqueBy(
	pages.flatMap((page) => page.forms ?? []).map((form) => ({
		id: slugify(`${form.action ?? form.id}`),
		provider: /jotform/i.test(form.action ?? '') ? 'jotform' : form.method === 'link' ? 'external-link' : 'native-form',
		endpoint: form.action,
		method: form.method,
	})),
	(form) => form.endpoint ?? form.id,
);

const ctaDestinations = uniqueBy(
	pages
		.flatMap((page) => page.ctas ?? [])
		.map((cta) => ({
			id: slugify(`${cta.label}-${cta.url}`),
			label: cta.label,
			url: cta.url,
			type: classifyCtaType(cta.url),
		})),
	(cta) => `${cta.label}::${cta.url}`,
);

const siteSettings = {
	site_name: 'Tinkercademy',
	base_url: crawl.site,
	default_seo: homePage?.seo ?? null,
	breakpoints: homePage?.hydrate?.breakpoints ?? [],
	navigation: homePage?.navLinks ?? [],
	contact_ids: contacts.map((contact) => contact.id),
	location_ids: locations.map((location) => location.id),
	social_link_ids: [...new Set(socialLinks.map((link) => link.id))],
};

await mkdir(CRM_DIR, { recursive: true });
await mkdir(PAGES_DIR, { recursive: true });

await writeYamlFile('programmes.yml', programmes);
await writeYamlFile('tutorials.yml', tutorials);
await writeYamlFile('audiences.yml', audiences);
await writeYamlFile('topics.yml', topics);
await writeYamlFile('contacts.yml', contacts);
await writeYamlFile('locations.yml', locations);
await writeYamlFile('social-links.yml', socialLinks);
await writeYamlFile('cta-destinations.yml', ctaDestinations);
await writeYamlFile('forms.yml', forms);
await writeYamlFile('site-settings.yml', siteSettings);
await writeJsonFile('static-pages.json', staticPageData);
await writeJsonFile('assets.json', crawl.assets ?? []);
await writeJsonFile('programmes.json', programmes);
await writeJsonFile('tutorials.json', tutorials);
await writeJsonFile('audiences.json', audiences);
await writeJsonFile('topics.json', topics);
await writeJsonFile('contacts.json', contacts);
await writeJsonFile('locations.json', locations);
await writeJsonFile('social-links.json', socialLinks);
await writeJsonFile('cta-destinations.json', ctaDestinations);
await writeJsonFile('forms.json', forms);
await writeJsonFile('site-settings.json', siteSettings);

console.log(`Wrote CRM-like data files to ${CRM_DIR}`);

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/site-settings.yml
```yml
site_name: Tinkercademy
base_url: https://tinkercademy.com
default_seo:
  title: "Tinkercademy: Coding and Making for Schools and Professionals"
  description: "We're Singapore-based expert coders and makers who teach coding
    and making to schools, companies, and professionals worldwide. "
  canonical: https://tinkercademy.com/
  openGraph:
    title: "Tinkercademy: Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    image: null
  twitter:
    title: "Tinkercademy: Coding and Making for Schools and Professionals"
    description: "We're Singapore-based expert coders and makers who teach coding
      and making to schools, companies, and professionals worldwide. "
    image: null
  robots: max-image-preview:large
breakpoints:
  - hash: i8hhhf
    mediaQuery: "(min-width: 1600px)"
  - hash: kdtqod
    mediaQuery: "(min-width: 1200px) and (max-width: 1599.98px)"
  - hash: okv3ti
    mediaQuery: "(min-width: 810px) and (max-width: 1199.98px)"
  - hash: o1myt0
    mediaQuery: "(max-width: 809.98px)"
navigation:
  - label: ABOUT US
    href: https://tinkercademy.com/about-us
  - label: SHOWCASE
    href: https://tinkercademy.com/showcase
  - label: STORE
    href: https://gethacking.com/
  - label: CONTACT US
    href: https://tinkercademy.com/contact-us
contact_ids:
  - email-hello-tk-sg
  - phone-69176920
  - email-hello-tinkercademy-com
  - email-imda-codesg-imda-gov-sg
  - email-hello-tinkerclass-tech
  - email-yjsoon-tk-sg
location_ids:
  - jalan-pemimpin-office
social_link_ids:
  - x
  - facebook
  - instagram
  - linkedin
  - github
  - blog
  - medium

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/topics.json
```json
[
  {
    "id": "ai",
    "label": "AI and Machine Learning with Data Science",
    "source_id": "vpWDOwfOJ"
  },
  {
    "id": "ai-and-machine-learning-with-data-science",
    "label": "AI and Machine Learning with Data Science",
    "source_id": "ai-and-machine-learning-with-data-science"
  },
  {
    "id": "cs",
    "label": "Computer Science Fundamentals",
    "source_id": "uMQrqiRw1"
  },
  {
    "id": "computer-science-fundamentals",
    "label": "Computer Science Fundamentals",
    "source_id": "computer-science-fundamentals"
  },
  {
    "id": "making",
    "label": "Creativity, Craft, and Making",
    "source_id": "e_A2k1nRU"
  },
  {
    "id": "creativity-craft-and-making",
    "label": "Creativity, Craft, and Making",
    "source_id": "creativity-craft-and-making"
  },
  {
    "id": "cryptography",
    "label": "Cryptography",
    "source_id": "V6cZ3Rf_S"
  },
  {
    "id": "design-thinking",
    "label": "Design Thinking",
    "source_id": "Tykfon5ZF"
  },
  {
    "id": "uiux",
    "label": "Design, Prototyping, and UI/UX",
    "source_id": "R7ku5ShhB"
  },
  {
    "id": "design-prototyping-and-ui-ux",
    "label": "Design, Prototyping, and UI/UX",
    "source_id": "design-prototyping-and-ui-ux"
  },
  {
    "id": "gamedev",
    "label": "Game Development",
    "source_id": "JJfAJSl1s"
  },
  {
    "id": "game-development",
    "label": "Game Development",
    "source_id": "game-development"
  },
  {
    "id": "iot",
    "label": "Microcontrollers & IoT",
    "source_id": "y29slfr8O"
  },
  {
    "id": "microcontrollers-iot",
    "label": "Microcontrollers & IoT",
    "source_id": "microcontrollers-iot"
  },
  {
    "id": "appdev",
    "label": "Mobile App Development",
    "source_id": "sBqWC3exH"
  },
  {
    "id": "mobile-app-development",
    "label": "Mobile App Development",
    "source_id": "mobile-app-development"
  },
  {
    "id": "professional-productivity-with-technology",
    "label": "Professional Productivity with Technology",
    "source_id": "professional-productivity-with-technology"
  },
  {
    "id": "software-engineering",
    "label": "Software Engineering",
    "source_id": "IgMVqCDv3"
  },
  {
    "id": "webdev",
    "label": "Web Development",
    "source_id": "I6HoEEJFg"
  },
  {
    "id": "web-development",
    "label": "Web Development",
    "source_id": "web-development"
  }
]
```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/[slug].astro
```astro
---
import ContentBlocks from '../components/ContentBlocks.astro';
import CourseGrid from '../components/CourseGrid.astro';
import CtaBanner from '../components/CtaBanner.astro';
import HeroMedia from '../components/HeroMedia.astro';
import PageHero from '../components/PageHero.astro';
import RichContent from '../components/RichContent.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getSiteData, getProgrammesForPage, getNavPillsForPage } from '../lib/data.js';

export function getStaticPaths() {
	/* Pages with dedicated .astro files — exclude from the dynamic catch-all */
	const dedicatedPages = new Set([
		'about-us', 'contact-us', 'showcase', 'microbit', 'tinker-x', 'infocomm-club',
	]);
	const site = getSiteData();
	return site.staticPages
		.filter((page) => page.path !== '/')
		.filter((page) => !page.path.startsWith('/programmes/') && !page.path.startsWith('/tutorials/'))
		.filter((page) => page.path.split('/').filter(Boolean).length === 1)
		.filter((page) => !dedicatedPages.has(page.slug))
		.map((page) => ({
			params: { slug: page.slug },
			props: { page },
		}));
}

const { page } = Astro.props;
const canonical = new URL(page.path, 'https://tinkercademy.com').toString();

/* ─── Classify page type ────────────────────────────────────────────── */
const COURSE_LISTING_SLUGS = ['courses-all', 'courses-professionals', 'courses-schools'];
const AUDIENCE_LANDING_SLUGS = ['professionals', 'schools', 'individuals'];

const isCourseListing = COURSE_LISTING_SLUGS.includes(page.slug);
const isAudienceLanding = AUDIENCE_LANDING_SLUGS.includes(page.slug);

/* ─── Data for course listing / audience pages ──────────────────────── */
const programmes = (isCourseListing || isAudienceLanding)
	? getProgrammesForPage(page)
	: [];
const navPills = (isCourseListing || isAudienceLanding)
	? getNavPillsForPage(page)
	: [];

/* ─── Course listing page titles (the title field is a slug in the data) */
const COURSE_PAGE_TITLES: Record<string, string> = {
	'courses-all': 'All Courses',
	'courses-professionals': 'Professional Courses',
	'courses-schools': 'School Courses',
};
const AUDIENCE_PAGE_TITLES: Record<string, string> = {
	professionals: 'Professionals',
	schools: 'Schools',
	individuals: 'Individuals',
};

const displayTitle = isCourseListing
	? COURSE_PAGE_TITLES[page.slug] ?? page.title
	: isAudienceLanding
		? AUDIENCE_PAGE_TITLES[page.slug] ?? page.title
		: page.title;

/* ─── Determine if content has rich types (image / richtext) ────────── */
const contentBlocks = page.content ?? [];
const hasRichContent = contentBlocks.some(
	(block) => block.type === 'image' || block.type === 'richtext',
);
---

<BaseLayout
	title={page.seo?.title ?? displayTitle}
	description={page.seo?.description ?? page.description ?? ''}
	canonical={canonical}
	image={page.hero_image ?? undefined}
>
	{isCourseListing ? (
		/* ════════════════════════════════════════════════════════════════
		   COURSE LISTING PAGES  (courses-all, courses-professionals, courses-schools)
		   Live site shows only the card grid + bottom nav pills — no hero,
		   no banner image, no CTA gradient banner.
		   ═══════════════════════════════════════════════════════════════ */
		<CourseGrid
			programmes={programmes}
			pageTitle={displayTitle}
			navPills={navPills}
		/>
	) : isAudienceLanding ? (
		/* ════════════════════════════════════════════════════════════════
		   AUDIENCE LANDING PAGES  (professionals, schools, individuals)
		   ═══════════════════════════════════════════════════════════════ */
		<>
			<PageHero title={displayTitle} lead={page.description} />
			{page.hero_image && (
				<HeroMedia src={page.hero_image} alt={displayTitle} compact={true} />
			)}
			{contentBlocks.length > 0 && (
				hasRichContent
					? <RichContent items={contentBlocks} />
					: <ContentBlocks blocks={contentBlocks} />
			)}
			{programmes.length > 0 && (
				<CourseGrid
					programmes={programmes}
					pageTitle={`${displayTitle} Courses`}
					navPills={navPills}
				/>
			)}
			<CtaBanner />
		</>
	) : (
		/* ════════════════════════════════════════════════════════════════
		   RICH CONTENT / DEFAULT PAGES
		   (about-us, contact-us, showcase, microbit, tinker-x, infocomm-club)
		   ═══════════════════════════════════════════════════════════════ */
		<>
			<PageHero title={displayTitle} lead={page.description} />
			{page.hero_image && (
				<HeroMedia src={page.hero_image} alt={displayTitle} compact={true} />
			)}
			{contentBlocks.length > 0 && (
				hasRichContent
					? <RichContent items={contentBlocks} />
					: <ContentBlocks blocks={contentBlocks} />
			)}
			<CtaBanner />
		</>
	)}
</BaseLayout>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/microbit.astro
```astro
---
/**
 * /microbit — micro:bit tutorials page with hero, getting started sections,
 * breakout board section with YouTube embed, and tutorial card grid.
 */
import CtaBanner from '../components/CtaBanner.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { getStaticPage } from '../lib/data.js';

const page = getStaticPage('/microbit');
if (!page) return Astro.redirect('/404');

const canonical = new URL('/microbit', 'https://tinkercademy.com').toString();

/* ─── Nav pills ─────────────────────────────────────────────────── */
const navPills = [
	{ label: 'Tutorials', url: '/microbit#tutorials' },
	{ label: 'Individuals', url: '/individuals' },
	{ label: 'Professionals', url: '/professionals' },
	{ label: 'Schools', url: '/schools' },
];

/* ─── Tutorial cards (with known slugs and images) ──────────────── */
const tutorialCards = [
	{
		title: 'Access Denied! A Door Entry Tutorial',
		slug: 'access-denied-a-door-entry-tutorial',
		image: '/images/remote/bD2Vq60gsIBWmTLGkqM6gnfat4.jpg',
	},
	{
		title: 'Ang Bao Collector',
		slug: 'ang-bao-collector',
		image: '/images/remote/Qf7E9zlctuoxJQhtW2ETkP9eSYI.jpg',
	},
	{
		title: 'Build your own Micro:bit Security Door!',
		slug: 'build-your-own-micro-bit-security-door',
		image: '/images/remote/TEdcK4xzIfno2gsJPBuYfVxGj8w.jpg',
	},
	{
		title: 'Coin Sorter with Micro:bit',
		slug: 'coin-sorter',
		image: '/images/remote/DYffUNTKvjHf2wF1BsJXIS60VsY.jpg',
	},
];
---

<BaseLayout
	title={page.seo?.title ?? 'micro:bit Tutorials'}
	description={page.seo?.description ?? page.description ?? ''}
	canonical={canonical}
	image={page.hero_image ?? undefined}
>
	{/* ═══════ Hero ═══════════════════════════════════════════════════ */}
	<section class="mb-hero">
		<img
			class="mb-hero__bg"
			src="/images/remote/3wvrDe3ohG9X1GAVgOtYRjkdWCs.jpg"
			alt="micro:bit Tutorials"
			loading="eager"
		/>
		<div class="mb-hero__overlay" />
		<div class="mb-hero__content">
			<h1 class="mb-hero__title">
				<span class="mb-hero__title-accent">micro:bit</span> Tutorials
			</h1>
			<p class="mb-hero__subtitle">
				Get started with our BBC Micro:bit Kit and the Breakout Board here!
			</p>
			<div class="mb-hero__nav">
				{navPills.map((pill) => (
					<a class="mb-pill" href={pill.url}>{pill.label}</a>
				))}
			</div>
		</div>
	</section>

	{/* ═══════ Getting Started ══════════════════════════════════════════ */}
	<section class="mb-section">
		<div class="mb-section__grid shell">
			<div class="mb-section__text-col">
				<h2 class="mb-section__heading">
					Getting started with the <span class="mb-accent">micro:bit</span> Tinker Kit
				</h2>
				<p class="mb-section__text">
					Tinkercademy is proud to present our very own Micro:bit Tinker Kit. Made in Singapore! The kit comes with:
				</p>
				<ul class="mb-section__list">
					<li>Our custom breakout board, which makes it super easy to make projects with the micro:bit!</li>
					<li>A variety of Octopus parts: components with colour-coded plugs that connect easily with the breakout board.</li>
				</ul>
				<p class="mb-section__text">
					Follow the graphical guide to get started on using the Breakout Board, and try out the tutorials below.
				</p>
				<p class="mb-section__text">
					We're proud to be a launch partner of the Infocomm Media Development Authority for the launch of the{' '}
					<a href="https://microbit.org/impact/foundation-reports/singapore/digital-maker-programme/#:~:text=The%20Digital%20Maker%20Programme%20%28DMP%29%20was%20then%20launched,to%20all%20primary%20school%20levels%20P1%20to%20P6." target="_blank" rel="noopener noreferrer">
						Digital Maker Programme
					</a>, which aims to nurture a new generation of digital natives with a passion for technology.
					Read more about our Digital Maker Programme initiatives at our blog.
				</p>
				<a
					class="mb-cta-btn"
					href="https://gethacking.com/collections/microbit"
					target="_blank"
					rel="noopener noreferrer"
				>
					Buy the micro:bit and kit
				</a>
			</div>
		</div>
	</section>

	{/* ═══════ Have a new micro:bit? ═══════════════════════════════════ */}
	<section class="mb-section mb-section--light">
		<div class="shell">
			<h2 class="mb-section__heading">
				Have a new <span class="mb-accent">micro:bit</span>? Here's where you can get started:
			</h2>
			<ul class="mb-section__link-list">
				<li>
					The official micro:bit site at{' '}
					<a href="http://microbit.org/" target="_blank" rel="noopener noreferrer">microbit.org</a>
				</li>
				<li>
					Want to jump straight into coding? See{' '}
					<a href="http://microbit.org/code" target="_blank" rel="noopener noreferrer">microbit.org/code</a>,
					or go straight to{' '}
					<a href="http://pxt.microbit.org/" target="_blank" rel="noopener noreferrer">Microsoft MakeCode</a>.
				</li>
				<li>
					microbit.org has lots of great MakeCode lessons to get started—<a href="http://microbit.org/en/2017-03-07-javascript-block-resources/" target="_blank" rel="noopener noreferrer">check here</a>!
				</li>
				<li>
					Try out more projects from the Digital Maker Programme on{' '}
					<a href="http://www.instructables.com/member/Digital%20Maker%20SG" target="_blank" rel="noopener noreferrer">Instructables</a>.
					Find out more about the Digital Maker Programme, by the Infocomm Media Development Authority of Singapore,{' '}
					<a href="https://microbit.org/impact/foundation-reports/singapore/digital-maker-programme/" target="_blank" rel="noopener noreferrer">here</a>.
				</li>
				<li>
					Sign up for our{' '}
					<a href="/programmes/imda-microbit-2025">Digital Making course</a>{' '}
					to explore the functionalities of micro:bit.
				</li>
				<li>
					Try our tutorials below! Some components may require extra libraries, which are available for download in the tutorials.
				</li>
			</ul>
		</div>
	</section>

	{/* ═══════ Breakout Board (black section + YouTube) ════════════════ */}
	<section class="mb-breakout">
		<div class="mb-breakout__inner shell">
			<h3 class="mb-breakout__heading">
				Introducing the <span class="mb-accent">micro:bit</span> Breakout Board
			</h3>
			<div class="mb-breakout__video-wrap">
				<iframe
					class="mb-breakout__video"
					src="https://www.youtube-nocookie.com/embed/bzm4zepbGAc"
					title="micro:bit Breakout Board"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
			<a
				class="mb-cta-btn mb-cta-btn--red"
				href="https://gethacking.com/collections/microbit/breakout-board#filter-by"
				target="_blank"
				rel="noopener noreferrer"
			>
				Buy the micro:bit Breakout Board
			</a>
		</div>
	</section>

	{/* ═══════ Tutorial Cards ═════════════════════════════════════════ */}
	<section class="mb-tutorials" id="tutorials">
		<div class="shell">
			<h2 class="mb-tutorials__heading">
				Ready to tinker with your new <span class="mb-accent">micro:bit</span>?<br />
				Look through our micro:bit tutorials!
			</h2>
			<div class="mb-tutorials__grid">
				{tutorialCards.map((card) => (
					<a class="mb-tut-card" href={`/tutorials/${card.slug}`}>
						<div class="mb-tut-card__image-wrap">
							<img src={card.image} alt={card.title} class="mb-tut-card__image" loading="lazy" />
						</div>
						<div class="mb-tut-card__body">
							<h3 class="mb-tut-card__title">{card.title}</h3>
						</div>
					</a>
				))}
			</div>
		</div>
	</section>

	<CtaBanner />
</BaseLayout>

<style>
	/* ─── Hero (100vh, bg image, 20px bottom radius) ─────── */
	.mb-hero {
		position: relative;
		height: 100vh;
		min-height: 500px;
		max-height: 900px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 0 0 20px 20px;
	}

	.mb-hero__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.mb-hero__overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
	}

	.mb-hero__content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 0 1.5rem;
		max-width: 800px;
	}

	.mb-hero__title {
		font-family: 'Rubik', sans-serif;
		font-weight: 700;
		font-size: 60px;
		color: #fff;
		margin: 0 0 16px;
		letter-spacing: -2px;
		line-height: 1.1;
	}

	.mb-hero__title-accent {
		color: #f05d57;
	}

	.mb-hero__subtitle {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 20px;
		color: rgba(255, 255, 255, 0.9);
		margin: 0 0 28px;
		line-height: 1.5;
	}

	.mb-hero__nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
	}

	.mb-pill {
		display: inline-flex;
		align-items: center;
		padding: 10px 24px;
		border-radius: 30px;
		border: 1.5px solid rgba(255, 255, 255, 0.7);
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		font-weight: 400;
		text-decoration: none;
		transition: background 0.15s, border-color 0.15s;
	}

	.mb-pill:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: #fff;
	}

	@media (max-width: 809px) {
		.mb-hero {
			min-height: 400px;
			max-height: 600px;
		}

		.mb-hero__title {
			font-size: 36px;
			letter-spacing: -1px;
		}

		.mb-hero__subtitle {
			font-size: 16px;
		}
	}

	/* ─── Shared accent colour for inline micro:bit text ─── */
	.mb-accent {
		color: #f05d57;
	}

	/* ─── Sections ────────────────────────────────────────── */
	.mb-section {
		padding: 48px 0;
	}

	.mb-section--light {
		background: #f9f9f9;
	}

	.mb-section__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;
	}

	.mb-section__heading {
		font-family: 'Karla', sans-serif;
		font-weight: 700;
		font-size: 2.5rem;
		color: #171717;
		margin: 0 0 20px;
		line-height: 1.25;
	}

	.mb-section__text {
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
		line-height: 1.75;
		color: rgb(51, 51, 51);
		margin: 0 0 12px;
		max-width: 750px;
	}

	.mb-section__text a {
		color: #f05d57;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.mb-section__list {
		padding-left: 1.5rem;
		margin: 0 0 16px;
		max-width: 750px;
	}

	.mb-section__list li {
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
		line-height: 1.75;
		color: rgb(51, 51, 51);
		margin-bottom: 8px;
	}

	.mb-section__link-list {
		padding-left: 1.5rem;
		margin: 0;
		max-width: 800px;
	}

	.mb-section__link-list li {
		font-family: 'Rubik', sans-serif;
		font-size: 16px;
		line-height: 1.75;
		color: rgb(51, 51, 51);
		margin-bottom: 12px;
	}

	.mb-section__link-list a {
		color: #f05d57;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	/* ─── CTA Button ──────────────────────────────────────── */
	.mb-cta-btn {
		display: inline-flex;
		align-items: center;
		padding: 12px 28px;
		border-radius: 30px;
		background-color: #f05d57;
		color: #fff;
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		font-weight: 500;
		text-decoration: none;
		margin-top: 12px;
		transition: opacity 0.15s;
	}

	.mb-cta-btn:hover {
		opacity: 0.85;
	}

	.mb-cta-btn--red {
		background-color: #f05d57;
	}

	@media (max-width: 809px) {
		.mb-section__heading {
			font-size: 1.75rem;
		}
	}

	/* ─── Breakout Board (black bg section) ───────────────── */
	.mb-breakout {
		padding: 60px 0;
	}

	.mb-breakout__inner {
		background: #000;
		border-radius: 20px;
		padding: 48px clamp(1.5rem, 4vw, 3rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.mb-breakout__heading {
		font-family: 'Karla', sans-serif;
		font-weight: 700;
		font-size: 2rem;
		color: #fff;
		margin: 0 0 28px;
		line-height: 1.3;
	}

	.mb-breakout__video-wrap {
		width: 100%;
		max-width: 680px;
		aspect-ratio: 16 / 9;
		margin-bottom: 28px;
		border-radius: 12px;
		overflow: hidden;
	}

	.mb-breakout__video {
		width: 100%;
		height: 100%;
		display: block;
	}

	@media (max-width: 809px) {
		.mb-breakout__heading {
			font-size: 1.5rem;
		}
	}

	/* ─── Tutorial Cards ──────────────────────────────────── */
	.mb-tutorials {
		padding: 60px 0;
	}

	.mb-tutorials__heading {
		font-family: 'Karla', sans-serif;
		font-weight: 700;
		font-size: 2.5rem;
		color: #171717;
		margin: 0 0 32px;
		line-height: 1.3;
	}

	.mb-tutorials__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}

	.mb-tut-card {
		display: block;
		text-decoration: none;
		border-radius: 12px;
		overflow: hidden;
		background: #fafafa;
		border: 1px solid #e3e3e3;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.mb-tut-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}

	.mb-tut-card__image-wrap {
		aspect-ratio: 1.5;
		overflow: hidden;
	}

	.mb-tut-card__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.mb-tut-card__body {
		padding: 16px;
	}

	.mb-tut-card__title {
		font-family: 'Rubik', sans-serif;
		font-weight: 600;
		font-size: 15px;
		color: rgb(51, 51, 51);
		margin: 0;
		line-height: 1.4;
	}

	@media (max-width: 1199px) {
		.mb-tutorials__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 809px) {
		.mb-tutorials__heading {
			font-size: 1.75rem;
		}

		.mb-tutorials__grid {
			grid-template-columns: 1fr;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/static-pages.json
```json
[
  {
    "path": "/",
    "slug": "home",
    "title": "Illuminate your journey into tech.",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/zsqswc6Bglsfla2SlsbfXQbK7yY.jpg",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "Programmes",
        "url": "https://tinkercademy.com/#programmes",
        "type": "internal"
      },
      {
        "label": "Professionals",
        "url": "https://tinkercademy.com/professionals",
        "type": "internal"
      },
      {
        "label": "Schools",
        "url": "https://tinkercademy.com/schools",
        "type": "internal"
      },
      {
        "label": "Individuals",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      },
      {
        "label": "Read More",
        "url": "https://swiftinsg.org/",
        "type": "external"
      },
      {
        "label": "LEARN Roadmap",
        "url": "https://www.imda.gov.sg/how-we-can-help/infocomm-media-clubs/learn-roadmaps",
        "type": "external"
      },
      {
        "label": "Read More",
        "url": "https://infocomm.club/",
        "type": "external"
      },
      {
        "label": "Read More",
        "url": "https://codeforfun.sg/",
        "type": "external"
      },
      {
        "label": "BusinessesBuilding Agents with OpenClawCorporate training2 daysCourse",
        "url": "https://tinkercademy.com/programmes/building-agents-with-openclaw",
        "type": "internal"
      },
      {
        "label": "BusinessesLevel Up Your Vibe Coding (Lovable and Replit)Corporate training2 daysCourse",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders-lovable-replit",
        "type": "internal"
      },
      {
        "label": "BusinessesVibe Coding for Digital BuildersCorporate training2 daysCourse",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders",
        "type": "internal"
      },
      {
        "label": "BusinessesKnowledge-Powered AI with ChatGPTCorporate training½, 1, 2 daysCourse",
        "url": "https://tinkercademy.com/programmes/knowledge-powered-ai-with-chatgpt",
        "type": "internal"
      },
      {
        "label": "PublicBuild for Mobile: App Development with React NativeCorporate training, 21 & 22 August 20252 daysCourse",
        "url": "https://tinkercademy.com/programmes/build-for-mobile-with-react-native",
        "type": "internal"
      },
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "Illuminate your journey into tech."
      },
      {
        "type": "h1",
        "text": "Learn coding and digital making from expert coders and makers."
      },
      {
        "type": "p",
        "text": "Programmes"
      },
      {
        "type": "p",
        "text": "Professionals"
      },
      {
        "type": "p",
        "text": "Schools"
      },
      {
        "type": "p",
        "text": "Individuals"
      },
      {
        "type": "p",
        "text": "Official training partner for tech companies, universities, and the Singapore government."
      },
      {
        "type": "h3",
        "text": "Official training partner for tech companies, universities, and the Singapore government."
      },
      {
        "type": "h2",
        "text": "Learn from qualified educators and engineers."
      },
      {
        "type": "p",
        "text": "Courses available in a wide variety of modern, practical domains."
      },
      {
        "type": "p",
        "text": "AI and Machine Learning with Data Science"
      },
      {
        "type": "p",
        "text": "Computer Science Fundamentals"
      },
      {
        "type": "p",
        "text": "Creativity, Craft, and Making"
      },
      {
        "type": "p",
        "text": "Cryptography"
      },
      {
        "type": "p",
        "text": "Cybersecurity"
      },
      {
        "type": "p",
        "text": "Design Thinking"
      },
      {
        "type": "p",
        "text": "Design, Prototyping, and UI/UX"
      },
      {
        "type": "p",
        "text": "Game Development"
      },
      {
        "type": "p",
        "text": "Microcontrollers & IoT"
      },
      {
        "type": "p",
        "text": "Mobile App Development"
      },
      {
        "type": "p",
        "text": "Professional Productivity with Technology"
      },
      {
        "type": "p",
        "text": "Software Engineering"
      },
      {
        "type": "p",
        "text": "Web Development"
      },
      {
        "type": "p",
        "text": "Led by experts with qualifications and experience from world-class institutions."
      },
      {
        "type": "h3",
        "text": "Led by experts with qualifications and experience from world-class institutions."
      },
      {
        "type": "p",
        "text": "Curriculum designed and delivered by officially certified instructors."
      },
      {
        "type": "h3",
        "text": "Curriculum designed and delivered by officially certified instructors."
      },
      {
        "type": "h2",
        "text": "Our FlagshipProgrammes"
      },
      {
        "type": "h2",
        "text": "Our Flagship Programmes"
      },
      {
        "type": "h3",
        "text": "Swift Accelerator"
      },
      {
        "type": "p",
        "text": "Learn about this intensive talent development programme for secondary school students where you can build an iOS app using Apple's own programming language, Swift."
      },
      {
        "type": "p",
        "text": "Read More"
      },
      {
        "type": "h3",
        "text": "IMDA LEARN Roadmap"
      },
      {
        "type": "p",
        "text": "We are proud to offer tech education courses to Infocomm Media Clubs for Primary Schools, secondary schools, and junior colleges, as part of IMDA's LEARN Roadmap."
      },
      {
        "type": "p",
        "text": "Read More"
      },
      {
        "type": "h3",
        "text": "Code For Fun"
      },
      {
        "type": "p",
        "text": "Discover how students can learn coding, computational thinking, and AI through hands-on experience with microcontrollers. We offer fully subsidised training for up to 2 cohorts per school."
      },
      {
        "type": "p",
        "text": "Read More"
      },
      {
        "type": "h2",
        "text": "Popular courses"
      },
      {
        "type": "h2",
        "text": "Popular Courses"
      },
      {
        "type": "p",
        "text": "Businesses"
      },
      {
        "type": "h2",
        "text": "Building Agents with OpenClaw"
      },
      {
        "type": "p",
        "text": "Corporate training"
      },
      {
        "type": "p",
        "text": "2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "p",
        "text": "Businesses"
      },
      {
        "type": "h2",
        "text": "Level Up Your Vibe Coding (Lovable and Replit)"
      },
      {
        "type": "p",
        "text": "Corporate training"
      },
      {
        "type": "p",
        "text": "2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "p",
        "text": "Businesses"
      },
      {
        "type": "h2",
        "text": "Vibe Coding for Digital Builders"
      },
      {
        "type": "p",
        "text": "Corporate training"
      },
      {
        "type": "p",
        "text": "2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "p",
        "text": "Businesses"
      },
      {
        "type": "h2",
        "text": "Knowledge-Powered AI with ChatGPT"
      },
      {
        "type": "p",
        "text": "Corporate training"
      },
      {
        "type": "p",
        "text": "½, 1, 2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "p",
        "text": "Public"
      },
      {
        "type": "h2",
        "text": "Build for Mobile: App Development with React Native"
      },
      {
        "type": "p",
        "text": "Corporate training, 21 & 22 August 2025"
      },
      {
        "type": "p",
        "text": "2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "p",
        "text": "Businesses"
      },
      {
        "type": "h2",
        "text": "Building Agents with OpenClaw"
      },
      {
        "type": "p",
        "text": "Corporate training"
      },
      {
        "type": "p",
        "text": "2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "p",
        "text": "Businesses"
      },
      {
        "type": "h2",
        "text": "Level Up Your Vibe Coding (Lovable and Replit)"
      },
      {
        "type": "p",
        "text": "Corporate training"
      },
      {
        "type": "p",
        "text": "2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "p",
        "text": "Businesses"
      },
      {
        "type": "h2",
        "text": "Vibe Coding for Digital Builders"
      },
      {
        "type": "p",
        "text": "Corporate training"
      },
      {
        "type": "p",
        "text": "2 days"
      },
      {
        "type": "p",
        "text": "Course"
      },
      {
        "type": "h3",
        "text": "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond."
      },
      {
        "type": "p",
        "text": "Our Courses"
      },
      {
        "type": "p",
        "text": "Our Projects"
      }
    ],
    "hero_title": "Illuminate your journey into tech.",
    "hero_lead": "Learn coding and digital making from expert coders and makers.",
    "hero_actions": [
      {
        "label": "Programmes",
        "url": "https://tinkercademy.com/#programmes",
        "type": "internal"
      },
      {
        "label": "Professionals",
        "url": "https://tinkercademy.com/professionals",
        "type": "internal"
      },
      {
        "label": "Schools",
        "url": "https://tinkercademy.com/schools",
        "type": "internal"
      },
      {
        "label": "Individuals",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      }
    ],
    "partner_statement": "Official training partner for tech companies, universities, and the Singapore government.",
    "partner_strip_image": "/images/remote/7JzS84mvFUEd3VM3WRXC2AaWn4k.svg",
    "focus_areas": [
      "AI and Machine Learning with Data Science",
      "Computer Science Fundamentals",
      "Creativity, Craft, and Making",
      "Cryptography",
      "Cybersecurity",
      "Design Thinking",
      "Design, Prototyping, and UI/UX",
      "Game Development",
      "Microcontrollers & IoT",
      "Mobile App Development",
      "Professional Productivity with Technology",
      "Software Engineering",
      "Web Development"
    ],
    "proof_points": [
      "Led by experts with qualifications and experience from world-class institutions.",
      "Curriculum designed and delivered by officially certified instructors."
    ],
    "flagship_items": [
      {
        "title": "Swift Accelerator",
        "description": "Learn about this intensive talent development programme for secondary school students where you can build an iOS app using Apple's own programming language, Swift.",
        "image": "/images/remote/y6eRckuBXhTJbECX9bWxb3URwA.png"
      },
      {
        "title": "IMDA LEARN Roadmap",
        "description": "We are proud to offer tech education courses to Infocomm Media Clubs for Primary Schools, secondary schools, and junior colleges, as part of IMDA's LEARN Roadmap.",
        "image": "/images/remote/ccAm2I4TKCuYyi1NVJdIrvzAw.png"
      },
      {
        "title": "Code For Fun",
        "description": "Discover how students can learn coding, computational thinking, and AI through hands-on experience with microcontrollers. We offer fully subsidised training for up to 2 cohorts per school.",
        "image": "/images/remote/Qf7w4K5k1qsLYbnAWi1zmxSec.png"
      }
    ],
    "featured_programme_slugs": [
      "building-agents-with-openclaw",
      "vibe-coding-for-digital-builders-lovable-replit",
      "vibe-coding-for-digital-builders",
      "knowledge-powered-ai-with-chatgpt",
      "build-for-mobile-with-react-native"
    ],
    "closing_statement": "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond.",
    "closing_ctas": [
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      }
    ]
  },
  {
    "path": "/professionals",
    "slug": "professionals",
    "title": "building-agents-with-openclaw",
    "description": "Empower your teams with expert-led customisable professional development in coding, app development, data science, AI, and more. ",
    "hero_image": "/images/remote/r3EDNPVFVYoPE9DDUDL4E6C2nJM.png",
    "seo": {
      "title": "Tinkercademy at Work: Expert-Led Tech Upskilling",
      "description": "Empower your teams with expert-led customisable professional development in coding, app development, data science, AI, and more. ",
      "canonical": "https://tinkercademy.com/professionals",
      "openGraph": {
        "title": "Tinkercademy at Work: Expert-Led Tech Upskilling",
        "description": "Empower your teams with expert-led customisable professional development in coding, app development, data science, AI, and more. ",
        "image": "/images/remote/Hpib447RIgaq1OV8VQAc9Vxhac-asset.png"
      },
      "twitter": {
        "title": "Tinkercademy at Work: Expert-Led Tech Upskilling",
        "description": "Empower your teams with expert-led customisable professional development in coding, app development, data science, AI, and more. ",
        "image": "/images/remote/Hpib447RIgaq1OV8VQAc9Vxhac-asset.png"
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "Schools",
        "url": "https://tinkercademy.com/schools",
        "type": "internal"
      },
      {
        "label": "Individuals",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      },
      {
        "label": "Browse Courses",
        "url": "https://tinkercademy.com/courses-professionals",
        "type": "internal"
      },
      {
        "label": "BusinessesBuilding Agents with OpenClawBusinesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/building-agents-with-openclaw",
        "type": "internal"
      },
      {
        "label": "BusinessesLevel Up Your Vibe Coding (Lovable and Replit)Businesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders-lovable-replit",
        "type": "internal"
      },
      {
        "label": "BusinessesVibe Coding for Digital BuildersBusinesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders",
        "type": "internal"
      },
      {
        "label": "BusinessesKnowledge-Powered AI with ChatGPTBusinesses½, 1, 2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/knowledge-powered-ai-with-chatgpt",
        "type": "internal"
      },
      {
        "label": "PublicBuild for Mobile: App Development with React NativePublic2 daysCorporate training, 21 & 22 August 2025",
        "url": "https://tinkercademy.com/programmes/build-for-mobile-with-react-native",
        "type": "internal"
      },
      {
        "label": "PublicMastering the Web: Understand Full-Stack DevelopmentPublic2 daysCorporate training, 3 & 4 July 2025",
        "url": "https://tinkercademy.com/programmes/mastering-the-web",
        "type": "internal"
      },
      {
        "label": "PublicProfessional Certificate in Mobile Application DevelopmentPublic2 days/moduleA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/professional-certificate-in-mobile-application-development",
        "type": "internal"
      },
      {
        "label": "PublicProfessional Certificate in Web Application DevelopmentPublic2 days/moduleA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/professional-certificate-in-web-application-development",
        "type": "internal"
      },
      {
        "label": "BusinessesCertificate in Technology Foundations: Harnessing the Power of Internet of Things and Creative Digital MakingBusinesses17 daysA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making",
        "type": "internal"
      },
      {
        "label": "BusinessesCertificate in Technology Foundations: Unleash the Potential of Blockchain TechnologyBusinesses17 daysA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology",
        "type": "internal"
      },
      {
        "label": "PublicDigital Maker: Create with 3D Printing and IOTPublic2 days14 - 15 January 2025",
        "url": "https://tinkercademy.com/programmes/iotmaker",
        "type": "internal"
      },
      {
        "label": "BusinessesEnter the Metaverse: Get started with Unity for AR/VRBusinesses2 days11 - 12 February 2025",
        "url": "https://tinkercademy.com/programmes/unityarvr",
        "type": "internal"
      },
      {
        "label": "PublicNo-code Web Design (Framer)Public2 daysAn introductory course on building websites using Framer.",
        "url": "https://tinkercademy.com/programmes/no-code-web-design-framer",
        "type": "internal"
      },
      {
        "label": "BusinessesMicrosoft Copilot Businesses2 daysAn introductory course on leveraging Microsoft Copilot to enhance productivity.",
        "url": "https://tinkercademy.com/programmes/microsoft-copilot",
        "type": "internal"
      },
      {
        "label": "BusinessesDigital Making with micro:bit & IoTBusinesses2 daysAn introductory course on digital making with Micro:bit & IoT.",
        "url": "https://tinkercademy.com/programmes/digital-making-with-micro-bit-iot",
        "type": "internal"
      },
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "image",
        "src": "/images/remote/r3EDNPVFVYoPE9DDUDL4E6C2nJM.png",
        "width": 765,
        "height": 425
      }
    ]
  },
  {
    "path": "/microbit",
    "slug": "microbit",
    "title": "micro:bit Tutorials",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/3wvrDe3ohG9X1GAVgOtYRjkdWCs.jpg",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/microbit",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "Tutorials",
        "url": "https://tinkercademy.com/microbit#tutorials",
        "type": "internal"
      },
      {
        "label": "Individuals",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      },
      {
        "label": "Professionals",
        "url": "https://tinkercademy.com/professionals",
        "type": "internal"
      },
      {
        "label": "Schools",
        "url": "https://tinkercademy.com/schools",
        "type": "internal"
      },
      {
        "label": "Digital Maker Programme",
        "url": "https://microbit.org/impact/foundation-reports/singapore/digital-maker-programme/#:~:text=The%20Digital%20Maker%20Programme%20%28DMP%29%20was%20then%20launched,to%20all%20primary%20school%20levels%20P1%20to%20P6.",
        "type": "external"
      },
      {
        "label": "Buy the micro:bit and kit",
        "url": "https://gethacking.com/collections/microbit",
        "type": "external"
      },
      {
        "label": "microbit.org",
        "url": "http://microbit.org/",
        "type": "external"
      },
      {
        "label": "microbit.org/code",
        "url": "http://microbit.org/code",
        "type": "external"
      },
      {
        "label": "Microsoft MakeCode",
        "url": "http://pxt.microbit.org/",
        "type": "external"
      },
      {
        "label": "check here",
        "url": "http://microbit.org/en/2017-03-07-javascript-block-resources/",
        "type": "external"
      },
      {
        "label": "Instructables",
        "url": "http://www.instructables.com/member/Digital%20Maker%20SG",
        "type": "external"
      },
      {
        "label": "here",
        "url": "https://microbit.org/impact/foundation-reports/singapore/digital-maker-programme/",
        "type": "external"
      },
      {
        "label": "Digital Making course",
        "url": "https://tinkercademy.com/programmes/imda-microbit-2025",
        "type": "internal"
      },
      {
        "label": "Buy the micro:bit Breakout Board",
        "url": "https://gethacking.com/collections/microbit/breakout-board#filter-by",
        "type": "external"
      },
      {
        "label": "Access Denied! A Door Entry TutorialAccess Denied! A Door Entry Tutorial",
        "url": "https://tinkercademy.com/tutorials/access-denied-a-door-entry-tutorial",
        "type": "internal"
      },
      {
        "label": "Ang Bao CollectorAng Bao Collector",
        "url": "https://tinkercademy.com/tutorials/ang-bao-collector",
        "type": "internal"
      },
      {
        "label": "Build your own Micro:bit Security Door!Build your own Micro:bit Security Door!",
        "url": "https://tinkercademy.com/tutorials/build-your-own-micro-bit-security-door",
        "type": "internal"
      },
      {
        "label": "Coin Sorter with Micro:bitCoin Sorter with Micro:bit",
        "url": "https://tinkercademy.com/tutorials/coin-sorter",
        "type": "internal"
      },
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "micro:bit Tutorials"
      },
      {
        "type": "p",
        "text": "Get started with our BBC Micro:bit Kit and the Breakout Board here!"
      },
      {
        "type": "p",
        "text": "Tutorials"
      },
      {
        "type": "p",
        "text": "Individuals"
      },
      {
        "type": "p",
        "text": "Professionals"
      },
      {
        "type": "p",
        "text": "Schools"
      },
      {
        "type": "h2",
        "text": "Getting started with the micro:bit Tinker Kit"
      },
      {
        "type": "p",
        "text": "Tinkercademy is proud to present our very own Micro:bit Tinker Kit. Made in Singapore! The kit comes with:"
      },
      {
        "type": "list",
        "items": [
          "Our custom breakout board, which makes it super easy to make projects with the micro:bit!",
          "A variety of Octopus parts: components with colour-coded plugs that connect easily with the breakout board."
        ]
      },
      {
        "type": "p",
        "text": "Follow the graphical guide to get started on using the Breakout Board, and try out the tutorials below."
      },
      {
        "type": "p",
        "text": "We’re proud to be a launch partner of the Infocomm Media Development Authority for the launch of the Digital Maker Programme, which aims to nurture a new generation of digital natives with a passion for technology. Read more about our Digital Maker Programme initiatives at our blog."
      },
      {
        "type": "p",
        "text": "Buy the micro:bit and kit"
      },
      {
        "type": "h2",
        "text": "Have a new micro:bit? Here’s where you can get started:"
      },
      {
        "type": "list",
        "items": [
          "The official micro:bit site at microbit.org",
          "Want to jump straight into coding? See microbit.org/code, or go straight to Microsoft MakeCode.",
          "microbit.org has lots of great MakeCode lessons to get started—check here!",
          "Try out more projects from the Digital Maker Programme on Instructables. Find out more about the Digital Maker Programme, by the Infocomm Media Development Authority of Singapore, here.",
          "Sign up for our Digital Making course to explore the functionalities of micro:bit.",
          "Try our tutorials below! Some components may require extra libraries, which are available for download in the tutorials."
        ]
      },
      {
        "type": "h3",
        "text": "Introducing the micro:bit Breakout Board"
      },
      {
        "type": "p",
        "text": "Buy the micro:bit Breakout Board"
      },
      {
        "type": "h2",
        "text": "Ready to tinker with your new micro:bit?Look through our micro:bit tutorials!"
      },
      {
        "type": "h2",
        "text": "Access Denied! A Door Entry Tutorial"
      },
      {
        "type": "h2",
        "text": "Ang Bao Collector"
      },
      {
        "type": "h2",
        "text": "Build your own Micro:bit Security Door!"
      },
      {
        "type": "h2",
        "text": "Coin Sorter with Micro:bit"
      },
      {
        "type": "h3",
        "text": "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond."
      },
      {
        "type": "p",
        "text": "Our Courses"
      },
      {
        "type": "p",
        "text": "Our Projects"
      }
    ]
  },
  {
    "path": "/tinker-x",
    "slug": "tinker-x",
    "title": "Tinker X",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/3cybNehmDehCXeBSMBiUWGpbgI.jpg",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/tinker-x",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "blog",
        "url": "https://ghost.tk.sg/",
        "type": "external"
      },
      {
        "label": "Get Started",
        "url": "https://tinkercademy.com/contact-us",
        "type": "internal"
      },
      {
        "label": "Get Started",
        "url": "https://app.acuityscheduling.com/schedule/b7469ae8/category/Tinker%2520X%2520Single%2520Sessions/appointment/9896622/calendar/2925143",
        "type": "external"
      },
      {
        "label": "Get Started",
        "url": "https://app.acuityscheduling.com/catalog/b7469ae8?categories=Packages",
        "type": "external"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "Tinker X"
      },
      {
        "type": "h3",
        "text": "A flexible program for hands-on learning in coding and making."
      },
      {
        "type": "p",
        "text": "Welcome to Tinker X, an open-ended program for anyone interested in coding and engineering. Unlike a traditional classroom, we offer a flexible mix of hands-on instruction and independent work. We give you the resources and support to learn at your own pace, whether you’re following a structured curriculum or bringing your own project to life."
      },
      {
        "type": "p",
        "text": "AI is already disrupting traditional education, moving it away from a rigid, one-size-fits-all model toward a more personalized and efficient system. We've embraced this change. Our program uses a flipped classroom approach where you actively engage with materials on your own, applying a \"just-in-time\" learning approach. This means you focus on learning the skills you need to complete a project you're excited about."
      },
      {
        "type": "p",
        "text": "This process is designed to be challenging and, at times, frustrating—and that's by design. By learning to push through obstacles and solve problems on your own, you'll develop grit, critical thinking, and initiative — skills that are essential for a future where technology is constantly changing. We seek to nurture independent, motivated, and skilled learners and creators who adapt and thrive in a rapidly changing world."
      },
      {
        "type": "h3",
        "text": "Extensive Materials"
      },
      {
        "type": "p",
        "text": "We offer a wide range of course materials for all skill levels and interests, from introductory coding to data science, and AI. Our curriculum has been used with thousands of students."
      },
      {
        "type": "p",
        "text": "We also use high-quality online content and will recommend resources that best fit your needs, while providing support along the way."
      },
      {
        "type": "p",
        "text": "We provide a wide range of materials to cater to learners of all levels."
      },
      {
        "type": "h3",
        "text": "Maker Library"
      },
      {
        "type": "p",
        "text": "Don’t have the space (or you’re just too sensible) to put a laser cutter at home? No problem! We have the equipment you need to make and tinker: electronics modules, laser cutter, 3D printer, soldering station, miter saw, and much more."
      },
      {
        "type": "p",
        "text": "We also have an extensive library of kits and robots you can tinker and play with."
      },
      {
        "type": "p",
        "text": "We have an extensive library of kits and robots you can tinker and play with."
      },
      {
        "type": "h3",
        "text": "Community"
      },
      {
        "type": "p",
        "text": "It can get lonely learning on your own. Even if you do not talk to anyone else here at Tinker X, it is still inspirational and motivational to join a community of like-minded people who just want to see what happens when you connect this to that and spend hours tinkering with code and electronics."
      },
      {
        "type": "p",
        "text": "We love to see people learn and grow. To that end, we offer Tinker X scholarships to enthusiastic and passionate young students, so that they can contribute back to the community with their new skills and knowledge."
      },
      {
        "type": "p",
        "text": "Join other like-minded tinkerers and learners."
      },
      {
        "type": "p",
        "text": "Read more project updates on our blog."
      },
      {
        "type": "h2",
        "text": "Frequently Asked Questions"
      },
      {
        "type": "p",
        "text": "Is there a curriculum?"
      },
      {
        "type": "p",
        "text": "What can I choose to learn?"
      },
      {
        "type": "p",
        "text": "Is this suitable for my child?"
      },
      {
        "type": "p",
        "text": "Am I too old for your program?"
      },
      {
        "type": "p",
        "text": "Why should I go for this over a traditional enrichment centre?"
      },
      {
        "type": "h3",
        "text": "Try a free trial session and see what we're all about! After that, you can continue with individual sessions, or sign up for a package for additional savings."
      },
      {
        "type": "h2",
        "text": "Trial Session"
      },
      {
        "type": "p",
        "text": "New to us"
      },
      {
        "type": "p",
        "text": "$0"
      },
      {
        "type": "p",
        "text": "SGD"
      },
      {
        "type": "p",
        "text": "New here? Try us out!"
      },
      {
        "type": "p",
        "text": "Write in to us for details"
      },
      {
        "type": "p",
        "text": "Get Started"
      },
      {
        "type": "h2",
        "text": "Single Session"
      },
      {
        "type": "p",
        "text": "Weekly"
      },
      {
        "type": "p",
        "text": "$50"
      },
      {
        "type": "p",
        "text": "SGD"
      },
      {
        "type": "p",
        "text": "Full access for one day"
      },
      {
        "type": "p",
        "text": "Great for small projects"
      },
      {
        "type": "p",
        "text": "Get Started"
      },
      {
        "type": "h2",
        "text": "4 Sessions"
      },
      {
        "type": "p",
        "text": "Monthly"
      },
      {
        "type": "p",
        "text": "$180"
      },
      {
        "type": "p",
        "text": "SGD"
      },
      {
        "type": "p",
        "text": "Save $20!"
      },
      {
        "type": "p",
        "text": "120-day validity"
      },
      {
        "type": "p",
        "text": "Get Started"
      },
      {
        "type": "h2",
        "text": "12 Sessions"
      },
      {
        "type": "p",
        "text": "Quarterly"
      },
      {
        "type": "p",
        "text": "$480"
      },
      {
        "type": "p",
        "text": "SGD"
      },
      {
        "type": "p",
        "text": "Save $120!!"
      },
      {
        "type": "p",
        "text": "180-day validity"
      },
      {
        "type": "p",
        "text": "Get Started"
      },
      {
        "type": "h1",
        "text": "Tinker X Scholars"
      },
      {
        "type": "h3",
        "text": "A scholarship opportunity for students who demonstrate a passion for technology."
      },
      {
        "type": "p",
        "text": "Technology education is often treated as an enrichment activity, which can create inequality in who has access to it. To help make technology education more equitable and accessible, we are offering Tinker X scholarships for students."
      },
      {
        "type": "p",
        "text": "These scholarships provide highly subsidized membership to students who are passionate about technology but lack access to expert mentors, guidance, or tools."
      },
      {
        "type": "p",
        "text": "To be considered, students should submit a portfolio of their previous tech-related work. We're not looking for perfect results, but rather a clear demonstration of effort and passion. Applicants must also show a need for financial assistance."
      },
      {
        "type": "p",
        "text": "In return, Tinker X scholars will be expected to give back to the community, helping to inspire the next generation of learners."
      },
      {
        "type": "p",
        "text": "If you or someone you know might be a good fit, please contact us at hello@tinkercademy.com to learn more or to apply. We are accepting applications now."
      }
    ]
  },
  {
    "path": "/showcase",
    "slug": "showcase",
    "title": "Showcase of Our Coders, Tinkerers, Makers, and their Journeys",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/1mmWhHMr6MnhWIa0MEoHFHdS4I.jpg",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/showcase",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "https://www.apple.com/education/college-students/success-stories/yee/",
        "url": "https://www.apple.com/education/college-students/success-stories/yee/",
        "type": "external"
      },
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "Showcase of Our Coders, Tinkerers, Makers, and their Journeys"
      },
      {
        "type": "h4",
        "text": "Meet the bright minds who’ve learned, built, and grown with us, from classroom projects to professional success."
      },
      {
        "type": "h2",
        "text": "Our Students"
      },
      {
        "type": "h4",
        "text": "Our students have built some pretty cool things, ranging from apps to games to remote controlled devices and beyond!"
      },
      {
        "type": "h2",
        "text": "Our Interns"
      },
      {
        "type": "h4",
        "text": "Through hands-on experience and mentorship, our interns work on real projects that shape the future of education and technology. Here are what they have to say about their experiences!"
      },
      {
        "type": "list",
        "items": [
          "RaynoldSoftware Development Intern,2017This internship was so much than just a programming task. As the project owner, I went through all stages of product development. From the idea generation, discussion with end users, development, live demonstrations to troubleshooting and maintenance."
        ]
      },
      {
        "type": "h2",
        "text": "Raynold"
      },
      {
        "type": "list",
        "items": [
          "ColinMachine Learning & Data Science Intern, 2017Being at Tinkertanker gave me the drive and motivation to push through the courses on a very tight schedule, thanks to the mentors who were there to provide not just answers, but the right questions and resources to find out myself."
        ]
      },
      {
        "type": "h2",
        "text": "Colin"
      },
      {
        "type": "list",
        "items": [
          "JoelleComputer Engineering Intern, 2017I am really happy to have worked on several projects that were put to life. It was a little nerve-wrecking and mind boggling but I’m glad everything turned out okay. Through this experience, I have learnt how to appreciate and enjoy the building process apart from looking at the end product."
        ]
      },
      {
        "type": "h2",
        "text": "Joelle"
      },
      {
        "type": "list",
        "items": [
          "MarkTeaching & Curriculum Design Intern, 2023Due to the nature of Tinkertanker as a tech education company, it has a wealth of resources you can make use of to expand your technical knowledge. It’s a different experience from the traditional software engineering job, and I appreciate its role in broadening my horizons."
        ]
      },
      {
        "type": "h2",
        "text": "Mark"
      },
      {
        "type": "list",
        "items": [
          "EnricComputer Science Intern, 2023All in all, interning at Tinkertanker was a very enriching experience. I was able to take part in the teaching of classes and even try out many different coding languages and programs such as VMs. And all of these have helped me improve and grow as a Computer Science undergraduate."
        ]
      },
      {
        "type": "h2",
        "text": "Enric"
      },
      {
        "type": "list",
        "items": [
          "Yun XuanSoftware Development Intern, 2024Overall, all these experiences have made my internship a thoroughly enjoyable and educational experience. I believe it provided me with a diverse set of skills and insights that I will carry forward in my professional journey. I am very grateful to everyone who helped make this enriching experience possible."
        ]
      },
      {
        "type": "h2",
        "text": "Yun Xuan"
      },
      {
        "type": "h2",
        "text": "Meet Jia Chen"
      },
      {
        "type": "p",
        "text": "Swift Accelerator Programme Trainer at Tinkertanker"
      },
      {
        "type": "p",
        "text": "Image from apple.com"
      },
      {
        "type": "p",
        "text": "Meet Jia Chen, a young visionary from Singapore whose journey into the world of technology began with childhood exploration and the transformative power of mobile apps. Inspired by the seamless fusion of science and technology, Jia Chen embarked on a swift learning curve, mastering the Swift programming language and unveiling his debut iOS app on the App Store at a remarkably young age. Now, an Information Technology diploma graduate from Ngee Ann Polytechnic, Jia Chen's creative process is seamlessly integrated into the Apple ecosystem, from sketching app designs on iPad to bringing them to life with Xcode on Mac. His commitment to inclusivity is palpable through projects such as \"ExploreAbility,\" designed to empower users with accessibility features. Collaborating with renowned brands like Bernina, Jia Chen showcases his innovative spirit with apps like \"Bianco,\" demonstrating the potential of ARKit and iPad. With six apps already gracing the App Store and two Swift Student Challenge triumphs under his belt, Jia Chen epitomizes the next generation of creators and innovators, harnessing the power of Swift to realize his boundless ideas with precision and flair."
      },
      {
        "type": "p",
        "text": "As featured on Apple: https://www.apple.com/education/college-students/success-stories/yee/"
      },
      {
        "type": "h2",
        "text": "Learn more about what our alumni have done!"
      },
      {
        "type": "h3",
        "text": "We’re building software, electronics, curriculum—and the next generation of coders, makers, and creators. Come check out our build log and contribute to it one day!"
      },
      {
        "type": "p",
        "text": "Build Log"
      },
      {
        "type": "h3",
        "text": "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond."
      },
      {
        "type": "p",
        "text": "Our Courses"
      },
      {
        "type": "p",
        "text": "Our Projects"
      }
    ]
  },
  {
    "path": "/about-us",
    "slug": "about-us",
    "title": "We’re coders and tinkerers who teach coding and tinkering to schools, corporations, and the public in Singapore.",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/a30diESkHyoGIgdzYg4dQoU5vHA.jpg",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/about-us",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Get Hacking",
        "url": "http://gethacking.com/",
        "type": "external"
      },
      {
        "label": "GuestDay",
        "url": "http://guestday.com/",
        "type": "external"
      },
      {
        "label": "IC Photo",
        "url": "https://apps.apple.com/sg/app/ic-photo-singapore/id483078253",
        "type": "external"
      },
      {
        "label": "Helpling Singapore",
        "url": "http://helpling.com.sg/",
        "type": "external"
      },
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "We’re coders and tinkerers who teach coding and tinkering to schools, corporations, and the public in Singapore."
      },
      {
        "type": "h4",
        "text": "We bring an unparalleled depth of experience in education and technology to our classes and curriculum."
      },
      {
        "type": "p",
        "text": "Tinkertanker Pte Ltd is a technology and education company of tinkerers and teachers. We run Tinkercademy, where we teach coding and digital making to students of all ages, in a wide variety of fields such as micro:bit, iOS, Python, Arduino, Node, cyber-security, Unity, and more. We also curate and sell educational technology toys at our Get Hacking online store, and build our own tech apps and products, e.g. GuestDay, an iPad-based guest registration service; an IC Photo app for Singaporeans to take useful selfies; and Spickify, now Helpling Singapore."
      },
      {
        "type": "h3",
        "text": "We are certified"
      },
      {
        "type": "h2",
        "text": "Partners"
      },
      {
        "type": "p",
        "text": "We collaborate with with industry leaders and educational institutions to drive innovation in learning. Our partners make it possible for us to create impactful solutions that empower educators and students alike."
      },
      {
        "type": "h2",
        "text": "Our Clients"
      },
      {
        "type": "p",
        "text": "We’ve had the privilege of teaching, and working with, many preschools, primary schools, secondary schools, IP schools, junior colleges, tertiary institutions, and companies. Here’s a random sample of our clients:"
      },
      {
        "type": "h1",
        "text": "50+"
      },
      {
        "type": "h3",
        "text": "Primary and Secondary Schools We've Taught at for IMDA Infocomm Club"
      },
      {
        "type": "h1",
        "text": "160+"
      },
      {
        "type": "h3",
        "text": "Preschools We've Developed Curriculum for in the Playmaker Programme"
      },
      {
        "type": "h1",
        "text": "3000+"
      },
      {
        "type": "h3",
        "text": "Students We've Reached Through the Code@SG Movement"
      },
      {
        "type": "h2",
        "text": "Our Team"
      },
      {
        "type": "p",
        "text": "Tinkercademy comprises a team of dedicated education specialists from top universities worldwide. With our extensive training in technology, design, and educational pedagogy, combined with years of experience creating real-world apps and electronics, we bring an unparalleled breadth and depth of technology education to our classes and curriculum."
      },
      {
        "type": "p",
        "text": "YJ"
      },
      {
        "type": "p",
        "text": "Master Trainer"
      },
      {
        "type": "p",
        "text": "Stanford CS graduate, YJ, trusted by tech giants like Apple and Microsoft, spearheads our corporate training programs with unparalleled expertise."
      },
      {
        "type": "p",
        "text": "Mike"
      },
      {
        "type": "p",
        "text": "Master Trainer"
      },
      {
        "type": "p",
        "text": "Wharton MBA turned Master Trainer. Mike distills complex topics into clear actionable takeaways for diverse audiences."
      },
      {
        "type": "p",
        "text": "Akmal"
      },
      {
        "type": "p",
        "text": "Master Trainer"
      },
      {
        "type": "p",
        "text": "Your friendly tech guru! Cornell grad (CS & EE) with government consulting experience."
      },
      {
        "type": "p",
        "text": "Yixue"
      },
      {
        "type": "p",
        "text": "Associate Trainer"
      },
      {
        "type": "p",
        "text": "Lucasfilm alum with 15+ years in media brings real-world expertise to your tinkering journey."
      },
      {
        "type": "p",
        "text": "Win"
      },
      {
        "type": "p",
        "text": "Associate Trainer"
      },
      {
        "type": "p",
        "text": "MBA in Automation & Control (NUS). Makes learning tech fun and collaborative."
      },
      {
        "type": "p",
        "text": "Ben"
      },
      {
        "type": "p",
        "text": "Lead Trainer"
      },
      {
        "type": "p",
        "text": "With 15 years of diverse experience spanning tech, finance, and education, Ben makes learning accessible to all, blending real-world insights with engaging instruction."
      },
      {
        "type": "p",
        "text": "Tracey"
      },
      {
        "type": "p",
        "text": "Lead Trainer"
      },
      {
        "type": "p",
        "text": "Santa Clara University graduate with over 15 years of experience in coding and education. Enlists engaging coding instruction to bring robots to life."
      },
      {
        "type": "p",
        "text": "Steven"
      },
      {
        "type": "p",
        "text": "Lead Trainer"
      },
      {
        "type": "p",
        "text": "MIT alum and tech guru, Steven sets you on a transformative tech path with his profound knowledge and innovative insights."
      },
      {
        "type": "p",
        "text": "Grace"
      },
      {
        "type": "p",
        "text": "Education Marketing"
      },
      {
        "type": "p",
        "text": "NTU alum and ex-Apple employee, Grace leads impactful campaigns to empower learning through technology."
      },
      {
        "type": "h3",
        "text": "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond."
      },
      {
        "type": "p",
        "text": "Our Courses"
      },
      {
        "type": "p",
        "text": "Our Projects"
      }
    ]
  },
  {
    "path": "/schools",
    "slug": "schools",
    "title": "code-for-fun-ai-workshop",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/2NpNJXdo2tuUILUJ69j5Vd5kXA.png",
    "seo": {
      "title": "Tinkercademy in Schools: Expert-led instruction for students",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/schools",
      "openGraph": {
        "title": "Tinkercademy in Schools: Expert-led instruction for students",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy in Schools: Expert-led instruction for students",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "Professionals",
        "url": "https://tinkercademy.com/professionals",
        "type": "internal"
      },
      {
        "label": "Individuals",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      },
      {
        "label": "Professionals",
        "url": "https://tinkercademy.com/courses-schools",
        "type": "internal"
      },
      {
        "label": "Individuals",
        "url": "https://tinkercademy.com/courses-schools",
        "type": "internal"
      },
      {
        "label": "Code for Fun programme",
        "url": "https://codeforfun.sg/",
        "type": "external"
      },
      {
        "label": "Infocomm Learning Roadmap",
        "url": "https://tinkercademy.com/infocomm-club",
        "type": "internal"
      },
      {
        "label": "Code@SG scheme",
        "url": "https://www.imda.gov.sg/how-we-can-help/code-at-sg",
        "type": "external"
      },
      {
        "label": "Learn More",
        "url": "https://codeforfun.sg/",
        "type": "external"
      },
      {
        "label": "LEARN Roadmap",
        "url": "https://www.imda.gov.sg/how-we-can-help/infocomm-media-clubs/learn-roadmaps",
        "type": "external"
      },
      {
        "label": "Learn More",
        "url": "https://tinkercademy.com/infocomm-club",
        "type": "internal"
      },
      {
        "label": "Browse Courses",
        "url": "https://tinkercademy.com/courses-schools",
        "type": "internal"
      },
      {
        "label": "StudentsCode For Fun AI WorkshopStudents10 hoursA CODE@SG initiative by IMDA and MOE.",
        "url": "https://tinkercademy.com/programmes/code-for-fun-ai-workshop",
        "type": "internal"
      },
      {
        "label": "StudentsCode For Fun Baseline WorkshopStudents10 hoursA CODE@SG initiative by IMDA and MOE.",
        "url": "https://tinkercademy.com/programmes/code-for-fun-baseline-workshop",
        "type": "internal"
      },
      {
        "label": "StudentsRI FutureCreate Maker Programme 2025Students4 yearsA hands-on digital maker programme for RI students.",
        "url": "https://tinkercademy.com/programmes/ri-futurecreate-maker-programme-2025",
        "type": "internal"
      },
      {
        "label": "StudentsDigital Making with micro:bitStudents24 hoursAn IMDA Infocom LEARN Roadmap course with micro:bit.",
        "url": "https://tinkercademy.com/programmes/imda-microbit-2025",
        "type": "internal"
      },
      {
        "label": "StudentsGame Development in MakeCode Arcade & MineCraftStudents24 hoursAn IMDA Infocom LEARN Roadmap course with MakeCode Arcade & MineCraft.",
        "url": "https://tinkercademy.com/programmes/imda-minecraft-2025",
        "type": "internal"
      },
      {
        "label": "StudentsGame Development Bootcamp with UnityStudents32 hoursAn IMDA Infocom LEARN Roadmap bootcamp with Unity.",
        "url": "https://tinkercademy.com/programmes/imda-unity-2025",
        "type": "internal"
      },
      {
        "label": "StudentsUI/UX Design with FigmaStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Figma.",
        "url": "https://tinkercademy.com/programmes/imda-figma-2025",
        "type": "internal"
      },
      {
        "label": "StudentsAI-Driven Game Development on PhaserStudents24 hoursAn IMDA Infocom LEARN Roadmap course with Phaser.",
        "url": "https://tinkercademy.com/programmes/imda-phaser-2025",
        "type": "internal"
      },
      {
        "label": "StudentsSwift AcceleratorStudents8 monthsAn IMDA-Supported Course: Fully Subsidized for Successful Applicants",
        "url": "https://tinkercademy.com/programmes/swift-accelerator",
        "type": "internal"
      },
      {
        "label": "StudentsApp Development Basics with Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-b",
        "type": "internal"
      },
      {
        "label": "StudentsApp Development Explorations with Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-c",
        "type": "internal"
      },
      {
        "label": "StudentsApp Prototyping with Keynote and Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-a",
        "type": "internal"
      },
      {
        "label": "StudentsCODE_EXP 2025Students4 days11 May 2025",
        "url": "https://tinkercademy.com/programmes/code-exp-2025",
        "type": "internal"
      },
      {
        "label": "TeachersNo-Code Machine LearningTeachers2 daysAn introductory course on machine learning models using Orange.",
        "url": "https://tinkercademy.com/programmes/no-code-machine-learning",
        "type": "internal"
      },
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "image",
        "src": "/images/remote/2NpNJXdo2tuUILUJ69j5Vd5kXA.png",
        "width": 4985,
        "height": 2874
      }
    ]
  },
  {
    "path": "/courses-professionals",
    "slug": "courses-professionals",
    "title": "building-agents-with-openclaw",
    "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
    "hero_image": "/images/remote/r3EDNPVFVYoPE9DDUDL4E6C2nJM.png",
    "seo": {
      "title": "Tinkercademy | Singapore's Top Professional Development Tech Courses",
      "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
      "canonical": "https://tinkercademy.com/courses-professionals",
      "openGraph": {
        "title": "Tinkercademy | Singapore's Top Professional Development Tech Courses",
        "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
        "image": "/images/remote/BPcWkLszbcWVMEaeXfRnQ9yMk.png"
      },
      "twitter": {
        "title": "Tinkercademy | Singapore's Top Professional Development Tech Courses",
        "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
        "image": "/images/remote/BPcWkLszbcWVMEaeXfRnQ9yMk.png"
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "BusinessesBuilding Agents with OpenClawBusinesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/building-agents-with-openclaw",
        "type": "internal"
      },
      {
        "label": "BusinessesLevel Up Your Vibe Coding (Lovable and Replit)Businesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders-lovable-replit",
        "type": "internal"
      },
      {
        "label": "BusinessesVibe Coding for Digital BuildersBusinesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders",
        "type": "internal"
      },
      {
        "label": "BusinessesKnowledge-Powered AI with ChatGPTBusinesses½, 1, 2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/knowledge-powered-ai-with-chatgpt",
        "type": "internal"
      },
      {
        "label": "PublicBuild for Mobile: App Development with React NativePublic2 daysCorporate training, 21 & 22 August 2025",
        "url": "https://tinkercademy.com/programmes/build-for-mobile-with-react-native",
        "type": "internal"
      },
      {
        "label": "PublicMastering the Web: Understand Full-Stack DevelopmentPublic2 daysCorporate training, 3 & 4 July 2025",
        "url": "https://tinkercademy.com/programmes/mastering-the-web",
        "type": "internal"
      },
      {
        "label": "PublicProfessional Certificate in Mobile Application DevelopmentPublic2 days/moduleA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/professional-certificate-in-mobile-application-development",
        "type": "internal"
      },
      {
        "label": "PublicProfessional Certificate in Web Application DevelopmentPublic2 days/moduleA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/professional-certificate-in-web-application-development",
        "type": "internal"
      },
      {
        "label": "BusinessesCertificate in Technology Foundations: Harnessing the Power of Internet of Things and Creative Digital MakingBusinesses17 daysA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making",
        "type": "internal"
      },
      {
        "label": "BusinessesCertificate in Technology Foundations: Unleash the Potential of Blockchain TechnologyBusinesses17 daysA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology",
        "type": "internal"
      },
      {
        "label": "PublicDigital Maker: Create with 3D Printing and IOTPublic2 days14 - 15 January 2025",
        "url": "https://tinkercademy.com/programmes/iotmaker",
        "type": "internal"
      },
      {
        "label": "BusinessesEnter the Metaverse: Get started with Unity for AR/VRBusinesses2 days11 - 12 February 2025",
        "url": "https://tinkercademy.com/programmes/unityarvr",
        "type": "internal"
      },
      {
        "label": "PublicNo-code Web Design (Framer)Public2 daysAn introductory course on building websites using Framer.",
        "url": "https://tinkercademy.com/programmes/no-code-web-design-framer",
        "type": "internal"
      },
      {
        "label": "BusinessesMicrosoft Copilot Businesses2 daysAn introductory course on leveraging Microsoft Copilot to enhance productivity.",
        "url": "https://tinkercademy.com/programmes/microsoft-copilot",
        "type": "internal"
      },
      {
        "label": "BusinessesDigital Making with micro:bit & IoTBusinesses2 daysAn introductory course on digital making with Micro:bit & IoT.",
        "url": "https://tinkercademy.com/programmes/digital-making-with-micro-bit-iot",
        "type": "internal"
      },
      {
        "label": "Back to Professionals",
        "url": "https://tinkercademy.com/professionals",
        "type": "internal"
      },
      {
        "label": "All Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "School Courses",
        "url": "https://tinkercademy.com/courses-schools",
        "type": "internal"
      },
      {
        "label": "Individual Courses",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "image",
        "src": "/images/remote/r3EDNPVFVYoPE9DDUDL4E6C2nJM.png",
        "width": 765,
        "height": 425
      }
    ]
  },
  {
    "path": "/courses-all",
    "slug": "courses-all",
    "title": "code-for-fun-ai-workshop",
    "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
    "hero_image": "/images/remote/2NpNJXdo2tuUILUJ69j5Vd5kXA.png",
    "seo": {
      "title": "Tinkercademy | Singapore's Top Professional Development Tech Courses",
      "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
      "canonical": "https://tinkercademy.com/courses-all",
      "openGraph": {
        "title": "Tinkercademy | Singapore's Top Professional Development Tech Courses",
        "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
        "image": "/images/remote/BPcWkLszbcWVMEaeXfRnQ9yMk.png"
      },
      "twitter": {
        "title": "Tinkercademy | Singapore's Top Professional Development Tech Courses",
        "description": "Master Every Tech Skill: Beginner to Advanced Courses (Wharton & Stamford Instructors).  Upskill your team with our 5-star rated professional development programs. Find the perfect course for your needs!",
        "image": "/images/remote/BPcWkLszbcWVMEaeXfRnQ9yMk.png"
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "StudentsCode For Fun AI WorkshopAge GroupStudents10 hoursA CODE@SG initiative by IMDA and MOE.",
        "url": "https://tinkercademy.com/programmes/code-for-fun-ai-workshop",
        "type": "internal"
      },
      {
        "label": "StudentsCode For Fun Baseline WorkshopAge GroupStudents10 hoursA CODE@SG initiative by IMDA and MOE.",
        "url": "https://tinkercademy.com/programmes/code-for-fun-baseline-workshop",
        "type": "internal"
      },
      {
        "label": "BusinessesBuilding Agents with OpenClawBusinesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/building-agents-with-openclaw",
        "type": "internal"
      },
      {
        "label": "BusinessesLevel Up Your Vibe Coding (Lovable and Replit)Businesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders-lovable-replit",
        "type": "internal"
      },
      {
        "label": "BusinessesVibe Coding for Digital BuildersBusinesses2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/vibe-coding-for-digital-builders",
        "type": "internal"
      },
      {
        "label": "BusinessesKnowledge-Powered AI with ChatGPTBusinesses½, 1, 2 daysCorporate training",
        "url": "https://tinkercademy.com/programmes/knowledge-powered-ai-with-chatgpt",
        "type": "internal"
      },
      {
        "label": "PublicBuild for Mobile: App Development with React NativePublic2 daysCorporate training, 21 & 22 August 2025",
        "url": "https://tinkercademy.com/programmes/build-for-mobile-with-react-native",
        "type": "internal"
      },
      {
        "label": "PublicMastering the Web: Understand Full-Stack DevelopmentPublic2 daysCorporate training, 3 & 4 July 2025",
        "url": "https://tinkercademy.com/programmes/mastering-the-web",
        "type": "internal"
      },
      {
        "label": "StudentsRI FutureCreate Maker Programme 2025Students4 yearsA hands-on digital maker programme for RI students.",
        "url": "https://tinkercademy.com/programmes/ri-futurecreate-maker-programme-2025",
        "type": "internal"
      },
      {
        "label": "PublicProfessional Certificate in Mobile Application DevelopmentPublic2 days/moduleA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/professional-certificate-in-mobile-application-development",
        "type": "internal"
      },
      {
        "label": "StudentsDigital Making with micro:bitStudents24 hoursAn IMDA Infocom LEARN Roadmap course with micro:bit.",
        "url": "https://tinkercademy.com/programmes/imda-microbit-2025",
        "type": "internal"
      },
      {
        "label": "StudentsGame Development in MakeCode Arcade & MineCraftStudents24 hoursAn IMDA Infocom LEARN Roadmap course with MakeCode Arcade & MineCraft.",
        "url": "https://tinkercademy.com/programmes/imda-minecraft-2025",
        "type": "internal"
      },
      {
        "label": "PublicProfessional Certificate in Web Application DevelopmentPublic2 days/moduleA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/professional-certificate-in-web-application-development",
        "type": "internal"
      },
      {
        "label": "BusinessesCertificate in Technology Foundations: Harnessing the Power of Internet of Things and Creative Digital MakingBusinesses17 daysA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making",
        "type": "internal"
      },
      {
        "label": "BusinessesCertificate in Technology Foundations: Unleash the Potential of Blockchain TechnologyBusinesses17 daysA SkillsFuture-Supported Course Offered by SMU Academy",
        "url": "https://tinkercademy.com/programmes/certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology",
        "type": "internal"
      },
      {
        "label": "StudentsGame Development Bootcamp with UnityStudents32 hoursAn IMDA Infocom LEARN Roadmap bootcamp with Unity.",
        "url": "https://tinkercademy.com/programmes/imda-unity-2025",
        "type": "internal"
      },
      {
        "label": "StudentsUI/UX Design with FigmaStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Figma.",
        "url": "https://tinkercademy.com/programmes/imda-figma-2025",
        "type": "internal"
      },
      {
        "label": "StudentsAI-Driven Game Development on PhaserStudents24 hoursAn IMDA Infocom LEARN Roadmap course with Phaser.",
        "url": "https://tinkercademy.com/programmes/imda-phaser-2025",
        "type": "internal"
      },
      {
        "label": "StudentsSwift AcceleratorStudents8 monthsAn IMDA-Supported Course: Fully Subsidized for Successful Applicants",
        "url": "https://tinkercademy.com/programmes/swift-accelerator",
        "type": "internal"
      },
      {
        "label": "StudentsApp Development Basics with Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-b",
        "type": "internal"
      },
      {
        "label": "StudentsApp Development Explorations with Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-c",
        "type": "internal"
      },
      {
        "label": "StudentsApp Prototyping with Keynote and Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-a",
        "type": "internal"
      },
      {
        "label": "StudentsCODE_EXP 2025Students4 days11 May 2025",
        "url": "https://tinkercademy.com/programmes/code-exp-2025",
        "type": "internal"
      },
      {
        "label": "PublicDigital Maker: Create with 3D Printing and IOTAge GroupPublic2 days14 - 15 January 2025",
        "url": "https://tinkercademy.com/programmes/iotmaker",
        "type": "internal"
      },
      {
        "label": "BusinessesEnter the Metaverse: Get started with Unity for AR/VRAge GroupBusinesses2 days11 - 12 February 2025",
        "url": "https://tinkercademy.com/programmes/unityarvr",
        "type": "internal"
      },
      {
        "label": "TeachersNo-Code Machine LearningAge GroupTeachers2 daysAn introductory course on machine learning models using Orange.",
        "url": "https://tinkercademy.com/programmes/no-code-machine-learning",
        "type": "internal"
      },
      {
        "label": "PublicNo-code Web Design (Framer)Age GroupPublic2 daysAn introductory course on building websites using Framer.",
        "url": "https://tinkercademy.com/programmes/no-code-web-design-framer",
        "type": "internal"
      },
      {
        "label": "BusinessesMicrosoft Copilot Age GroupBusinesses2 daysAn introductory course on leveraging Microsoft Copilot to enhance productivity.",
        "url": "https://tinkercademy.com/programmes/microsoft-copilot",
        "type": "internal"
      },
      {
        "label": "BusinessesDigital Making with micro:bit & IoTAge GroupBusinesses2 daysAn introductory course on digital making with Micro:bit & IoT.",
        "url": "https://tinkercademy.com/programmes/digital-making-with-micro-bit-iot",
        "type": "internal"
      },
      {
        "label": "Back to Home",
        "url": "https://tinkercademy.com/",
        "type": "internal"
      },
      {
        "label": "Professional Courses",
        "url": "https://tinkercademy.com/courses-professionals",
        "type": "internal"
      },
      {
        "label": "School Courses",
        "url": "https://tinkercademy.com/courses-schools",
        "type": "internal"
      },
      {
        "label": "Individual Courses",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "image",
        "src": "/images/remote/2NpNJXdo2tuUILUJ69j5Vd5kXA.png",
        "width": 4985,
        "height": 2874
      }
    ]
  },
  {
    "path": "/individuals",
    "slug": "individuals",
    "title": "Self-directedLearning Opportunities",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/6gctHPSd4luM1PjI9WIcmXL25k.jpg",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/individuals",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "Professionals",
        "url": "https://tinkercademy.com/professionals",
        "type": "internal"
      },
      {
        "label": "Schools",
        "url": "https://tinkercademy.com/schools",
        "type": "internal"
      },
      {
        "label": "Courses for IndividualsCourses for Individuals",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Courses for Individuals",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "micro:bit",
        "url": "https://tinkercademy.com/microbit",
        "type": "internal"
      },
      {
        "label": "Tinker X",
        "url": "https://tinkercademy.com/tinker-x",
        "type": "internal"
      },
      {
        "label": "Back to Home",
        "url": "https://tinkercademy.com/",
        "type": "internal"
      },
      {
        "label": "All Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Professional Courses",
        "url": "https://tinkercademy.com/courses-professionals",
        "type": "internal"
      },
      {
        "label": "School Courses",
        "url": "https://tinkercademy.com/courses-schools",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "Self-directedLearning Opportunities"
      },
      {
        "type": "h1",
        "text": "Stay ahead of disruptive technologies and drive digital transformation with our expert-led technical training courses"
      },
      {
        "type": "p",
        "text": "Professionals"
      },
      {
        "type": "p",
        "text": "Schools"
      },
      {
        "type": "h2",
        "text": "Programme Types"
      },
      {
        "type": "h2",
        "text": "Courses for Individuals"
      },
      {
        "type": "h2",
        "text": "micro:bit"
      },
      {
        "type": "h2",
        "text": "Tinker X"
      },
      {
        "type": "h2",
        "text": "Let's Work Together!"
      },
      {
        "type": "p",
        "text": "Back to Home"
      },
      {
        "type": "p",
        "text": "All Courses"
      },
      {
        "type": "p",
        "text": "Professional Courses"
      },
      {
        "type": "p",
        "text": "School Courses"
      }
    ]
  },
  {
    "path": "/courses-schools",
    "slug": "courses-schools",
    "title": "code-for-fun-ai-workshop",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/2NpNJXdo2tuUILUJ69j5Vd5kXA.png",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/courses-schools",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "StudentsRI FutureCreate Maker Programme 2025Students4 yearsA hands-on digital maker programme for RI students.",
        "url": "https://tinkercademy.com/programmes/ri-futurecreate-maker-programme-2025",
        "type": "internal"
      },
      {
        "label": "StudentsDigital Making with micro:bitStudents24 hoursAn IMDA Infocom LEARN Roadmap course with micro:bit.",
        "url": "https://tinkercademy.com/programmes/imda-microbit-2025",
        "type": "internal"
      },
      {
        "label": "StudentsGame Development in MakeCode Arcade & MineCraftStudents24 hoursAn IMDA Infocom LEARN Roadmap course with MakeCode Arcade & MineCraft.",
        "url": "https://tinkercademy.com/programmes/imda-minecraft-2025",
        "type": "internal"
      },
      {
        "label": "StudentsGame Development Bootcamp with UnityStudents32 hoursAn IMDA Infocom LEARN Roadmap bootcamp with Unity.",
        "url": "https://tinkercademy.com/programmes/imda-unity-2025",
        "type": "internal"
      },
      {
        "label": "StudentsUI/UX Design with FigmaStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Figma.",
        "url": "https://tinkercademy.com/programmes/imda-figma-2025",
        "type": "internal"
      },
      {
        "label": "StudentsAI-Driven Game Development on PhaserStudents24 hoursAn IMDA Infocom LEARN Roadmap course with Phaser.",
        "url": "https://tinkercademy.com/programmes/imda-phaser-2025",
        "type": "internal"
      },
      {
        "label": "StudentsSwift AcceleratorStudents8 monthsAn IMDA-Supported Course: Fully Subsidized for Successful Applicants",
        "url": "https://tinkercademy.com/programmes/swift-accelerator",
        "type": "internal"
      },
      {
        "label": "StudentsApp Development Basics with Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-b",
        "type": "internal"
      },
      {
        "label": "StudentsApp Development Explorations with Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-c",
        "type": "internal"
      },
      {
        "label": "StudentsApp Prototyping with Keynote and Swift PlaygroundsStudents26 hoursAn IMDA Infocom LEARN Roadmap course with Apple Singapore.",
        "url": "https://tinkercademy.com/programmes/imda-apple-2025-a",
        "type": "internal"
      },
      {
        "label": "StudentsCODE_EXP 2025Students4 days11 May 2025",
        "url": "https://tinkercademy.com/programmes/code-exp-2025",
        "type": "internal"
      },
      {
        "label": "StudentsCode For Fun AI WorkshopStudents10 hoursA CODE@SG initiative by IMDA and MOE.",
        "url": "https://tinkercademy.com/programmes/code-for-fun-ai-workshop",
        "type": "internal"
      },
      {
        "label": "StudentsCode For Fun Baseline WorkshopStudents10 hoursA CODE@SG initiative by IMDA and MOE.",
        "url": "https://tinkercademy.com/programmes/code-for-fun-baseline-workshop",
        "type": "internal"
      },
      {
        "label": "TeachersNo-Code Machine LearningTeachers2 daysAn introductory course on machine learning models using Orange.",
        "url": "https://tinkercademy.com/programmes/no-code-machine-learning",
        "type": "internal"
      },
      {
        "label": "Back to Schools",
        "url": "https://tinkercademy.com/schools",
        "type": "internal"
      },
      {
        "label": "All Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Professional Courses",
        "url": "https://tinkercademy.com/courses-professionals",
        "type": "internal"
      },
      {
        "label": "Individual Courses",
        "url": "https://tinkercademy.com/individuals",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "image",
        "src": "/images/remote/2NpNJXdo2tuUILUJ69j5Vd5kXA.png",
        "width": 4985,
        "height": 2874
      }
    ]
  },
  {
    "path": "/contact-us",
    "slug": "contact-us",
    "title": "Get in touch",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/Y5ckhN7Nwo504xYtcd1f4y6Wy78.png",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/contact-us",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": "/images/remote/BPcWkLszbcWVMEaeXfRnQ9yMk.png"
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": "/images/remote/BPcWkLszbcWVMEaeXfRnQ9yMk.png"
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "Get in touch"
      },
      {
        "type": "h1",
        "text": "Getting here"
      },
      {
        "type": "h2",
        "text": "Address"
      },
      {
        "type": "p",
        "text": "59 Jalan Pemimpin #04-01, L&Y Building, Singapore 577218Weekdays: 10 am – 5.30 pmWeekends: 10 am – 1 pm"
      },
      {
        "type": "h2",
        "text": "Directions"
      },
      {
        "type": "p",
        "text": "Nearest MRT: Marymount By Bus: From Bishan MRT and Bus Stop 53239 (Bus 13, 50, 52, 54, 55, 55B, 58, 71, 88, 156).From Bus Stop 53131 (Bus 54, 74, 851, 852). Once you reach the L&Y Building, go around the building to find the entrance.Take the lift to the 4th floor and turn right. You made it!"
      },
      {
        "type": "h2",
        "text": "Parking"
      },
      {
        "type": "p",
        "text": "The car park is accessible from the front entrance, beside Jackie's yellow and blue building."
      },
      {
        "type": "p",
        "text": "Parking rates:Mon – Sat 8 am – 6 pm $1.20 per hour or part thereof 6 pm – 8 am $2.00 per entrySunday & Public Holidays $2.00 per entry"
      },
      {
        "type": "h3",
        "text": "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond."
      },
      {
        "type": "p",
        "text": "Our Courses"
      },
      {
        "type": "p",
        "text": "Our Projects"
      }
    ]
  },
  {
    "path": "/infocomm-club",
    "slug": "infocomm-club",
    "title": "Infocomm Club Courses",
    "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
    "hero_image": "/images/remote/HcdNlviMb6etFvqiKcJkxSLAtHQ.jpeg",
    "seo": {
      "title": "Tinkercademy: Coding and Making for Schools and Professionals",
      "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
      "canonical": "https://tinkercademy.com/infocomm-club",
      "openGraph": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "twitter": {
        "title": "Tinkercademy: Coding and Making for Schools and Professionals",
        "description": "We're Singapore-based expert coders and makers who teach coding and making to schools, companies, and professionals worldwide. ",
        "image": null
      },
      "robots": "max-image-preview:large"
    },
    "ctas": [
      {
        "label": "the training cost is fully funded by IMDA.",
        "url": "https://www.imda.gov.sg/how-we-can-help/infocomm-media-clubs/learn-roadmaps",
        "type": "external"
      },
      {
        "label": "hello@tinkercademy.com. 🙋🏻‍♀️",
        "url": "mailto: hello@tinkercademy.com",
        "type": "email"
      },
      {
        "label": "READ MORE",
        "url": "https://tinkercademy.com/programmes/imda-figma-2025",
        "type": "internal"
      },
      {
        "label": "Registration for MOE Primary SchoolsRegistration for MOE Pri Schools",
        "url": "https://form.gov.sg/6704f86a5c3070b1b3c9c1b2",
        "type": "external"
      },
      {
        "label": "Registration for MOE Secondary Schools / Junior CollegeRegistration for MOE Sec Schools / JC",
        "url": "https://form.gov.sg/6704f97536fa07f9b3e3a283",
        "type": "external"
      },
      {
        "label": "Our Courses",
        "url": "https://tinkercademy.com/courses-all",
        "type": "internal"
      },
      {
        "label": "Our Projects",
        "url": "https://tinkercademy.com/showcase",
        "type": "internal"
      },
      {
        "label": "Tinkertanker Pte Ltd",
        "url": "http://tinkertanker.com/",
        "type": "external"
      },
      {
        "label": "Sign Up",
        "url": "https://form.jotform.com/223001013827440",
        "type": "form"
      },
      {
        "label": "Get Hacking Store",
        "url": "https://gethacking.com/",
        "type": "external"
      },
      {
        "label": "Tinker Class Pte Ltd",
        "url": "https://tinkerclass.tech/",
        "type": "external"
      },
      {
        "label": "Tinkermind",
        "url": "https://tinkermind.sg/",
        "type": "external"
      },
      {
        "label": "hello@tk.sg",
        "url": "mailto:hello@tk.sg",
        "type": "email"
      },
      {
        "label": "6917 6920",
        "url": "tel:69176920",
        "type": "phone"
      },
      {
        "label": "69176920",
        "url": "tel:69176920",
        "type": "phone"
      }
    ],
    "content": [
      {
        "type": "h1",
        "text": "Infocomm Club Courses"
      },
      {
        "type": "h2",
        "text": "We’ve created training courses designed specifically for Infocomm Club students. These courses are held during CCA hours at MOE schools. They help build fundamental skills in topics across tech and media domains such as App Design, Development, UI/UX. Each MOE school receives support for up to two classes annually, where the training cost is fully funded by IMDA.To find out more, speak to us at hello@tinkercademy.com. 🙋🏻‍♀️"
      },
      {
        "type": "h2",
        "text": "Apple: App Development"
      },
      {
        "type": "h3",
        "text": "App Development - Prototype"
      },
      {
        "type": "p",
        "text": "Apply Apple’s design principles and create beautiful prototypes using Keynote."
      },
      {
        "type": "h3",
        "text": "App Development - Basic"
      },
      {
        "type": "p",
        "text": "Learn Swift & SwiftUI on iPad and build real apps, explore UI design, navigation, and more!"
      },
      {
        "type": "h3",
        "text": "App Development - Exploration"
      },
      {
        "type": "p",
        "text": "Dive deep into AR, ML, and cutting-edge tech to build next-gen apps!"
      },
      {
        "type": "h2",
        "text": "Figma: UI/UX Design"
      },
      {
        "type": "h3",
        "text": "UI/UX Design"
      },
      {
        "type": "p",
        "text": "Learn design thinking and UI/UX tools. Create interactive prototypes! No coding experience needed!"
      },
      {
        "type": "p",
        "text": "READ MORE"
      },
      {
        "type": "h2",
        "text": "Sign up today!"
      },
      {
        "type": "p",
        "text": "Registration for MOE Primary Schools"
      },
      {
        "type": "p",
        "text": "Registration for MOE Pri Schools"
      },
      {
        "type": "p",
        "text": "Registration for MOE Secondary Schools / Junior College"
      },
      {
        "type": "p",
        "text": "Registration for MOE Sec Schools / JC"
      },
      {
        "type": "h3",
        "text": "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond."
      },
      {
        "type": "p",
        "text": "Our Courses"
      },
      {
        "type": "p",
        "text": "Our Projects"
      }
    ]
  }
]
```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/pages/programmes/[slug].astro
```astro
---
import CtaBanner from '../../components/CtaBanner.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getSiteData } from '../../lib/data.js';

export function getStaticPaths() {
	return getSiteData().programmes.map((programme) => ({
		params: { slug: programme.slug },
		props: { programme },
	}));
}

const { programme } = Astro.props;
const canonical = new URL(`/programmes/${programme.slug}`, 'https://tinkercademy.com').toString();

/* ─── Content blocks ─────────────────────────────────────────────────
   Every programme has exactly 4 blocks:
     [0] image  (hero — used as background)
     [1] richtext  → "Course Overview"
     [2] richtext  → "Lesson Outcomes"
     [3] richtext  → "Details"
   ──────────────────────────────────────────────────────────────────── */
const content = programme.content ?? [];
const overviewHtml = content[1]?.html ?? '';
const outcomesHtml = content[2]?.html ?? '';
const detailsHtml = content[3]?.html ?? '';

/* ─── Meta info ──────────────────────────────────────────────────── */
const audienceLabels = programme.audiences?.map((a) => a.label) ?? [];
const topicLabels = programme.topics?.map((t) => t.label) ?? [];
const duration = programme.duration ?? '';

/* Section headings for the 3 richtext blocks */
const SECTION_HEADINGS = ['Course Overview', 'Lesson Outcomes', 'Details'];
const sections = [
	{ heading: SECTION_HEADINGS[0], html: overviewHtml },
	{ heading: SECTION_HEADINGS[1], html: outcomesHtml },
	{ heading: SECTION_HEADINGS[2], html: detailsHtml },
].filter((s) => s.html);
---

<BaseLayout
	title={programme.seo?.title ?? programme.title}
	description={programme.seo?.description ?? programme.description ?? ''}
	canonical={canonical}
	image={programme.hero_image ?? undefined}
>
	{/* ════════ Hero: full-bleed image with dark overlay + text ════════ */}
	<section class="prog-hero">
		{programme.hero_image && (
			<img
				class="prog-hero__bg"
				src={programme.hero_image}
				alt={programme.title}
				loading="eager"
			/>
		)}
		<div class="prog-hero__overlay" />
		<div class="prog-hero__text shell">
			<p class="prog-hero__eyebrow">Content</p>
			<h1 class="prog-hero__title">{programme.title}</h1>
		</div>
	</section>

	{/* ════════ Meta bar ═════════════════════════════════════════════ */}
	<section class="prog-meta">
		<div class="shell prog-meta__inner">
			{audienceLabels.length > 0 && (
				<div class="prog-meta__group">
					<h4 class="prog-meta__label">Audiences:</h4>
					<div class="prog-meta__tags">
						{audienceLabels.map((label) => (
							<span class="prog-meta__tag">{label}</span>
						))}
					</div>
				</div>
			)}
			{duration && (
				<div class="prog-meta__group">
					<h4 class="prog-meta__label">Duration:</h4>
					<span class="prog-meta__value">{duration}</span>
				</div>
			)}
			{topicLabels.length > 0 && (
				<div class="prog-meta__group">
					<h4 class="prog-meta__label">Type:</h4>
					<span class="prog-meta__value">{topicLabels[0]}</span>
				</div>
			)}
		</div>
	</section>

	{/* ════════ Content sections with headings ═══════════════════════ */}
	<article class="prog-body shell prose">
		{sections.map((section) => (
			<div class="prog-section">
				<h2 class="prog-section__heading">{section.heading}</h2>
				<div set:html={section.html} />
			</div>
		))}
	</article>

	<CtaBanner />
</BaseLayout>

<style>
	/* ─── Hero ──────────────────────────────────────────────── */
	.prog-hero {
		position: relative;
		width: 100%;
		min-height: 340px;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
	}

	.prog-hero__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	.prog-hero__overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		z-index: 1;
	}

	.prog-hero__text {
		position: relative;
		z-index: 2;
		padding-top: 80px;
		padding-bottom: 40px;
	}

	.prog-hero__eyebrow {
		font-family: 'Rubik', sans-serif;
		font-size: 14px;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 12px;
	}

	.prog-hero__title {
		font-family: 'Rubik', sans-serif;
		font-size: clamp(28px, 4vw, 50px);
		font-weight: 700;
		line-height: 1.15;
		color: #fff;
		margin: 0;
		max-width: 700px;
	}

	/* ─── Meta bar ─────────────────────────────────────────── */
	.prog-meta {
		padding: 24px 0;
		border-bottom: 1px solid #e3e3e3;
	}

	.prog-meta__inner {
		display: flex;
		flex-wrap: wrap;
		gap: 24px 40px;
		align-items: baseline;
	}

	.prog-meta__group {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.prog-meta__label {
		font-family: 'Rubik', sans-serif;
		font-size: 12px;
		font-weight: 400;
		color: #4a4a4a;
		margin: 0;
		white-space: nowrap;
	}

	.prog-meta__tags {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.prog-meta__tag,
	.prog-meta__value {
		font-family: 'Rubik', sans-serif;
		font-size: 12px;
		font-weight: 600;
		color: rgb(240, 93, 87);
	}

	/* ─── Content body ─────────────────────────────────────── */
	.prog-body {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}

	.prog-section {
		margin-bottom: 2rem;
	}

	.prog-section__heading {
		font-family: 'Rubik', sans-serif;
		font-size: 1.4rem;
		font-weight: 600;
		color: rgb(51, 51, 51);
		margin: 0 0 0.75rem;
	}

	.prog-section :global(p) {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.65;
		color: rgb(51, 51, 51);
		margin: 0 0 0.75rem;
	}

	.prog-section :global(ul) {
		padding-left: 1.25rem;
		margin: 0 0 0.75rem;
	}

	.prog-section :global(li) {
		font-family: 'Rubik', sans-serif;
		font-size: 15px;
		line-height: 1.65;
		color: rgb(51, 51, 51);
		margin-bottom: 0.35rem;
	}

	.prog-section :global(strong) {
		font-weight: 600;
	}

	/* ─── Responsive ───────────────────────────────────────── */
	@media (max-width: 809px) {
		.prog-hero {
			min-height: 240px;
		}

		.prog-hero__text {
			padding-top: 60px;
			padding-bottom: 28px;
		}

		.prog-meta__inner {
			flex-direction: column;
			gap: 12px;
		}
	}
</style>

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/crm/forms.yml
```yml
- id: https-form-jotform-com-223001013827440
  provider: jotform
  endpoint: https://form.jotform.com/223001013827440
  method: link

```

File: /Users/yingjie/Developer/tt-projects/tinkercademy.com/src/data/pages/social-links.json
```json
[
  {
    "id": "x",
    "platform": "x",
    "label": "x.com",
    "url": "https://x.com/tinkercademy"
  },
  {
    "id": "facebook",
    "platform": "facebook",
    "label": "facebook.com",
    "url": "https://www.facebook.com/tinkercademy/"
  },
  {
    "id": "instagram",
    "platform": "instagram",
    "label": "instagram.com",
    "url": "https://www.instagram.com/tinkercademy/"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/company/tinkertanker/"
  },
  {
    "id": "github",
    "platform": "github",
    "label": "github.com",
    "url": "https://github.com/tinkertanker"
  },
  {
    "id": "blog",
    "platform": "blog",
    "label": "blog.tinkercademy.com",
    "url": "https://blog.tinkercademy.com/"
  },
  {
    "id": "blog",
    "platform": "blog",
    "label": "Read more about our Digital Maker Programme initiatives at our blog",
    "url": "https://blog.tinkercademy.com/digital-maker-programme-998927090ddc"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/in/yjsoon/"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/in/mikejgonsalves/?originalSubdomain=sg"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/in/akmalabdulrahman/?originalSubdomain=sg"
  },
  {
    "id": "medium",
    "platform": "medium",
    "label": "medium.com",
    "url": "https://medium.com/@Anzomtx"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/in/keesweepengbenjamin/"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/in/tracey-the-tinkerer/?originalSubdomain=sg"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/in/stevencjchan/?originalSubdomain=sg"
  },
  {
    "id": "linkedin",
    "platform": "linkedin",
    "label": "linkedin.com",
    "url": "https://www.linkedin.com/in/graceyan808/"
  },
  {
    "id": "github",
    "platform": "github",
    "label": "Download and extract this project",
    "url": "https://github.com/MrPudin/ureMorse/archive/master.zip"
  },
  {
    "id": "github",
    "platform": "github",
    "label": "here",
    "url": "https://github.com/microbit-playground/microbit-servo-class/blob/master/servo.py"
  },
  {
    "id": "github",
    "platform": "github",
    "label": "This link",
    "url": "https://github.com/fizban99/microbit_ssd1306"
  },
  {
    "id": "github",
    "platform": "github",
    "label": "GitHub Edu pack",
    "url": "https://github.com/edu"
  }
]
```
</file_contents>
<meta prompt 1 = "[Architect]">
You are producing an implementation-ready technical plan. The implementer will work from your plan without asking clarifying questions, so every design decision must be resolved, every touched component must be identified, and every behavioral change must be specified precisely.

Your job:
1. Analyze the requested change against the provided code — identify the relevant architecture, constraints, data flow, and extension points.
2. Decide whether this is best solved by a targeted change or a broader refactor, and justify that decision.
3. Produce a plan detailed enough that an engineer can implement it file-by-file without making design decisions of their own.

Hard constraints:
- Do not write production code, patches, diffs, or copy-paste-ready implementations.
- Stay in analysis and architecture mode only.
- Use illustrative snippets, interface shapes, sample signatures, state/data shapes, or pseudocode when they communicate the design more precisely than prose. Keep them partial — enough to remove ambiguity, not enough to copy-paste.
- Scale your response to the complexity of the request. Small, localized changes need short plans; only expand sections for changes that genuinely require the detail.

─── ANALYSIS ───

Current-state analysis (always include):
- Map the existing responsibilities, type relationships, ownership, data flow, and mutation points relevant to the request.
- Identify existing code that should be reused or extended — never duplicate what already exists without justification.
- Note hard constraints: API contracts, protocol conformances, state ownership rules, thread/actor isolation, persistence schemas, UI update mechanisms.
- When multiple subsystems interact, trace the call chain end-to-end and identify each transformation boundary.

─── DESIGN ───

Design standards — address only the standards relevant to the change; skip sections that don't apply:

1. New and modified components/types: For each, specify:
   - The name, kind (for example: class, interface, enum, record, service, module, controller), and why that kind fits the codebase and language.
   - The fields/properties/state it owns, including data shape, mutability, and ownership/lifecycle semantics.
   - Key callable interfaces or signatures, including inputs, outputs, and whether execution is synchronous/asynchronous or can fail.
   - Contracts it implements, extends, composes with, or depends on.
   - For closed sets of variants (for example enums, tagged unions, discriminated unions): all cases/variants and any attached data.
   - Where the component lives (file path) and who creates/owns its instances.

2. State and data flow: For each state change the plan introduces or modifies:
   - What triggers the change (user action, callback, notification, timer, stream event).
   - The exact path the data travels: source → transformations → destination.
   - Thread/actor/queue context at each step.
   - How downstream consumers observe the change (published property, delegate, notification, binding, callback).
   - What happens if the change arrives out of order, is duplicated, or is dropped.

3. API and interface changes: For each modified public/internal interface:
   - The before and after signatures (or new signature if additive).
   - Every call site that must be updated, grouped by file.
   - Backward-compatibility strategy if the interface is used by external consumers or persisted data.

4. Persistence and serialization: When the plan touches stored data:
   - Schema changes with exact field names, types, and defaults.
   - Migration strategy: how existing data is read, transformed, and re-persisted.
   - What happens when new code reads old data and when old code reads new data (if rollback is possible).

5. Concurrency and lifecycle:
   - Specify the execution model and safety boundaries for each new/modified component: thread affinity, event-loop/runtime constraints, isolation boundaries, queue/worker discipline, or thread-safety expectations as applicable.
   - Identify potential races, leaked references/resources, or lifecycle mismatches introduced by the change.
   - When operations are asynchronous, specify cancellation/abort behavior and what state remains after interruption.

6. Error handling and edge cases:
   - For each operation that can fail, specify what failures are possible and how they propagate.
   - Describe degraded-mode behavior: what the user sees, what state is preserved, what recovery is available.
   - Identify boundary conditions: empty collections, missing/null/optional values, first-run states, interrupted operations.

7. Algorithmic and logic-heavy work (include whenever the change involves non-trivial control flow, state machines, data transformations, or performance-sensitive paths):
   - Describe the algorithm step-by-step: inputs, outputs, invariants, and data structures.
   - Cover edge cases, failure modes, and performance characteristics (time/space complexity if relevant).
   - Explain why this approach over the most plausible alternatives.

8. Avoid unnecessary complexity:
   - Do not add layers, abstractions, or indirection without a concrete benefit identified in the plan.
   - Do not create parallel code paths — unify where possible.
   - Reuse existing patterns unless those patterns are themselves the problem.

─── OUTPUT ───

Structure your response as:

1. **Summary** — One paragraph: what changes, why, and the high-level approach.

2. **Current-state analysis** — How the relevant code works today. Trace the data/control flow end-to-end. Identify what is reusable and what is blocking.

3. **Design** — The core of the plan. Apply every applicable standard from above. Organize by logical component or subsystem, not by standard number. Each component section should cover types, state flow, interfaces, persistence, concurrency, and error handling as relevant to that component.

4. **File-by-file impact** — For every file that changes, list:
   - What changes (added/modified/removed types, methods, properties).
   - Why (which design decision drives this change).
   - Dependencies on other changes in this plan (ordering constraints).

5. **Risks and migration** — Include only when the change introduces breaking changes, data migration, or rollback concerns. Omit for additive or non-breaking work.

6. **Implementation order** — A numbered sequence of steps. Each step should be independently compilable and testable where possible. Call out steps that must be atomic (landed together).

Response discipline:
- Be specific to the provided code — reference actual type names, file paths, method names, and property names.
- Make every assumption explicit.
- Flag unknowns that must be validated during implementation, with a suggested validation approach.
- When a design decision has a non-obvious rationale, explain it in one sentence.
- Do not pad with generic advice. Every sentence should convey information the implementer needs.

Please proceed with your analysis based on the following <user instructions>
</meta prompt 1>
<user_instructions>
Systematically audit this Astro rebuild of tinkercademy.com and produce a comprehensive, page-by-page action plan to reach 100% visual and content fidelity with the live production site (tinkercademy.com). The rebuild is currently estimated at ~80% content fidelity and ~60% styling/animation fidelity.

Your plan must cover, for every page:
1. **Missing content** — text, images, sections, or data not yet present
2. **Styling discrepancies** — colours, typography, spacing, borders, shadows, backgrounds that differ from the live site
3. **Missing animations/transitions** — scroll-triggered animations, hover effects, page transitions, marquees, carousels, accordions
4. **Layout differences** — grid/flex structure, section ordering, responsive breakpoints
5. **Interactive elements** — forms, dropdowns, modals, tabs, accordions, search not yet functional
6. **Responsive behaviour** — mobile/tablet layouts, hamburger menu, touch interactions

The live site (tinkercademy.com) is built on Framer. This Astro rebuild uses vanilla CSS (no Tailwind, no animation library). The crawl pipeline (scripts/) extracts structured data from the Framer site into JSON/YAML, and pages render from that data.

Key architectural context:
- No animation library is installed (package.json has zero animation deps) — all Framer motion effects need CSS/JS equivalents
- The crawl pipeline (crawl-site.mjs → build-crm-data.mjs → framer.mjs) determines content fidelity before rendering
- Homepage (index.astro) has the most complex animations: marquees, carousels, floating elements
- Static pages use a catch-all [slug].astro renderer
- Programme and tutorial detail pages have their own dynamic routes

Prioritise your plan by visual impact (what users notice first) and group into implementation phases.
</user_instructions>
