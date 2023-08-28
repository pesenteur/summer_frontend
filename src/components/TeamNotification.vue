<template>
  <button @click="table = true" class="custom-icon-button" />
  <div class="badge-container">
    <span class="badge_top" v-if="unreadCount > 0"></span>
  </div>
  <el-drawer class="aside_msg" v-model="table" title="我的消息" direction="rtl">
    <el-col>
      <div class="card-container">
        <el-card v-for="msg in messages" :key="msg.chatId" class="decorate-card">
          <div class="details-container">
            <details @click="switchState(msg)">
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
import { ref, computed } from 'vue';
import { ElDrawer, ElMessageBox } from 'element-plus'
import notiFunction from '@/api/notification'
const table = ref(false)
// TODO: improvement typing when refactor table
const messages = ref( [])

const unreadCount = () => {
	return messages.filter(msg => msg.isread === 'unread').length;
};
const switchState = (msg) => {
  msg.isread = msg.isread === 'unread' ? 'read' : 'unread';
};
getAllNoti()
async function getAllNoti(){
	let res = await notiFunction.queryAllNoti()
	console.log(res.data)
	let filtermessages = []
	res.data.forEach((item)=>{
		const messagePart = item.content.match(/(.+?)：/)?.[1] || "";
		// const usertagPart = item.content.match(/<usertag>(\d+)<\/usertag>/)?.[1] || "";
		let noti = {
			content : messagePart ,
			isread : item.is_read === true ? 'read' : 'unread' ,
			chatId : item.id
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
</style>