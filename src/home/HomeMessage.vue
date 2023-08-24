<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">消息中心</span>
        <el-button class="button" text>查看详情</el-button>
      </div>
    </template>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="time" label="时间" width="180" />
      <el-table-column prop="content" label="内容" width="180" />
      <el-table-column prop="isread" label="是否已读" />
    </el-table>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.title{
  color:black;
}

.box-card {
  width: 730px;
}
</style>

<script setup>
import {reactive} from "vue";
const tableData = reactive([
  {
    time: '2023-06-19',
    content: '被BUAA——SE群聊@l',
    isread: '未读',
  },
  {
    time: '2023-06-19',
    content: '被BUAA——SE群聊@l',
    isread: '未读',
  },
  {
    time: '2023-06-19',
    content: '被BUAA——SE群聊@l',
    isread: '未读',
  },
])
</script>