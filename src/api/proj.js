import requests from "@/utils/request";

export default {
    addProject(name,describe,team){
        return requests({
            url:'/projects',
            method: 'POST',
            data: {
                name,describe,team
            }
        })
    },
    resetProject(name,describe,projectId){
      return requests({
          url:`/projects/${projectId}`,
          method: 'PATCH',
          params:{
              name,describe,projectId
          }
      })
    },
    getAllProjects(team){
        return requests({
            url:'/projects',
            method: 'GET',
            params: {
                team
            }
        })

    },
    deleteProject(team, projectId){
        return requests({
            url:`/projects/${projectId}`,
            method:'DELETE',
            data:{
                team,projectId
            }
        })
    },
    getSingleProject(){
        return requests({
            url:'/projects',
            method:'GET',
            params:{

            }
        })

    },
    getReProject(team){
        return requests({
            url:'/project/deleted',
            method:'GET',
            params:{
                team
            }
        })
    },
    restoreProject(team,id){
        return requests({
            url:'/project/restore',
            method:'PATCH',
            data:{
                team,id
            }
        })
    }
}