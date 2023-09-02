<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">我的团队</span>
        <el-button class="button" text @click="jump">查看详情</el-button>
      </div>
    </template>
    <el-table v-loading="loading" :data="tableData" height="150" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="220" />
      <el-table-column prop="email" label="邮箱" width="220" />
      <el-table-column prop="role" label="角色" width="220" />
    </el-table>
  </el-card>
</template>
<script setup>
import {reactive, ref} from "vue";
import router from "@/router";
import teamFuction from '@/api/team'
import {getTeamId} from "@/utils/token";
const tableData = reactive([]);
const loading = ref(true);

async function getTeam(){
	let res = await teamFuction.queryTeamMember(getTeamId());
	
	res.data.members.forEach((item)=>{
		let member={
			name:item.name,
			email:item.email,
			role:item.role
		};
		tableData.push(member);
	});
	loading.value = false;
}
getTeam()
function jump() {
  router.push('/member');
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: black;
}
</style>
