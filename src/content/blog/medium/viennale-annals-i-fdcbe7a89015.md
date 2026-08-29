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
rightsStatus: review-required
heroImage: /blog-media/23e0eb87fea648ccb0d2f471aef5a35fb23bd20be4044b361793f38ca451b706.jpg
heroAlt: ""
heroAltDecision: review-required
provenance:
  mediumId: fdcbe7a89015
  publicationId: ca1fc9543b6f
  sourceSha256: 7c64bbf582aac5b5a3ee4f06727b69f3a5e84cea5256c4edb6bcd9b4b63e216a
migration:
  paragraphCount: 25
  imageCount: 3
  embedCount: 0
  altReviewRequired: 1
---

<em>Journey to the Venice Biennale, representing Singapore in the best light possible.</em>

In the final months of 2017, <a href="http://tinkertanker.com">Tinkertanker</a> was approached with a conceptual brainchild to create an interactive electronic exhibit at <a href="http://www.labiennale.org/en/architecture/2018/16th-international-architecture-exhibition">Biennale Architettura 2018 — La Biennale di Venezia</a>, or the 2018 Venice Biennale of Architecture.

This is the story of the months leading up to what we call <em>Viennale</em>.

## Early 2018: Singapore Hack and Design

### A Cloud of Knots

The concept we’re working with is a cloud of tetrahedral knots, twisted from acrylic rods. Lit from the top, the curators of the Singapore pavilion imagine flashing tropical thunderstorms, or sun filtering through gentle canopies. Each rod a channel for light; a pixel in a larger whole.

The handmade knots, pictured, are beautiful—graceful, even. But nothing we have on hand, no matter how high the wattage, seems able to pass enough light through the highly angled kinks in the rods.

<!-- medium-image:1*5zaFvm2zUX1A_AWGu8fFKQ.jpeg alt-decision:meaningful -->

![The first prototype of the knots in the pantry](/blog-media/b64b6b2086369d733e1d653a2b465bbebd236042e4bd4becf87c661c194ecd7c.jpg)

<em>The first prototype of the knots in the pantry</em>

Months pass as we ideate, buy components, wait for shipments from China, prototype, wait for more shipments, prototype, and ideate some more. In the meantime, the concept morphs as often as a cloud, shifting shape from “fully encapsulating mist”, to “single strip down the middle of the pavilion”. And so then the number of lights required change too, widening and narrowing our options with every new render: <em>Can we manufacture our solution in-house?</em> <em>Should we send it off to China?</em>

We send off preliminary sketches and electrical diagrams to the Italian electricians. They come back with concerns of <em>CE certification</em>.

### Not Burning Down The House

There is something to be said for the safety requirements of the Europeans. One must applaud their dedication to safeguarding their citizens, unlike here in Asia, where we don’t seem to conform so rigorously to safety tests and quality marks. (Maybe that’s why our trains have been breaking down recently.)

Nevertheless, the CE mark requirements of the project teams in Venice throw a spanner in our plans to custom make a teeny 10W micro-chip controlled LEDs to stick atop the light-sticks. It’s a little too close to the setup date to figure out how to (officially) CE mark our items. (How tempting it must be for anyone to simply print the logo on everything!)

Instead, we source for CE marked, ready-made solutions. But for such a custom-built project as this, it’s nearly impossible… until the light sabres appear.

<!-- medium-image:1*y4AbRTqvRBH1eW58W_4-KQ.jpeg alt-decision:review-required -->

![](/blog-media/23e0eb87fea648ccb0d2f471aef5a35fb23bd20be4044b361793f38ca451b706.jpg)

### Light Sabres

These devices are hefty in their metal handles and pre-programmed with practically no customisation, but most importantly, <em>they’re officially CE marked!</em> To extend how customisable they can be though, we send our young padawan Melvin into the depths of IC chip shorting and oscilloscope readings to figure out what exactly the remotes are made of and what we can do.

<!-- medium-image:1*St2kYjOrN_z4N3hzoVCYug.jpeg alt-decision:meaningful -->

![Testing, pairing and labelling the light sabres](/blog-media/335953d0354c160b14496c30c37ac3b52937c2b116b6b764a80f79cba4ed4cc4.jpg)

<em>Testing, pairing and labelling the light sabres</em>

The lights though, would only pass through 2–3 layers of modules, and another solution was to send light up through the bottom of the structure as well. There lay the conception of the light sticks. (Although it did take us about a week to realise we needed to have specific and differing names for the sabres above and the sticks below.)

After a number of preliminary tests, we decide to use <a href="https://www.hackster.io/atmel/products/attiny85">ATtiny</a>s to control a soft glow and fade, replacing the Christmas light-like effects of on-off LEDs, which the architects were adamantly opposed to.

### Mass Manufacturing

The next stage goes into trying to mass-manufacture the device in our dinky premises. Here, Sarah tries ridiculously hard (and sometimes fails) to get a number of new playthings working together, such as the rotary attachment for our laser cutter, the circuit printing <a href="http://voltera.io">Voltera</a> and flexible/expired ink, and <em>teeny tiny</em> programmable chips.

Thus goes the months before Tinkertanker ships 240 CE marked light sabres, 24 remotes and 2.4* employees to Venice.

<em>* The 0.4 employee is remote support, we promise we don’t keep a secret fridge of body parts</em>
