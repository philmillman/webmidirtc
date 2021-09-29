<template>
  <div class="daily-call-container">
    <div id="call-wrapper"></div>
    <div class="call-controls">
      <button @click="joinCall()">Join</button>
    </div>
  </div>
</template>

<script>
import DailyIframe from "@daily-co/daily-js";

const ROOM_URL = "https://devrel.daily.co/midirtc";

const CALL_OPTIONS = {
  url: ROOM_URL,
  showLeaveButton: true,
  iframeStyle: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "50%",
    height: "80%",
  },
};

export default {
  name: "Daily",
  data: function() {
    return {
      participants: [],
      callframe: {},
    };
  },
  created: function() {
    const wrapper = document.getElementById("call-wrapper");

    // this.callframe = DailyIframe.createFrame(CALL_OPTIONS);
  },
  methods: {
    joinCall: async function() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token") || "";
      this.participants = await this.callframe.join({ token });
    },
  },
};
</script>

<style>
.daily-call-container {
  width: 50%;
  display: flex;
}

.call-controls {
  margin-top: 80%;
}
</style>
