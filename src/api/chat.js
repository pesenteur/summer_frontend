import requests from "@/utils/request";

export default {
    queryAllRoom(team) {
        console.log(team)
        return requests({
            url:'/chats',
            method: 'GET',
            params: {
                team
            }
        });
    },
    createRoom(team,members,name) {
        return requests({
            url: '/chats',
            method: 'POST',
            data: {
                team,members,name
            }
        });
    },
    queryMessage(chat_id, message_id=null, count=20) {
        return requests({
            url: `/chat/${chat_id}/message`,
            method: 'GET',
            params: {
                id: message_id, count
            }
        });
    },

}