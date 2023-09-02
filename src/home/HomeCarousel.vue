<script setup>
import { reactive } from "vue";
</script>
<template>
  <el-carousel indicator-position="outside" class="main">
    <el-carousel-item v-for="item in 4" :key="item" class="main">
      <img src="../assets/cat1.png" alt="" style="width:100%;">
    </el-carousel-item>
  </el-carousel>
</template>
<style scoped>
.main {
  width: 730px;
  height: 400px;
}
</style>
