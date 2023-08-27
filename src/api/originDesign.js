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
    getSingle(design){
        return requests({
            url:'/design',
            method: 'GET',
            params: {
                design
            }
        })
    },
    getAllDesign(project){
        return requests({
            url:`/design`,
            method: 'GET',
            params:{
                project
            }
        })
    }
}