<template>
  <!-- <el-radio-group v-model="isCollapse" > -->
  <img class="image" @click.stop="changeState" :src="buttonImage">
  <br>
  <br>
  <!-- <el-radio-button :label="true">collapse</el-radio-button> -->
  <!-- </el-radio-group> -->
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
    @close="handleClose">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon> <!-- <location /> is an icon component, ensure it's correctly imported -->
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon> <!-- <icon-menu /> is an icon component, ensure it's correctly imported -->
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <document />
      </el-icon> <!-- <document /> is an icon component, ensure it's correctly imported -->
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon> <!-- <setting /> is an icon component, ensure it's correctly imported -->
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import buttonImage from '@/assets/cat1.png'


const isCollapse = ref(true)


function changeState() {
  isCollapse.value = !isCollapse.value
}

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}


</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  opacity: 0.2;
}

.image {
  position: absolute;
  left: 27px;
  width: 30px;
  height: 30px;
}

.expand-icon::before {
  content: url('@/assets/logo.png');
  /* 路径根据实际情况进行调整 */
}
</style>
