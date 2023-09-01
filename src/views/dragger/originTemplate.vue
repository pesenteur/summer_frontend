<template>
  <div>
    111
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import originAPI from '@/api/originDesign'
onMounted(async ()=>{
  const result = await originAPI.attainTemplate()
  console.log('template result.data',result.data)
})
</script>

<style scoped>

</style>