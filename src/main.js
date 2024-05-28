import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './style.css';
import ToastService from 'primevue/toastservice';





import 'vue3-timepicker/dist/VueTimepicker.css';
import 'primevue/resources/themes/aura-light-green/theme.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'primeicons/primeicons.css'

const app = createApp(App);
app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.mount('#app')
