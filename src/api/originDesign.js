import requests from "@/utils/request";

export default {
    addOrigin(title,project){//返回design
        return requests({
            url:'/designs',
            method: 'POST',
            data: {
                title,project
            },
        })
    },
    getSingle(project,design){
        return requests({
            url:`/design/${design}`,
            method: 'GET',
            params: {
                project
            }
        })
    },
    getAllDesign(project){
        return requests({
            url:`/designs`,
            method: 'GET',
            params:{
                project
            }
        })
    }
}