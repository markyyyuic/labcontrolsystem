import { createRouter, createWebHistory} from 'vue-router';
import bookingpage from './components/Bookingpage.vue';



const routes = [
    {path: '/', component: bookingpage}
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;