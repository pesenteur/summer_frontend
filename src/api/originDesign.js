import requests from "@/utils/request";

export default {
    addOrigin(title,project){
        return requests({
            url:'/designs',
            method: 'POST',
            data: {
                title,project
            },
        })
    },
}