export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}
export const setUser = (user_id) => {
    localStorage.setItem('USER', user_id);
}
export const setTeamId = (team_id) => {
    localStorage.setItem('TEAM', team_id);
}

export const setProjId = (projId) => {
    localStorage.setItem('PROJTD', projId)
}

export const getProjId = () => localStorage.getItem('PROJID')

export const getTeamId = () => localStorage.getItem('TEAM');

export const getToken = () => localStorage.getItem('TOKEN');

export const getUserId = () => localStorage.getItem('USER');
export const clearToken = () => localStorage.removeItem('TOKEN');