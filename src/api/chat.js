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
    createRoom(team,members) {
        return requests({
            url: '/chats',
            method: 'POST',
            data: {
                team,members
            }
        });
    },
    queryAllMessage(chat_id) {
        return requests({
            url: `/chats/${chat_id}/message?count=100`,
            method: 'GET',
        });
    },
}