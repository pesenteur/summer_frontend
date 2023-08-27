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
    changeProject(name,describe){
      return requests({
          url:'/projects',
          method: 'PATCH',
          params:{
              name,describe
          }
      })
    },
    getAllProjects(team){
        return requests({
            url:'projects',
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
    getSingleProject(id){
        return requests({
            url:'/projects',
            method:'GET',
            params:{
                id
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