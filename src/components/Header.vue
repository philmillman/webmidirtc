<template>
  <header>
    <h1>WebMIDIRTC</h1>
    <div>
      <a
        href="https://twitter.com/philmillman"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class="icon" :src="twitterIcon" alt="Phil's Twitter"
      /></a>
      <a
        href="https://github.com/philmillman/webmidirtc"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class="icon" :src="githubIcon" alt="WebMIDIRTC Github repo" />
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      twitterIcon: require("../assets/twitter-brands.svg"),
      githubIcon: require("../assets/github-brands.svg"),
    };
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 48px;
}
.icon {
  height: 24px;
  margin-left: 16px;
}
@media only screen and (max-width: 525px) {
  header {
    margin: 16px 0 4px;
  }
}
</style>
