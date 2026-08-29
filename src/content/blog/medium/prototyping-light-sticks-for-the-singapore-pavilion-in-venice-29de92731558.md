---
title: "Viennale Annals III: Prototyping Light Sticks"
subtitle: "Editor’s note: Read Part 1 and Part 2 first for some background on what we call “Viennale”: the Singapore Pavilion for the Venice Biennale…"
description: "Editor’s note: Read Part 1 and Part 2 first for some background on what we call “Viennale”: the Singapore Pavilion for the Venice Biennale…"
legacyPath: prototyping-light-sticks-for-the-singapore-pavilion-in-venice-29de92731558
canonicalUrl: https://blog.tinkercademy.com/prototyping-light-sticks-for-the-singapore-pavilion-in-venice-29de92731558
sourceMediumUrl: https://medium.com/tinkertanker/prototyping-light-sticks-for-the-singapore-pavilion-in-venice-29de92731558
author:
  id: e3592718b554
  name: Melvin Foo
  handle: foomelvin
  profileUrl: https://medium.com/@foomelvin
publishedAt: 2018-07-22T16:06:08.056Z
updatedAt: 2018-08-09T04:45:30.250Z
tags:
  - name: Hardware
    slug: hardware
  - name: Architecture
    slug: architecture
  - name: Venice
    slug: venice
  - name: Electronics
    slug: electronics
  - name: Makers
    slug: makers
license: All rights reserved
rightsStatus: review-required
heroImage: /blog-media/ad0a6430ac4ee24040dd48dd5aeea096f7000ee58141adf7a9d9c8271fd9e187.jpg
heroAlt: “Prototype” light stick with an external battery case. Not my finest work…
heroAltDecision: meaningful
provenance:
  mediumId: 29de92731558
  publicationId: ca1fc9543b6f
  sourceSha256: 7ee538c7a941e54f3b12f6d8792f0e1fcd85e67ed9fb5d6e3dbfd8e66bc03dda
migration:
  paragraphCount: 19
  imageCount: 3
  embedCount: 0
  altReviewRequired: 0
---

<em><strong>Editor’s note</strong></em><em>: Read </em><em><a href="https://blog.tinkercademy.com/viennale-annals-i-fdcbe7a89015">Part 1</a></em><em> and </em><em><a href="https://blog.tinkercademy.com/viennale-annals-ii-light-sticks-for-days-76e66944bcdb">Part 2</a></em><em> first for some background on what we call “Viennale”: the Singapore Pavilion for the Venice Biennale, </em><em><a href="http://nomorefreespace.com">No More Free Space</a></em><em>, a project we undertook in collaboration with the Singapore University of Technology &amp; Design.</em>

<em>Also editor’s note: Taking over on this story is Melvin, a brilliant young intern who’s starting out at the Nanyang Technological University in the fall of 2018. Read more on what he did for this project:</em>

In March 2018, I had the opportunity to join <a href="http://tinkertanker.com">Tinkertanker</a>, an edutech startup (or so I thought), as an intern. Expecting to attend classes or write tutorials, I was quickly tasked to do R&amp;D by testing various sensors for “Light Sticks” for the Singapore pavilion for an bi-annual architecture exhibition, the Venice Biennale.

This year’s exhibition required 2 types of lights, a computer controlled light panel that would display sequences, and small light sticks that that would respond to the exhibit goers presence. Tinkertanker was contracted to design, manufacture, and program these lights.

The candidate sensors ranged from simple PIRs (passive infrared receivers), to complex laser range-finders. Even though I’d done electronics as a hobby, this was the my first time really digging deep into the data sheets and testing components meticulously. I had to figure out the electrical characteristics—operating voltage, pinouts—and functional characteristics, e.g. time-out period, and determine which sensor to use.

<!-- medium-image:1*6BjZSDJHEHJjZSIqJ_a9yA.png alt-decision:meaningful -->

![Some of the sensors tested. Note to future self: Check polarity…unless you want to breathe in magic smoke and destroy half of the samples you were given to test.. ahem.](/blog-media/056c3c46010f1e67e00ff5d1b697cdae847180639cbfa03a71763f713be1c117.png)

<em>Some of the sensors tested. Note to future self: Check polarity…unless you want to breathe in magic smoke and destroy half of the samples you were given to test.. ahem.</em>

Surprisingly, the PIR from Aliexpress—the most affordable one!—won the sensor shootout due to the following reasons:

1. It was a standalone unit, so there was no need for an active element (such as infrared LEDs, lasers) at some other part of the structure or light stick;
2. Its size was perfect for the acrylic housing; and
3. It had the best time-out period, which was neither too slow or too fast.

## Making the Light Stick Prototype

I thought making the light sticks were going to be a piece of cake. Just some batteries, LEDs and sensors, right? Furthermore, the acrylic tube we decided to use was a perfect fit for the AAA batteries and PIR sensors. It seemed like I didn’t have to do much. We just needed 2 wires along the length of the light stick:

1. A wire to connect the –ve terminal of the batteries to the the ground pin of the sensor
2. A wire to connect the signal pin on the PIR to the –ve pin of the LED.

<!-- medium-image:1*L30kMamSax-lEiMPI_SQvw.jpeg alt-decision:meaningful -->

![Building a ship in a bottle is hard! Source.](/blog-media/f6dd282a56018707e8a74c3e3224b3310414fe9e01ddeb33347685e707059bbb.jpg)

<em>Building a ship in a bottle is hard! Source.</em>

However, I soon found out that making these light sticks was like building a ship in a bottle. Since it was such a tight fit, it was surprisingly difficult to keep the wiring flush with the acrylic tube. A little force would fray the wires or rip out the solder parts. After spending a whole day making a single slick prototype, I decided to make the frankenstein of a light stick pictured below.

<!-- medium-image:0*zetPGtD4g-8secSJ alt-decision:meaningful -->

![“Prototype” light stick with an external battery case. Not my finest work…](/blog-media/ad0a6430ac4ee24040dd48dd5aeea096f7000ee58141adf7a9d9c8271fd9e187.jpg)

<em>“Prototype” light stick with an external battery case. Not my finest work…</em>

Since it was much easier to manufacture, we could make multiple sticks to test if the lights “followed” the user, the critical function we needed to test anyway. After which, I switched to developing the light panels while the light sticks would be completed by Sarah and Steven (Spoiler alert: it turned out awesome in the end — read about it in the <a href="https://blog.tinkercademy.com/viennale-annals-iv-light-panel-electronics-a6b721038fe7">next post</a>!).
