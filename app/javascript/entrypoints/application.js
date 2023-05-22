import { createApp } from 'vue/dist/vue.esm-bundler';
import PrimeVue from 'primevue/config';
import App from '../App.vue';

// theme
import 'primevue/resources/themes/lara-light-indigo/theme.css';

// core
import 'primevue/resources/primevue.min.css';

// const app = createApp({
//   data() {
//     return {
//       course: 'Intro to Vue 3 and Rails 7'
//     }
//   }
// })

const app = createApp(App);
app.use(PrimeVue);
// app.component('Button', Button)
app.mount('#app');