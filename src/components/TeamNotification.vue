<template>
  <button @click="clickButton" class="custom-icon-button" />
  <div class="badge-container">
    <span class="badge_top" v-if="unreadCount > 0"></span>
  </div>
  <el-drawer size="17%" style="margin: 16px;border-radius: 10px;" class="custom-drawer" v-model="table" title="我的消息"
    direction="rtl">
    <el-col>
      <div class="card-container">
        <div class="button-container">
          <div class="button-left">
            <el-popover placement="bottom-start" :width="100" trigger="hover" content="已读所有消息">
              <template #reference>
                <button @click="readAllNoti" class="action-button">
                  <font-awesome-icon :icon="['fas', 'check']" />
                </button>
              </template>
            </el-popover>
          </div>
          <div class="button-right">
            <el-popover placement="bottom-start" :width="100" trigger="hover" content="删除所有已读消息">
              <template #reference>
                <button @click="deleteAllRead" class="action-button">
                  <font-awesome-icon :icon="['fas', 'delete-left']" />
                </button>
              </template>
            </el-popover>
          </div>
        </div>
        <div v-for="msg in messages" :key="msg.notId" class="message-container">
          <el-divider></el-divider>
          <div class="details-container">
            <details @click="readNoti(msg.notId)">
              <summary class="summary" :class="{ 'read': msg.isread === 'read', 'unread': msg.isread === 'unread' }">
                {{ msg.content }}
                <span class="badge" v-if="msg.isread === 'unread'"></span>
              </summary>
              <div class="content">
                <router-link :to="msg.link" v-if="msg.link">
                  {{ msg.content }}
                </router-link>
                <span v-else>
                  {{ msg.content }}
                </span>
                <el-popover placement="bottom-start" :width="10" trigger="hover" content="删除消息">
                  <template #reference>
                    <button @click="deleteSingleNoti(msg.notId)" class="inside-action-button">
                      <font-awesome-icon :icon="['fas', 'delete-left']" />
                    </button>
                  </template>
                </el-popover>
              </div>
            </details>
          </div>
        </div>
      </div>
    </el-col>
  </el-drawer>
</template>

<script lang="js" setup>
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { ElDrawer, ElMessageBox } from 'element-plus'
import notiFunction from '@/api/notification'
import { getTeamId, getUserId } from "@/utils/token";


const table = ref(false)
// TODO: improvement typing when refactor table
const messages = ref([])
const socket = ref()
const user_id = ref()

const unreadCount = computed(() => {
  console.log(messages.value.filter(msg => msg.isread === 'unread').length);
  return messages.value.filter(msg => msg.isread === 'unread').length;
});

onMounted(() => {
  getAllNoti()
  user_id.value = getUserId()
  socket.value = new WebSocket(`ws://localhost:8000/ws/message/${user_id.value}`)
  socket.value.addEventListener('message', () => {
    getAllNoti()
  })
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

function generate_link(item) {
  if (item.team !== getTeamId()) {
    return null
  }
  if (item.chat_message) {
    return `/team/${item.team}/chatHome?room=${item.chat}&message=${item.chat_message}`
  }
  else if (item.document) {
    return `/document/${item.document}`
  }
  return null
}

async function getAllNoti() {
  let res = await notiFunction.queryAllNoti()
  console.log(res.data)
  if (!res.data) {
    return
  }
  let filtermessages = []
  res.data.forEach((item) => {
    let noti = {
      content: item.content,
      isread: item.is_read === true ? 'read' : 'unread',
      notId: item.id,
      link: generate_link(item)
    }
    filtermessages.push(noti)
  })
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

.message-container {
  text-align: center;
  /* 水平居中文本内容 */
  align-items: center;
  /* 调整消息之间的间距 */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* 水平居中 */
}


.details-container {
  width: 100%;
  text-align: center;
  padding: 5px;
  position: relative;
  /* Add this to make the badge position relative to the container */
}

.summary {
  cursor: pointer;
  position: relative;
  /* Add this to make the badge position relative to the summary */
  list-style: none;
  /* Remove the default list-style */
  /* Remove the default padding */
  font-size: 20px;
  /* Remove the default margin */
  outline: none;
  /* Remove the default outline */
  justify-content: space-between;
  /* Align items to the right */
  align-items: center;
  /* Center vertically */
}

.summary::-webkit-details-marker {
  display: none;
  /* 隐藏默认的横线图标 */
}

.badge {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  /* visibility: hidden; */
}

.content {
  max-height: 0;
  /* Initially hidden */
  overflow: hidden;
  margin-top: 10px;
  transition: max-height 0.3s ease-in-out;
  font-size: 15px;
  /* Add transition effect */
}

.el-drawer__body {
  flex: 1;
  /* padding: var(--el-drawer-padding-primary); */
  padding: 0px !important;
  overflow: auto;
}

.open .content {
  max-height: 1000px;
  /* Show content when open */
}

.el-divider {
  margin: 10px 0;
  border-color: #ccc;
}

.action-button {
  color: rgb(92, 86, 86);
  border: none;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s;
}

.inside-action-button {
  padding: 8px 16px;
  color: rgb(92, 86, 86);
  border: none;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s;
}

.inside-action-button:hover {
  color: red;
  background-color: white;
}

.action-button:hover {
  color: black;
  background-color: #aac1d9;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button-left {
  flex: 1;
  margin-left: 20px;
}

.button-right {
  flex: 1;
  margin-left: 150px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

::-webkit-details-marker {
  display: none;
}
</style>