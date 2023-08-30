<template>
	<vue-advanced-chat :current-user-id="currentUserId" :room-info-enabled="true" :rooms="JSON.stringify(rooms)"
		:messages="JSON.stringify(messages)" :room-actions="JSON.stringify(roomActions)" :rooms-loaded="true"
		:height="height" :message-actions="JSON.stringify(messageActions)" :menu-action-handler="menuActionHandler"
		:messages-loaded="messagesLoaded" :load-first-room="false" :room-id="room_id"
		@open-user-tag="console.log('usertag')" @send-message="sendMessage($event.detail[0])"
		@add-room="dialogFormVisible = true" @message-action-handler="handleCustomMessageAction($event.detail[0])"
		@room-action-handler='handleRoomAction($event.detail[0])' @fetch-messages="addHistoryMessage(($event.detail[0]))"
		@room-info="handleChatInfo($event.detail[0])">
		<template #message-content="{ message }">
			<div :class="'message ' + 'sender-' + message.senderId">
				{{ message.content }}
			</div>
		</template>
	</vue-advanced-chat>
	<el-drawer v-model="drawerTable" direction="rtl" size="20%">
		<span>成员列表</span>
		<el-dropdown v-if="isMain">
			<el-button text>
				<font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
			</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item v-if="isAdmin" @click="handleDeleteMember">邀请成员</el-dropdown-item>
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
	</el-drawer>
	<el-dialog v-model="dialogFormVisible" title="创建群聊">
		<el-form :model="newTeamName">
			<el-form-item label="群聊名称" :label-width="formLabelWidth">
				<el-input v-model="newTeamName" autocomplete="off" />
			</el-form-item>
			<el-form-item label="群聊成员" :label-width="formLabelWidth">
				<el-select v-model="newTeamMember" multiple placeholder="Select">
					<el-option v-for="opt in teamAddMemberOption" :key="opt.id" :label="opt.name" :value="opt.name" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">Cancel</el-button>
				<el-button type="primary" @click="addRoom">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="chatMemberAddVisible" title="添加成员">
		<el-form :model="newTeamName">
			<el-form-item label="群聊成员" :label-width="formLabelWidth">
				<el-select v-model="newChatMember" multiple placeholder="Select">
					<el-option v-for="opt in chatMemberAddOption" :key="opt.id" :label="opt.name" :value="opt.name" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="chatMemberAddVisible = false">Cancel</el-button>
				<el-button type="primary" @click="addChatMem">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="chatMemberDeleteVisible" title="删除成员">
		<el-form :model="newTeamName">
			<el-form-item label="群聊成员" :label-width="formLabelWidth">
				<el-select v-model="deleteChatMember" multiple placeholder="Select">
					<el-option v-for="opt in chatMemmberDeleteOption" :key="opt.id" :label="opt.name" :value="opt.name" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="chatMemberDeleteVisible = false">Cancel</el-button>
				<el-button type="primary" @click="deleteMem">
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
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { getUserId } from "@/utils/token";
import chatFunction from "@/api/chat.js";

register()
const mainChatId = ref()
const route = useRoute();
const router = useRouter();
const socket = ref() //websocket
const team_id = ref()
const user_id = ref()
const rooms = ref([])
const messages = ref([])
const currentUserId = ref()
const height = ref('800px')
const content = ref("")
const dialogFormVisible = ref(false)
const chatMemberAddVisible = ref(false)
const chatMemberDeleteVisible = ref(false)
const formLabelWidth = '140px'
const chatMemberTable = ref([])
const drawerTable = ref(false)
const isAdmin = ref(true)
const isMain = ref(true)

const newTeamName = ref()
const newTeamMember = ref([])
const newChatMember = ref([])
const deleteChatMember = ref([])
const teamAddMemberOption = ref([])
const chatMemberAddOption = ref([])
const chatMemmberDeleteOption = ref([])
const messageActions = reactive([
	{
		name: 'replyAction',
		title: '回复'
	},
	{
		name: 'editAction',
		title: '编辑',
		onlyMe: true
	},
	{
		name: 'deleteAction',
		title: '删除',
		onlyMe: true
	},
	{
		name: 'privateChatAction',
		title: '私聊'
	}
])
const roomActions = reactive([
	{ name: 'inviteUser', title: 'Invite User' },
	{ name: 'removeUser', title: 'Remove User' },
	{ name: 'deleteRoom', title: 'Delete Room' }
])
const room_id = ref()
const operChatId = ref()
const messagesLoaded = ref(false)
const messagesPerPage = 20

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
	let adminInfo =info.data.admin
	if(adminInfo === null){
		isAdmin.value = false
		isMain.value = true
	}else if(adminInfo.toString()!==user_id.value){
		isAdmin.value = false
		isMain.value = false
	}
	else{
		isAdmin.value = true
		isMain.value = false
	}
	chatMemberTable.value = info.data.members
}
//创建一个新的聊天室(包括私聊和群聊)
async function createRoom(member,name,type=null){
	await chatFunction.createRoom(team_id.value, member, name,type)
	console.log('@@@@@@')
	console.log(team_id.value)
	console.log(member)
	console.log(name)
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
	dialogFormVisible.value = false
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
	chatMemberAddVisible.value = false
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
	chatMemberDeleteVisible.value = false
}
async function addData() {
	let result = await chatFunction.queryAllRoom(team_id.value)

	const modifiedRoom = []
	result.data.forEach((item) => {
		console.log('@@@@@@@')
		console.log(item.admin)
		if (item.priority === 999) {
			mainChatId.value = item.id.toString()
		}
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
		let room = {
			roomId: item.id,
			roomName: item.name,
			users: users,
			avatar: "/doe.png",
			// unreadCount: item.unread_count,
			// lastMessage: {
			// 	_id: 'xyz',
			// 	content: 'Last message received',
			// 	senderId: '1234',
			// 	username: 'John Doe',
			// 	timestamp: '10:20',
			// }
		}
		modifiedRoom.push(room)
	})
	rooms.value = modifiedRoom
}
async function addHistoryMessage({ room, options = {} }) {
	let res;

	if (options.reset) {
		messages.value = []
		res = await chatFunction.queryMessage(room.roomId, null, messagesPerPage)
	} else {
		res = await chatFunction.queryMessage(room.roomId, messages.value[0]._id, messagesPerPage)
	}

	if (res.data.length === 0 || res.data.length < messagesPerPage) {
		setTimeout(() => {
			messagesLoaded.value = true
		}, 0)
	}
	res.data.forEach((temp) => {
		let message = {
			_id: temp.id,
			content: temp.content,
			senderId: temp.sender.toString(),
			username: 'John Doe',
			date: temp.created_time,
			timestamp: temp.created_time,
			avatar: '/doe.png',
			usersTag: ''
		}
		messages.value.unshift(message)
	})

}
async function sendMessage(message) {
	console.log(message.usersTag)
	let formatMessage = {
		"team": team_id.value,
		"receiver": "",
		"chat": message.roomId,
		"content": message.content,
		"type": "text"
	}
	socket.value.send(JSON.stringify(formatMessage))
}
function upMessage(event) {
	let temp = JSON.parse(event.data)
	console.log('@@@@@@')
	console.log(temp)
	let message = {
		_id: temp.id,
		content: temp.content,
		senderId: user_id.value.toString(),
		username: temp.name,
		date: temp.created_time,
		timestamp: temp.created_time,
		avatar: '/doe.png',
	}
	messages.value.push(message)
}
function menuActionHandler({ action, }) {
	console.log(action)
	switch (action.name) {
		case 'inviteUser':
		// call a method to invite a user to the room
		case 'removeUser':
		// call a method to remove a user from the room
		case 'deleteRoom':
		// call a method to delete the room
	}
}
function fetchMessages({ options = {} }) {

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
		case 'editAction':
			// 处理编辑操作的逻辑
			break;
		case 'deleteAction':
			// 处理删除操作的逻辑
			break;
		case 'privateChatAction':
			createRoom(members, roomName, 'single');
			break;
		// Add more cases for other custom actions
	}
}

function handleInviteMember() {
	getTeamNoMember(operChatId.value)
	chatMemberAddVisible.value = true
}
function handleDeleteMember() {
	getTeamNoMember(operChatId.value)
	getDeleteChatMember(operChatId.value)
	chatMemberDeleteVisible.value = true
}
function handleDeleteChat(){
	
}
function handleExit(){
	if(isAdmin.value === true){
		chatFunction.deleteChatAdmin(operChatId.value)
	}else{
		chatFunction.deleteChatNormal(operChatId.value)
	}
}
function handleDissolveChat(){

}
function handleRoomAction({ roomId, action, message }) {
	operChatId.value = roomId
	getTeamNoMember(roomId)
	console.log('@@@@@@@@@@')
	console.log(mainChatId.value)
	if (roomId.toString() === mainChatId.value.toString()) {
		ElMessage.error('您不能对主群进行操作')
	} else {
		switch (action.name) {
			case 'inviteUser':
				chatMemberAddVisible.value = true
				break;
			case 'removeUser':
				getDeleteChatMember(roomId)
				chatMemberDeleteVisible.value = true
				break;
			case 'deleteAction':
				// 处理删除操作的逻辑
				break;
			case 'privateChatAction':
				// 处理私聊操作的逻辑
				break;
			// Add more cases for other custom actions
		}
	}
}

function handleChatInfo(event) {
	drawerTable.value = true
	operChatId.value = event.roomId
	getChatMemberInfo(event.roomId)
}

onMounted(() => {
	team_id.value = route.params.team_id
	user_id.value = getUserId()
	currentUserId.value = user_id.value
	addData()
	addHistoryMessage()
	getTeamMember()
	socket.value = new WebSocket(`ws://localhost:8000/chat/${user_id.value}`)
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
</style>

