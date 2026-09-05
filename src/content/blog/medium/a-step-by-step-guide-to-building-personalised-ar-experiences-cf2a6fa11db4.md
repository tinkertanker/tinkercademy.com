---
title: A Step-by-Step Guide to Building Personalised AR Experiences
description: A Step-by-Step Guide to Building Personalised AR Experiences
slug: a-step-by-step-guide-to-building-personalised-ar-experiences
legacyPath: a-step-by-step-guide-to-building-personalised-ar-experiences-cf2a6fa11db4
canonicalUrl: https://tinkercademy.com/blog/2023/a-step-by-step-guide-to-building-personalised-ar-experiences/
sourceMediumUrl: https://medium.com/tinkertanker/a-step-by-step-guide-to-building-personalised-ar-experiences-cf2a6fa11db4
author:
  id: be2990b8a35
  name: Tinkercademy
  handle: tinkertanker
  profileUrl: https://medium.com/@tinkertanker
publishedAt: 2023-08-15T07:45:24.649Z
updatedAt: 2023-08-20T06:26:16.599Z
tags:
  - name: Augmented Reality
    slug: augmented-reality
  - name: AR
    slug: ar
  - name: Meta Spark Studio
    slug: meta-spark-studio
  - name: Face Tracking
    slug: face-tracking
  - name: Ar Experience
    slug: ar-experience
license: All rights reserved
rightsStatus: organisation-owned
heroImage: /blog-media/8aee0d918252c2a349894e9f1fb1757dbac6a9400b637796ca456d0f2e153bcc.png
heroImageWidth: 1024
heroImageHeight: 1024
heroAlt: A school of fish swimming in clear blue ocean water, viewed from below.
heroAltDecision: meaningful
provenance:
  mediumId: cf2a6fa11db4
  publicationId: ca1fc9543b6f
  sourceSha256: c1762967bd7ca3ed258acc6e2d169734fd79a93239a9cb9843c2bb6fec163179
migration:
  paragraphCount: 69
  imageCount: 22
  embedCount: 0
  altReviewRequired: 0
---

<!-- medium-image:0*8XAsqkuBD6In7bLm alt-decision:meaningful -->

<img src="/blog-media/8aee0d918252c2a349894e9f1fb1757dbac6a9400b637796ca456d0f2e153bcc.png" alt="A school of fish swimming in clear blue ocean water, viewed from below." width="1024" height="1024" loading="lazy" decoding="async" />

<p>Step aside, ChatGPT, there’s a new player in town, and it’s about to propel us light-years ahead, blurring the lines between the real and virtual. If you haven’t already heard about it, the “era of spatial computing is here”.</p>

<p>Yes, we’re talking about Augmented Reality (AR) and Apple’s latest and greatest innovation — the Vision Pro. As mind-bending as it seems, Apple Vision Pro takes us one step closer to elevating our human potential and experiences.</p>

<p>No more 2D videos, or flat apps on a screen. We can soon create 3D videos and have our apps hang out with us in our living rooms. We also won’t be limited by our screens anymore. Want to watch a movie stretching across your bedroom wall, you can with Vision Pro. We’re closer than ever to a profound new way of work, play and life.</p>

<p>But how is this relevant to you? Of course, creating 3D videos or watching movies on a larger-than-life screen sounds fabulous, but how will these affect you if you can’t afford to cough up $3,499 for a Vision Pro?</p>

<p>AR experiences don’t necessarily have to be costly. You can create completely personalised AR experiences using just your laptop and a freely available tool — Meta Spark Studio.</p>

<p>Here’s how!</p>

<h3><strong>THINGS YOU’LL NEED</strong></h3>

<p>First off, you’ll need a few assets to get started:</p>

<ol>
<li>An image* you want to superimpose on your face (e.g. a hat, sunglasses, etc.)</li>
<li>A background image that will display behind you, and</li>
<li>Images* of any foreground objects you want to appear in your scene</li>
</ol>

<p>*Note: Images apart from the background image should have transparent backgrounds!</p>

<p>Next, you’ll need to download <a href="https://sparkar.facebook.com/ar-studio/download">Meta Spark Studio</a>. Now you’re ready to get started!</p>

<h3><strong>STEP 1: FACE TRACKING</strong></h3>

<p>Face tracking is really easy!</p>

<p>Begin by creating a Sharing Effect and add your image to the project. If you don’t have an image, you could search for a free downloadable image in the AR library.</p>

<!-- medium-image:1*7NOUB9lp9Tcofxk19s-KuA.png alt-decision:meaningful -->

<img src="/blog-media/db45ab8c08f0170558b5d8afbcba196a4d34ecb0084a11c70dca226420681386.png" alt="Meta Spark Studio start screen with the Sharing Effect project option highlighted." width="1600" height="1081" loading="lazy" decoding="async" />

<p>Then create a Face Tracker in your scene. This will automatically detect a face in your scene.</p>

<!-- medium-image:0*FsiaWOy7fFJbKV6V alt-decision:meaningful -->

<img src="/blog-media/b95a448c48d6f575206152db9e6c4a55f3dfd7314cef8b371763747ec0dc9f8e.png" alt="Meta Spark object panel with Face Tracker selected and the Insert button highlighted." width="1220" height="864" loading="lazy" decoding="async" />

<p>Thirdly, create a Plane object as a child object of your faceTracker and create a new material in your Assets window.</p>

<!-- medium-image:0*FeChw5BS2zv0YS9X alt-decision:meaningful -->

<img src="/blog-media/b311a12dd56fb4ea6042147dc8c7b26817c6fa555472c55578eb2531e754ffec.png" alt="Meta Spark object panel with Plane selected and ready to insert." width="1220" height="868" loading="lazy" decoding="async" />

<p>Assign the image you uploaded as the texture of the material; then assign the material to your Plane object. You should now see your image appearing in your scene! In the below example, my image is called <strong>catHat</strong>, my material is called <strong>catHatMat</strong>, and my scene object is called <strong>catHatObj</strong>:</p>

<!-- medium-image:1*YA6b_z_mltVxOo-BbMQfyw.png alt-decision:meaningful -->

<img src="/blog-media/d1a89fcbb08f0fdffdf3cf77af3befab2ad4367c64d907f2837305f4b3ca5c13.png" alt="Inspector for the catHatObj plane with catHatMat assigned in the Materials section." width="552" height="426" loading="lazy" decoding="async" />

<!-- medium-image:1*f_0ezCVgOBhl39D-IdNsIA.png alt-decision:meaningful -->

<img src="/blog-media/a979930386acdf1f240e64258489219f8403070fb2e6462103449a11c48576fd.png" alt="Material inspector showing the catHat texture assigned to catHatMat." width="553" height="356" loading="lazy" decoding="async" />

<p>You’ll most likely need to edit the basic transformations of the Plane object too — these include the scale (making it bigger or smaller), the position (along the x, y, and z, axes), and the rotation (to change which direction it’s facing.) There’s no single correct way to position these — feel free to try it out and figure out what looks best for your scene!</p>

<!-- medium-image:1*z5jcY6teyLYMLAgwpuyuVA.png alt-decision:meaningful -->

<img src="/blog-media/36dce73116a42abb3e69dd221b8f1bca354385e35e3b4bf4daf800bd64fce533.png" alt="Transformations panel showing the cat-hat plane's position, scale and rotation values." width="557" height="249" loading="lazy" decoding="async" />

<!-- medium-image:1*bBdM8YqoU_U2YNAjxNzqSg.png alt-decision:meaningful -->

<img src="/blog-media/f97d37ed7079521530b8c4e7283aea9f0d38ff325301a1026e838611c4def977.png" alt="AR preview with a pink cartoon cat hat aligned over the user's head." width="322" height="770" loading="lazy" decoding="async" />

<h3><strong>STEP 2:</strong> <strong>BACKGROUND AND FOREGROUND DETAILS</strong></h3>

<p>To get a background to appear behind the user, we need to apply background segmentation to separate the user from the camera shot.</p>

<!-- medium-image:0*N1zbESUZm_BVuRB2 alt-decision:meaningful -->

<img src="/blog-media/73535e39e04feb929d58d7a55c1ffd5a9b41cf6f20d9a13be70e0e90fdf0c8b4.png" alt="Meta Spark Camera inspector with Person segmentation assigned to a segmentation-mask texture." width="1600" height="569" loading="lazy" decoding="async" />

<p>We also add a canvas, on which we will place our person segmentation and the background (using rectangle objects).</p>

<!-- medium-image:1*tXAx08_Z6J5_klXi3pq_yA.png alt-decision:meaningful -->

<img src="/blog-media/c8ac3e6a261f08e5b124e357b8218ee82e56c4400b7128cdeff1148ed018eadd.png" alt="Meta Spark object panel with Canvas selected and ready to insert." width="1190" height="798" loading="lazy" decoding="async" />

<!-- medium-image:1*FSJvOi1IuZ82m05IBZiEgQ.png alt-decision:meaningful -->

<img src="/blog-media/c2eda1cd8328cbb397c08c4e941400b0fa950d51505ba38f97fb5a9c2bd92f61.png" alt="Meta Spark object panel with Rectangle selected and ready to insert as a 2D surface." width="1196" height="796" loading="lazy" decoding="async" />

<p>We need to do the usual process of adding the background image to our project, then assigning it to a material, and finally assigning the material to a rectangle object. In the example below, my background image is named <strong>bg </strong>while my material is named <strong>bgMat</strong>, and my scene object is named <strong>bgObj</strong>.</p>

<p>With a little customisation of the scene hierarchy, we now have a background appearing behind the user!</p>

<!-- medium-image:1*b9spNrpwf3BI7XcZMkvXgA.png alt-decision:meaningful -->

<img src="/blog-media/8ec35c9631cf831decb312074d20ec9277364d2b14f162b726b3ddcf5bd207cb.png" alt="Material inspector showing the background texture bg assigned to bgMat." width="551" height="362" loading="lazy" decoding="async" />

<!-- medium-image:1*H2HFPQe3Y4ywIn8Y26IojA.png alt-decision:meaningful -->

<img src="/blog-media/9696e6f539b8abba77cc9e9c1560838936b15fa721ab2ef83aec5ad1b8474972.png" alt="Inspector for the bgObj rectangle with bgMat assigned in the Materials section." width="549" height="365" loading="lazy" decoding="async" />

<!-- medium-image:1*tiSYHS1ePDHQD9eAhYPGHA.png alt-decision:meaningful -->

<img src="/blog-media/2bacbf90b70873048e83dfac50498c762a66105b38ba502dc94f5160bc791eea.png" alt="AR preview combining a forest background, pink cat hat and pixel-art cats in the foreground." width="319" height="764" loading="lazy" decoding="async" />

<p>Finally, adding foreground objects is easy — just follow the same steps again: add your images, assign them as textures to two new materials, and then assign the materials to two new rectangle objects in your scene! As always, you can customise the scale and position as needed.</p>

<h3><strong>STEP 3: ANIMATING ASSETS</strong></h3>

<p>You can also add animation to your scene by extracting the frames of an animated gif (or drawing them yourself!).</p>

<p>Here, we’ve taken a gif of a cat sprite, extracted the frames using a free website, and then added them to our project.</p>

<p>Once in your assets window, make sure you select ALL the image frames. Once selected, in the properties window, change the Type to Texture Sequence.</p>

<!-- medium-image:1*fQBfuIM3W2yQ7K0B8HdeNA.png alt-decision:meaningful -->

<img src="/blog-media/fc508ed4ffae2dd03a1d4ee43e30f07c9f46982413d0c6c5ff860226fe6ae1a0.png" alt="Assets panel with all 12 extracted cat animation frames selected." width="443" height="634" loading="lazy" decoding="async" />

<!-- medium-image:1*Bl0tjQyFH2I1w7ktd6WeCg.png alt-decision:meaningful -->

<img src="/blog-media/962034b0b44e3f6e4664d953afa453d60904177b3920b9fdad9023c1dd2265ad.png" alt="Texture Type menu with Texture Sequence highlighted for the selected animation frames." width="549" height="287" loading="lazy" decoding="async" />

<p>Now we do the usual process, but with one extra step at the start: create a new Animation Sequence in your Asset window and assign your animated texture. Then assign your animation sequence to a new material, and assign your material to a rectangle object in your scene. Then we’re all done! Note in the Animation Sequence properties you can also change the FPS property depending on how fast you want your animation to run.</p>

<p>In our project below, the animated image is named <strong>cat3</strong>, the animation sequence is named <strong>cat3Anim</strong>, the material is named <strong>cat3Mat</strong>, and the scene object is named <strong>cat3Obj</strong>.</p>

<!-- medium-image:1*ThVKbvYndkzWIOhMQJ08Mg.png alt-decision:meaningful -->

<img src="/blog-media/b22a64e5ffa08d1417b8553f1bf013c497cf278b4e4d06fbfc9a8edd4aeae6dc.png" alt="cat3Anim settings using the cat3 texture for a looping 12-frame animation at 8 FPS." width="549" height="418" loading="lazy" decoding="async" />

<!-- medium-image:1*lNsqP8pF2FcGglzNCN_dNw.png alt-decision:meaningful -->

<img src="/blog-media/f7c20a42cbd416efb2568c1d2bd43db930ece49bb535235e4ded7793d52f0e75.png" alt="Material inspector showing the cat3Anim animation sequence assigned to cat3Mat." width="545" height="356" loading="lazy" decoding="async" />

<!-- medium-image:1*iQV73nNIM4gsW55NS3sZEw.png alt-decision:meaningful -->

<img src="/blog-media/4006ee539579fd8a795a60f26aa8b6a7ccbabcb82a0fee83ce3d72844d113796.png" alt="Inspector for the cat3Obj rectangle with cat3Mat assigned in the Materials section." width="550" height="364" loading="lazy" decoding="async" />

<p><strong>STEP 4: PUTTING IT ALL TOGETHER</strong></p>

<p>Finally, we’ve created a full scene!</p>

<!-- medium-image:0*0SRdtTKNCPgE-AdY alt-decision:meaningful -->

<img src="/blog-media/eefcbb51b31bde9629f7f2566f454c3e592a8dc64fce5d74362884a3b8fe0973.gif" alt="AR scene tracking a pink cat-shaped hat above a moving user's head, with a forest background and pixel-art cats in front." width="306" height="752" loading="lazy" decoding="async" />

<p>We’ve focused on using 2D images for this project, but you can also do the same with 3D objects — just download free .fbx 3D model files online and import them into Meta Spark.</p>

<h3><strong>Common Pitfalls</strong></h3>

<p>Don’t forget to uncheck “Use Depth Test” in the Advanced Render Options for any materials that you want to always appear in front of other objects. We do this with our 3 cats in the scene so that they always appear in front of the user.</p>

<h3><strong>Tips and Tricks</strong></h3>

<p>Once you get familiar with the basic process, adding new images and displaying them in your scene is easy! To recap, the basic process is:</p>

<ul>
<li>Add an image asset</li>
<li>Create a new material and assign the image as a texture</li>
<li>Create an object in your scene and assign the material</li>
</ul>

<p>And that’s all it takes to display the object! Afterwards, you can customise the object properties such as position, scale, etc. to perfect your scene.</p>

<h3><strong>WANT TO LEARN MORE?</strong></h3>

<p>Our team runs a Meta Spark Studio Bootcamp for all ages. If you or your organisation is interested in learning how to create immersive and engaging AR experiences, reach out to us at <a href="mailto:hello@tk.sg">hello@tk.sg</a> and we’ll be glad to design a comprehensive bootcamp that fits your specific needs!</p>

<h3><strong>SAMPLE PROJECTS YOU’LL MAKE</strong></h3>

<!-- medium-image:0*nyhVVzgYw1Ml5gB4 alt-decision:meaningful -->

<img src="/blog-media/ab4856cd4f27ba659a95e003070d70bcf65057dc149aff61566eacfbd48f3e6b.gif" alt="Animating Images demo: a phone finds an illustration on a laptop screen, then displays tracked AR content over it." width="480" height="368" loading="lazy" decoding="async" />

<!-- medium-image:0*PCBYQji0JVh5LMXL alt-decision:meaningful -->

<img src="/blog-media/5a19df89a92db4355140abcbc88e7ed8edda1036e19dbccb270bfbb28ec3137e.gif" alt="Fruit Catcher AR game with fruit moving around a user's tracked face toward a basket below their chin." width="224" height="480" loading="lazy" decoding="async" />
