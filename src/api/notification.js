import requests from "@/utils/request";

export default {
    queryAllNoti() {
        return requests({
            url: '/messages',
            method: 'GET',
        });
    },
    querySingleNoti(notId) {
        return requests({
            url: `/messages${notId}`,
            method: 'GET',
        });
    },
    readSingleNoti(notId) {
        return requests({
            url: `/messages/${notId}`,
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
    deleteSingleNoti(notId) {
        return requests({
            url: `/messages/${notId}`,
            method: 'DELETE',
        });
    },

}