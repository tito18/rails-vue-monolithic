import { defineStore } from 'pinia';

// import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { postLogin, deleteLogout } from '@/services';
// import { useAlertStore } from '@/stores';

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore('store', {
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    // user: JSON.parse(localStorage.getItem('user')),
    user: {
      token: null,
    },
    returnUrl: null,
  }),
  persist: {
    paths: ['user'],
  },
  actions: {
    async login(email, password) {
      try {
        // const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });
        const request = { user: { email, password } };
        const { data: { token } } = await postLogin(request);

        // update pinia state
        this.user.token = token;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        // localStorage.setItem('user', this.user);
        // redirect to previous url or default to home page
        // router.push(this.returnUrl || '/');
      } catch (error) {
        // const alertStore = useAlertStore();
        // alertStore.error(error);
        console.log('error', error);
      }
    },
    async logout() {
      try {
        await deleteLogout();
        this.user = null;
        localStorage.removeItem('user');
        router.push('/account/login');
      } catch (error) {
        console.log(error);
      }
    },
  },
});
