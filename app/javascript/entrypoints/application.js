import { createApp } from 'vue/dist/vue.esm-bundler';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';

import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import App from '@/App.vue';
import { router } from '@/router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.component('Divider', Divider);
app.component('InputText', InputText);
app.component('Button', Button);

app.use(pinia);
app.use(router);
app.use(PrimeVue);

app.mount('#app');

// createApp(App).use(createPinia()).mount('#app');
