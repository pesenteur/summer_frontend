<template>
  <button @click="table = true" class="custom-icon-button" />
  <el-drawer class="aside_msg" v-model="table" title="我的消息" direction="rtl">
    <el-col>
      <div class="card-container">
        <el-card v-for="(msg, index) in messages" :key="msg.userId" class="decorate-card">
          <div class="details-container">
            <details @click="switchState(msg)">
              <summary class="summary" :class="{ 'read': msg.isread === 'read', 'unread': msg.isread === 'unread' }">
                来自{{ msg.name }}的消息
                <span class="badge" v-if="msg.isread === 'unread'">{{ msg.isread === 'unread' ? '未读' : '已读' }}</span>
              </summary>
              <div class="content">{{ msg.content }}</div>
            </details>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElDrawer, ElMessageBox } from 'element-plus'

import { Edit, Message } from "@element-plus/icons-vue";
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

const unreadCount = computed(() => {
  return messages.filter(msg => msg.isread === 'unread').length;
});

const switchState = (msg: User) => {
  msg.isread = msg.isread === 'unread' ? 'read' : 'unread';
};

</script>

<style scoped>
.butt {
  margin-top: 12px;
}

.message_icon {
  height: 2px;
}

.custom-icon-button {
  background-image: url('@/assets/envelope-regular.svg');
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

::v-deep .aside_msg {
  margin: 20px 20px 20px 0px;
  height: calc(100vh - 40px) !important;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.decorate-card {
  position: relative;
  /* Add this to make the badge position relative to the card */
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.decorate-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.details-container {
  padding: 10px;
  font-size: 14px;
  position: relative;
  /* Add this to make the badge position relative to the container */
}

.summary {
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  position: relative;
  /* Add this to make the badge position relative to the summary */
  list-style: none;
  /* Remove the default list-style */
  padding-left: 0;
  /* Remove the default padding */
  margin: 0;
  font-size: 20px;
  /* Remove the default margin */
  outline: none;
  /* Remove the default outline */
  justify-content: space-between;
  /* Align items to the right */
  align-items: center;
  /* Center vertically */
}

.badge {
  position: absolute;
  right: 10px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  /* visibility: hidden; */
}

.content {
  padding: 10px;
  max-height: 0;
  /* Initially hidden */
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  /* Add transition effect */
}

.open .content {
  max-height: 1000px;
  /* Show content when open */
}

.el-divider {
  margin: 10px 0;
  border-color: #ccc;
}

.decorate-card {
  width: 100%;
  margin: auto;
  font-size: 12px;
}
</style>