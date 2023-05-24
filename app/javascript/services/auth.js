import axios from 'axios';
// import { useAuthStore } from '@/stores';

const API_URL = '';

// const authStore = useAuthStore();
let token = '';
if (JSON.parse(localStorage.getItem('store'))) {
  token = JSON.parse(localStorage.getItem('store')).user.token;
}
// const { token } = JSON.parse(localStorage.getItem('auth'))?.user ?? null;

const config = {
  headers: {
    // Authorization: `Bearer ${JSON.parse(localStorage.getItem('store')).user.token}`,
    Authorization: `Bearer ${token}`,
  },
};
// axios.interceptors.request.use(
//   (config) => {
//     const { token } = authStore.user;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );

export const postLogin = async (request) => await axios.post(`${API_URL}/login`, request);
export const deleteLogout = async () => await axios.delete(`${API_URL}/logout`, config);
// export const deleteLogout = async () => await axios.delete(`${API_URL}/logout`, token);
// export const deleteLogout = async () => token;
