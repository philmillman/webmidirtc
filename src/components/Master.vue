<template>
  <div class="container">
    <button @click="getDrumBotPatterns()">Get Drums</button>
    <br>
    <button @click="getRandomMelodyPattern()">Get Melody</button>
    <br>
    <button @click="playNote()">Play Note</button>
  </div>
</template>

<script>
// TODO MOVE THIS INTO UTIL
const DRUMBOT_URL = 'https://api.noopschallenge.com/drumbot/patterns/nipnop';
const MELODYBOT_URL = 'https://api.noopschallenge.com/melodybot/random';

import WebMidi from 'webmidi';

export default {
  name: 'Master',
  props: {
    msg: String
  },
  data: function(){
    return {
      drums: {},
      melody: {},
    }
  },
  created: function () {

  },
  methods: {
    getDrumBotPatterns: function() {
      fetch(DRUMBOT_URL)
        .then(response => response.json())
        .then(data => this.drums = data)
    },
    getRandomMelodyPattern: function() {
      fetch(MELODYBOT_URL)
        .then(response => response.json())
        .then(data => this.melody = data)
    },
    playNote: function() {

      WebMidi.enable(function (err) {

      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
      }

      console.log("Inputs: ", WebMidi.inputs)
      console.log("Outputs: ", WebMidi.outputs)

      const output = WebMidi.outputs[0];
    
      output.sendStart();
      // output.playNote("F#-1", "all", {velocity: 1});
      output.playNote(["C4","D4","E4"], "all", {duration: 1000});
      });

      WebMidi.disable();  //hacky, fix this
    }
  }

}
</script>

<style>

</style>
