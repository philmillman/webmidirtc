<template>
  <div id="app">
    <Master string="test" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Master from './components/Master.vue'

export default {
  name: 'app',
  components: {
    Master
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
