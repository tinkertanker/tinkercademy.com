---
title: "Viennale Annals II: Light Sticks for Days"
subtitle: Part 2 of our journey to the Venice Biennale. Read Part 1 first to avoid spoilers.
description: Part 2 of our journey to the Venice Biennale. Read Part 1 first to avoid spoilers.
slug: viennale-annals-ii-light-sticks-for-days
legacyPath: viennale-annals-ii-light-sticks-for-days-76e66944bcdb
canonicalUrl: https://tinkercademy.com/blog/2018/viennale-annals-ii-light-sticks-for-days/
sourceMediumUrl: https://medium.com/tinkertanker/viennale-annals-ii-light-sticks-for-days-76e66944bcdb
author:
  id: 8a14237911ae
  name: Sarahh
  handle: sarahhyy
  profileUrl: https://medium.com/@sarahhyy
publishedAt: 2018-06-28T06:02:59.459Z
updatedAt: 2018-07-02T19:18:20.405Z
tags:
  - name: Hardware
    slug: hardware
  - name: Electronics
    slug: electronics
  - name: Installation Art
    slug: installation-art
  - name: Microcontrollers
    slug: microcontrollers
  - name: Soldering
    slug: soldering
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/848f9d4714709a6bf2e2b4a4822f00d4193cac03452c7f1d323a3f9b3c450db3.png
heroImageWidth: 1233
heroImageHeight: 925
heroAlt: Assembly line mess
heroAltDecision: meaningful
provenance:
  mediumId: 76e66944bcdb
  publicationId: ca1fc9543b6f
  sourceSha256: dc3c1469a7e56d66ac0b4116ae34e2650e44b92506d9c05a80731bdcc831a08b
migration:
  paragraphCount: 37
  imageCount: 7
  embedCount: 0
  altReviewRequired: 0
---

<p><em>Part 2 of our journey to the Venice Biennale. Read </em><em><a href="https://tinkercademy.com/blog/2018/viennale-annals-i/">Part 1</a></em><em> first to avoid spoilers.</em></p>

<h3>Packing tubes</h3>

<p>Taking:</p>

<ul>
<li>Blinding LEDs,</li>
<li>Motion detectors,</li>
<li>Micro-controllers, <em>and</em></li>
<li>Enough batteries to power the whole shebang</li>
</ul>

<p>… and stuffing them into tubes as short and thin as possible shouldn’t be <em>that</em> hard—people who make cheap lanterns and glow-sticks do that all the time! I forget that they have the luxury of scale and perhaps a thousand man-hours of prototyping, coupled with possibly human-rights violating cheap labour.</p>

<!-- medium-image:1*9od3-HH7pLz9Mj-TDTtDRg.jpeg alt-decision:meaningful -->

<img src="/blog-media/bd54a12578710b7c63b0a99aa079302673ea631270c8513c930994197c06345f.jpg" alt="All of this into that thin tube" width="4032" height="3024" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>All of <em>this</em> into that thin tube</em></p>

<p>Thankfully, by the final iteration of the knotted cloud, we have only 80 of these motion-sensing, interactive glowing tubes to complete. This somehow lends an air of calm around prototyping and finding a possible method to manufacture them in the office.</p>

<h3><strong><em>Flexing and breaking</em></strong></h3>

<p>There are a number of options to making printed circuit boards (PCBs) — through-hole, surface-mount devices (SMDs), flexible, fibreboard. To fit a PCB inside a teeny tube with a inner diameter smaller than my thumb, the board has to be (a) tiny, or (b) squishy and compressible. The only hard fibreboard we have on hand for the circuit-printing <a href="https://www.voltera.io/">Voltera</a> is their regular FR6 substrates, that are so thick and large I despair at the thought of cutting them up. We do, however, store flexible ink in our fridge, because… that’s what all tech companies do?</p>

<p>The choice is clear: we’ll print 120 flexible circuits, and solder parts to the 80 working ones. They’ll fold and squish easily into the tubes since they’re flexible. And because it’s done by a machine, the process will be relatively automated and easy… <em>right?</em></p>

<!-- medium-image:1*MGhWjHcLB7IVG5d6wzBGxA.jpeg alt-decision:meaningful -->

<img src="/blog-media/5bb7ca36a67ac44aeee4a728a1549752e99fdbdda9b4cb432031ce1258aab388.jpg" alt="Automated enough to mass-produce these circuit prints" width="4160" height="3120" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Automated enough to mass-produce these circuit prints</em></p>

<!-- medium-image:1*4AS1YqvsyC254EMVVlI02g.png alt-decision:meaningful -->

<img src="/blog-media/3a42e8f62b5597944d2a638a849821e610b47fea9a985081baaff81512a8f6a0.png" alt="Flexible circuit and wires fitted inside a transparent tube for testing" width="1600" height="1200" loading="lazy" decoding="async" />

<p>As it turns out, printing the circuits is the easy part. However:</p>

<ul>
<li>Making sure the solder creates a solid connection from electronic part to the circuit without breaking is one thing.</li>
<li>Soldering without melting away the fragile circuit is another thing.</li>
<li>Soldering SMDs in itself… is a huge thing.</li>
</ul>

<p>Imagine trying to pin down an ant to a board by each of its legs with only two blunt chopsticks. Only, any pain-inflicting cruelty in hand-soldering SMDs is purely masochistic. I might have broken some manpower laws if I got interns to hand-solder SMDs for all 80 of the light sticks.</p>

<p>And <em>yet</em>, after all that testing, it’s entirely unreliable… we get one or two good sticks from it. The Voltera is, after all, a prototyping machine, and should really be treated as such.</p>

<p>In early May, after I’ve left for Venice, Steven decides to <a href="https://en.wikipedia.org/wiki/Point-to-point_construction#%22Dead_bug%22_construction">dead bug</a> everything instead, and proceeds to solder micro-controllers straight to sensors straight to wires and battery springs. This, and roping in all the manpower available to set up a chaotic assembly line, helps get everything finished in time to be hand-carried over.</p>

<!-- medium-image:1*Sb2aL96eCJ_TtXpUlGskAQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/68ea330ea6f2eb2fef0dfb4352506a880584e7813dca75c53289a175ec55d288.jpg" alt="Dead bugs, live circuits" width="4032" height="3024" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Dead bugs, live circuits</em></p>

<!-- medium-image:1*_cZk8PFhrxTFPgLlFVeFaQ.png alt-decision:meaningful -->

<img src="/blog-media/848f9d4714709a6bf2e2b4a4822f00d4193cac03452c7f1d323a3f9b3c450db3.png" alt="Assembly line mess" width="1233" height="925" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Assembly line mess</em></p>

<h3><strong><em>Finding housing</em></strong></h3>

<p>To house our motion detectors, we find these almost perfect acrylic tubes at <a href="http://dama.com.sg/">Dama Trading</a>:</p>

<!-- medium-image:1*0MARDnJEcLGywPgBaTSD9g.png alt-decision:meaningful -->

<img src="/blog-media/a619cbd42dc86177f4cc86a9ef0eb9f85ac6576a1a68c4ea918398865fc3c5c7.png" alt="Cardboard box filled with clear acrylic tubes and white end pieces" width="1600" height="1200" loading="lazy" decoding="async" />

<p>They’re only a millimetre or so off the diameters of the knots, they hold our motion detectors ever so snugly, and the batteries were <em>made to fit </em>the long clear plastic pipes. A match made in heaven!</p>

<p>However, we soon realise that the tubes can only be precisely cut through with a laser cutter… and our hobby machine is no match for such an acutely curved surface. Without the laser cutter, I can only imagine chopping them crudely in half. I consider the prospects of half-acrylic tube, half-cloth chimeras, held together by copious amounts of glue.</p>

<p>Thankfully, the rotary attachment Steven ordered (to laser-engrave rolling pins and beer bottles) arrives fortuitously on time—just a couple weeks before I fly! It’s put straight to work, slicing apart acrylic tubes that will be hand-carried to Venice.</p>

<h3>Battery change challenges</h3>

<p>Another of the design challenges is to ensure that it would be an easy task to change the batteries on these sticks. If the 4 LEDs end up using as much power as our tests show, the batteries would die in, say, two days of heavy foot traffic at the exhibit. And if every power change was a perilous task, we might be hearing of docents who pulled down the entire structure in valiant attempts to swap batteries out to charge. (At this point, the architects might be happy with things just lasting through opening night, and dying forever afterwards.)</p>

<p>Enter the outer sheath — a ceramic cylinder custom made to cover this ugly beast to provide some respite to the eyes (and nose). Made with Singapore soil, and sprayed with Vanda Miss Joaqium fragrance—you can’t get more patriotic than that!—it helps by letting the electronic core of the light-stick be unsightly as anything, while letting batteries become accessible from anywhere along the tube, instead of from the openings. Cue midriff cut-outs and wires galore.</p>

<!-- medium-image:1*vKlR4cB0y8BcbBRylKnlww.jpeg alt-decision:meaningful -->

<img src="/blog-media/ffca62726d6398074455622075748639e55d84ed8cdcee8e51a506e9f29b654e.jpg" alt="Out in the wild — Inez gingerly tries unsheathing a light stick" width="4160" height="3120" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Out in the wild — Inez gingerly tries unsheathing a light stick</em></p>

<h3><strong><em>Gain some, lose some, learn from all</em></strong></h3>

<p>Perhaps it is not so wise to be so confident about using new technologies on a tight deadline. Yet without a pressing project, would we have the impetus to test out these new playthings? What <em>would</em> we do with engraved rolling pins? At least now we know the intricacies of printing flexible circuits on kapton tape, and how fun it can be.</p>
