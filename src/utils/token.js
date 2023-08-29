export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}
export const setUser = (user_id) => {
    localStorage.setItem('USER', user_id);
}
export const setTeamId = (team_id) => {
    localStorage.setItem('TEAM', team_id);
}
export const setTeamName = (team_name) => {
    localStorage.setItem('TEAM_NAME', team_name);
}

export const setProjId = (proj_id) => {
    localStorage.setItem('PROJID', proj_id);
}

export const setDesignId = (des_id) => {
    localStorage.setItem('DESID', des_id);
}

export const setProjectName = (proj_name)=> {
    localStorage.setItem('PROJNAME', proj_name)
}

export const getProjectName = ()=> localStorage.getItem('PROJNAME')

export const getDesignId = () => localStorage.getItem('DESID')

export const getProjId = () => localStorage.getItem('PROJID')

export const getTeamId = () => localStorage.getItem('TEAM');
export const getTeamName = () => localStorage.getItem('TEAM_NAME')
export const getToken = () => localStorage.getItem('TOKEN');

export const getUserId = () => localStorage.getItem('USER');
export const clearToken = () => localStorage.removeItem('TOKEN');