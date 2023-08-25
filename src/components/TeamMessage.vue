<template>

  <button  @click="table = true" class="custom-icon-button" />
  <el-drawer
      v-model="table"
      title="我的消息"
      direction="rtl"
      size="30%"
  >
      <el-col>
        <div class="card-container">
          <el-card v-for="msg in messages" :key="msg.userId" shadow="hover" class="decorate-card" @click="switchState">
            <span style="font-size:13px">{{msg.userId}}</span>
            <el-divider/>
            {{msg.name}}
            <br/>
            {{msg.content}}
          </el-card>
        </div>
      </el-col>


  </el-drawer>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'
import {Edit, Message} from "@element-plus/icons-vue";
const table = ref(false)
const isRead = ref('hover')




const drawerRef = ref<InstanceType<typeof ElDrawer>>()
const onClick = () => {
  drawerRef.value!.close()
}

import type { TableColumnCtx, TableInstance } from 'element-plus'

interface User {
  userId: string
  date: string
  name: string
  content: string
  isread: string
}


const tableRef = ref<TableInstance>()

const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date'])
}
// TODO: improvement typing when refactor table
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.content
}
const filterisread = (value: string, row: User) => {
  return row.isread === value
}

const messages: User[] = [
  {
    userId: '001',
    date: '2016-05-03',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'read',
  },
  {
    userId: '002',
    date: '2016-05-02',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'unread',
  },
  {
    userId: '003',
    date: '2016-05-04',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'read',
  },
  {
    userId: '004',
    date: '2016-05-01',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'unread',
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
.butt{
  margin-top: 12px;
}
.message_icon{
  height: 2px;
}

.custom-icon-button {
  background-image: url('@/assets/gif/home.gif'); /* 根据您的项目路径调整 */
  background-size: 25px; /* 根据需要调整 */
  background-repeat:no-repeat;
  margin-top: 18px;
  width: 25px; /* 根据需要调整 */
  height: 25px; /* 根据需要调整 */
  display: inline-block;
  border: none;
  cursor: pointer;
  outline: none;
}

.decorate-card {
  width:100%;
  margin: auto;
  font-size:12px;
}



</style>
