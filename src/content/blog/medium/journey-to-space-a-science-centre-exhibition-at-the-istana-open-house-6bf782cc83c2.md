---
title: "Journey to Space: A Science Centre Exhibition at the Istana Open House"
subtitle: Using Littlebits, Micro:bits and cardboard for an interactive game
description: Using Littlebits, Micro:bits and cardboard for an interactive game
slug: journey-to-space-a-science-centre-exhibition-at-the-istana-open-house
legacyPath: journey-to-space-a-science-centre-exhibition-at-the-istana-open-house-6bf782cc83c2
canonicalUrl: https://tinkercademy.com/blog/2019/journey-to-space-a-science-centre-exhibition-at-the-istana-open-house/
sourceMediumUrl: https://medium.com/tinkertanker/journey-to-space-a-science-centre-exhibition-at-the-istana-open-house-6bf782cc83c2
author:
  id: a69be92c33e8
  name: Xin Zhe
  handle: xzraffles
  profileUrl: https://medium.com/@xzraffles
publishedAt: 2019-05-22T07:19:04.621Z
updatedAt: 2021-12-10T03:06:38.920Z
tags:
  - name: Makers
    slug: makers
  - name: Microbit
    slug: microbit
  - name: Littlebits
    slug: littlebits
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/5976da5ecd464ab0fc2537eba34f549e31ffb4f78273293e1378286207349f5a.jpg
heroImageWidth: 1599
heroImageHeight: 1200
heroAlt: Cardboard spaceship installation with an open doorway and child-height activity table
heroAltDecision: meaningful
provenance:
  mediumId: 6bf782cc83c2
  publicationId: ca1fc9543b6f
  sourceSha256: cb5e474021a0d27f3fbb15bd1535d2153059c2705bd1293b56c1258f0fe4e4f8
migration:
  paragraphCount: 31
  imageCount: 8
  embedCount: 0
  altReviewRequired: 0
---

<p><strong>About the event “Journey to Space!”</strong></p>

<!-- medium-image:0*YQijvcKElkCUwPVe alt-decision:meaningful -->

<img src="/blog-media/5976da5ecd464ab0fc2537eba34f549e31ffb4f78273293e1378286207349f5a.jpg" alt="Cardboard spaceship installation with an open doorway and child-height activity table" width="1599" height="1200" loading="lazy" decoding="async" />

<p>For the Istana’s Open House on Labour Day, we collaborated with cardboard sculptor artist <a href="http://www.butternmilk.com/">Bartholomew Ting </a>in order to create an interactive and fun game for participants. This was part of an exhibition done by the Science Centre, where various booths had different cool stuff for the public to explore. With our target audience of young kids without coding knowledge in mind, we proceeded to design a game that would be quick and intuitive for participants to easily understand.</p>

<p><strong>About this game</strong></p>

<!-- medium-image:0*alXaZadhi8g1rjPc alt-decision:decorative -->

<img src="/blog-media/d055c34270da6fdf4a6361b2d0c30465dc3050102e66d2df7fe9626ad87536a4.png" alt="" width="1024" height="1024" loading="lazy" decoding="async" />

<p>In the initial stages of planning the game, we had come up with two difficulty levels:</p>

<ul>
<li>A more difficult one that required participants to find the symbols corresponding to the letters of the password when given a Pigpen Cipher to Roman Letter legend card</li>
<li>and an easier level, where participants were given the symbols and simply had to match the symbols on their clue card to the symbols printed on the targets.</li>
</ul>

<p>(Even without the legend card to translate, a kid actually asked, “Is this Pigpen?” Nadya was impressed haha.)</p>

<!-- medium-image:0*qkSzmDHRd8NurVpF alt-decision:meaningful -->

<img src="/blog-media/74e74b6de8f7cfd87fb760a8f03cb32a274541bd09416ef77f1281d4e0901984.jpg" alt="Cardboard spaceship control room with panels and a “Launch Spaceship” sign" width="1278" height="958" loading="lazy" decoding="async" />

<p>However, after given feedback that we should make the game as straightforward as possible, we ended up only running the simpler level. Even then, some kids still had difficulty solving the entire puzzle to ‘launch’ the spaceship, making the game require much more hand-holding and guidance from the facilitator inside that we had expected. (Akmal did the morning shift and Xin Zhe did the afternoon shift — they were trapped inside the enclosed space with little kids for hours!)</p>

<p>Playing the easier level of the game, participants were required to find the corresponding targets on the wall according to the clue card. They could activate each target by putting their LED matrix inside the box containing each target. After all the correct targets had been activated, they successfully finished the mission and ‘launched’ the spaceship! Each correct or wrong choice reflected a respective sound, while the completion of the game lit up the acrylic ‘Launch Spaceship’ sign at the cockpit of the spaceship and played a melody.</p>

<!-- medium-image:0*qgdOX9xnAiA-2qAs alt-decision:meaningful -->

<img src="/blog-media/c8c9730ccfde422dce99a0725a6441c53f19981039ce762b6d5d02e4ffd01316.jpg" alt="Children activate wall-mounted targets inside the cardboard spaceship game." width="1600" height="902" loading="lazy" decoding="async" />

<p>These multisensory feedback involving light and sound seemed to engage and impress the kids very much! They came out of the spaceship with beaming faces, which was a slight surprise to us since we had thought the satisfaction of solving the puzzle would have been eroded, given the elimination of the challenge of cracking the code. (But it turns out, matching the symbols was enough of a challenge!)</p>

<p>Bart also made a cute cardboard suit for the kids for a nice photo opportunity after the game. We added an extra LED matrix to the suit to make it light up!</p>

<p><strong>How did we make this game?</strong></p>

<!-- medium-image:0*AFzNfzxf48pGXjD9 alt-decision:meaningful -->

<img src="/blog-media/04082752147198999200c6bac6ca525feb5c039da6d40140cbbc2f72840c364c.png" alt="MakeCode program that detects increased micro:bit light levels and broadcasts a radio signal." width="1600" height="1308" loading="lazy" decoding="async" />

<p>We utilized 11 microbits in the spaceship, making use of their radio communication function and built-in light sensors. When each target was reset, the light sensor would automatically store the value of the light level in the microbit. Once the LED matrix of the Avengers Hero Inventor Kit was aimed at the microbit, the sudden increase in the light level would trigger the microbit and a radio signal would be sent. When the final microbit received the correct signals from multiple targets, the LED on the acrylic sign of “Launch Spaceship!” connected to the microbit would light up!</p>

<!-- medium-image:0*R8-SbgisAtRpOp3k alt-decision:meaningful -->

<img src="/blog-media/747a7162e69ddeddc811f348f00dfba2485bbe9b3f23fbbc0daf7e6d8acf341f.jpg" alt="Two people assemble cardboard target boxes with taped flaps around the light sensors." width="1599" height="1200" loading="lazy" decoding="async" />

<p>For the boxes containing the targets, we used the laser cutter to cut out the net of the box from cardboard, before proceeding to fold them. The original box let in too much light, so we added a flap (hinged with tape) to cover the opening that exposed the microbit and its built-in light sensors to environmental light.</p>

<p>We used the <a href="https://makecode.microbit.org/">MakeCode Editor</a> to programme the microbits before loading the code onto the individual microbits which we pasted in the box, together with a battery case.</p>

<!-- medium-image:0*29D5xQkP02R0SJlm alt-decision:meaningful -->

<img src="/blog-media/78c1d75a2bd9c9b23029c042f25305597e83da28890497337e25399dda85cf37.jpg" alt="Net of the original box" width="902" height="1600" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Net of the original box</em></p>

<p>For the ‘Launch Spaceship’ acrylic sign, we also used the laser cutter to raster engrave the words, and vector cut the sign. (Search up the difference between raster and vector if you’re interested.) Issues with the laser cutter meant that the sign was not cut cleanly, meaning we had to sand down the sides by hand to salvage it. It turned out decent enough, since all we needed was for the sign to light up to attract the attention of the participants.</p>

<!-- medium-image:0*6fh6hiDHG7VGGFWU alt-decision:meaningful -->

<img src="/blog-media/673fd413309ace7b374f2a1c995d460a09ae39db44e1eb5d29e0bbb351b23050.jpg" alt="The laser charred the protective layer of paper on the piece of acrylic, but didn’t cut through fully." width="902" height="1600" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>The laser charred the protective layer of paper on the piece of acrylic, but didn’t cut through fully.</em></p>

<p>Afterwards, we mounted the piece of acrylic onto a cardboard stand (made mainly with multiple layers of cardboard but with the help of lots of glue from the hot glue gun).</p>

<p><strong>Event day, location, and challenges</strong></p>

<p>We were really glad to see that so many children actively participated in this game and successfully completed the mission in our game. The queue was snaking long throughout the day, and the crowd was actually more than we had ever imagined. (Nadya spoke to parents — both understanding ones and more frustrated ones — and found out that they had queued for up to an hour, just to view our spaceship and game!)</p>

<p>The day before, when we were setting up, we were actually met with a game that did not work due to the strong environmental light barely blocked by the white tentage. We had to reprogramme the sensors to suit the new conditions, as well as make changes to our box for holding the target — the initial prototype let in too much light, such that the additional light introduced by the Avengers Hero Inventor Kit LED matrix was not strong enough to trigger a response in the target.</p>

<p>Besides Singaporeans, tourist families on holiday with their young kids in tow were also at the Open House, braving the heat in the non-air-conditioned tentage. This experience of handling thronging crowds was an eye-opening one, and we learnt a lot about the importance of crowd management and control measures. In addition, we learnt to troubleshoot and adapt based on situation, something that is not as common in the controlled environment of the office.</p>

<p>Overall, the experience was an interesting one as we tried to bring together various components usually used separately, into one cohesive activity. Cardboard, LittleBits, microbits, acrylic — all coming together to play their individual roles to make a memorable game. We hope the participants had as much fun playing our Cardboard Spaceship game as we had making it!</p>
