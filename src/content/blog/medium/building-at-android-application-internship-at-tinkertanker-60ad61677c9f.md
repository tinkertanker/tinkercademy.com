---
title: Building the Get Hacking Android app
subtitle: "Intern report: Building Tinkertanker’s first Android app"
description: "Intern report: Building Tinkertanker’s first Android app"
legacyPath: building-at-android-application-internship-at-tinkertanker-60ad61677c9f
canonicalUrl: https://blog.tinkercademy.com/building-at-android-application-internship-at-tinkertanker-60ad61677c9f
sourceMediumUrl: https://medium.com/tinkertanker/building-at-android-application-internship-at-tinkertanker-60ad61677c9f
author:
  id: ce4862734951
  name: Tan Jin Yi Ambrose
  handle: ambrosetan
  profileUrl: https://medium.com/@ambrosetan
publishedAt: 2017-09-26T13:26:55.373Z
updatedAt: 2018-04-11T23:47:12.869Z
tags:
  - name: Android
    slug: android
  - name: Internships
    slug: internships
  - name: Microbit
    slug: microbit
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/67ccd90fdc34914671cf50bd546f5255c06b65dec34ba576c5f2a3daeb4261fd.jpg
heroImageWidth: 1408
heroImageHeight: 1158
heroAlt: The final product, listed on the Play Store! Those screenshots are out of date, though.
heroAltDecision: meaningful
provenance:
  mediumId: 60ad61677c9f
  publicationId: ca1fc9543b6f
  sourceSha256: f1c1f63a963ae7c39b5129025b1bab1c80d37dc7bcda21469b2d3be752a91437
migration:
  paragraphCount: 16
  imageCount: 1
  embedCount: 0
  altReviewRequired: 0
---

<h3>Intern report: Building Tinkertanker’s first Android app</h3>

<p><em><a href="http://blog.tinkercademy.com">Editor’s Note</a></em><em>: Ambrose interned with us, and made some awesome things. He’ll tell you about one here, and I’ll be back to tell you how great he is later:</em></p>

<p>In December 2016, I had the opportunity to join Tinkertanker as an intern for 6 months. As someone fresh out of full-time National Service, I wanted to do something meaningful between the long break I had before university started in June. As a budding programmer, I hoped to gain experience and improve my skills during this internship.</p>

<p>Upon joining as an intern, I was introduced to microcontrollers and hardware, and the next big thing that IMDA was planning to introduce to schools: the BBC Micro:bit. After a period of learning about the hardware, I was tasked to create an application to house tutorials and projects in an Android application for the Micro:bit. This application would be used to complement teachers’ curricula and students’ learning via the Micro:Bit and various activities using the device.</p>

<!-- medium-image:1*hBkXWpJ1H9tSURFkpbiPxQ.jpeg alt-decision:meaningful -->

<img src="/blog-media/67ccd90fdc34914671cf50bd546f5255c06b65dec34ba576c5f2a3daeb4261fd.jpg" alt="The final product, listed on the Play Store! Those screenshots are out of date, though." width="1408" height="1158" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>The final product, listed on the Play Store! Those screenshots are out of date, though.</em></p>

<p>The project was built with:</p>

<ul>
<li>Android’s support library</li>
<li><a href="http://square.github.io/retrofit/">Retrofit</a> (with <a href="http://square.github.io/okhttp/">OkHttp</a>) for converting HTTP requests into Java objects</li>
<li><a href="https://github.com/bumptech/glide">Glide</a> for image handling and some third-party view libraries for the carousel and zooming image views</li>
<li><a href="https://cloudinary.com/">Cloudinary</a> to upload images to a server.</li>
</ul>

<p>I considered using <a href="https://www.google.com.sg/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;uact=8&amp;ved=0ahUKEwjjzOaIj9LWAhXEu48KHSLYC_YQFggkMAA&amp;url=https%3A%2F%2Fgithub.com%2FReactiveX%2FRxAndroid&amp;usg=AOvVaw3R1elAynpxKgfVUYOvIguC">RxAndroid</a>, a reactive functional library for Android to integrate with Retrofit, but quickly realised that it was too complex for what it was meant to do. I also chose Glide over <a href="http://square.github.io/picasso/">Picasso</a> for its capability to display GIF animations. I had a plan to create my own carousel, but I found that there were well-working third-party libraries to do the job for me... why reinvent the wheel?</p>

<p>Just like any other project, there were problems encountered as I started developing the application. First and foremost was my lack of experience with Java and the Android platform. At the start of the internship, I lacked <em>any</em> knowledge regarding Java as a whole except that it looked like C++. A few weeks of time was dedicated for learning Android (and Java) in order for me to get a good grasp of the language and its mechanics. There were also many choices that had to be made for using built-in/third party libraries to do something, and sometimes I had to backtrack progress and re-implement another library for smoother handling.</p>

<p>Another issue was with the backend. The backend API was being developed at the same time as the front-end app, and this meant that we could not tap on certain features until the backend was ready to display them. For instance, there was a lack of storage for draft items until 3 months in, and we had to code an SQLite database to compensate for that. However, when it went up, we had to change our plans from using a local database to a cloud database, which resulted in the removal of the entire SQLite database. 😢</p>

<p>Through this invaluable experience, I was able to pick up programming skills and methodologies that I had not touched before, equipping me better for future development. I also experienced truly working in a group for a long-term project for the first time — needing to use Git to ensure the application could run with multiple developers handling it. I believe that this experience could be better enriched if we had a mentor who was an expert in Android development, but the team was stretched thin as things were, and Tinkertanker has been developing mostly for iOS and web so far. I feel that this internship has been a pivotal point in my life and will definitely help me throughout my future work.</p>

<p><em>Editor’s Note: Ambrose is a first-year student at the Singapore Management University, studying Information Systems. He came strongly recommended for this internship, and he lived up to expectations, and more! He didn’t emphasise this enough, but he came in with zero Android (not even Java) experience, worked around our lack of high-level Android development expertise, learned everything on his own, worked with a moving back-end API, and delivered a fully working Android app. He also helped us out in classes and Maker Faire! Summary: Ambrose is pretty great, and we highly recommend him for whatever nefarious (or otherwise) programming-related purposes anyone may have.</em></p>
