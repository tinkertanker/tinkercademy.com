---
title: "3D Printing: Thrills and Tribulations"
subtitle: Introduction
description: Introduction
legacyPath: 3d-printing-thrills-and-tribulations-6bd887f29ce4
canonicalUrl: https://blog.tinkercademy.com/3d-printing-thrills-and-tribulations-6bd887f29ce4
sourceMediumUrl: https://medium.com/tinkertanker/3d-printing-thrills-and-tribulations-6bd887f29ce4
author:
  id: 8066005c0c15
  name: Mireille Tan
  handle: mireille.tan
  profileUrl: https://medium.com/@mireille.tan
publishedAt: 2021-01-21T14:07:27.630Z
updatedAt: 2021-12-28T02:26:35.765Z
tags:
  - name: 3D Printing
    slug: 3d-printing
  - name: Internships
    slug: internships
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/da4439d61655cce78488ef02f142416b60745eef8d63d00a636e146e10942eb8.png
heroAlt: TKRobot in my go-to 3D software, Blender ❤️️
heroAltDecision: meaningful
provenance:
  mediumId: 6bd887f29ce4
  publicationId: ca1fc9543b6f
  sourceSha256: 510e6d6352def35895055de1761f670c26ed6bd572ce58c1a22308145a1b8437
migration:
  paragraphCount: 51
  imageCount: 11
  embedCount: 0
  altReviewRequired: 0
---

<em>Editor’s note: Here’s Mireille’s second blog post, this one detailing her 3D printing adventures! You can read </em><em><a href="https://blog.tinkercademy.com/returning-to-re-intern-at-tinkertanker-2de013324042">her first post here</a></em><em>.</em>

## Introduction

I absolutely <em>love</em> all things 3D. Augmented Reality, CGI animation, 3D printing… there is just something about the medium that captivates me. That said, it is no surprise that one of the biggest changes I noticed when returning to Tinkertanker for a second internship was the huge da Vinci 1.0 Pro 3D printer in the workshop.

<!-- medium-image:0*upxTYJKW3eUG1sK- alt-decision:meaningful -->

![I have since moved the 3D printer outside, but look at the size!](/blog-media/4ce80bd9cbba63d409bb43f555e79b3f6afa8a08b6ab88e1b6744f9be0400035.jpg)

<em>I have since moved the 3D printer outside, but look at the size!</em>

The da Vinci 1.0 Pro was released by XYZprinting, and coincidentally, the 3D printer I own at home (a small but colourful da Vinci miniMaker) was by that company as well. That is why when I heard that the office 3D printer had some problems, my passion and slight familiarity pushed me to attempt to fix it. Here are the results of my experiments!

## The First Impression

Some people may prefer to dive right in, but as a relatively “kiasu” (i.e. afraid to lose) person, I decided to start off by reading the <a href="https://www.xyzprinting.com/en/product/da-vinci-pro">product information on the official website</a>.

The first thing I noticed while scrolling through was the allowance for <strong>3rd Party Filament</strong>. To provide context, my miniMaker accepts only filament from XYZprinting. However, allowing 3rd Party Filament means that I could use the nice golden PLA filament already owned by the office!

<!-- medium-image:1*dByWm4wSPlASohvLEmSFKA.jpeg alt-decision:meaningful -->

![It is definitely not metallic, but I think it’s a nicer colour than the yellow XYZprinting filament that originally came with the 3D printer.](/blog-media/3bf8dbbf3e1dd0be2a26741a1a0753b7ee75402fbf76e9bd15cedc58e1e2d901.jpg)

<em>It is definitely not metallic, but I think it’s a nicer colour than the yellow XYZprinting filament that originally came with the 3D printer.</em>

The other cool feature I came across was <strong>Wireless Printing</strong>!

> Set the da Vinci 1.0 Pro up in your workshop and connect to it wirelessly to print from anywhere within your home/office network.

Like the official description says, Wireless Printing would allow for connection from anywhere within the office. This was great, main reason being the workshop was too small for the 3D printer (hence me moving it out). Connecting to the 3D printer via Wi-Fi meant that we could use the same computer for laser-cutting in the workshop to 3D print — think of it as a convenient central hub!

## #3DBenchy

### Background

For those not too familiar with 3D printing or the 3D printing community, the <a href="http://www.3dbenchy.com/">3DBenchy</a> is a standard “torture test” for 3D printers.

<!-- medium-image:0*LbheWyUpnrzKd95M.JPG alt-decision:meaningful -->

![Picture taken from Thingiverse](/blog-media/3764f6e87457b8c20594ab009c61b966f5b6b181f694583724b9eb93e67b6512.jpg)

<em>Picture taken from Thingiverse</em>

As you can see, there are “holes” (e.g. windows, cabin, hull, etc.) that require supports, making it ideal to put any 3D printer to the test (you did not think that a torture test was meant for killing the printer, did you?)!

The 3DBenchy is small, adorable and fun to say! Needless to say, I felt this was an apt print to try out the 3D printer for the first time.

### Set-Up Tribulations

Setting up the da Vinci 1.0 Pro definitely took longer than I had first anticipated. Ideally, the steps to set up (from my prior experience) would have been as follows:

1. Prepare print bed.
2. Load filament.
3. Calibrate.
4. Print.

Steps 1 and 2 were simple enough, but at Step 3, I was warned that there would be problems. Basically, after calibration the screen will show a “CALIBRATE FAIL”. My natural course of action was to search the Internet, but 2h of trying suggested solutions did me no good.

Finally, on a whim I decided to try switching the filament to the golden one instead of the yellow XYZprinting PLA. The golden filament was truly a miracle; for some reason, immediately after loading it in, I managed to get “UNLEVEL BED”, and proceeded to spend the next… ~20 minutes adjusting it to reach the perfect level.

A quick review of the whole calibration process: Personally, I find the miniMaker method a lot more reliable. It may just be because the 1.0 Pro is not in mint condition, but it took way too many tries to get perfect level.

<!-- medium-image:1*9ao8M3j7qztoR3ChOmEhMQ.jpeg alt-decision:meaningful -->

![The da Vinci 1.0 Pro print bed covered with masking tape (as a cheap alternative for the adhesion sticker)](/blog-media/8c9819c1975650bb765bf2f23405b4a4260abdc0e829d8c9cbbc37da1a3d2baa.jpg)

<em>The da Vinci 1.0 Pro print bed covered with masking tape (as a cheap alternative for the adhesion sticker)</em>

The calibration system works as follows: a sensor near the nozzle detects the position of the four corners; if it is not level, you would have to turn the white knobs underneath the print bed to adjust its tilt. This system felt long (each calibration took more than a minute) and arduous compared to that of the miniMaker. For the latter, the print bed was always flat since during printing, the z-movement came from the nozzle instead of the bed. Calibration was for the nozzle and took a mere ~30s.

With the calibration settled, another problem arose: The filament would not be extruded! Luckily, unloading and reloading the filament resolved that… or did it (foreshadowing)?

<!-- medium-image:1*MSnBkr5hcl-_lQYlyUhyGw.gif alt-decision:meaningful -->

![Finally, it could start printing!](/blog-media/ce279984a5562a0ce8af780483aa10c9217e66ec5eaac6b41dfc9f35f28fdee4.gif)

<em>Finally, it could start printing!</em>

### The Thrilling Result

For all the effort put in, the results certainly delivered!

<!-- medium-image:0*Y2wVyXYDGHMKPItA alt-decision:meaningful -->

![Front-side view of the 3Dbenchy](/blog-media/1676c5548709fbf30069e4389131e2ebabbd5cf219418bed6c52e78dc32a0f81.jpg)

<em>Front-side view of the 3Dbenchy</em>

<!-- medium-image:0*L8BRcZxPQKIdGbif alt-decision:meaningful -->

![Back view of the 3DBenchy (look at the tiny wheel!)](/blog-media/235764e3910f55470075b65d628a4262ed405116a28e2b65e4be3cb04686eed6.jpg)

<em>Back view of the 3DBenchy (look at the tiny wheel!)</em>

Considering how it is a second-hand 3D printer, the results looked really smooth and the supports could be removed fairly easily. Not to mention, the detail on the wheel and the roof came out seamlessly. With this, I was satisfied with the default settings, though perhaps decreasing the layer height would have allowed for more detail and less obvious layers.

## Our Beloved TKRobot

After passing the torture test, the 3D printer had to rest as we prepared for Tinkerfest. After hibernating for a month back in the workshop, I wanted to try printing something I 3D modelled on my own — and what a better “first” print than TKRobot, the Tinkertanker mascot!

<!-- medium-image:1*J9ZDz6JFfIiovVowv7ul5A.png alt-decision:meaningful -->

![TKRobot in my go-to 3D software, Blender ❤️️](/blog-media/da4439d61655cce78488ef02f142416b60745eef8d63d00a636e146e10942eb8.png)

<em>TKRobot in my go-to 3D software, Blender ❤️️</em>

### More Tribulations

Sadly, a month in hibernation and a trip to-and-fro from the workshop did not bode well for the 3D printer. It took at least 15 tries and more than an hour of waiting to get calibration to a perfect level, but on the bright side, the 3D printer seems to have found a permanent home and calibration should go smoothly from now on.

Remember the foreshadowing from a few paragraphs ago? As it turns out, the same problem of the filament not being extruded happened again. Worse still, reloading the filament did not help this time, neither did cleaning the nozzle nor increasing nozzle temperature. After hours of attempted troubleshooting, I finally snipped off the cable tie holding the filament tube and pulled it out of the nozzle. Then, after spending an hour armed with tweezers and a solder sucker trying to clear all the stubborn jammed filament, the da Vinci 1.0 Pro was in operation once more!

<!-- medium-image:1*FICCbYcT402NrwnTS3l8zg.gif alt-decision:meaningful -->

![Go 3D Printer go!](/blog-media/6c8280282b3ef6aa64e4f1ba6ce3d031a02b686e3f8e0120c82cf333d1279858.gif)

<em>Go 3D Printer go!</em>

### More Thrilling Results!

<!-- medium-image:1*4Nqh2rj1gSHuME2SGTEo7w.jpeg alt-decision:meaningful -->

![TKRobot sends love ❤️️](/blog-media/b40b524de6b9d2834593371d1d77bd2d1d20092a0285e3bda874b7ad41b167fe.jpg)

<em>TKRobot sends love ❤️️</em>

The TKRobot came out great! Admittedly, the details could have come out better, though I would blame that on my 3D model. Perhaps in the future, I could make TKRobot’s limbs thicker so that they would be less fragile, and I could reconsider the orientation of the print. If necessary, I could also try tweaking with the print settings to that there are more supports and the print quality is better. However, for now, I am happy with how it turned out!

## What Next?

After the two prints, I went on to write a 3D printing guide for the company as well as finish setting up the Wireless Printing, passing on my knowledge of using the da Vinci 1.0 Pro (but hopefully not the hours spent troubleshooting and repairing it) right as my internship ended.

Given more time, I can see myself having fun working on a project that combines fabrication using the 3D printer with electronics such as the micro:bit. Maybe some day, I will return to the office and do just that. Until then, it brings me joy just knowing that the two precious prints are on the company KALLAX shelves on display, and that the 3D printer is ready for anyone to use for their tinkering endeavours.

<!-- medium-image:0*9qv0zrxP5aFbFkFR alt-decision:meaningful -->

![Two gold 3D-printed models, a cartoon mouse and a small tugboat, displayed on a wooden shelf.](/blog-media/7fed291d23df87b4a1ceea8554d747fcad530eb56b364c3b82af4731375cf838.jpg)
