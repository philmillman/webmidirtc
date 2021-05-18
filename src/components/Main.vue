  /* eslint-disable */ 
<template>
  <div class="page-container">
    <div class="daily-call-container">
      <div id="call-wrapper">

      </div>
      <div class="call-controls">

        <button @click="joinCall()">Join</button>
      </div>
    </div>
    <div class="controls-container">
      <h1>WebMIDIRTC</h1>
      <span class="flash-message">{{message}}</span>
      <div>
        <h2>Playback</h2>
        <button @click="controlMessage('play')">▶</button>
        <button @click="controlMessage('stop')">🛑</button>
        <h3>Patterns</h3>
        <button @click="controlMessage('prog1')">1</button>
        <button @click="controlMessage('prog2')">2</button>
        <button @click="controlMessage('prog3')">3</button>
        <button @click="controlMessage('prog4')">4</button>
        <h3>Tracks</h3>
        Mute
        <button @click="controlMessage('mute1')">1</button>
        <button @click="controlMessage('mute2')">2</button>
        <button @click="controlMessage('mute3')">3</button>
        <button @click="controlMessage('mute4')">4</button>
        Unmute
        <button @click="controlMessage('unmute1')">1</button>
        <button @click="controlMessage('unmute2')">2</button>
        <button @click="controlMessage('unmute3')">3</button>
        <button @click="controlMessage('unmute4')">4</button>
      </div>
      <div>
        <h2>Delay</h2>
        <input 
          name="dn-delay-vol" 
          type="range" 
          step="1" 
          min="0" 
          max="127" 
          title="delay volume" 
          @change="controlMessage('delayVol',$event.target.value)">
        <label for="dn-delay-vol">Volume</label>
        <br>
        <input 
          name="dn-delay-fbk" 
          type="range" step="1" 
          min="0" 
          max="65" 
          title="delay feedback"
          @change="controlMessage('delayFbk',$event.target.value)">
        <label for="dn-delay-fbk">Feedback</label>
        <br>
        <input name="dn-delay-vol"
        type="range" 
        step="1" 
        min="0" 
        max="127" 
        title="delay time"
        @change="controlMessage('delayTime',$event.target.value)">
        <label for="dn-delay-time">Time</label> 
      </div>
      <div>
        <h2>Reverb</h2>
        <input 
          name="dt-verb-vol" 
          type="range" 
          step="1" 
          min="0" 
          max="127" 
          title="verb volume" 
          @change="controlMessage('verbVol',$event.target.value)">
        <label for="dt-verb-vol">Volume</label>
        <br>
        <input 
          name="dt-verb-decay" 
          type="range" step="1" 
          min="0" 
          max="127" 
          title="verb decay"
          @change="controlMessage('verbDecay',$event.target.value)">
        <label for="dt-verb-decay">Decay</label>
        <br>
        <input name="dt-verb-vol"
        type="range" 
        step="1" 
        min="0" 
        max="127" 
        title="verb predelay"
        @change="controlMessage('verbPredelay',$event.target.value)">
        <label for="dt-verb-predelay">Predelay</label> 
      </div>
    </div>
  </div>
</template>

<script>
import DailyIframe from '@daily-co/daily-js';
import WebMidi from "webmidi";

import { msgMap } from '../lib/controlMap';

const ROOM_URL = 'https://devrel.daily.co/midirtc'; 


const CALL_OPTIONS = {
  url: ROOM_URL,
  showLeaveButton: true,
  iframeStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '50%',
    height: '80%'
  },
}


export default {
  name: "Main",
  data: function() {
    return {
      devices: [],
      output: {},
      localMidi: false,
      participants: [],
      localParticipant: {},
      callframe: {},
      message: '',
    };
  },
  created: function() {
    this.getDevices();
    
    const wrapper = document.getElementById("call-wrapper"); 

    this.callframe = DailyIframe.createFrame(CALL_OPTIONS);

    this.callframe
      .on('joined-meeting', (e) => {
        console.log("Event: ",e);
      })
      .on('participant-joined', (e) => {
        console.log("Event: ",e);
        if(e.participant.user_id !== this.localParticipant.user_id) {
            this.updateParticipants();
        }
      })
      .on('participant-updated', (e) => {
        console.log("Event: ",e);
        this.updateParticipants();
      })
      .on('participant-left', (e) => {
        console.log("Event: ",e);
        this.updateParticipants();
        this.updateRaisedHands({handState: false, ...e.participant});
      })
      .on('app-message', ({ data }) => {
        console.log("message: ", data);
        this.flashMessage(data);
        if (this.localMidi) {
          this.controlMessage(data.name, data.val);
        }
      });

  },
  methods: {
    joinCall: async function() {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get("token") || '';
      this.participants = await this.callframe.join({ token });
      this.localParticipant = participants.local;
    },
    getDevices: function() {
      WebMidi.enable(err => {
        if (err) {
          console.log("WebMidi could not be enabled.", err);
        } else {
          console.log("WebMidi enabled!");
        }

        this.devices = WebMidi.outputs;
        this.output = this.devices[0];
        // TODO add owner check
        this.localMidi = this.output ? true : false;
      })
    },
    sendMidiCC: function(cc, value, chan) {
      this.output.sendControlChange(cc, value, chan)
    },
    muteTrack: function(cc,chan) {
      // refactor to be device agnostic
      this.mutes[chan] = this.mutes[chan] ? 0 : 127;
      this.sendMidiCC(cc, this.mutes[chan], chan)
    },
    updateParticipants: async function () {
      const participants =  await this.callframe.participants();
      this.participants = Object.keys(participants).map((key) => participants[key]);
    },
    flashMessage: function (data) {
      this.message = `Someone changed ${data.name}`
      setTimeout(() => this.message = '', 5000)
    }, 
    controlMessage: function (name, val = false) {
      if (this.localMidi) {
        if (val) {
          this.output[msgMap[name].method](...msgMap[name].params(val) || '')
        } else {
          this.output[msgMap[name].method](...msgMap[name].params || '')
        }
      } else {
        this.callframe.sendAppMessage(
          { name, val },
          "*"
        )
      }
    }
  }
};
</script>

<style>
  .controls-container {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .daily-call-container {
    width: 50%;
    display: flex;
  }

  .call-controls {
    margin-top: 80%;
  }
  .page-container{
    display: flex;
    width: 100%;
  }
</style>
