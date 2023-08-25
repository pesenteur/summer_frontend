<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <TeamMessage/>
    <el-sub-menu index="2">
      <template #title>个人中心</template>
      <TeamAvtar></TeamAvtar>
      <el-menu-item index="2-1">个人简介</el-menu-item>
      <el-menu-item index="2-2">我的群聊</el-menu-item>
      <el-menu-item index="2-3">我的项目</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TeamAvtar from "./TeamAvtar.vue";
import TeamMessage from "./TeamMessage.vue";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>




