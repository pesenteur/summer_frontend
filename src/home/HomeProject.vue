<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title" >我的项目</span>
        <el-button class="button" text @click="jump">查看详情</el-button>
      </div>
    </template>
    <el-table :data="tableData" height="180" style="width: 100%">
      <el-table-column prop="name" label="项目名称" />
      <el-table-column prop="create_time" label="开始时间" />
      <el-table-column prop="update_time" label="结束时间" />
    </el-table>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import projAPI from '@/api/proj';
import {getTeamId} from "@/utils/token";

const tableData = ref([])

function jump(){
  router.push('/project')
}

onMounted(async ()=>{
  const result = await projAPI.getAllProjects(getTeamId())
  console.log('result_project',result)
  console.log('result_data_project',result.data)
  console.log('tableData.value',tableData.value)
  tableData.value = result.data

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

