import requests from "@/utils/request";

export default {
    getMyProject(name,describe,team){
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
    loginWithCode(phone_number, code) {
        return requests({
            url: '/loginWithCode',
            method: 'POST',
            data: {
                phone_number, code
            }
        });
    },
    loginWithPassword(phone_number, password) {
        return requests({
            url: '/loginWithPassword',
            method: 'POST',
            data: {
                phone_number, password
            }
        });
    },
    register(email, userid, username,password) {
        return requests({
            url: '/register',
            method: 'POST',
            data: {
                email, userid, username,password
            }
        });
    },
    requestCode(phone_number) {
        return requests({
            url: `/sendCode/${phone_number}`,
            method: 'GET'
        });
    },
    requestUserInfo() {
        return requests({
            url: '/userInfo',
            method: 'GET'
        });
    },
    requestUnread() {
        return requests({
            url: '/unreadMessage',
            method: 'GET'
        });
    },
    updatePassword(old_password, new_password) {
        return requests({
            url: '/changePassword',
            method: 'POST',
            data: {
                old_password, new_password
            }
        });
    },
    updatePhone(new_phone_number, vertification_code) {
        return requests({
            url: '/changePhone',
            method: 'POST',
            data: {
                new_phone_number, vertification_code
            }
        });
    },
    resetPassword(phone_number, vertification_code, new_password) {
        return requests({
            url: '/resetPassword',
            method: 'POST',
            data: {
                phone_number, vertification_code, new_password
            }
        });
    }
}