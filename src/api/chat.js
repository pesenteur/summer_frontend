import requests from "@/utils/request";

export default {
    queryAllRoom(team) {
        return requests({
            url: '/chats',
            method: 'GET',
            data: {
                team
            }
        });
    },
}