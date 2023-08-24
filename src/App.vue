<template>
  <TeamHeader class="guidance"/>
  <router-view/>
  <TeamFooter/>
</template>

<script setup>

import TeamFooter from './components/TeamFooter.vue'
import TeamHeader from './components/TeamHeader.vue'


// export default {
//   name: 'App',
//   components: {
//     TeamFooter, 
//     TeamHeader
//   }
// }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.guidance{
  position:relative;
}
</style>
