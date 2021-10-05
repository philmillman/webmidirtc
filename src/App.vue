<template>
  <div id="app">
    <Header />
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Header from "./components/Header.vue";

export default {
  name: "app",
  components: {
    Header,
    Main,
  },
};
</script>

<style>
button {
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  margin: 0 4px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
