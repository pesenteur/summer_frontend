<template>
  <vue-advanced-chat :current-user-id="currentUserId" :rooms="JSON.stringify(rooms)" :messages="JSON.stringify(messages)"
    :room-actions="JSON.stringify(roomActions)" :rooms-loaded="true" :messages-loaded="true"
    @fetch-messages="fetchMessages($event.detail[0])" @send-message="sendMessage($event.detail[0])" :height="height"
    @add-room="addRoom" :menu-action-handler="menuActionHandler" :room-info-enabled="true"
    :message-actions="JSON.stringify(messageActions)" @message-action-handler="handleCustomMessageAction($event.detail[0])">
    <template #message-content="{ message }">
      <div :class="'message ' + 'sender-' + message.senderId">
        {{ message.content }}
      </div>
    </template>
  </vue-advanced-chat>
</template>

<script>
import { register } from 'vue-advanced-chat'
register()

// Or if you used CDN import
// window['vue-advanced-chat'].register()
export default {
  methods: {
    menuActionHandler({ action }) {
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
    },
    addRoom() {
      const rooms = this.rooms
      rooms.push({
        roomId: '2',
        roomName: 'Room 2',
        avatar: 'src/assets/imgs/people.png',
        unreadCount: 4,
        index: 3,
        lastMessage: {
          _id: 'xyz',
          content: 'Last message received',
          senderId: '1234',
          username: 'John Doe',
          timestamp: '10:20',
          saved: true,
          distributed: false,
          seen: false,
          new: true
        },
        users: [
          {
            _id: '1234',
            username: 'John Doe',
            avatar: 'src/assets/imgs/doe.png',
            status: {
              state: 'online',
              lastChanged: 'today, 14:30'
            }
          },
          {
            _id: '4321',
            username: 'John Snow',
            avatar: 'src/assets/imgs/doe.png',
            status: {
              state: 'offline',
              lastChanged: '14 July, 20:00'
            }
          }
        ],
        typingUsers: [4321]
      })
      this.rooms = rooms
    },
    sendMessage(message) {
      this.messages = [
        ...this.messages,
        {
          _id: this.messages.length,
          content: message.content,
          senderId: this.currentUserId,
          avatar: 'src/assets/imgs/doe.png',
          timestamp: new Date().toString().substring(16, 21),
          date: new Date().toDateString(),
          files: message.files // Add the files information to the message
        }
      ]
    },
    fetchMessages({ options = {} }) {
      setTimeout(() => {
        if (options.reset) {
          this.messages = this.addMessages(true)
        } else {
          this.messages = [...this.addMessages(), ...this.messages]
          this.messagesLoaded = true
        }
        // this.addNewMessage()
      })
    },
    handleCustomMessageAction({ roomId,action, message }) {
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
    },
    addMessages(reset) {
      const messages = []
      for (let i = 0; i < 30; i++) {
        messages.push({
          _id: reset ? i : this.messages.length + i,
          content: `${reset ? '' : 'paginated'} message ${i + 1}`,
          senderId: '4321',
          username: 'John Doe',
          date: '13 November',
          timestamp: '10:20',
          avatar: 'src/assets/imgs/doe.png',
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
    },
  },
  data() {
    return {
      currentUserId: '1234',
      height: '800px',
      content: "",
      messageActions: [
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
      ],
      rooms: [{
        roomId: '1',
        roomName: 'Room 1',
        avatar: 'src/assets/imgs/people.png',
        unreadCount: 4,
        index: 3,
        lastMessage: {
          _id: 'xyz',
          content: 'Last message received',
          senderId: '1234',
          username: 'John Doe',
          timestamp: '10:20',
          saved: true,
          distributed: false,
          seen: false,
          new: true
        },
        users: [
          {
            _id: '1234',
            username: 'John Doe',
            avatar: 'src/assets/imgs/doe.png',
            status: {
              state: 'online',
              lastChanged: 'today, 14:30'
            }
          },
          {
            _id: '4321',
            username: 'John Snow',
            avatar: 'src/assets/imgs/doe.png',
            status: {
              state: 'offline',
              lastChanged: '14 July, 20:00'
            }
          }
        ],
        typingUsers: [4321, 1234]
      }],
      messages: [],
      roomActions: [
        { name: 'inviteUser', title: 'Invite User' },
        { name: 'removeUser', title: 'Remove User' },
        { name: 'deleteRoom', title: 'Delete Room' }
      ]
    }
  }
}
</script>