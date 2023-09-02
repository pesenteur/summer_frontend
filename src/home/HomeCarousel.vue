<script setup>
import { reactive } from "vue";
let url = ['../assets/cat1.png','../assets/cat2.png','../assets/cat3.png']
</script>
<template>
  <el-carousel indicator-position="outside" class="main">
    <el-carousel-item v-for="item in url" class="main">
      <img :src="item" alt="" style="width:100%;">
    </el-carousel-item>
  </el-carousel>
</template>
<style scoped>
.main {
  width: 730px;
  height: 400px;
}
</style>
