import requests from "@/utils/request";

export default {
    startPreview(project){
        return requests({
            url:'/design/enable-preview',
            method:'PATCH',
            params:{
                project
            }
        })
    },
    attainPreview(project){
        return requests({
            url:'/design/preview',
            method:'GET',
            params:{
                project
            }
        })
    },
    attainTemplate(){
        return requests({
            url:'/design/templates',
            method:'GET',
        })
    },
    cancelPreview(project){
        return requests({
            url:'/design/cancel-preview',
            method:'DELETE',
            params:{
                project
            }
        })
    }
}