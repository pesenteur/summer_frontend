<template>
  <button @click="clickButton" class="custom-icon-button" />
  <div class="badge-container">
    <span class="badge_top" v-if="unreadCount > 0"></span>
  </div>
  <el-drawer size="20%" class="aside_msg" v-model="table" title="我的消息" direction="rtl">
    <el-col>
      <div class="card-container">
        <div class="button-left">
          <el-popover placement="bottom-start" :width="100" trigger="hover" content="已读所有消息">
            <template #reference>
              <button @click="readAllNoti" class="action-button"><font-awesome-icon :icon="['fas', 'check']" />
              </button>
            </template>
          </el-popover>
        </div>
        <div class="button-right">
          <el-popover placement="bottom-start" :width="100" trigger="hover" content="删除所有已读消息">
            <template #reference>
              <button @click="deleteAllRead" class="action-button"><font-awesome-icon
                  :icon="['fas', 'delete-left']" /></button>
            </template>
          </el-popover>
        </div>
        <el-card v-for="msg in messages" :key="msg.notId" class="decorate-card" @click="readNoti(msg.notId)">
          <button @click="deleteSingleNoti(msg.notId)">删除</button>
          <div class="details-container">
            <details>
              <summary class="summary" :class="{ 'read': msg.isread === 'read', 'unread': msg.isread === 'unread' }">
                {{ msg.content }}
                <span class="badge" v-if="msg.isread === 'unread'"></span>
              </summary>
              <div class="content">{{ msg.content }}</div>
            </details>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-drawer>
</template>

<script lang="js" setup>
import {ref, computed, onMounted} from 'vue';
import { ElDrawer, ElMessageBox } from 'element-plus'
import notiFunction from '@/api/notification'

const table = ref(false)
// TODO: improvement typing when refactor table
const messages = ref([])

const unreadCount = () => {
  return messages.filter(msg => msg.isread === 'unread').length;
};

onMounted(async () => {
  await getAllNoti()
})

async function clickButton() {
  table.value = true
  await getAllNoti()
}
async function deleteAllRead() {
  await notiFunction.deleteReadNoti()
  await getAllNoti()
}
async function deleteSingleNoti(NotId) {
  await notiFunction.deleteSingleNoti(NotId)
  await getAllNoti()
}
async function readAllNoti() {
  await notiFunction.readAllNoti()
  await getAllNoti()
}
async function readNoti(NotId) {
  await notiFunction.readSingleNoti(NotId)
  await getAllNoti()
}
async function getAllNoti() {
  let res = await notiFunction.queryAllNoti()
  console.log(res.data)
    if (!res.data){
        return
    }
  let filtermessages = []
  res.data.forEach((item) => {
    const messagePart = item.content.match(/(.+?)：/)?.[1] || "";
    let noti = {
      content: messagePart,
      isread: item.is_read === true ? 'read' : 'unread',
      notId: item.id
    }
    filtermessages.push(noti)
  })
  console.log(filtermessages)
  messages.value = filtermessages
}
</script>

<style scoped>
.butt {
  margin-top: 12px;
}

.message_icon {
  height: 2px;
}

.badge_top {
  position: absolute;
  margin-left: -33px;
  margin-top: 17px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
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

.action-button {
  padding: 8px 16px;
  color: rgb(92, 86, 86);
  border: none;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #aac1d9;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button-left {
  flex: 1;
  margin-right: 50px;
}

.button-right {
  flex: 1;
  margin-left: 100px;
}
</style>