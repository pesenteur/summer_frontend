<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">消息中心</span>
        <el-button class="button" text>查看详情</el-button>
      </div>
    </template>
    <el-table v-loading="loading" :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="content" label="消息内容" width="320" />
      <el-table-column prop="isread" label="是否已读" width="320" />
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import notiFunction from "@/api/notification";
const tableData = ref([]);
const loading = ref(true);
addData()
async function addData() {
  let res = await notiFunction.queryAllNoti();
  let filtermessages = [];
  res.data.forEach((item) => {

    let noti = {
      content: item.content,
      isread: item.is_read === true ? 'read' : 'unread',
      notId: item.id
    };
    filtermessages.push(noti);
  });
  tableData.value = filtermessages;
  loading.value = false;
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
