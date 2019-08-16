<template>
  <div class="container">
    <h2>BPM - {{ drums.beatsPerMinute }} </h2>
    <button @click="getDrumBotPatterns()">Get Drums</button> - {{ drums.name }}
    <br>
    <button @click="getRandomMelodyPattern()">Get Melody</button> - {{ melody.generator }}
    <br>
    <button @click="playNote()">Play Note</button>
  </div>
</template>

<script>
// TODO MOVE THIS INTO UTIL
const DRUMBOT_URL = 'https://api.noopschallenge.com/drumbot/patterns/nipnop';
const MELODYBOT_URL = 'https://api.noopschallenge.com/melodybot/random';

import WebMidi from 'webmidi';
import { setInterval } from 'timers';

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
    //populate inital drums and melody

    this.getDrumBotPatterns();
    this.getRandomMelodyPattern();
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

      var vm = this;

      WebMidi.enable( (err) => {

      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
      }

      console.log("Inputs: ", WebMidi.inputs)
      console.log("Outputs: ", WebMidi.outputs)

      const output = WebMidi.outputs[0];
    
      output.sendStart();

      const BPM = this.drums.beatsPerMinute
      const STEPS = this.melody.stepCount
      const STEPS_PER_SECOND = BPM / 60 * 4
      const STEP_DURATION_MS = 1/STEPS_PER_SECOND * 1000 

      const DRUMBRUTE_MIDI_CHANNEL = "all"

      setInterval(()=>{
        output.sendClock()
      },60000/BPM*24)
      
      this.melody.notes.map((note, index)=>{
        // output.playNote(note.name, "2", {duration:note.duration*STEP_DURATION_MS, time: `+${note.start*STEP_DURATION_MS}`})
        // console.log(`${index}  Note`, note.name, `duration ${note.duration*STEP_DURATION_MS}`, `OFFSET ${note.start*STEP_DURATION_MS}`)
      })

      // TODO DEBUG THIS HOT MESS, SEND MIDI OUT AND USE THAT TO DETERMINE WHAT TO SEND BACK IN
 
      this.drums.tracks.map((track, index)=>{
        track.steps.map((step, stepIndex) => {
          console.log(`${track.instrument} ${stepIndex}`, `duration ${STEP_DURATION_MS*step}`, `OFFSET ${stepIndex*STEP_DURATION_MS}`)
          switch (track.instrument) {
            case "snare":   
              output.playNote("E1", DRUMBRUTE_MIDI_CHANNEL, {duration:STEP_DURATION_MS*step, time: `+${stepIndex*STEP_DURATION_MS}`})
              break;
            case "clap":   
              output.playNote("D#1", DRUMBRUTE_MIDI_CHANNEL, {duration:STEP_DURATION_MS*step, time: `+${stepIndex*STEP_DURATION_MS}`})
              break;
            case "cowbell":   
              output.playNote("G#2", DRUMBRUTE_MIDI_CHANNEL, {duration:STEP_DURATION_MS*step, time: `+${stepIndex*STEP_DURATION_MS}`})
              break;
            case "kick":   
              output.playNote("C1", DRUMBRUTE_MIDI_CHANNEL, {duration:STEP_DURATION_MS*step, time: `+${stepIndex*STEP_DURATION_MS}`})
              break;

          }
        })
      })
      // output.playNote("F#-1", "all", {velocity: 1});
      // output.playNote("C4", "all", {duration: 1000})
      //       .playNote("F4", "all", {duration: 1000, time:"+1000"})
      //       .playNote("G4", "all", {duration: 1000, time:"+2000"});

      // output.sendStop();


      });

      WebMidi.disable();  //hacky, fix this
    }
  }

}
</script>

<style>

</style>
