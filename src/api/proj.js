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
          url:`/projects/${name, describe}`,
          method: 'PATCH',

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
                team
            }
        })
    },
    getSingleProject(){
        return requests({
            url:'/projects',
            method:'GET'
        })

    },
    getReProject(team){
        return requests({
            url:'/project/deleted',
            mehtod:'GET',
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