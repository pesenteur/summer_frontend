import requests from "@/utils/request";

export default {
    queryAllNoti() {
        return requests({
            url: '/messages',
            method: 'GET',
        });
    },
    querySingleNoti(message_id) {
        return requests({
            url: `/messages${message_id}`,
            method: 'GET',
        });
    },
    readSingleNoti(message_id) {
        return requests({
            url: `/messages/${message_id}`,
            method: 'PUT',
        });
    },
    readAllNoti() {
        return requests({
            url: `/messages/read`,
            method: 'PUT',
        });
    },
    deleteReadNoti() {
        return requests({
            url: `/messages/delete`,
            method: 'DELETE',
        });
    },
    deleteSingleNoti(message_id) {
        return requests({
            url: `/messages/${message_id}`,
            method: 'DELETE',
        });
    },

}