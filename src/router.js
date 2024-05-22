import { createRouter, createWebHistory} from 'vue-router';
import bookingpage from './components/Bookingpage.vue';



const routes = [
    {path: '/booking', component: bookingpage}
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;