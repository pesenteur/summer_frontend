<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <projectSide/>
      </el-aside>
      <el-main>
        <projectMain/>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>

import projectMain from './projectMain.vue'
import projectSide from './projectSide.vue'



</script>