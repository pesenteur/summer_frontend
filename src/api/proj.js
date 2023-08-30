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
          data:{
              name,describe
          }
      })
    },
    getAllProjects(team,ordering){
        return requests({
            url:'/projects',
            method: 'GET',
            params: {
                team,ordering
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
            method:'GET',
            params:{

            }
        })

    },
    getReProject(team,ordering){
        return requests({
            url:'/project/deleted',
            method:'GET',
            params:{
                team,ordering
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
    },
    copyProject(team,id){
        return requests({
            url:'/project/duplicate',
            method:'POST',
            data:{
                team,id
            }
        })
    }
}