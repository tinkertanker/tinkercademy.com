---
title: Smart Office with a Micro:bit Hub
subtitle: The simple task of making a complicated project with micro:bit
description: The simple task of making a complicated project with micro:bit
legacyPath: the-simple-task-of-making-a-complicated-with-micro-bits-an-office-iot-project-1f8bb6766dd6
canonicalUrl: https://blog.tinkercademy.com/the-simple-task-of-making-a-complicated-with-micro-bits-an-office-iot-project-1f8bb6766dd6
sourceMediumUrl: https://medium.com/tinkertanker/the-simple-task-of-making-a-complicated-with-micro-bits-an-office-iot-project-1f8bb6766dd6
author:
  id: a63e87036a77
  name: James Chen 🤨
  handle: unknownguy2002
  profileUrl: https://medium.com/@unknownguy2002
publishedAt: 2018-11-07T01:19:18.113Z
updatedAt: 2018-12-10T23:13:22.774Z
tags:
  - name: Nodejs
    slug: nodejs
  - name: Microbit
    slug: microbit
  - name: API
    slug: api
  - name: IoT
    slug: iot
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/26f5e2a4eae5cc3575bd95d2b99122c397771deffeade9acdb0d14b67ce56f94.png
heroImageWidth: 1204
heroImageHeight: 1060
heroAlt: Simple, eh?
heroAltDecision: meaningful
provenance:
  mediumId: 1f8bb6766dd6
  publicationId: ca1fc9543b6f
  sourceSha256: 7db28c3466551b79eb0f5c18afad693f22d576c51eb0be797248d0dc72bd74c0
migration:
  paragraphCount: 38
  imageCount: 4
  embedCount: 0
  altReviewRequired: 0
---

<h3>The simple task of making a complicated project.</h3>

<p><em>Editor’s note: James is 12 at time of writing, and already a pretty amazing coder! That’s about all the context you need for this piece.</em></p>

<p>Before I joined Tinkertanker as an intern, I had some experience with <a href="https://nodejs.org/en/">Node.js</a> and <a href="https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82">APIs</a>. So when YJ asked me to do a project with the <a href="http://microbit.org">micro:bit</a>, my first (and only) thought was… why not hook micro:bits to APIs?</p>

<p>After brainstorming for a short while, I decided to create a micro:bit “hub” system for the office, where multiple micro:bits feed (using the built-in radio functionality) to the main micro:bit “hub”, which writes to serial for a computer running a Node.js script to read. Seems pretty simple, right?</p>

<p>The API I decided to work with was <a href="http://slack.com">Slack</a>, which is Tinkertanker’s office chat platform for staff and interns. <em>Thank you, Slack, for having a </em><em><a href="https://api.slack.com">very well documented API</a></em><em>, I’d give you a cookie if I had any </em>🍪</p>

<h2>TRYING</h2>

<p>On to business. I wired up a motion sensor to the micro:bit, placed it near the office entrance, and got the microbit to send a string as a radio signal:</p>

<!-- medium-image:1*vj-rw6m0sLdBnQmdgl5z4A.png alt-decision:meaningful -->

<img src="/blog-media/26f5e2a4eae5cc3575bd95d2b99122c397771deffeade9acdb0d14b67ce56f94.png" alt="Simple, eh?" width="1204" height="1060" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Simple, eh?</em></p>

<p>Notice something? Yes, that’s a <strong><em><a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON">JSON</a></em></strong><strong><em> string</em></strong>!</p>

<p>I decided that the the Node.js program receiving the signal would <code>JSON.parse()</code>the JSON, and respond accordingly.</p>

<p>As the radio signal couldn’t reach the computer hosting the Node code, I set up another micro:bit to serve as a “hub”, then programmed the “hub” to relay signals through serial:</p>

<!-- medium-image:1*LJ5bK_B88JCgoA4SlKrsBQ.png alt-decision:meaningful -->

<img src="/blog-media/e6e44771e25c8b543511c75ee6278e7809e1d26d45c6c31b6eaa22b873342998.png" alt="This version of the “Hub” is newer, but still compatible" width="486" height="624" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>This version of the “Hub” is newer, but still compatible</em></p>

<!-- medium-image:1*qlFui6D0_rfe4nUjASubRQ.png alt-decision:meaningful -->

<img src="/blog-media/b0ffc4faa121157fb6f3ea954fa3837cfe5306579530ac6751dca9970d6da41a.png" alt="Also a newer version of the package.json file" width="876" height="826" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Also a newer version of the package.json file</em></p>

<p>Then, on to my favorite part, Node.js. Here are the modules I used:</p>

<ul>
<li><a href="https://www.npmjs.com/package/node-fetch">node-fetch</a>, to use HTTP requests in Node</li>
<li><a href="https://serialport.io">serialport</a>, to, unsurprisingly, access serial ports</li>
<li><a href="https://expressjs.com">Express</a>, a web framework for Node</li>
</ul>

<p>Serialport had an convenient on(‘data’) event, which I happily used… except that I got buffers as data.</p>

<p>Good thing you can break buffers back down into strings, right? Look what that got me….</p>

```text
Data: {"e
Data: ntered":
Data:  "true"}
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
Data:
```

<p>I was about to just do some interesting technique to solve this when I realised, <em>hey, there’s a serialport parser!</em></p>

<p>True enough, I could add in the parser to read the data as a whole string!</p>

```text
var SerialPort = require('serialport');
```

```text
const Readline = require('@serialport/parser-readline')
```

```text
var port = new SerialPort('/dev/cu.usbmodem1412', {
```

```text
baudRate: 115200
```

```text
});
```

```text
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
```

<p>Yes! Everything was working perfectly. Now to <code>JSON.parse(data)</code>!</p>

<p>Much to my dismay, the string didn’t happen to be a valid JSON. How, then? When I <code>console.log(data)</code> ed it, it produced a seemingly valid string of JSON. (That’s when <a href="https://medium.com/@yjsoon">YJ Soon</a> came in and spotted a programming error: <code>data.trim</code> instead of <code>data.trim</code>, what a careless mistake!)</p>

<p>So, I was almost done, now to send a message in Slack! I wrote the following code for that.</p>

```text
let json = `{"attachments":[{"fallback":"Someone entered/exited", "title":"Someone entered/exited", "callback_id": "motiondetect", "color": "#add8e6", "attachment_type": "default", "actions": [{"name":"who","text":"It was me", "type": "button", "value": "me"}]}]}`
```

```text
fetch('https://hooks.slack.com/services/...',
{ method: 'POST',
  body: json,
  headers: {'Content-type': "application/json"}}).catch()
```

<!-- medium-image:1*BZLrgXXUURrtdD_4weqsWA.png alt-decision:meaningful -->

<img src="/blog-media/17908f65022798453ec937a8a8d1237d441682d256d23be95b6478cbbd259fa0.png" alt="Spammy, Spammy, Ham" width="1330" height="1496" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Spammy, Spammy, Ham</em></p>

<p>And I got that message in Slack. <em>Quite a few times</em>,<em> </em>because we had so many people walking in and out. But still, I got that message.</p>

<p>Wondering why I had Express as a dependency? I actually also made a quick website to serve staff at Tinkertanker with the latest feeds from sensors.</p>

<p>After that it worked perfectly. So happily ever after! (Until I decided to expand the whole system and also remove that micro:bit 😏)</p>
