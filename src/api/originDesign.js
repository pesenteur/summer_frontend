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
    },
    deleteDesign(id){
        return requests({
            url:`/design/${id}`,
            method: 'DELETE'
        })
    },
    attainTemplate(){
        return requests({
            url:'/design/templates',
            method:'GET',
        })
    },
    useTemplate(design_id,template){
        return requests({
            url:`/design/${design_id}/use-template`,
            method:'GET',
            params:{
                template
            }
        })
    }
}