<template>
  <div class="container">
    <h1>#hamontjs - web midi demo</h1>
    <h2>{{ tracks.drums.name }} - {{ tracks.melody.generator }}, {{ loops }}X @ {{ bpm || tracks.drums.beatsPerMinute }} bpm</h2>
    <select v-model="selectedDrumPattern" @change="getDrumBotData(selectedDrumPattern)">
      <option
        v-for="option in drumbotOptions"
        v-bind:key="option.name"
        :value="option.name"
      >{{ option.name }}</option>
    </select>
    <button @click="getDrumBotData(selectedDrumPattern)">Get Drums</button>
    <br />
    <select v-model="selectedMelodyGenerator" @change="getMelodyData(selectedMelodyGenerator)">
      <option
        v-for="option in melodybotOptions"
        v-bind:key="option.name"
        :value="option.name"
      >{{ option.name }}</option>
    </select>

    <button @click="getMelodyData(selectedMelodyGenerator)">Get Melody</button>
    <br />
    <label for="bpm-override">BPM Override</label>
    <input type="number" step="5" min="0" max="300" v-model="bpm" name="bpm-override" />
    <br />
    <label for="loop-override">Loop Override</label>
    <input type="number" step="1" min="1" max="20" v-model="loops" name="loop-override" />
    <br />
    <button @click="play()">▶</button>
    <button @click="getRandom()">🎲</button>
  </div>
</template>

<script>
// TODO MOVE THIS INTO config
const DRUMBOT_URL = "https://api.noopschallenge.com/drumbot/patterns";
const MELODYBOT_URL = "https://api.noopschallenge.com/melodybot/";

const DRUMBRUTE_MIDI_CHANNEL = "10";
const MICROFREAK_MIDI_CHANNEL = "2";

import WebMidi from "webmidi";
import { bruteMap } from "../config/drumMap";

export default {
  name: "Master",
  data: function() {
    return {
      drumbotOptions: [],
      melodybotOptions: [],
      selectedDrumPattern: "",
      selectedMelodyGenerator: "",
      loops: 1,
      bpm: 0,
      tracks: {
        drums: {},
        melody: {}
      }
    };
  },
  created: function() {
    // get options
    this.getDrumBotPatterns();
    this.getMelodyGenerators();

    // init data
    this.getDrumBotData();
    this.getMelodyData();
  },
  methods: {
    getDrumBotPatterns: function() {
      fetch(DRUMBOT_URL)
        .then(response => response.json())
        .then(data => (this.drumbotOptions = data));
    },
    getMelodyGenerators: function() {
      fetch(MELODYBOT_URL + `generators`)
        .then(response => response.json())
        .then(data => (this.melodybotOptions = data));
    },
    getDrumBotData: function(name = "oontza") {
      this.selectedDrumPattern = name;
      fetch(DRUMBOT_URL + `/${name}`)
        .then(response => response.json())
        .then(data => {
          this.tracks.drums = data;
          this.bpm = this.tracks.drums.beatsPerMinute;
        });
    },
    getMelodyData: function(generator = "arpeggio") {
      this.selectedMelodyGenerator = generator;
      fetch(MELODYBOT_URL + `/random?generator=${generator}`)
        .then(response => response.json())
        .then(data => (this.tracks.melody = data));
    },
    getRandom: function() {
      const randomMelody = this.melodybotOptions[
        Math.floor(Math.random() * this.melodybotOptions.length)
      ].name;
      const randomDrums = this.drumbotOptions[
        Math.floor(Math.random() * this.drumbotOptions.length)
      ].name;

      this.getMelodyData(randomMelody);
      this.getDrumBotData(randomDrums);
      this.bpm = this.tracks.drums.beatsPerMinute;
    },
    play: function() {
      WebMidi.enable(err => {
        if (err) {
          // eslint-disable-next-line
          console.log("WebMidi could not be enabled.", err);
        } else {
          // eslint-disable-next-line
          console.log("WebMidi enabled!");
        }

        //use the first MIDI output device, TODO make this selectable
        const output = WebMidi.outputs[0]; 

        const BPM = this.bpm || this.tracks.drums.beatsPerMinute;
        const DRUMSTEPS = this.tracks.drums.stepCount;
        const MELODYSTEPS = this.tracks.melody.stepCount;
        const STEPS_PER_SECOND = (BPM / 60) * 4;
        const STEP_DURATION_MS = (1 / STEPS_PER_SECOND) * 1000;

        // fake looping by sending multiple 'loops'
        for (let i = 0; i < this.loops; i++) {
          this.tracks.melody.notes.map(note => {
            output.playNote(note.name, MICROFREAK_MIDI_CHANNEL, {
              duration: note.duration * STEP_DURATION_MS,
              time: `+${MELODYSTEPS * i * STEP_DURATION_MS +
                note.start * STEP_DURATION_MS}`
            });
          });

          this.tracks.drums.tracks.map(track => {
            track.steps.map((step, stepIndex) => {
              output.playNote(
                bruteMap[track.instrument].note,
                DRUMBRUTE_MIDI_CHANNEL,
                {
                  duration: STEP_DURATION_MS * step,
                  time: `+${MELODYSTEPS * i * STEP_DURATION_MS +
                    stepIndex * STEP_DURATION_MS}`,
                  velocity: 1 * step
                }
              );

            // DOUBLE UP DRUMS SO SEQ IS SAME LENGTH
              output.playNote(
                bruteMap[track.instrument].note,
                DRUMBRUTE_MIDI_CHANNEL,
                {
                  duration: STEP_DURATION_MS * step,
                  time: `+${MELODYSTEPS * i * STEP_DURATION_MS +
                    stepIndex * STEP_DURATION_MS +
                    DRUMSTEPS * STEP_DURATION_MS}`,
                  velocity: 1 * step
                }
              );

            });
          });

          
        }
      });

      WebMidi.disable();
    }
  }
};
</script>

<style>
</style>
