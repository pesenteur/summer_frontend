import requests from "@/utils/request";

export default {
    queryAllRoom(team) {
        return requests({
            url:'/chats',
            method: 'GET',
            params: {
                team
            }
        });
    },
    createRoom(team,members,name,type=null) {
        if (type === null) {
            return requests({
                url: '/chats',
                method: 'POST',
                data: {
                    team, members, name
                }
            });
        }else{
            return requests({
                url: '/chats',
                method: 'POST',
                data: {
                    team, members, name, type
                }
            });
        }
    },
    getRoomInfo(team) {
        return requests({
            url: `/chat/${team}`,
            method: 'GET',
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

    addTeamMember(chat_id,members) {
        return requests({
            url: `/chat/${chat_id}/add-member`,
            method: 'PATCH',
            data: {
                members
            }
        });
    },
    deleteTeamMember(chat_id,members) {
        return requests({
            url: `/chat/${chat_id}/remove-member`,
            method: 'PATCH',
            data: {
                members
            }
        });
    },
    deleteChatAdmin(chat_id) {
        return requests({
            url: `/chat/${chat_id}/admin-leave`,
            method: 'PATCH',
        });
    },
    deleteChatNormal(chat_id) {
        return requests({
            url: `/chat/${chat_id}/leave`,
            method: 'PATCH',
        });
    }

}