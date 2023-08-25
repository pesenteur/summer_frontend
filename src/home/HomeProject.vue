<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title" >我的项目</span>
        <el-button class="button" text @click="jump">查看详情</el-button>
      </div>
    </template>
    <el-table :data="tableData" height="180" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="220" />
      <el-table-column prop="startTime" label="开始时间" width="220" />
      <el-table-column prop="endTime" label="结束时间" width="220"/>
    </el-table>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title{
  color:black;
}

</style>

<script setup>
import {reactive} from "vue";
import router from "@/router";
const tableData = reactive([
  {
    name: 'Vue开发的医院管理系统',
    startTime: '2023-6-19',
    endTime: '2024-3-23',
  },
  {
    name: 'Vue开发的医院管理系统',
    startTime: '2023-6-19',
    endTime: '2024-3-23',
  },
  {
    name: 'Vue开发的医院管理系统',
    startTime: '2023-6-19',
    endTime: '2024-3-23',
  },
  {
    name: 'Vue开发的医院管理系统',
    startTime: '2023-6-19',
    endTime: '2024-3-23',
  },
  {
    name: 'Vue开发的医院管理系统',
    startTime: '2023-6-19',
    endTime: '2024-3-23',
  },
  {
    name: 'Vue开发的医院管理系统',
    startTime: '2023-6-19',
    endTime: '2024-3-23',
  },
  {
    name: 'Vue开发的医院管理系统',
    startTime: '2023-6-19',
    endTime: '2024-3-23',
  }
])

function jump(){
  router.push('/project')
}
</script>

