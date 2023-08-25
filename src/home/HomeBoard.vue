<script setup>

import HomeChat from "@/home/HomeChat.vue";
import HomeProject from "@/home/HomeProject.vue";
import HomeMessage from "@/home/HomeMessage.vue";
import HomeCarousel from "@/home/HomeCarousel.vue";
import HomeMember from "@/home/HomeMember.vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="100px">
      </el-aside>
      <el-main>
        <div class="waterfall-container">
          <HomeChat class="item"></HomeChat>
          <HomeProject class="item"></HomeProject>
          <HomeMember class="item"></HomeMember>
          <HomeCarousel class="item"></HomeCarousel>
          <HomeMessage class="item"></HomeMessage>
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
  margin-bottom: 20px;
  /* 项目之间的垂直间隔 */
  color: white;
  margin-top: 0;
  margin-bottom: 50px;
}

* {
  z-index: 1;
  margin-top: 10px;
}
</style>

