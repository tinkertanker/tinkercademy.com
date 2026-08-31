---
title: Viennale Annals I
subtitle: Journey to the Venice Biennale, representing Singapore in the best light possible.
description: Journey to the Venice Biennale, representing Singapore in the best light possible.
legacyPath: viennale-annals-i-fdcbe7a89015
canonicalUrl: https://blog.tinkercademy.com/viennale-annals-i-fdcbe7a89015
sourceMediumUrl: https://medium.com/tinkertanker/viennale-annals-i-fdcbe7a89015
author:
  id: 8a14237911ae
  name: Sarahh
  handle: sarahhyy
  profileUrl: https://medium.com/@sarahhyy
publishedAt: 2018-06-12T13:30:01.952Z
updatedAt: 2018-06-18T14:16:04.208Z
tags:
  - name: Arduino
    slug: arduino
  - name: Venice Biennale
    slug: venice-biennale
  - name: Singapore
    slug: singapore
  - name: Makers
    slug: makers
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/23e0eb87fea648ccb0d2f471aef5a35fb23bd20be4044b361793f38ca451b706.jpg
heroImageWidth: 4032
heroImageHeight: 3024
heroAlt: Rows of small cylindrical lights projecting multicoloured beams during workshop testing
heroAltDecision: meaningful
provenance:
  mediumId: fdcbe7a89015
  publicationId: ca1fc9543b6f
  sourceSha256: 7c64bbf582aac5b5a3ee4f06727b69f3a5e84cea5256c4edb6bcd9b4b63e216a
migration:
  paragraphCount: 25
  imageCount: 3
  embedCount: 0
  altReviewRequired: 0
---

<p><em>Journey to the Venice Biennale, representing Singapore in the best light possible.</em></p>

<p>In the final months of 2017, <a href="http://tinkertanker.com">Tinkertanker</a> was approached with a conceptual brainchild to create an interactive electronic exhibit at <a href="http://www.labiennale.org/en/architecture/2018/16th-international-architecture-exhibition">Biennale Architettura 2018 — La Biennale di Venezia</a>, or the 2018 Venice Biennale of Architecture.</p>

<p>This is the story of the months leading up to what we call <em>Viennale</em>.</p>

<h2>Early 2018: Singapore Hack and Design</h2>

<h3>A Cloud of Knots</h3>

<p>The concept we’re working with is a cloud of tetrahedral knots, twisted from acrylic rods. Lit from the top, the curators of the Singapore pavilion imagine flashing tropical thunderstorms, or sun filtering through gentle canopies. Each rod a channel for light; a pixel in a larger whole.</p>

<p>The handmade knots, pictured, are beautiful—graceful, even. But nothing we have on hand, no matter how high the wattage, seems able to pass enough light through the highly angled kinks in the rods.</p>

<!-- medium-image:1*5zaFvm2zUX1A_AWGu8fFKQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/b64b6b2086369d733e1d653a2b465bbebd236042e4bd4becf87c661c194ecd7c.jpg" alt="The first prototype of the knots in the pantry" width="4160" height="3120" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>The first prototype of the knots in the pantry</em></p>

<p>Months pass as we ideate, buy components, wait for shipments from China, prototype, wait for more shipments, prototype, and ideate some more. In the meantime, the concept morphs as often as a cloud, shifting shape from “fully encapsulating mist”, to “single strip down the middle of the pavilion”. And so then the number of lights required change too, widening and narrowing our options with every new render: <em>Can we manufacture our solution in-house?</em> <em>Should we send it off to China?</em></p>

<p>We send off preliminary sketches and electrical diagrams to the Italian electricians. They come back with concerns of <em>CE certification</em>.</p>

<h3>Not Burning Down The House</h3>

<p>There is something to be said for the safety requirements of the Europeans. One must applaud their dedication to safeguarding their citizens, unlike here in Asia, where we don’t seem to conform so rigorously to safety tests and quality marks. (Maybe that’s why our trains have been breaking down recently.)</p>

<p>Nevertheless, the CE mark requirements of the project teams in Venice throw a spanner in our plans to custom make a teeny 10W micro-chip controlled LEDs to stick atop the light-sticks. It’s a little too close to the setup date to figure out how to (officially) CE mark our items. (How tempting it must be for anyone to simply print the logo on everything!)</p>

<p>Instead, we source for CE marked, ready-made solutions. But for such a custom-built project as this, it’s nearly impossible… until the light sabres appear.</p>

<!-- medium-image:1*y4AbRTqvRBH1eW58W_4-KQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/23e0eb87fea648ccb0d2f471aef5a35fb23bd20be4044b361793f38ca451b706.jpg" alt="Rows of small cylindrical lights projecting multicoloured beams during workshop testing" width="4032" height="3024" loading="lazy" decoding="async" />

<h3>Light Sabres</h3>

<p>These devices are hefty in their metal handles and pre-programmed with practically no customisation, but most importantly, <em>they’re officially CE marked!</em> To extend how customisable they can be though, we send our young padawan Melvin into the depths of IC chip shorting and oscilloscope readings to figure out what exactly the remotes are made of and what we can do.</p>

<!-- medium-image:1*St2kYjOrN_z4N3hzoVCYug.jpeg alt-decision:meaningful -->

<img src="/blog-media/335953d0354c160b14496c30c37ac3b52937c2b116b6b764a80f79cba4ed4cc4.jpg" alt="Testing, pairing and labelling the light sabres" width="4032" height="3024" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Testing, pairing and labelling the light sabres</em></p>

<p>The lights though, would only pass through 2–3 layers of modules, and another solution was to send light up through the bottom of the structure as well. There lay the conception of the light sticks. (Although it did take us about a week to realise we needed to have specific and differing names for the sabres above and the sticks below.)</p>

<p>After a number of preliminary tests, we decide to use <a href="https://www.hackster.io/atmel/products/attiny85">ATtiny</a>s to control a soft glow and fade, replacing the Christmas light-like effects of on-off LEDs, which the architects were adamantly opposed to.</p>

<h3>Mass Manufacturing</h3>

<p>The next stage goes into trying to mass-manufacture the device in our dinky premises. Here, Sarah tries ridiculously hard (and sometimes fails) to get a number of new playthings working together, such as the rotary attachment for our laser cutter, the circuit printing <a href="http://voltera.io">Voltera</a> and flexible/expired ink, and <em>teeny tiny</em> programmable chips.</p>

<p>Thus goes the months before Tinkertanker ships 240 CE marked light sabres, 24 remotes and 2.4* employees to Venice.</p>

<p><em>* The 0.4 employee is remote support, we promise we don’t keep a secret fridge of body parts</em></p>
