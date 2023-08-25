<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">公告</span>
      </div>
    </template>

      <span class="title">{{content}}</span>


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
import {reactive,ref} from "vue";

const content = ref('这里是公告，wxy是神！')

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