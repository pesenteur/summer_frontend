<template>
  <div>
    <TeamNavi v-if="shouldShowNavi" />
    <router-view />
    <TeamFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import TeamFooter from './components/TeamFooter.vue';
import TeamNavi from '@/components/TeamNavi.vue';

const route = useRoute();

const shouldShowNavi = computed(() => {
  // 根据需要的条件来判断是否显示 TeamNavi 组件
  // 在这里根据 route.path 或 route.name 来判断是否显示
  return route.path !== '/switch'; // 根据实际情况调整判断条件
});
</script>

<style>
/* Your styles */
</style>
