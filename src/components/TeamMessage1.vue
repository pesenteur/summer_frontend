<template>

  <div class="el-col-container">
    <el-col :span="8">
      <el-card v-for="msg in messages" :key="msg.userId" shadow="hover" class="decorate-card" @click="switchState">
        {{msg.name}}
        <br/>
        {{msg.content}}
      </el-card>
    </el-col>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'

const isRead = ref("hover")

interface User {
  userId: string
  date: string
  name: string
  content: string
  isread: string
}

const messages: User[] = [
  {
    userId: '001',
    date: '2016-05-03',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: isRead.value,
  },
  {
    userId: '002',
    date: '2016-05-02',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: isRead.value,
  },
  {
    userId: '003',
    date: '2016-05-04',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: isRead.value,
  },
  {
    userId: '004',
    date: '2016-05-01',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: isRead.value,
  },
]

function switchState(){
  if(isRead.value === 'hover'){
    isRead.value = 'never'
  }else{
    console.log('该消息已读')
  }
}

</script>


<style scoped>

.el-col-container {
  display: flex;
  justify-content: space-between; /* 控制元素之间的间距 */
  margin: -20px;
}

.decorate-card {
  margin: 10px; /* 可根据需要调整 */
}


</style>