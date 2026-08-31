---
title: Deep Dive into the I2C OLED
subtitle: In case you don’t know, the I2C OLED is a small digital display which is useful for electronics projects. I wrote a Micro:Bit library to…
description: In case you don’t know, the I2C OLED is a small digital display which is useful for electronics projects. I wrote a Micro:Bit library to…
legacyPath: deep-dive-into-the-i2c-oled-413fee46ada1
canonicalUrl: https://blog.tinkercademy.com/deep-dive-into-the-i2c-oled-413fee46ada1
sourceMediumUrl: https://medium.com/tinkertanker/deep-dive-into-the-i2c-oled-413fee46ada1
author:
  id: b2851d2f0e0b
  name: Darius Rudominer
  handle: darius.is.ru
  profileUrl: https://medium.com/@darius.is.ru
publishedAt: 2019-09-23T04:15:55.443Z
updatedAt: 2021-12-11T23:44:45.634Z
tags:
  - name: Programming
    slug: programming
  - name: Electronics
    slug: electronics
  - name: Microbit
    slug: microbit
  - name: Makecode
    slug: makecode
  - name: I2c
    slug: i2c
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/f9e265b292750c53ce75d0a419af1d14fde99342ce87e1dde739ce0607c384f8.png
heroImageWidth: 1480
heroImageHeight: 1248
heroAlt: "I2C OLED showing “Loading: 100%” and a full progress bar"
heroAltDecision: meaningful
provenance:
  mediumId: 413fee46ada1
  publicationId: ca1fc9543b6f
  sourceSha256: 62669cd0a767fb1fa46cf2f1763511ad3cea470db4754918613568ec3a1ecf4c
migration:
  paragraphCount: 19
  imageCount: 5
  embedCount: 0
  altReviewRequired: 0
---

<p><em>Editor’s note: Darius joined us as an intern over the summer of 2019, all the way from California in the US. Among other projects, we asked him to help update our </em><em><a href="https://github.com/Tinkertanker/pxt-oled-ssd1306">OLED MakeCode extension for the micro:bit</a></em><em>, and he did an awesome job—read on for details!</em></p>

<!-- medium-image:1*2WlAbLaTSwI2eYELF9PPug.png alt-decision:meaningful -->

<img src="/blog-media/f9e265b292750c53ce75d0a419af1d14fde99342ce87e1dde739ce0607c384f8.png" alt="I2C OLED showing “Loading: 100%” and a full progress bar" width="1480" height="1248" loading="lazy" decoding="async" />

<p>In case you don’t know, the I2C OLED is a small digital display which is useful for electronics projects. I wrote a <a href="http://microbit.org">micro:bit</a> library to use the I2C OLED, and in doing so I had to learn a lot of specifics about how it works. For most projects these specifics won’t be at all important and you can just rely on a library to handle the details. However, if you are writing a library yourself or are just interested in esoteric part specifications, you’ll hopefully get something out of this.</p>

<p><strong>How The OLED Draws</strong></p>

<!-- medium-image:1*Ay7iG_HyAHopG9-13Pk4JQ.png alt-decision:meaningful -->

<img src="/blog-media/cdc834ab421ea617b5be6bda526a2f82c06b1a9258a9a3a7141d99a3bb5f7d56.png" alt="Diagram of the OLED pages and Columns" width="1227" height="1016" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Diagram of the OLED pages and Columns</em></p>

<p>When I first was learning about the OLED, I assumed that I would draw to the screen by read and write to pixel addresses, similar to how one draws to the screen on a computer. However, the primary units of drawing with the OLED are not pixels but Pages and Columns. There are 8 pages which go from top to bottom of the screen, and 128 columns that go from left to right. A single Page-Column address corresponds to a vertical strip of 8 pixels, which must all be written at once. The OLED keeps track of the page-column address, and will read incoming byte into that address. A <code>1</code> corresponds to the pixel being on and a <code>0</code> corresponds to the pixel being off. Since there are 8 bits in a Byte, a single byte corresponds to all the pixels in a single column address. Once an address has been written too, the OLED will automatically move on to the next address.</p>

<!-- medium-image:1*Lb9IZuDcHYoEQX_sAbtteQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/f6a3e29eb4c1132b5cdd7d445b423d593d8fd875623e0ddb616841b66938344a.jpg" alt="To Draw this circle, you would feed the OLED these bytes from left to right" width="960" height="720" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>To Draw this circle, you would feed the OLED these bytes from left to right</em></p>

<p>In addition to the current page-column address, the OLED also stores two more coordinates called Start and End. These two page-column addresses define a square with Start in the upper-left corner and End in the lower-right corner. While writing or reading the screen, the current address will move continuously right until it reaches the edge of the rectangle, then wraps to the start of the next row. This allows you to write to the whole screen at once by setting the start to <code>(0,0)</code> and then end to <code>(7,127)</code>. However, you don’t have to write to the whole screen at once. The OLED library I wrote preserves memory by not storing the entire screen at once, and instead writing to the specific 5x8 px block where the character was to be drawn. Also note, there are three different “addressing modes” which control how the page column address moves as you write or read. I am describing “horizontal addressing”, which is the most common.</p>

<p><strong>How The OLED Reads</strong></p>

<p>This is all very well and good, but how do you <em>do</em> any of this writing and addressing? The I2C OLED, as the name suggests, uses something called the I2C protocol. This is a hardware protocol use for communicating with simple electronic peripheries. It’s main advantage is the use of a Master-Slave system, which allows for one controller (the Master) to drive multiple devices (the Slaves) at the same time, each with their own address. I2C devices have 4 pins: Ground(GND), Power(VCC), Serial Data Line(SDL) and Serial Clock Line(SCL).</p>

<!-- medium-image:1*VQTd1jTdgw83lVf3gKPsyQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/14149da1635f7b61d81cc5ccea664955d6be240285dcedf9029d1a59cc930999.jpg" alt="Four-wire I2C connector labelled GND, VCC, SCL and SDA" width="1001" height="1001" loading="lazy" decoding="async" />

<p>GND and VCC are kept at Low (zero volts) and High(usually either +5 or +3.3 volts) respectively, acting as a power supply. SDA and SCL are responsible for sending messages to and from attached I2C devices. The structure of a I2C message is as follows: SCL and SDA begin High, and the beginning of a message is marked by SDA going from High to Low, called the Start Condition. From there, SCL oscillates between High and Low, each oscillation being a bit read from SDA. I2C devices interpret these bits in blocks of 16. Each 16 bits consists of an 7 bit Slave Address, followed by a 1 bit Read/Write, followed by 8 bits of data. How this data is interpreted depends on the particular I2C device used. When all attached devices have been written to or read from, the SCL is held at High, and the SDA is brought High as well. This is called the Stop Condition.</p>

<!-- medium-image:1*-kSFUOc28LzIF2-O2hYV5g.png alt-decision:meaningful -->

<img src="/blog-media/0250842f52ed2657d916a9d2d58ccaf73f5594cd231501528fd00f80244af1c3.png" alt="The I2C protocol. S and P are the Start and Stop conditions. Each B is a 7 bit address + R/W, and each blue square is 8 bits of data." width="600" height="100" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>The I2C protocol. S and P are the Start and Stop conditions. Each B is a 7 bit address + R/W, and each blue square is 8 bits of data.</em></p>

<p>Each kind of device has its own address, meaning that any number of devices, but only one of each kind, can be connected to the same Master. The OLED’s address is<code> 0x3C</code> for writing, and <code>0x3D</code> for reading. The OLED interprets incoming data as a “Command” byte, followed by any number of data bytes. While this simplifies a little, <code>0x00</code> can be thought of as the command for “write this data to the current address”. There are commands for changing the address, changing the Start and End points, and many more settings. A full list of commands, as well as more information about the OLED, can be found <a href="https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf">here</a>.</p>

<p><strong>Closing Thoughts and Future Work.</strong></p>

<p>When initializing an OLED for the first time, there are a bunch of settings that need to be set, each with an associated command. I must admit that I do not understand the full scope of what these settings do, and it’s possible that some interesting things could be done with more nuanced control over these settings. If you want to see the list of commands I used, you can check out the <a href="https://github.com/Tinkertanker/pxt-oled-ssd1306/blob/master/main.ts">GitHub for my OLED library</a>.</p>

<p>One addition I have considered for the OLED library is the introduction of new fonts with additional character sets such as Chinese or Korean. The current font I use is 5x7 px, and is stored as a string of blocks of 5 bytes, corresponding to rows of pixels in the character. This size was chosen so that a character would fit on a single page. Most bitmap fonts for Chinese don’t scale well below 16x16, but this would still allow for characters drawn across two pages at once. I was unable to find a font that would work well for this, but it seems like it should be doable.</p>

<p>Anyway, that’s all for my Deep Dive into the I2C OLED. I wish you the best of luck on whatever electronics project you work on next!</p>
