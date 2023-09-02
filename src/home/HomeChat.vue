<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">我的群聊</span>
        <el-button class="button" @click="handleSearch" text>查看详情</el-button>
      </div>
    </template>
    <el-table :data="tableData" height="150" style="width: 100%" v-loading="loading">
		<el-table-column prop="name" label="群聊名称" width="220" />
		<el-table-column prop="unread_count" label="未读的消息数" width="220" />
	    <el-table-column prop="last_message.update_time" label="最新消息发送时间" width="220" />
    </el-table>
  </el-card>
</template>
<script setup>
import {onMounted, ref} from "vue";
import chatFunction from "@/api/chat";
import {getTeamId} from '@/utils/token'
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const tableData = ref([]);
const loading = ref(true);

async function addData(){
	let result = await chatFunction.queryAllRoom(getTeamId());
	tableData.value =result.data;
  loading.value = false;
}

function handleSearch(){
	router.push({
		path: `/team/${getTeamId()}/chatHome`,
	})
}

onMounted(()=>{
  addData()
})

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