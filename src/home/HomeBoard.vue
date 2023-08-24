<script setup>

import HomeChat from "@/home/HomeChat.vue";
import HomeProject from "@/home/HomeProject.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
      </el-aside>
      <el-main>
        <div class="waterfall-container">
          <HomeChat></HomeChat>
          <HomeProject></HomeProject>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<style scoped>
.waterfall-container {
  column-count: 2; /* 设置列数 */
  column-gap: 20px; /* 列之间的间隔 */
}

.item {
  break-inside: avoid; /* 防止元素被分割到两列 */
  margin-bottom: 20px; /* 项目之间的垂直间隔 */
  background-color: black;
  color: white;
}

.item:nth-child(5n) {
  height: 300px;
}
</style>

