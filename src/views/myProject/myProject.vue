<script setup>

import projectName from './projectName.vue'

import projectAction from './projectAction.vue'
import announcement from './announcement.vue'
import statics from './statics.vue'
import persons from './persons.vue'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="100px">
      </el-aside>
      <el-main>
        <div class="waterfall-container">
          <projectName class="item"></projectName>
          <projectAction class="item"></projectAction>
          <announcement class="item"></announcement>
          <statics class="item"></statics>
          <persons class="item"></persons>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.waterfall-container {
  column-count: 2;
  /* 设置列数 */
  column-gap: 20px;
  /* 列之间的间隔 */
}

.item {
  width: 90% ;
  break-inside: avoid;
  /* 防止元素被分割到两列 */

  /* 项目之间的垂直间隔 */
  color: white;
  margin-top: 0;
  margin-bottom: 20px;
}

* {
  z-index: 1;
  margin-top: 10px;
}
</style>