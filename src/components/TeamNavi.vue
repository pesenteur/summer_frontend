<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <TeamHeader1/>

    <div class="flex-grow" />
    <TeamMessage></TeamMessage>
    <div class="flex flex-wrap items-center">
      <el-dropdown>
        <el-button text class="custom-icon-button">
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人简介</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TeamHeader1 from './TeamHeader1.vue'
import TeamMessage from "./TeamMessage.vue";
import {ArrowDown} from "@element-plus/icons-vue";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.custom-icon-button {
  background-image: url('@/assets/avtar.png'); /* 根据您的项目路径调整 */
  background-size: 40px; /* 根据需要调整 */
  background-repeat:no-repeat;
  width: 40px; /* 根据需要调整 */
  height: 40px; /* 根据需要调整 */
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
}
</style>




