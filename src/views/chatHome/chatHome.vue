<template>
	<vue-advanced-chat :current-user-id="currentUserId" :room-info-enabled="true" :rooms="JSON.stringify(rooms)"
		:messages="JSON.stringify(messages)" :rooms-loaded="true" :height="height"
		:message-actions="JSON.stringify(messageActions)" :menu-action-handler="menuActionHandler"
		:messages-loaded="messagesLoaded" :load-first-room="false" :room-id="room_id"
		:message-selection-actions="JSON.stringify(selectActions)" @open-user-tag="console.log('')"
		@send-message="sendMessage($event.detail[0])" @open-file="openFile($event.detail[0])"
		@add-room="addChatInterVis = true" @message-action-handler="handleCustomMessageAction($event.detail[0])"
		@fetch-messages="addHistoryMessage(($event.detail[0]))" @room-info="handleChatInfo($event.detail[0])"
		@message-selection-action-handler="messageSelectionActionHandler($event.detail[0])">
		<template #message-content="{ message }">
			<div :class="'message ' + 'sender-' + message.senderId">
				{{ message.content }}
			</div>
		</template>
	</vue-advanced-chat>
	<el-drawer v-model="drawerInterVis" direction="rtl" size="22%">
		<span class="team_list">成员列表</span>
		<el-dropdown v-if="!isMain">
			<el-button text>
				<font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
			</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item v-if="isAdmin" @click="handleInviteMember">邀请成员</el-dropdown-item>
					<el-dropdown-item v-if="isAdmin" @click="handleDeleteMember">删除成员</el-dropdown-item>
					<el-dropdown-item v-if="!isMain && isAdmin" @click="handleDeleteChat">解散群聊</el-dropdown-item>
					<el-dropdown-item v-if="!isMain" @click="handleExit">退出群聊</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<div class="member-item" v-for="member in chatMemberTable">
			<img class="avatar" src="@/assets/imgs/doe.png" />
			<div class="member-info">
				<div class="member-name">{{ member.name }}</div>
				<div class="member-email">{{ member.email }}</div>
			</div>
		</div>
		<form class="search-bar" @submit.prevent>
			<input v-model="searchMessage" size="small" placeholder="Search..." @change="queryAllMessages" />
			<button><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
		</form>
		<el-table :data="messagesTableData" style="width: 100%" @row-click="handleRowClick">
			<el-table-column prop="update_time" label="发送时间" />
			<el-table-column prop="sender_name" label="发送者姓名" width="100px" />
			<el-table-column prop="content" label="发送内容" width="310px">
				<template v-slot="{ row }">
					<div class="content-cell" v-html="row.content"></div>
				</template>
			</el-table-column>

		</el-table>
	</el-drawer>
	<el-dialog v-model="addChatInterVis" title="创建群聊">
		<el-form :model="newTeamName">
			<el-form-item label="群聊名称" :label-width="formLabelWidth">
				<el-input v-model="newTeamName" autocomplete="off" style="width:auto"/>
			</el-form-item>
			<el-form-item label="群聊成员" :label-width="formLabelWidth">
				<el-select v-model="newTeamMember" multiple placeholder="Select">
					<el-option v-for="opt in teamAddMemberOption" :key="opt.id" :label="opt.name" :value="opt.name" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addChatInterVis = false">取消</el-button>
				<el-button type="primary" @click="addRoom">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="addMemberInterVis" title="添加成员">
		<el-form :model="newTeamName">
			<el-form-item label="群聊成员" :label-width="formLabelWidth">
				<el-select v-model="newChatMember" multiple placeholder="Select">
					<el-option v-for="opt in chatMemberAddOption" :key="opt.id" :label="opt.name" :value="opt.name" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addMemberInterVis = false">取消</el-button>
				<el-button type="primary" @click="addChatMem">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="deleteMemberInterVis" title="删除成员">
		<el-form :model="newTeamName">
			<el-form-item label="群聊成员" :label-width="formLabelWidth">
				<el-select v-model="deleteChatMember" multiple placeholder="Select">
					<el-option v-for="opt in chatMemmberDeleteOption" :key="opt.id" :label="opt.name" :value="opt.name" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="deleteMemberInterVis = false">取消</el-button>
				<el-button type="primary" @click="deleteMem">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="sendMultMessageInterVis" title="创建群聊">
		<el-form :model="newTeamName">
			<el-form-item label="发送的群聊" :label-width="formLabelWidth">
				<el-select v-model="newSendChat" placeholder="Select">
					<el-option v-for="opt in rooms" :key="opt.roomId" :label="opt.roomName" :value="opt.roomName" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="sendMultMessageInterVis = false">Cancel</el-button>
				<el-button type="primary" @click="sendSelectMessages">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { register } from 'vue-advanced-chat'
import { ElMessage } from 'element-plus'
import teamFunction from '@/api/team'
import { onActivated, onBeforeMount, onMounted, onUnmounted, reactive, ref } from "vue"
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getUserId } from "@/utils/token";
import chatFunction from "@/api/chat.js";


register()
const route = useRoute();
const socket = ref() //websocket
const team_id = ref()
const user_id = ref()
const rooms = ref([])
const messages = ref([])
const currentUserId = ref()
//聊天界面的基本数据
const height = ref('800px')
const formLabelWidth = '140px'
const messagesPerPage = 20
//控制弹窗界面的是否出现的属性 结尾都为InterVis
const addChatInterVis = ref(false)
const addMemberInterVis = ref(false)
const deleteMemberInterVis = ref(false)
const sendMultMessageInterVis = ref(false)
const drawerInterVis = ref(false)
//判断是否为管理员、是否为主界面、是否是合并发送
const isAdmin = ref(true)
const isMain = ref(true)
const isHole = ref(true)

const newTeamName = ref()
const newTeamMember = ref([])
const newChatMember = ref([])
const newSendChat = ref()
const deleteChatMember = ref([])
const teamAddMemberOption = ref([])
const chatMemberAddOption = ref([])
const chatMemmberDeleteOption = ref([])
const chatMemberTable = ref([])

const searchMessage = ref([])
const messagesTableData = ref([])
const room_id = ref()
const target_message = ref()
const operChatId = ref()
const messagesLoaded = ref(false)
const sendMessages = ref([])
const messageActions = reactive([
	{
		name: 'selectMessages',
		title: 'Select'
	},
	{
		name: 'privateChatAction',
		title: '私聊'
	}
])
const selectActions = reactive([
	{
		name: 'mergeSend',
		title: '合并转发'
	},
	{
		name: 'seperateSend',
		title: '逐条转发'
	}
])

async function queryAllMessages() {
	let res = await chatFunction.searchHistory(operChatId.value, searchMessage.value)
	messagesTableData.value = res.data.matches
	// console.log(res.data.matches)
	// const target = window.document.getElementById('01360790-4be8-472e-9ba3-f528e5cb489f')
	// console.log(target)
	// target.scrollIntoView()
}

//更新teamAddMemberOption(不包含自己)
async function getTeamMember() {
	let res = await teamFunction.queryTeamMember(team_id.value)
	let filterRes = []
	res.data.members.forEach((member) => {
		if (member.id != user_id.value) {
			filterRes.push(member)
		}
	})
	teamAddMemberOption.value = filterRes
}
//获得所有没有加入该群聊的成员
async function getTeamNoMember(roomId) {
	chatMemberAddOption.value = teamAddMemberOption.value
	let info = await chatFunction.getRoomInfo(roomId)
	let exist = info.data.members
	chatMemberAddOption.value = chatMemberAddOption.value.filter(e => !exist.find(i => i.id === e.id))
}
async function getDeleteChatMember(roomId) {
	let info = await chatFunction.getRoomInfo(roomId)
	chatMemmberDeleteOption.value = info.data.members
}
async function getChatMemberInfo(roomId) {
	let info = await chatFunction.getRoomInfo(roomId)
	let adminInfo = info.data.admin
	if (adminInfo === null) {
		isAdmin.value = false
		isMain.value = true
	} else if (adminInfo.toString() !== user_id.value) {
		isAdmin.value = false
		isMain.value = false
	}
	else {
		isAdmin.value = true
		isMain.value = false
	}
	chatMemberTable.value = info.data.members
}
async function deleteSpeChat(roomId) {
	await chatFunction.deleteChat(roomId)
	await addData()
}
//创建一个新的聊天室(包括私聊和群聊)
async function createRoom(member, name, type = null) {
	await chatFunction.createRoom(team_id.value, member, name, type)
	await addData()
}
//根据newTeamMember创建群聊
async function addRoom() {
	let member = []
	if (newTeamMember.value.length === 0) {
		ElMessage.error('您还未添加任何一名群聊成员')
	}
	else {
		newTeamMember.value.forEach((item) => {
			teamAddMemberOption.value.forEach((team) => {
				if (item === team.name) {
					member.push(team.id)
				}
			})
		})
		member.push(user_id.value)
		await createRoom(member, newTeamName.value)
	}
	addChatInterVis.value = false
}
async function addChatMem() {
	let members = []
	if (newChatMember.value.length === 0) {
		ElMessage.error('您还未添加任何一名群聊成员')
	} else {
		newChatMember.value.forEach((item) => {
			chatMemberAddOption.value.forEach((member) => {
				if (item === member.name) {
					members.push(member.id)
				}
			})
		})
		await chatFunction.addTeamMember(operChatId.value, members)
		newChatMember.value = []
	}
	addMemberInterVis.value = false
}
async function deleteMem() {
	let members = []
	if (deleteChatMember.value.length === 0) {
		ElMessage.error('您还未选择任何一名群聊成员')
	}
	else {
		deleteChatMember.value.forEach((item) => {
			chatMemmberDeleteOption.value.forEach((member) => {
				if (item === member.name) {
					members.push(member.id)
				}
			})
		})
		await chatFunction.deleteTeamMember(operChatId.value, members)
		deleteChatMember.value = []
		await addData()
	}
	deleteMemberInterVis.value = false
}
async function sendSelectMessages() {
	let id
	let messages = []
	rooms.value.forEach((room) => {
		if (room.roomName === newSendChat.value) {
			id = room.roomId
		}
	})
	sendMessages.value.forEach((message) => {
		messages.push(message._id)
	})
	if (isHole.value === true) {
		await chatFunction.sendHole(operChatId.value, messages, id)
	} else {
		await chatFunction.sendDivide(operChatId.value, messages, id)
	}
}
async function addData() {
	let result = await chatFunction.queryAllRoom(team_id.value)
	const modifiedRoom = []
	result.data.forEach((item) => {
		let users = []
		item.members.forEach((member) => {
			let user = {
				_id: member.id.toString(),
				username: member.name,
				timestamp: member.update_time,
				avatar: '',
			}
			users.push(user)
		})
		let room = {}
		if (item.last_message === null) {
			room = {
				roomId: item.id,
				roomName: item.name,
				users: users,
				avatar: "/doe.png",
				unreadCount: item.unread_count,
			}
		} else {
			room = {
				roomId: item.id,
				roomName: item.name,
				users: users,
				avatar: "/doe.png",
				unreadCount: item.unread_count,
				lastMessage: {
					_id: item.last_message.id.toString(),
					content: item.last_message.content.substring(0, 100),
					senderId: item.last_message.sender.toString(),
					username: item.last_message.sender_name,
					timestamp: item.last_message.update_time,
				}
			}
		}
		modifiedRoom.push(room)
	})
	rooms.value = modifiedRoom
}
async function addHistoryMessage({ room, options = {} }) {
	let res, goto;
	operChatId.value = room.roomId
	messagesLoaded.value = false
	if (options.reset) {
		messages.value = []
		if (target_message.value) {
			res = await chatFunction.queryMessage(room.roomId, target_message.value, messagesPerPage, true);
			goto = target_message.value;
			target_message.value = null;
		} else {
			res = await chatFunction.queryMessage(room.roomId, null, messagesPerPage)
		}
	} else {
		res = await chatFunction.queryMessage(room.roomId, messages.value[0]._id, messagesPerPage)
	}
	await chatFunction.readAllMessage(room.roomId)
	if ((!res.data || res.data.length === 0 || res.data.length < messagesPerPage) && !goto) {
		setTimeout(() => {
			messagesLoaded.value = true
		}, 0)
	}
	res.data.forEach((temp) => {
		if (temp.type == 'text') {
			let message = {
				_id: temp.id,
				content: temp.content,
				senderId: temp.sender.toString(),
				username: temp.sender_name,
				date: temp.created_time,
				timestamp: temp.created_time,
				avatar: '/doe.png',
				usersTag: '',
			}
			messages.value.unshift(message)
		} else {
			console.log('------downFile------')
			console.log(temp.content)
			let message = {
				_id: temp.id,
				content: '',
				senderId: temp.sender.toString(),
				username: temp.sender_name,
				date: temp.created_time,
				timestamp: temp.created_time,
				avatar: '/doe.png',
				usersTag: '',
				files: [
					{
						name: '我的文件',
						url: temp.content,
						type: temp.content.split('.')[temp.content.split('.').length - 1],
					}
				],
			}
			messages.value.unshift(message)
		}
	})
	await addData();
	setTimeout(() => {
		scrollToMessage(goto);
	}, 100)

}

async function sendMessage(message) {
	console.log('------fileMessage------')
	console.log(message)
	let reader = new FileReader()

	if (message.files !== null) {
		for (const file of message.files) {
			reader.readAsDataURL(file.blob)
			await chatFunction.sendFile(operChatId.value, file.type, file.extension, file.blob);
		}
	}
	if (message.content !== "") {
		let formatMessage = {
			"team": team_id.value,
			"receiver": "",
			"chat": message.roomId,
			"content": message.content,
			"type": "text"
		}
		socket.value.send(JSON.stringify(formatMessage))
	}
}

function openFile({ file }) {
	window.open(file.file.url, '_blank')
}
async function upMessage(event) {
	let temp = JSON.parse(event.data)
	if (temp.type === 'text') {
		if (temp.chat === operChatId.value) {
			let message = {
				_id: temp.id,
				content: temp.content,
				senderId: temp.sender.toString(),
				username: temp.sender_name,
				date: temp.created_time,
				timestamp: temp.created_time,
				avatar: '/doe.png',
			}
			messages.value.push(message)
		}
	} else {
		if (temp.chat === operChatId.value) {
			let message = {
				_id: temp.id,
				content: '',
				senderId: temp.sender.toString(),
				username: temp.sender_name,
				date: temp.created_time,
				timestamp: temp.created_time,
				avatar: '/doe.png',
				files: [
					{
						name: '基本项',
						url: temp.content,
						type: temp.content.split('.')[temp.content.split('.').length - 1],
					}
				],
			}
			messages.value.push(message)
		}
	}
	await chatFunction.readAllMessage(operChatId.value)
	await addData()
}
function menuActionHandler({ action, }) {
	switch (action.name) {
		case 'inviteUser':
		// call a method to invite a user to the room
		case 'removeUser':
		// call a method to remove a user from the room
		case 'deleteRoom':
		// call a method to delete the room
	}
}
function handleCustomMessageAction({ roomId, action, message }) {
	let members = []
	let roomName = 'to ' + message.username
	members.push(message.senderId.toString())
	members.push(user_id.value)
	switch (action.name) {
		case 'replyAction':
			// 处理回复操作的逻辑
			break;
		case 'privateChatAction':
			createRoom(members, roomName, 'single');
			break;
	}
}
function handleInviteMember() {
	getTeamNoMember(operChatId.value)
	addMemberInterVis.value = true
}
function handleDeleteMember() {
	getTeamNoMember(operChatId.value)
	getDeleteChatMember(operChatId.value)
	deleteMemberInterVis.value = true
}
function handleDeleteChat() {
	deleteSpeChat(operChatId.value)
	drawerInterVis.value = false
}
function handleExit() {
	if (isAdmin.value === true) {
		chatFunction.deleteChatAdmin(operChatId.value)
	} else {
		chatFunction.deleteChatNormal(operChatId.value)
	}
}


function handleChatInfo(event) {
	drawerInterVis.value = true
	operChatId.value = event.roomId
	getChatMemberInfo(event.roomId)
}
function messageSelectionActionHandler(event) {
	sendMultMessageInterVis.value = true
	console.log('@@@@@')
	console.log(event.messages)
	sendMessages.value = event.messages
	switch (event.action.name) {
		case 'mergeSend':
			isHole.value = true
			break;
		case 'seperateSend':
			isHole.value = false
			break;
	}
}
function scrollToMessage(messageId) {
	const parent = window.document.getElementsByTagName('vue-advanced-chat')[0]
	const shadow = parent.shadowRoot;
	const target = shadow.getElementById(messageId)
	target.scrollIntoView()
}

function handleRowClick(row) {
	scrollToMessage(row.id);
	drawerInterVis.value = false
}

onMounted(() => {
	//刚进入聊天页面时获得用户的Id和所在团队的Id
	team_id.value = route.params.team_id
	user_id.value = getUserId()
	currentUserId.value = user_id.value
	addData().then(() => {
		room_id.value = route.query.room;
		target_message.value = route.query.message;
	})
	getTeamMember()
	socket.value = new WebSocket(`ws://39.105.159.199:1108/ws/chat/${user_id.value}`)
	socket.value.addEventListener('message', upMessage)

})

</script>

<style scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
}

.drawer-container {
	padding: 20px;
}

.member-item {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
}

.avatar {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 10px;
}

.member-info {
	flex: 1;
}

.member-name {
	font-weight: bold;
}

.drawer-buttons {
	margin-top: 20px;
}

button {
	margin-right: 10px;
	padding: 8px 15px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:last-child {
	margin-right: 0;
}

.team_list {
	padding-right: 120px;
}

.el-drawer__header {
	align-items: center;
	color: #72767b;
	display: flex;
	margin-bottom: 40px;
	padding: var(--el-drawer-padding-primary);
	padding-bottom: 0;
}

.content-cell {
	max-height: 75px;
	/* 设置最大高度 */
	//overflow: hidden; /* 隐藏溢出内容 */
	//text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
	white-space: nowrap;
	/* 防止换行 */
}

.search-bar {
	width: 250px;
	height: 45px;
	background-color: transparent;
	border: 2px solid black;
	border-radius: 6px;
	display: flex;
	align-items: center;
}

.search-bar input {
	width: 100%;
	background-color: transparent;
	border: none;
	outline: none;
	color: black;
	font-size: 16px;
	padding-left: 10px;
}

.search-bar button {
	width: 40px;
	height: 100%;
	background: transparent;
	outline: none;
	border: none;
	color: black;
	cursor: pointer;
}

.search-bar input::placeholder {
	color: black;
}

.search-bar button i {
	font-size: 22px;
}

.el-drawer__body {
	flex: 1;
	padding-top: 0px !important;
	overflow: auto;
}
</style>

