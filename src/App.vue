<template>

  <TeamNavi></TeamNavi>
  <router-view/>
  <TeamFooter/>
</template>

<script setup>

import TeamFooter from './components/TeamFooter.vue'
import TeamHeader from './components/TeamHeader.vue'
import TeamNavi from "@/components/TeamNavi.vue";
import VueNativeSock from 'vue-native-websocket';


// Vue.use(VueNativeSock, 'http://127.0.0.1:8000/', {
//   store: Vue.store,
//   format: 'json',
//   reconnection: true,
// });



// export default {
//   name: 'App',
//   components: {
//     TeamFooter, 
//     TeamHeader
//   }
// }
</script>

<style >

</style>
