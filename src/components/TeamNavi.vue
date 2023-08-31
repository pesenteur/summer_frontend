<template>
	<el-affix>
		<el-menu
		  :default-active="activeIndex"
		  class="el-menu-demo"
		  mode="horizontal"
		  :ellipsis="false"
		  @select="handleSelect"
		>
			<TeamHeader1/>
			<div class="flex-grow" />
			<button @click="jumpToHome" class="home-button" />
			<TeamMessage></TeamMessage>
			<div class="flex flex-wrap items-center">
				<el-dropdown>
				<el-button text class="custom-icon-button">
				  <el-icon class="el-icon--right"><arrow-down /></el-icon>
				</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>个人简介</el-dropdown-item>
							<el-dropdown-item @click="jump">切换团队</el-dropdown-item>
							<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</el-menu>
	</el-affix>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TeamHeader1 from './TeamHeader1.vue'
import TeamMessage from "./TeamNotification.vue";
import {ArrowDown} from "@element-plus/icons-vue";
import {clearToken} from "../utils/token.js"
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function jump() {
  router.push('/switch')
}
function jumpToHome(){
	router.push('/')
}
function logout(){
	clearToken()
	router.push('/login')
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
  background-image: url('@/assets/userAvtar.png'); /* 根据您的项目路径调整 */
  background-size: 40px; /* 根据需要调整 */
  background-repeat:no-repeat;
  width: 40px; /* 根据需要调整 */
  height: 40px; /* 根据需要调整 */
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
}
.home-button{
	margin-right: 10px;

	background-image: url('@/assets/gif/home.gif');
	/* 根据您的项目路径调整 */
	background-size: 25px;
	/* 根据需要调整 */
	background-repeat: no-repeat;
	margin-top: 18px;
	width: 25px;
	/* 根据需要调整 */
	height: 25px;
	/* 根据需要调整 */
	display: inline-block;
	border: none;
	cursor: pointer;
	outline: none;
}
</style>




