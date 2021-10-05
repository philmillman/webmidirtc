---
theme: sky
---
## JAMStack Conf 2021 - "Synthless" Jams with your friends 
> aka WebMIDIRTC 

---

## about me 

Sr. DevRel Engineer @ Daily

@philmillman

----

working remotely from Hamilton, ON, Canada 

----

recovering musician 

---

## How it started

![young phil](assets/young.jpeg)

----

## How it's going 


![old phil](assets/oldphil.jpg)

---

## How it started

![picturephone](https://d3v93rzqvnwm3k.cloudfront.net/photos/images/01af1fd0003e8b9e292e937bff4fa795_six_column.jpg)

----

## How it's going 

<button id="start-call" onclick="startCall()">Start Call</button>
<button id="end-call" onclick="endCall()">End Call</button>

---

## How it started

![prophet600](http://www.vintagesynth.com/sites/default/files/2017-05/sci_prophet_600.jpg)

----

![tr909](https://bucket.mn2s.com/wp-content/uploads/2018/10/13144359/TR-909-1024x488.png)

----

![msq700](https://images.equipboard.com/uploads/item/image/18346/roland-msq-700-xl.jpg?v=1632850629)

----

## How it's going 

[HTML5 Drum Machine](https://html5drummachine.com/virtual-drum-machine/)

----

[Bandlab](https://www.bandlab.com/mix-editor)

----

[Ludotune](https://ludotune.com/)

---

![whoa](https://c.tenor.com/9ZG-5Xvufw4AAAAC/whoa-bill-and-ted.gif)

---

## How it started

![90s](https://www.cs.sjsu.edu/CRC/newsroom/mh325-reorg/mh325_b4_server_rack_closeup.jpg)

----

![ftp](https://images.betanews.com/screenshots/1034751598-2.png)

----

![svn](https://tortoisesvn.net/assets/img/TMerge_TwoPane.6228d733.png)


----

## How it's going

![netlify](https://paper-attachments.dropbox.com/s_9D16386200D3BB757573B539C53310D409A5E61A65F769485F2BE3D1E0F27109_1559078069338_deploy-preview-video.gif)


---

Let's put all of this together <br> and create something awesome

---

## The stack

----

## ... for jamming

---

App 

- Vue
- created via `vue-cli` 
- adapted from older project


---

Video

[![webrtcagent](https://webrtcforthecurious.com/docs/images/01-webrtc-agent.png)](https://webrtcforthecurious.com/docs/01-what-why-and-how/)


----

![call types](https://docs.daily.co/assets/guides-intro-to-video-arch-p2p-v-sfu.png)

----


<figure class="video_container">
  <video controls="false" loop="true" allowfullscreen="true" poster="path/to/poster_image.png">
    <source src="https://daily-web.s3.us-west-2.amazonaws.com/www-daily-co/web-assets/videos/prebuiltHeroVideo.mp4" type="video/mp4">
  </video>
</figure>

----

```html
<script src="https://unpkg.com/@daily-co/daily-js"></script>
<script>
  callFrame = window.DailyIframe.createFrame();
  callFrame.join({ url: 'https://you.daily.co/hello' });
</script>
```

---

MIDI

----

<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/static/v1/midi-1632878905307.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/static/v1/midi-1632878905307.png">
<img src="https://caniuse.bitsofco.de/static/v1/midi-1632878905307.jpg" alt="Data on support for the midi feature across the major browsers from caniuse.com">
</picture>

----

![webmidijs](https://camo.githubusercontent.com/20f4b9b002be456ebb36e60ee4249607099c763de6eee6514e8dc3174b46e529/68747470733a2f2f646a6970636f2e6769746875622e696f2f7765626d6964692f696d672f7765626d6964696a732d6c6f676f2e737667)

---

Hardware 

![digis](assets/digis.jpg)

----

## Digitakt 

- Drum "computer" 
- Sampler
- MIDI Sequencer

----

## Digitone

- "Modern" FM synth
- MIDI Sequencer 

----

## TL;DR 

🥁 + 🎹

---

Quick app preview [🔎](http://localhost:8080/)

---

Now a quick code tour 👨‍💻

---

![jaaaam](https://c.tenor.com/0sOaC4uXCWUAAAAC/jam-will-smith.gif)

---

# what next!? 

----

more MIDI 

![mrcc](https://i2.wp.com/conductivelabs.com/wp-content/uploads/2020/06/MRCC-box-clip-white.png?fit=1820%2C500&ssl=1)

----

more devices 

![synthcave](https://www.synthtopia.com/wp-content/uploads/2011/11/synth-cave.jpg)

----

more collaboration 

- remote sampling
- remote MIDI input/control
- remote looping 

----

more control

- participant roles
- MIDI command queuing 

----

more features

- recording
- live streaming
- fully custom call UI 

---

## Acknowledgements 

----

inspiration

- Github Noops
- Thomann Stompenberg 

----

## thanks

- open source 
  - Vue, WebMidi.js
- Daily
- Netlify, and JAMStack Conf team

---

![thanks](https://media3.giphy.com/media/E8rJEUMGs9cyWEtNXT/giphy.gif?cid=ecf05e4756iux049yzmgnqvecep4k89mavv93pmiut61odqx&rid=giphy.gif&ct=g)

