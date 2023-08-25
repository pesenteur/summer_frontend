<template>
  <div class="back">

    <div class="board">
      <span class="title"
      >选择团体</span
      >
      <br>
      <span class="subtitle"
      >选择后将自动为您跳转到主页面</span
      >
      <el-divider />
      <el-menu
          class="el-menu-vertical-demo"
      >
        <el-menu-item index="1" >
          <div class="moji">
          <el-icon><icon-menu /></el-icon>
          <span  class="moji">23-BUAA-SE-2023-SUMMER </span>
          </div>
        </el-menu-item>
        <el-menu-item index="2">
          <div class="moji">
            <el-icon><icon-menu /></el-icon>
            <span  class="moji">23-BUAA-SE-2023-SUMMER </span>
          </div>
        </el-menu-item>
        <el-menu-item index="3">
          <div class="moji">
            <el-icon><icon-menu /></el-icon>
            <span  class="moji">23-BUAA-SE-2023-SUMMER </span>
          </div>
        </el-menu-item>
        <el-menu-item index="4">
          <div class="moji">
            <el-icon><icon-menu /></el-icon>
            <span  class="moji">23-BUAA-SE-2023-SUMMER </span>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
</script>
<style scoped>
.back{

  height: 770px;
  background-image: linear-gradient(
      rgba(255, 255, 0, 0.5),
      rgba(0, 0, 255, 0.5)
  ), url("@/assets/switchBackGround.png");
}

.board {
  padding-top: 70px;
  width: 30%;
  margin:auto;
}

.moji{

}
.title{
  font-size: 25px;
}

.subtitle{
  font-size: 18px;
  color: #8c8c8c;
}
</style>