<template>
	<vue-advanced-chat :current-user-id="currentUserId"
	                   :room-info-enabled="true"
	                   :rooms="JSON.stringify(rooms)"
	                   :messages="JSON.stringify(messages)"
	                   @open-user-tag="console.log"
	                   :room-actions="JSON.stringify(roomActions)"
	                   :rooms-loaded="true"
	                   @send-message="sendMessage($event.detail[0])"
	                   :height="height"
	                   @add-room="dialogFormVisible = true"
	                   :menu-action-handler="menuActionHandler"
	                   :message-actions="JSON.stringify(messageActions)"
	                   @message-action-handler="handleCustomMessageAction($event.detail[0])"
	                   :messages-loaded="messagesLoaded"
	                   :load-first-room="false"
	                   :room-id="room_id"
	                   @fetch-messages="addHistoryMessage(($event.detail[0]))"
	>
		<template #message-content="{ message }">
			<div :class="'message ' + 'sender-' + message.senderId">
				{{ message.content }}
			</div>
		</template>
	</vue-advanced-chat>
	<el-dialog v-model="dialogFormVisible" title="创建群聊">
		<el-form :model="newTeamName">
			<el-form-item label="群聊名称" :label-width="formLabelWidth">
				<el-input v-model="newTeamName" autocomplete="off"/>
			</el-form-item>
			<el-form-item label="群聊成员" :label-width="formLabelWidth">
				<el-select v-model="newTeamMember" multiple placeholder="Select">
					<el-option v-for="opt in teamOption" :key="opt.id" :label="opt.name" :value="opt.name"/>
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createNewRoom">
          Confirm
        </el-button>
      </span>
		</template>
	</el-dialog>
</template>

<script setup>
// import {VueAdvancedChat} from "vue-advanced-chat";
import {register} from 'vue-advanced-chat'
import teamFunction from '@/api/team'
import {onActivated, onBeforeMount, onMounted, onUnmounted, reactive, ref} from "vue"
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {getUserId} from "@/utils/token";
import chatFunction from "@/api/chat.js";

register()

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
const formLabelWidth = '140px'
const newTeamName = ref()
const newTeamMember = ref([])
const teamOption = ref([])
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
	{name: 'inviteUser', title: 'Invite User'},
	{name: 'removeUser', title: 'Remove User'},
	{name: 'deleteRoom', title: 'Delete Room'}
])
const room_id = ref()
const messagesLoaded = ref(false)
const messagesPerPage = 20

async function getTeamMember(){
	let res = await teamFunction.queryTeamMember(team_id.value)
	console.log("***************")
	console.log(res.data.members)
	teamOption.value = res.data.members
}

async function createNewRoom(){
	console.log('#######')
	console.log(newTeamMember.value)
	console.log('#######')
	let member = []
	
	newTeamMember.value.forEach((item) => {
		teamOption.value.forEach((team) => {
			if (item === team.name){
				member.push(team.id)
			}
		})
	})
	console.log(member)
	dialogFormVisible.value = false
	await chatFunction.createRoom(team_id.value,member,newTeamName.value)

}
async function addData() {
	let result = await chatFunction.queryAllRoom(team_id.value)
	const modifiedRoom = []
	result.data.forEach((item) => {
		let users = []
		item.members.forEach((member) => {
			let user = {
				_id: member.id,
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
			unreadCount: item.unread_count,
			lastMessage: {
				_id: 'xyz',
				content: 'Last message received',
				senderId: '1234',
				username: 'John Doe',
				timestamp: '10:20',
			}
		}
		modifiedRoom.push(room)
	})
	rooms.value = modifiedRoom
}
async function addHistoryMessage({ room, options = {} }){
	let res;
	if (options.reset) {
		messages.value=[]
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
		}
		messages.value.unshift(message)
	})

}


function upMessage(event) {
	let temp = JSON.parse(event.data)
	let message = {
		_id: temp.id,
		content: temp.content,
		senderId: user_id.value.toString(),
		username: 'John Doe',
		date: temp.created_time,
		timestamp: temp.created_time,
		avatar: '/doe.png',
	}
	messages.value.push(message)
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


function menuActionHandler({action,}) {
	console.log(action)
	switch (action.name) {
		case 'inviteUser':
			console.log("invite")
		// call a method to invite a user to the room
		case 'removeUser':
		// call a method to remove a user from the room
		case 'deleteRoom':
		// call a method to delete the room
	}
}
function sendMessage(message) {
	let formatMessage = {
		"team": team_id.value,
		"receiver": "",
		"chat": message.roomId,
		"content": message.content,
		"type": "text"
	}
	socket.value.send(JSON.stringify(formatMessage))
	
	// this.messages = [
	//   ...this.messages,
	//   {
	//     _id: this.messages.length,
	//     content: message.content,
	//     senderId: this.currentUserId,
	//     avatar: 'src/assets/imgs/doe.png',
	//     timestamp: new Date().toString().substring(16, 21),
	//     date: new Date().toDateString(),
	//     files: message.files // Add the files information to the message
	//   }
	// ]
}
function fetchMessages({options = {}}) {
	// setTimeout(() => {
	//   if (options.reset) {
	//     this.messages = this.addMessages(true)
	//   } else {
	//     this.messages = [...this.addMessages(), ...this.messages]
	//     this.messagesLoaded = true
	//   }
	//   // this.addNewMessage()
	// })
}
function handleCustomMessageAction({roomId, action, message}) {
	switch (action.name) {
		case 'replyAction':
			console.log(action.name)
			// 处理回复操作的逻辑
			break;
		case 'editAction':
			// 处理编辑操作的逻辑
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
function addMessages(reset) {
	const messages = []
	for (let i = 0; i < 30; i++) {
		messages.push({
			_id: reset ? i : this.messages.length + i,
			content: `${reset ? '' : 'paginated'} message ${i + 1}`,
			senderId: '4321',
			username: 'John Doe',
			date: '13 November',
			timestamp: '10:20',
			avatar: '/doe.png',
			system: false,
			saved: true,
			distributed: true,
			seen: true,
			deleted: false,
			failure: true,
			disableActions: false,
			disableReactions: false,
		})
	}
	
	return messages
}

// Or if you used CDN import
// window['vue-advanced-chat'].register()

</script>

<style scoped>

.dialog-footer button:first-child {
	margin-right: 10px;
}

</style>

