<template>
  <div>
    <TeamNavi v-if="shouldShowNavi"  />
    <router-view />
    <TeamFooter />
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onBeforeUpdate, onUpdated} from 'vue';
import { useRoute } from 'vue-router';
import TeamFooter from './components/TeamFooter.vue';
import TeamNavi from '@/components/TeamNavi.vue';
import {driver} from "driver.js";
import projAPI from "@/api/proj";
import {getOldArr, getTeamId, getUserId, setIsOld} from "@/utils/token";

const route = useRoute();

const shouldShowNavi = computed(() => {
  // 根据需要的条件来判断是否显示 TeamNavi 组件
  // 在这里根据 route.path 或 route.name 来判断是否显示
  return route.path !== '/switch' && route.path !== '/' && route.path !== '/login' && route.path !== '/preview'; // 根据实际情况调整判断条件
});
const driverObj = driver({
	showProgress: true,
	steps: [
		{ element: '.el-dropdown', popover: { title: '个人界面', description: '点击后可以选择退出或切换团队' } },
		{ element: '.custom-icon-button', popover: { title: '消息中心', description: '点击可以查看自己收到的消息' } },
		{ element: '.home-button', popover: { title: '回到主页', description: '点击可以回到个人主页' } },
		{ element: '.img-decorate', popover: { title: '展示功能中心', description: '点击可以弹出功能栏' } },
		{ element: '.button-container', popover: { title: '功能区', description: '从上到下点击后分别可以进入到项目协作、原型设计、团队管理、聊天室' } },
	]
});
onUpdated(()=>{
	console.log(route)
	// let arr = getOldArr()
	// if (!arr||!arr.includes(getUserId())){
	// 	arr = !arr ? [] : arr;
	// 	arr.push(getUserId())
	// 	setIsOld(arr)
	// 	const buttonElements = window.document.getElementsByClassName('img-decorate')[0]
	// 	driverObj.drive()
	// 	setTimeout(() => {
	// 		driverObj.moveNext()
	// 	}, 1500)
	// 	setTimeout(() => {
	// 		driverObj.moveNext()
	// 	}, 3000)
	// 	setTimeout(() => {
	// 		driverObj.moveNext()
	// 	}, 4500)
	// 	setTimeout(() => {
	// 		buttonElements.click()
	// 	}, 6000)
	// 	setTimeout(() => {
	// 		driverObj.moveNext()
	// 	}, 6500)
	// }
	
	

})

</script>

<style>
* {
  font-family: 'modern_no._20regular', serif;
}
/* Your styles */
</style>
