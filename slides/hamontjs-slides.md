---
title: Noops!...I Did It Again
theme: sky
revealOptions:
    transition: 'fade'
---
# Noops!...I Did It Again

## Fun with Web MIDI

---

## about me

[themillman.com](https://themillman.com)

- Sr. Manager, Client & API/CLI Engineering @ DigitalOcean
- Recovering musician
- Jurassic Park historian

---

## Inspiration

- [Noops by Github](https://noopschallenge.com/)
- [Drumbot](https://noopschallenge.com/challenges/drumbot)
- [Melodybot](https://noopschallenge.com/challenges/melodybot)

---

## A brief history of MIDI

"MIDI (/ˈmɪdi/; short for Musical Instrument Digital Interface) is a technical standard that describes a communications protocol, digital interface, and electrical connectors that connect a wide variety of electronic musical instruments, computers, and related audio devices for playing, editing and recording music.[1]...

----

...A single MIDI link through a MIDI cable can carry up to sixteen channels of information, each of which can be routed to a separate device or instrument. This could be sixteen different digital instruments, for example."

[source](https://en.wikipedia.org/wiki/MIDI)

---

## A briefer overview of MIDI on the web

From the overview [here](https://www.midi.org/17-the-mma/99-web-midi):

- Works on all platforms and devices. Anything with a web browser can run a Web-MIDI app and use local MIDI hardware.

----

- Works with your existing MIDI setup. If your MIDI gear is connected to your computer, tablet or phone (by a cable or even wirelessly) that same connection will connect your MIDI gear to your Web-MIDI enabled browser.

----

- Updates are automatic. No need to install new versions, the latest version is always available at the website URL.
- Accessible anywhere. Apps and data in "the Cloud" are available anywhere you have an internet connection.
- It's the Internet! Browsers make it easy to connect you and your music to other people via social media and on-line MIDI communities.

----

## Browser Support

[caniuse](https://caniuse.com/#feat=midi)

---

## Our goal today

- Understand the basics of the WebMidi API 💻
- Use WebMidi to control a drum machine and a synthesizer 🥁 🎹
- Make some sweet (randomly generated) tunes 🎶
- Have fun!!! 🎉

---

## Assumptions

- You understand the basics of browser APIs and how to work with them
- You are familiar with JavaScript
- You know what [npm](https://npm.org) is

----

- You have heard of [Vue.js](https://vuejs.org/)
- You have a basic understanding of the command line (CLI)
- You have listened to music at some point

----

### if any of this is unfamiliar, I'll do my best to answer any questions at the end

---

# Let's get started

---

## Our app

- based on [Vue CLI](https://cli.vuejs.org/)
  - using [webmidi.js](https://github.com/djipco/webmidi)
- using Drumbot and Melodybot public API endpoints
- minimal UI
- focused on sending MIDI to hardware

---

## Our hardware

- [Arturia DrumBrute Impact](https://www.arturia.com/products/hardware-synths/drumbrute-impact/overview)
- [Arturia MicroFreak](https://www.arturia.com/products/hardware-synths/microfreak/overview)
- [Focusrite Scarlett 18i8 gen 3](https://focusrite.com/usb-audio-interface/scarlett/scarlett-18i8)

---

## Signal flow

### MIDI 
computer (usb) => scarlett (midi) => microfreak (midi) => drumbrute

### Audio 
(drumbrute + microfreak) (analog) => scarlet (usb) => computer && (analog) => speakers


---

## Flow

1. Fetch drum and melody data 🥁🎹
2. Send MIDI notes to hardware 🎶
3. Hardware plays sound 🔊
4. Randomize 
5. Repeat!!

---

## Demo

1. App
2. Play with different settings
3. Show Vue devtools as a simple editor

---

## Code

---

## In Conclusion

---

## Constraints

- simplicity breeds creativity
- focus on tweaking hardware
- avoid decision paralysis 

---

## Gotchas

- Wiring order matters
- Sequencing is hard
- RTFM

---

## Links

- [this presentation](https://github.com/philmillman/hamontjs-webmidi/blob/master/overview.md)
- [github repo for sample app](https://github.com/philmillman/hamontjs-webmidi)
- [awesome webmidi apps](https://www.midi.org/17-the-mma/99-web-midi)

---

# Questions?

---

## Thank you!!

[@philmillman](https://twitter.com/philmillman) - [themillman.com](https://themillman.com)
