<template>

  <div style="position: relative; width: 100%;
               padding-top: calc(100% * 720 / 1280);
               border: 2px rgb(255,255,255) solid;">
    <iframe :src="iframeSrc" title="SUMMER" style="position: absolute; width: 100%; height: 100%; top: 0;">
    </iframe>

  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {getDesignId, getProjId} from "@/utils/token";

const iframeSrc = ref('../../public/dist')

onMounted(()=>{
  iframeSrc.value = `../../public/dist/index.html?design=${getDesignId()}&project=${getProjId()}`;
})

</script>

<style scoped>

</style>