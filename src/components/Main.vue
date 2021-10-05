/* eslint-disable */
<template>
  <main class="page-container">
    <div class="daily-call-container">
      <div class="daily-call" id="call-wrapper"></div>
    </div>
    <div class="controls-container">
      <div class="main-controls">
        <p class="flash-message">
          {{ message || "[See incoming changes here]" }}
        </p>
        <div class="call-controls">
          <div class="daily-controls">
            <h3>Call controls</h3>

            <button class="join-button" @click="joinCall()" :disabled="joined">
              Join
            </button>
          </div>
          <div>
            <h3>Playback</h3>

            <div class="button-container">
              <button class="play-button" @click="controlMessage('play')">
                <img class="icon-control" :src="playIcon" alt="Play" />
              </button>
              <button class="stop-button" @click="controlMessage('stop')">
                <img class="icon-control" :src="stopIcon" alt="stop" />
              </button>
            </div>
          </div>
        </div>

        <div class="column-section">
          <div>
            <h3>Digitone Tracks</h3>
            <div class="control-section">
              <h4>Mute</h4>

              <div class="button-container">
                <button @click="controlMessage('muteDN', 1)">1</button>
                <button @click="controlMessage('muteDN', 2)">2</button>
                <button @click="controlMessage('muteDN', 3)">3</button>
                <button @click="controlMessage('muteDN', 4)">4</button>
              </div>
            </div>
            <div class="control-section">
              <h4>Unmute</h4>
              <div class="button-container">
                <button @click="controlMessage('unmuteDN', 1)">1</button>
                <button @click="controlMessage('unmuteDN', 2)">2</button>
                <button @click="controlMessage('unmuteDN', 3)">3</button>
                <button @click="controlMessage('unmuteDN', 4)">4</button>
              </div>
            </div>
          </div>
          <div>
            <h3>Patterns</h3>
            <h4 class="transparent">.</h4>

            <div class="button-container">
              <button @click="controlMessage('prog1')">1</button>
              <button @click="controlMessage('prog2')">2</button>
              <button @click="controlMessage('prog3')">3</button>
              <button @click="controlMessage('prog4')">4</button>
            </div>
          </div>
        </div>

        <h3>Digitakt Tracks</h3>
        <div class="control-section">
          <h4>Mute</h4>
          <div class="button-container">
            <button @click="controlMessage('muteDT', 1)">1</button>
            <button @click="controlMessage('muteDT', 2)">2</button>
            <button @click="controlMessage('muteDT', 3)">3</button>
            <button @click="controlMessage('muteDT', 4)">4</button>
            <button @click="controlMessage('muteDT', 5)">5</button>
            <button @click="controlMessage('muteDT', 6)">6</button>
            <button @click="controlMessage('muteDT', 7)">7</button>
            <button @click="controlMessage('muteDT', 8)">8</button>
          </div>
        </div>
        <div class="control-section">
          <h4>Unmute</h4>
          <div class="button-container">
            <button @click="controlMessage('unmuteDT', 1)">1</button>
            <button @click="controlMessage('unmuteDT', 2)">2</button>
            <button @click="controlMessage('unmuteDT', 3)">3</button>
            <button @click="controlMessage('unmuteDT', 4)">4</button>
            <button @click="controlMessage('unmuteDT', 5)">5</button>
            <button @click="controlMessage('unmuteDT', 6)">6</button>
            <button @click="controlMessage('unmuteDT', 7)">7</button>
            <button @click="controlMessage('unmuteDT', 8)">8</button>
          </div>
        </div>
      </div>
      <div class="ranges-container">
        <div class="range-container">
          <h3>Delay</h3>
          <label for="dn-delay-vol">Volume</label>

          <input
            name="dn-delay-vol"
            type="range"
            step="1"
            min="0"
            max="127"
            title="delay volume"
            @change="controlMessage('delayVol', $event.target.value)"
          />
          <label for="dn-delay-fbk">Feedback</label>

          <input
            name="dn-delay-fbk"
            type="range"
            step="1"
            min="0"
            max="65"
            title="delay feedback"
            @change="controlMessage('delayFbk', $event.target.value)"
          />
          <label for="dn-delay-time">Time</label>

          <input
            name="dn-delay-vol"
            type="range"
            step="1"
            min="0"
            max="127"
            title="delay time"
            @change="controlMessage('delayTime', $event.target.value)"
          />
        </div>
        <div class="range-container">
          <h3>Reverb</h3>
          <label for="dt-verb-vol">Volume</label>
          <input
            name="dt-verb-vol"
            type="range"
            step="1"
            min="0"
            max="127"
            title="verb volume"
            @change="controlMessage('verbVol', $event.target.value)"
          />
          <label for="dt-verb-decay">Decay</label>
          <input
            name="dt-verb-decay"
            type="range"
            step="1"
            min="0"
            max="127"
            title="verb decay"
            @change="controlMessage('verbDecay', $event.target.value)"
          />
          <label for="dt-verb-predelay">Predelay</label>
          <input
            name="dt-verb-vol"
            type="range"
            step="1"
            min="0"
            max="127"
            title="verb predelay"
            @change="controlMessage('verbPredelay', $event.target.value)"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import DailyIframe from "@daily-co/daily-js";
import WebMidi from "webmidi";

import { msgMap } from "../lib/controlMap";

const ROOM_URL = "https://devrel.daily.co/midirtc";

const CALL_OPTIONS = {
  url: ROOM_URL,
  showLeaveButton: true,
  iframeStyle: {
    aspectRatio: 16 / 10,
    border: "1px solid #e6eaef",
    borderRadius: "6px 6px 0 0",
    boxShadow: `0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02),
      0 4px 8px rgba(0, 0, 0, 0.02), 0 8px 16px rgba(0, 0, 0, 0.02),
      0 16px 32px rgba(0, 0, 0, 0.02)`,
  },
};

export default {
  name: "Main",
  data: function() {
    return {
      devices: [],
      outputDN: {},
      outputDT: {},
      localMidi: false,
      participants: [],
      localParticipant: {},
      callframe: {},
      joined: false,
      message: "",
      playIcon: require("../assets/play-solid.svg"),
      stopIcon: require("../assets/stop-solid.svg"),
    };
  },
  mounted: function() {
    this.getDevices();

    const wrapper = document.getElementById("call-wrapper");
    if (wrapper) {
      this.callframe = DailyIframe.createFrame(wrapper, CALL_OPTIONS);

      this.callframe
        .on("joined-meeting", (e) => {
          console.log("Event: ", e);
        })
        .on("participant-joined", (e) => {
          console.log("Event: ", e);
          if (e.participant.user_id !== this.localParticipant.user_id) {
            this.updateParticipants();
          }
        })
        .on("participant-updated", (e) => {
          console.log("Event: ", e);
          this.updateParticipants();
        })
        .on("participant-left", (e) => {
          console.log("Event: ", e);
          this.updateParticipants();
        })
        .on("left-meeting", (e) => {
          console.log("Event: ", e);
          this.participants = [];
          this.localParticipant;
          this.joined = false;
        })
        .on("app-message", ({ data }) => {
          console.log("message: ", data);
          this.flashMessage(data.message);
          if (this.localMidi) {
            this.controlMessage(data.name, data.val);
          }
        });
    }
  },
  methods: {
    joinCall: async function() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token") || "";
      this.participants = await this.callframe.join({ token });
      this.localParticipant = this.participants.local;
      if (!this.localParticipant.owner) {
        //hack for remote participants w/ midi devices
        this.localMidi = false;
      }
      this.joined = true;
    },
    getDevices: function() {
      WebMidi.enable((err) => {
        if (err) {
          console.log("WebMidi could not be enabled.", err);
          //todo return here?
        } else {
          console.log("WebMidi enabled!");
        }

        this.devices = WebMidi.outputs;
        this.outputDT = WebMidi.getOutputByName("Elektron Digitakt");
        this.outputDN = WebMidi.getOutputByName("Elektron Digitone");
        // TODO add owner check
        this.localMidi = this.outputDN ? true : false;
      });
    },
    updateParticipants: async function() {
      const participants = await this.callframe.participants();
      this.participants = Object.keys(participants).map(
        (key) => participants[key]
      );
    },
    flashMessage: function(msg) {
      this.message = msg;
      setTimeout(() => (this.message = ""), 5000);
    },
    controlMessage: function(name, val = false) {
      if (this.localMidi) {
        const device = msgMap[name].device;
        console.log("device: ", device);
        if (val) {
          this[device][msgMap[name].method](
            ...(msgMap[name].params(val) || "")
          );
        } else {
          this[device][msgMap[name].method](...(msgMap[name].params || ""));
        }
      } else {
        this.callframe.sendAppMessage(
          { name, val, message: msgMap[name].message },
          "*"
        );
      }
    },
  },
};
</script>

<style>
main.page-container {
  display: flex;
  width: 100%;
  flex: 1;
  margin: 12px 48px;
}
.call-wrapper {
  display: flex;
  margin-bottom: 32px;
}
.controls-container {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.call-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.call-controls h3 {
  margin-bottom: 8px;
  margin-top: 0;
}
.column-section {
  display: flex;
}
.column-section > div:nth-child(1) {
  padding-right: 16px;
}
.column-section > div:nth-child(2) {
  padding-left: 16px;
}
.daily-call {
  width: 100%;
}
.daily-controls {
  display: flex;
  flex-direction: column;
}
.daily-call-container {
  display: flex;
  flex: 1;
  width: 100%;
}
.flash-message {
  text-align: left;
  margin-top: 0;
  font-style: italic;
}
h3 {
  text-align: left;
  font-weight: bold;
  margin: 32px 0 16px;
}
h4 {
  margin: 8px 0 4px;
  text-align: left;
  font-weight: normal;
}

.join-button {
  background-color: #377758;
}
.join-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-control {
  height: 16px;
  padding-top: 2px;
  color: #fff;
}
.button-container {
  display: flex;
}
.button-container button:nth-child(1) {
  background-color: #ade5cf;
}
.button-container button:nth-child(2) {
  background-color: #96ddcf;
}
.button-container button:nth-child(3) {
  background-color: #81d4d3;
}
.button-container button:nth-child(4) {
  background-color: #6bbbcb;
}
.button-container button:nth-child(5) {
  background-color: #569bc1;
}
.button-container button:nth-child(6) {
  background-color: #4a74ab;
}
.button-container button:nth-child(7) {
  background-color: #3e5194;
}
.button-container button:nth-child(8) {
  background-color: #32337c;
}
.button-container button:nth-child(9) {
  background-color: #342764;
}
.button-container .play-button:nth-child(1) {
  background-color: #7dd887;
}
.button-container .stop-button:nth-child(2) {
  background-color: #e23039;
}

.main-controls,
.ranges-container {
  max-width: 424px;
}
.ranges-container {
  display: flex;
  width: 100%;
}
.range-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

input[type="range"] {
  max-width: 100%;
  -webkit-appearance: none;
  height: 16px;
  background: rgba(255, 255, 255, 0.6);

  border-radius: 5px;
  background-image: linear-gradient(#bbebe2, #96ddcf);
  margin: 0 8px 16px;
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #52a396;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

.transparent {
  color: transparent;
}

iframe {
  width: 100%;
  height: auto;
}

@media only screen and (max-width: 1025px) {
  main.page-container {
    flex-direction: column;
  }
  iframe {
    width: 424px;
  }
  .controls-container {
    align-items: flex-start;
  }
  .call-wrapper {
    display: flex;
  }
  .daily-call {
    display: flex;
  }
  iframe {
    margin-right: auto;
    margin-bottom: 32px;
  }
}
@media only screen and (max-width: 525px) {
  main.page-container {
    flex-direction: column;
    margin: 8px;
  }
  iframe {
    width: 90%;
  }
  .controls-container,
  .main-controls {
    width: 90%;
  }
  .call-controls {
    flex-direction: column;
    align-items: flex-start;
  }
  .controls-container {
    align-items: flex-start;
  }
  .column-section {
    flex-direction: column-reverse;
  }
  .column-section > div:nth-child(2) {
    padding: 0;
  }
  .button-container {
    flex-wrap: wrap;
  }
  .button-container button {
    margin-bottom: 4px;
  }
  .transparent {
    display: none;
  }
  h3 {
    margin: 16px 0 4px;
  }
}
</style>
