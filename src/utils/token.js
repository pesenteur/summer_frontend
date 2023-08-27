export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}
export const setUser = (user_id) => {
    localStorage.setItem('USER', user_id);
}

export const getToken = () => localStorage.getItem('TOKEN');

export const getUserId = () => localStorage.getItem('USER');
export const clearToken = () => localStorage.removeItem('TOKEN');