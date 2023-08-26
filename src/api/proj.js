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
            data: {
                team
            }
        })

    },
    deleteProject(id){
        return requests({
            url:`/projects/${id}`,
            method:'DELETE',
            data:{
                id
            }
        })
    },
    getSingleProject(){
        return requests({
            url:'/projects',
            method:'GET'
        })

    },
    errorPrintTest(){
        return requests({
            url:'/project',
            method:'GET'
        })
    },
    getReProject(){
        return requests({
            url:'/project/deleted',
            mehtod:'GET'
        })
    },
}