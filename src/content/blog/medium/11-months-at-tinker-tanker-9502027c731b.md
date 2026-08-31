---
title: 11 Months Interning at Tinkertanker
subtitle: by Daniel Shepherd from New Zealand
description: by Daniel Shepherd from New Zealand
legacyPath: 11-months-at-tinker-tanker-9502027c731b
canonicalUrl: https://blog.tinkercademy.com/11-months-at-tinker-tanker-9502027c731b
sourceMediumUrl: https://medium.com/tinkertanker/11-months-at-tinker-tanker-9502027c731b
author:
  id: e90f8d566e75
  name: Daniel Shepherd
  handle: d.shepherd
  profileUrl: https://medium.com/@d.shepherd
publishedAt: 2019-02-09T08:38:25.467Z
updatedAt: 2021-12-07T12:27:49.196Z
tags:
  - name: Programming
    slug: programming
  - name: Internships
    slug: internships
  - name: Coding
    slug: coding
  - name: Education
    slug: education
  - name: Computer Science
    slug: computer-science
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/5bc392e11a92bf69be45e7fd547a1e4a81d561ff2f45f932a9a6b4963911a981.jpg
heroImageWidth: 4032
heroImageHeight: 3024
heroAlt: Tinkertanker office wall mural, shelves of toys and a black sofa.
heroAltDecision: meaningful
provenance:
  mediumId: 9502027c731b
  publicationId: ca1fc9543b6f
  sourceSha256: c79348d877e11adb6d30c15386985726326649e1ab9dff5c5076fc1763f75483
migration:
  paragraphCount: 59
  imageCount: 3
  embedCount: 0
  altReviewRequired: 0
---

<p><em>Editor’s note: In early 2018, Daniel called us, looking for something to do after completing his high school education in Singapore. We were a bit confused about what to do with this affable New Zealander, but after we hosted him as a sit-in student for a few months, we invited him to join us as a full-fledged intern. He came in without any programming experience, and by the time he left, he was off to study Computer Science at the University of Waikato. Here’s his remarkable story.</em></p>

<!-- medium-image:1*n3ru1i117_wxZe6nc1VOPw.jpeg alt-decision:meaningful -->

<img src="/blog-media/5bc392e11a92bf69be45e7fd547a1e4a81d561ff2f45f932a9a6b4963911a981.jpg" alt="Tinkertanker office wall mural, shelves of toys and a black sofa." width="4032" height="3024" loading="lazy" decoding="async" />

<h2>Beginning</h2>

<p>At the start of 2018, I heard about Tinkertanker through word of mouth, and applied for an internship without really knowing much about the company. I was expecting to be packing boxes, do busy work at the office, or something suitably boring for an intern.</p>

<p>What I did not expect, however, was that I would learn game development, several programming languages, develop and release multiple mobile apps, get to work with hardware like Micro:bit and Raspberry Pi, and learn some backend web dev. (I <em>did</em> still pack a couple of boxes, and—just one time—manually counted 900 LED strips.)</p>

<p>Coming in with very little (basically zero) programming experience, I started by going through <a href="http://Tinkercademy.com">Tinkercademy</a>’s curriculum on Game Development in <a href="http://unity3d.com">Unity</a>, learning both C# and Unity, and giving feedback on the curriculum. For a first-time coder, this was a little challenging, but learning programming through game dev was a lot of fun. The interactive medium of video games makes learning a fun experience—rather than build a calculator, I could make a character and program how it moved! Though it’s subjective, of course, I personally found this approach more engaging than previous attempts at learning programming through more traditional means.</p>

<p>After a couple of months, I started my <em>actual</em> internship, and began to help out with some classes, including a Unity class, and work on other projects. The first big project of my internship was the Digital Maker competition.</p>

<h2>Digital Maker Competition</h2>

<p>We ran a competition with schools in Singapore to design and build controllers, using <a href="http://microbit.org">micro:bit</a>s, for a game built in Unity and based off Unity’s “Tanks Tutorial” that we called Tank Tinkerer. (More on the game and competition in <a href="https://blog.tinkercademy.com/tank-tinkerer-a-micro-bit-competition-9302dff1f136">this blog post</a>.)</p>

<!-- medium-image:1*8A3f2yYM28BETmS-j-X0pw.png alt-decision:meaningful -->

<img src="/blog-media/b283170df2908b65f207be6a831f6390446d980afe3dc9b23b7f7d1bd0cab53f.png" alt="Tank Tinkering" width="1600" height="900" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Tank Tinkering</em></p>

<p>Tank Tinkerer is a team-based game where players square off in a 2v2 match of Capture The Flag. Each team controls 2 tanks which move around the level and can fire on enemy tanks (or friendly ones, friendly fire was enabled, sometimes to hilarious effect). The goal, of course, is to get to the enemy team’s base and grab their flag, then bring it back to your base alive.</p>

<p>Teams were invited to Suntec City for Tech Saturday 2018 to compete against one another, playoff-style, with their controllers, which were paired using micro:bits connected by serial ports. In preparation for the big event, I was tasked with adding some last minute features and quality-of-life improvements to the game.</p>

<p>The game in its current state did the equivalent of refreshing a web page when going back to the main menu after a match. Though this worked fine for earlier segments of the competition, we had a tight time schedule, about 5 hours to get all of the round-of-16, round-of-8, and playoffs done, so downtime between matches had to be minimal. Constantly re-entering serial port numbers for the controllers needed to go, but some data like scores, game time and game state still needed to be reset. We also needed to be able to pause or quit during a game in case of unforeseen issues. Since all the systems currently relied on reloading the scene (a scene in Unity Engine being a game level) to reset their states, I needed to rework them all to work properly in the new version which would never reload the scene.It took me a day or two to get all the systems updated and do some basic tests, after that I added a couple of preset game lengths, one for group stages and a second, slightly longer one, for playoffs.</p>

<p>To minimise tie games, an occurrence that wasn’t so much of an issue in the earlier stages of the competition, but one that would be very problematic in the time-limited scenario of playoffs, I added sudden death mode.When active, sudden death prevented respawning, this meant that the first team to score a frag would be able to freely capture the enemy flag and win the match.</p>

<p>We ran play tests in the office to make sure everything worked, and though everything appeared fine. I was still very nervous—after all, it was my code and what if everything went wrong on stage, what would we do?</p>

<p>Thankfully it didn’t, everything went remarkably smooth and despite a couple of small f̵e̵a̵t̵u̵r̵e̵s̵ bugs, we managed to finish the competition within our incredibly tight time constraints.</p>

<p>So far I’d gone from no programming experience to working on a game that was played by hundreds of people, at a live event, on a stage. I was becoming very excited about programming and software development, but so far I had only learned one language, C#. Though the majority of my internship was spent using C# and Unity, I also learned Python, JavaScript, and Ruby during my time here.</p>

<h2>SCCL App Development Comp</h2>

<p>The next, and by far the biggest project I worked on was the <a href="http://appcompetition.tk.sg">App Dev Competition</a> for the Singapore Centre for Chinese Language (SCCL). SCCL ran a competition with us for secondary school students to develop mobile apps or games with the aim of helping primary school students improve their Chinese speaking and reading abilities. The prize for making it into the top 20 was getting their app released on mobile stores, and this is where my role came in.</p>

<p>There were two categories for the competition, Open Category (OC) and Secondary Category (SC):</p>

<ul>
<li>OC teams developed the final versions of their apps themselves, only handing them over to us for publishing.</li>
<li>For most of the SC teams, this was their first attempt at app development or even programming at all, so they built a functional prototype, mostly using <a href="https://thunkable.com/">Thunkable</a>, a block-based app builder, and then we developed the final release version with all their features, keeping the same look and feel of their original idea.</li>
</ul>

<p>We chose Unity as our platform due to the way it makes releasing on multiple platforms very easy, and we wanted to release all the apps we developed on both Android and iOS.(OC teams could choose which platform they wanted to develop for, several also chose Unity.)</p>

<p>I learned a lot over the course of this project which spanned several months, working in a team of developers, all of different experience levels with C# and Unity.</p>

<ul>
<li>Developing for mobile devices rather than computers introduced its own challenges, like making sure the apps worked at lots of different aspect ratios and resolutions, it also made testing harder since, in order to get a realistic experience, you had to build the project, then open it in Android Studio or Xcode, and build it again for the simulator or your device.</li>
<li>We also needed to co-ordinate with the students who made the apps to make sure we got everything just right.</li>
<li>This was the first time I worked on projects and code that would end up being distributed on a store which meant that, unlike tutorial projects and such, these needed to reach a state of releasable polish.</li>
<li>I also became very familiar with the Google Play Store and Apple App Store releasing procedures after publishing multiple builds for 20 apps.</li>
</ul>

<h2>Ruby on Rails</h2>

<p>After wrapping up the SCCL project, I moved on to learning back end web development using Ruby on Rails.</p>

<p>This was a big change of scenery from what I had been doing prior, and although I found Ruby itself to be very friendly to pick up, I had trouble getting my head around Rails and the MVC structure, but it was very satisfying when something finally made sense and I could understand how it worked.</p>

<p>Prior to using Rails, my knowledge of web development was just typing plain HTML and a bit of JavaScript, so using Rails was eye opening. When making my first website for a class in high school, I had often times thought, <em>there must be a better way than this</em>, and web frameworks were that better way, at least when it came to bigger sites. I had been imagining painstakingly typing out HTML for every page on a massive site like Facebook or Twitter.</p>

<p>I ended up really enjoying Ruby on Rails and I plan to further continue learning Rails in my free time during university.</p>

<h2>A Processing program with Python</h2>

<p>While the SCCL project was ongoing, it didn’t take up 100% of my time until later. I started learning Python so that I could assist and lead classes that use it, I also got some experience with the Raspberry Pi while using it along with Minecraft Pi to facilitate teaching Python. One of the classes that I had been involved in used Processing and Python to teach programming with digital art.</p>

<p>Processing provides a programming environment with access to a digital art focused library that lets you create and animate shapes using various programming languages, we were using Python.</p>

<p>One thing that I noticed was that it was hard for some (myself included) to visualise art in the coordinate grid of Processing’s canvas.</p>

<p>While preparing for a class in early December I was searching for an online coordinate point plotter to help with this, and although I found 2 or 3 sites that sort of worked, they were all lacking in one way or another, mostly focused towards mathematics and not just plotting a point with an x and y number above it. I started thinking of making one myself, can’t be that hard right?</p>

<p>I spent some time thinking about it, and even made an early attempt at it, but didn’t get far as I wasn’t familiar with Python objects.</p>

<!-- medium-image:0*jHnd6buxwh9HRweJ alt-decision:meaningful -->

<img src="/blog-media/ad8ee2f7714e8c6dfc05782e0fda18c264ad38d233b2cd847936d59c33d56a5f.gif" alt="Coordinate plotter in Processing using Python." width="800" height="671" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Coordinate plotter in Processing using Python.</em></p>

<p>Fast forward to mid-January when I had finished the Ruby on Rails tutorial and was looking for something to do, I decided to give the coordinate plotter another go.</p>

<p>This time, I actually made good progress, and finished the program according to my initial plan in 3 or 4 hours.</p>

<p>I’d had a lot of fun making it and wasn’t ready to be done quite yet, so I started thinking of more features to add.</p>

<p>I showed it to a co-worker and he suggested I add the ability to connect the points with lines and allow the points to snap to the nearest 5 or 10, and to remove or have an option to toggle the graph lines.</p>

<p>Final project on GitHub.</p>

<p>This was a fun little project to work on, and was useful too. Not only did I get to practice my Python, specifically objects, but it also resulted in a tool that can be used for future classes, or even turned into a lesson in itself.</p>

<h2>Closing</h2>

<p>Over the course of my internship I got to experience a lot of different technologies and choose where and what I wanted to work on. Some other things I did:</p>

<ul>
<li>An afternoon’s experimental Stellar class gave me an introduction to the world of blockchain.</li>
<li>Helping out at a 4-day ethical hacking camp, which got me to learn a lot about networking and how the internet works.</li>
<li>Designing activities for Primary 4–5 students using colour tracing robots, and a R2D2 robot made out of snappable circuits called <a href="http://littlebits.cc">littleBits</a>.</li>
<li>Teaching classes on Python and Raspberry Pi.</li>
</ul>

<p>Working at Tinkertanker was a great experience. Walking through the open plan office area, nearly every desk has some kind of project being worked on, people busy coding or working on cardboard contraptions, micro:bits, circuitry, or combinations of everything I just mentioned.</p>

<p>Though everyone has their own desk in the office, you are free to sit wherever you want. On days when no classes were being conducted in the classroom you would often find several interns and full timers working there, or on the beanbags or in the pantry.</p>

<p>I learned a lot from the full timers here, who were great mentors, but also from other interns, who I got to meet many of during my nearly 11 month internship.</p>

<p>I am writing this nearly 1 year after I started, during the last few weeks of my internship—and my time in Singapore for that matter—before I move back to New Zealand to start my Computer Science degree. A year ago, I had no interest in pursuing a university degree, let alone one in computer science, but this internship helped me find something I am passionate about and want to pursue further.</p>

<p><em>Editor’s Note: Daniel is now a first-year student at the University of Waikato in New Zealand, studying Computer Science. When he first asked to “join” us by coming in, unpaid, to learn from our curriculum and provide feedback, we thought, why not? The worst that could happen was he might stop showing up. (We offered someone else the same deal at the time, and we never heard from him again after a couple of days.)</em></p>

<p><em>Daniel never stopped showing up. He persisted, he learned a whole bunch of programming languages and frameworks, he worked well with the other interns and full-timers, we had no qualms taking him on as a full intern, and we’re happy to recommend him for any future internships, academic programmes, or jobs in the future.</em></p>
