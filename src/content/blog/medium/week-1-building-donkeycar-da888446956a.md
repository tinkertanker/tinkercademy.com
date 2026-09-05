---
title: "Building DonkeyCar: Week 1"
description: "Building DonkeyCar: Week 1"
slug: building-donkeycar-week-1
legacyPath: week-1-building-donkeycar-da888446956a
canonicalUrl: https://tinkercademy.com/blog/2018/building-donkeycar-week-1/
sourceMediumUrl: https://medium.com/tinkertanker/week-1-building-donkeycar-da888446956a
author:
  id: 74b29ffc4654
  name: Kwol
  handle: kwol
  profileUrl: https://medium.com/@kwol
publishedAt: 2018-06-29T08:58:54.333Z
updatedAt: 2023-09-28T01:27:11.650Z
tags:
  - name: Raspberry Pi
    slug: raspberry-pi
  - name: Donkeycar
    slug: donkeycar
  - name: Self Driving Cars
    slug: self-driving-cars
  - name: Remote Control
    slug: remote-control
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/73b885a0a22bce70a9aecc17a6b874513add232e4bf6996138716b950f892716.jpg
heroImageWidth: 4032
heroImageHeight: 3024
heroAlt: Completed DonkeyCar with exposed electronics and a power bank zip-tied on top
heroAltDecision: meaningful
provenance:
  mediumId: da888446956a
  publicationId: ca1fc9543b6f
  sourceSha256: acbb027f196f7d2a27c6000aeb77187649abb17de8cc30836242362c0ab6f95f
migration:
  paragraphCount: 40
  imageCount: 6
  embedCount: 0
  altReviewRequired: 0
---

<p><em>Editor’s note: Kevin Steven is a Computer Science undergraduate at the Nanyang Technological University (</em><em><a href="http://www.ntu.edu.sg">NTU</a></em><em>) who interned with us over the summer of 2018. We asked him to make a DonkeyCar, and catalogue his experience. In this post, he writes about his progress, challenges, and solutions.</em></p>

<p><a href="http://www.donkeycar.com">DonkeyCar</a> is a self-driving RC car that works on machine learning algorithms. It’s an open-source project, so any passionate enthusiasts can contribute. There’s a <a href="http://www.donkeycar.com/community.html">Slack channel</a> where all the enthusiasts gather and discuss just about every inch of DonkeyCar.</p>

<p>When I was tasked to build a DonkeyCar, I was glad because it’s an intriguing project that fits my interests, but anxious because the tasks ahead seemed daunting, as I was not proficient in building RC cars, nor familiar with hardware or electrical components.</p>

<p>I quickly encountered my first hurdle: getting the compatible RC cars and the components. Most of the DonkeyCar community is located in the US, where they often hold gatherings or meet-ups… but not so much here in Singapore. As such, I had to do quite a bit of research to ensure that I didn’t purchase an incompatible model. I could not get hold of any reliable information on getting the stock models mentioned in the website. Then I started to scout RC car shops in Singapore—I went to 4 to 5 different shops, but none of them sold compatible versions. I faced two main problems: it was difficult to obtain brushed motor RC cars, and I was unable to examine the electronics of any car models I came across.</p>

<p>The <a href="http://docs.donkeycar.com/roll_your_own/">website</a> provided some important specifications:</p>

<ul>
<li>ESC (electronic servo controller) and RX(receiver) should be two separate components. Some RC cars have integrated both into one component, which could cause issues when connecting the Raspberry Pi later on.</li>
<li>The car must be able to carry additional weight.</li>
<li>The car must be smooth to control at slow speed.</li>
</ul>

<p>I went to ask for advice on the <a href="http://www.donkeycar.com/community.html">DonkeyCar Slack group</a>, and was advised to try ordering online from <a href="https://www.robocarstore.com/products/donkey-car-starter-kit">Robocar Store</a> from Hong Kong, which is maintained by DonkeyCar community enthusiasts! They are the only one in Asia, so I had to try. They sell only the RC car (HSP 94186 Brushed RC Car), or you can choose to get the car + full kit to build your own DonkeyCar. If you know your hardware enough, you can order the car only and scour the rest of the parts on local stores and you also require a 3D printer. I did not want the additional hassle, so I ordered the full kit. The delivery was quick, and I got my delivery exactly one week after placing the order.</p>

<!-- medium-image:1*DDODqRwA-3UHz9bE9Kun4Q.jpeg alt-decision:meaningful -->

<img src="/blog-media/c57b6e49bf084e0bddabb7501f9175cff00884fbc5ed8b2e011c91cee657a3b7.jpg" alt="Items received from the full kit" width="3024" height="4032" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Items received from the full kit</em></p>

<p><strong>Components</strong></p>

<ol>
<li>Raspberry Pi 3 model B 2015 — a bit outdated but it’s not much of a difference from B+ newer models (sufficient for DonkeyCar)</li>
<li>NiMH Battery Charger</li>
<li>HSP 94186 Brushed RC Car</li>
<li>DC-DC 5V/2A Voltage Converter — to power RaspberryPi from NiMH (RC car) batteries, so we don’t need a USB power bank</li>
<li>Servo Driver PCA9685 — connects the RaspberryPi to ESC and servo for throttle and steering</li>
<li>3D printed chassis — mount the components</li>
<li>Misc components — 16gb Micro SD, SD card adaptor, F-F jumper wire, Wide Angle Camera and power cable splitter</li>
<li>NiMH battery — 7.2 V 1100mAH</li>
<li>Screws — M3x12, M2.3x6, M2x6</li>
</ol>

<h2>Assembly</h2>

<p>The first thing I did was to screw the 3D printed parts together (they come as two parts).</p>

<p>Next, I attached the Raspberry Pi to the chassis. Remember to prepare your micro SD card (it came with flashed DonkeyCar image, but you may need to prep for SSH and the like) and mount it before the next step, as it will be tricky to put in the micro SD card after the mounting the servo driver.</p>

<!-- medium-image:1*YjPC8cm7Y11vkfzDEN5EGA.jpeg alt-decision:meaningful -->

<img src="/blog-media/7d8ab6ec0607aa7ee27041ffb5aa1ce8a59fc931ce2188bf8a90478ac536ed2a.jpg" alt="Raspberry Pi mounted on the white DonkeyCar chassis" width="4032" height="3024" loading="lazy" decoding="async" />

<p>Next, I mounted the servo driver next to the Raspberry Pi. Ensure that the jumper wires are connected correctly (see the <a href="http://docs.donkeycar.com/guide/build_hardware/#step-4-connect-servo-shield-to-raspberry-pi">docs</a> for in-depth assembly instructions).</p>

<!-- medium-image:1*fjcWwrarkoyUCrznBJvDOQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/ec6ae05fc00d722ca5a0686d136f003dcc6e6ae77c7d5e90e451b256f9615258.jpg" alt="Servo driver beside the Raspberry Pi, connected with jumper wires" width="4032" height="3024" loading="lazy" decoding="async" />

<p>Next, I mounted the wide-angle camera. Note that the cable should be connected in the correct orientation. The camera has adjustable focal length which can be changed by rotating the lens. (Remember to take out the camera cover when in use!)</p>

<!-- medium-image:1*wDq-K9C-6D8iRd1ZIRJMVQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/3a32c82c35b769bd2687e7e32cbb8ea320c8bb6f8fa732b2725faac207f16406.jpg" alt="Wide-angle camera and ribbon cable mounted on the DonkeyCar chassis" width="3024" height="4032" loading="lazy" decoding="async" />

<p>Next, I assembled the 3D chassis to the body of the car. Note that the shorter 3-pin wire is from the ESC which controls the throttle and connected to pin 0. While the longer 3-pin wire is from the servo which controls the steering and connected to pin 1.</p>

<p><em>Note</em>: The pin number does not have to be followed strictly. If you decide to change the pins, you have to update the code in <code>config.py</code>.</p>

<!-- medium-image:1*44jl_Mxh6GqpeBojOxviBg.jpeg alt-decision:meaningful -->

<img src="/blog-media/5c1d2f6e8a9533519b83caf12c780f7ee2d4a5982bd894647cd32b3ee3a6bb26.jpg" alt="DonkeyCar controller board and wiring inside the 3D-printed chassis" width="4032" height="3024" loading="lazy" decoding="async" />

<p>This is my final product. I did not assemble the 5V converter, as I faced some issues with it, and have to wait for a replacement from the seller. Hence, the temporary, not-so-glam zip-tied power bank to power the Raspberry Pi:</p>

<!-- medium-image:1*iPXWPvpmue96wClYOzXPbg.jpeg alt-decision:meaningful -->

<img src="/blog-media/73b885a0a22bce70a9aecc17a6b874513add232e4bf6996138716b950f892716.jpg" alt="Completed DonkeyCar with exposed electronics and a power bank zip-tied on top" width="4032" height="3024" loading="lazy" decoding="async" />

<h2>Driving the DonkeyCar</h2>

<p>One of the problem at this stage was setting up SSH over WiFi, so I could control the Pi remotely from my Mac. I spent almost half a day figuring out the issue, but it turns out, the <code>wpa_supplicant.conf</code> file didn’t translate my quotation mark (“) correctly… manually changing it fixed the issue.</p>

<p>All was set until I reached the calibration stage: I found that the forward throttle was too fast to control, even at the lowest PWM setting of 380. At 379, the jerking motion was very pronounced. Anything lower than that cut off the throttle.</p>

<p>The reverse, however, I was able to get it to run smoothly at a much slower and easy to control speed. Brushed motor should be able to cruise at a much lower speed and I have seen other’s DonkeyCar and they did not behave like that.</p>

<p>The steering was perfect.</p>

<p>Currently, I have tried many suggestions and none of them worked. My guess is that the ESC is faulty or it applies acceleration curve to the forward throttle. I have contacted the seller to report this behaviour but they need time before they can get back to me. Meanwhile, I will try to look out for possible errors and solutions.</p>
