<script setup>

import HomeChat from "@/home/HomeChat.vue";
import HomeProject from "@/home/HomeProject.vue";
import HomeMessage from "@/home/HomeMessage.vue";
import HomeCarousel from "@/home/HomeCarousel.vue";
import HomeMember from "@/home/HomeMember.vue";
import {driver} from "driver.js";
import {onMounted, onUpdated} from "vue";
import {getOldArr, getUserId, setIsOld} from "@/utils/token";

const driverObj = driver({
	showButtons:[],
	showProgress: true,
	allowClose: false,
	steps: [
		{ element: '.el-dropdown', popover: { title: '个人界面', description: '点击后可以选择退出或切换团队' } },
		{ element: '.custom-icon-button', popover: { title: '消息中心', description: '点击可以查看自己收到的消息' } },
		{ element: '.home-button', popover: { title: '回到主页', description: '点击可以回到个人主页' } },
		{ element: '.img-decorate', popover: { title: '展示功能中心', description: '点击可以弹出功能栏' } },
		{ element: '.button-container', popover: { title: '功能区', description: '从上到下点击后分别可以进入到项目协作、原型设计、团队管理、聊天室' } },
	]
});

onMounted(()=>{
	let arr = JSON.parse(getOldArr())
	if (!Array.isArray(arr)) arr=[]
	if (!arr||!arr.includes(getUserId())){
		if (!arr) arr = []
		arr.push(getUserId())
		setIsOld(JSON.stringify(arr))
		const buttonElements = window.document.getElementsByClassName('img-decorate')[0]
		driverObj.drive()
		setTimeout(() => {
			driverObj.moveNext()
		}, 2000)
		setTimeout(() => {
			driverObj.moveNext()
		}, 4000)
		setTimeout(() => {
			driverObj.moveNext()
		}, 6000)
		setTimeout(() => {
			buttonElements.click()
		}, 8000)
		setTimeout(() => {
			driverObj.moveNext()
		}, 8100)
	}


	
})
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

