<template>
  <div class="container">
    <h2>{{ tracks.drums.name }} - {{ tracks.melody.generator }}, BPM: {{ bpm || tracks.drums.beatsPerMinute }}</h2>
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
    <input
      type="number"
      step="5"
      min="60"
      max="300"
      v-model="bpm"
      title="bpm override!!"
      name="bpm-override"
    />
    <br />
    <button @click="play()">NOOPS!!</button>
    <button @click="playRandom()">I'm feeling random</button>
  </div>
</template>

<script>
// TODO MOVE THIS INTO UTIL
const DRUMBOT_URL = "https://api.noopschallenge.com/drumbot/patterns";
const MELODYBOT_URL = "https://api.noopschallenge.com/melodybot/";

const DRUMBRUTE_MIDI_CHANNEL = "10";
const MICROFREAK_MIDI_CHANNEL = "2";

import WebMidi from "webmidi";
import { setInterval } from "timers";
import { bruteMap } from "../utils/drumMap";

export default {
  name: "Master",
  data: function() {
    return {
      drumbotOptions: [],
      melodybotOptions: [],
      selectedDrumPattern: "",
      selectedMelodyGenerator: "",
      bpm: 0,
      tracks: {
        drums: {},
        melody: {}
      },
      playing: false
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
        .then(data => (this.tracks.drums = data));
    },
    getMelodyData: function(generator = "arpeggio") {
      this.selectedMelodyGenerator = generator;
      fetch(MELODYBOT_URL + `/random?generator=${generator}`)
        .then(response => response.json())
        .then(data => (this.tracks.melody = data));
    },
    playRandom: function() {
      const randomMelody = this.melodybotOptions[
        Math.floor(Math.random() * this.melodybotOptions.length)
      ].name;
      const randomDrums = this.drumbotOptions[
        Math.floor(Math.random() * this.drumbotOptions.length)
      ].name;

      this.getMelodyData(randomMelody);
      this.getDrumBotData(randomDrums);
    },
    play: function() {
      var vm = this;
      this.playing = !this.playing;

      if (!this.playing) {
        WebMidi.disable();
        return;
      }

      WebMidi.enable(err => {
        if (err) {
          console.log("WebMidi could not be enabled.", err);
        } else {
          console.log("WebMidi enabled!");
        }

        console.log("Inputs: ", WebMidi.inputs);
        console.log("Outputs: ", WebMidi.outputs);

        const output = WebMidi.outputs[0];

        output.sendStart();

        const BPM = this.bpm || this.tracks.drums.beatsPerMinute;
        const DRUMSTEPS = this.tracks.drums.stepCount;
        const MELODYSTEPS = this.tracks.melody.stepCount;
        const STEPS_PER_SECOND = (BPM / 60) * 4;
        const STEP_DURATION_MS = (1 / STEPS_PER_SECOND) * 1000;

        setInterval(() => {
          output.sendClock();
        }, (60000 / BPM) * 24);

        this.tracks.melody.notes.map((note, index) => {
          output.playNote(note.name, MICROFREAK_MIDI_CHANNEL, {
            duration: note.duration * STEP_DURATION_MS,
            time: `+${note.start * STEP_DURATION_MS}`
          });
          console.log(
            `${index}  Note`,
            note.name,
            `duration ${note.duration * STEP_DURATION_MS}`,
            `OFFSET ${note.start * STEP_DURATION_MS}`
          );
        });

        this.tracks.drums.tracks.map((track, index) => {
          track.steps.map((step, stepIndex) => {
            console.log(
              `${track.instrument} ${stepIndex}`,
              `duration ${STEP_DURATION_MS * step}`,
              `OFFSET ${stepIndex * STEP_DURATION_MS}`
            );

            output.playNote(
              bruteMap[track.instrument].note,
              DRUMBRUTE_MIDI_CHANNEL,
              {
                duration: STEP_DURATION_MS * step,
                time: `+${stepIndex * STEP_DURATION_MS}`,
                velocity: 1 * step
              }
            );
          });
        });

        // DOUBLE UP DRUMS SEQ IS SAME LENGTH

        this.tracks.drums.tracks.map((track, index) => {
          track.steps.map((step, stepIndex) => {
            console.log(
              `${track.instrument} ${stepIndex}`,
              `duration ${STEP_DURATION_MS * step}`,
              `OFFSET ${stepIndex * STEP_DURATION_MS + 16 * STEP_DURATION_MS}`
            );

            output.playNote(
              bruteMap[track.instrument].note,
              DRUMBRUTE_MIDI_CHANNEL,
              {
                duration: STEP_DURATION_MS * step,
                time: `+${stepIndex * STEP_DURATION_MS +
                  16 * STEP_DURATION_MS}`,
                velocity: 1 * step
              }
            );
          });
        });

        output.sendStop();
      });

      // WebMidi.disable(); //hacky, fix this
    }
  }
};
</script>

<style>
</style>
