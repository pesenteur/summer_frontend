<template>

  <TeamNavi></TeamNavi>
  <router-view/>
  <TeamFooter/>
</template>

<script setup>

import TeamFooter from './components/TeamFooter.vue'
import TeamHeader from './components/TeamHeader.vue'
import TeamNavi from "@/components/TeamNavi.vue";


// export default {
//   name: 'App',
//   components: {
//     TeamFooter, 
//     TeamHeader
//   }
// }
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

body,
html {
  margin: 0;
  padding: 0;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #ededed !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
.guidance{
  position:relative;
}
</style>
