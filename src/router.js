import { createRouter, createWebHistory} from 'vue-router';
import bookingpage from './components/Bookingpage.vue';
import signuppage from './components/Signup.vue';



const routes = [
    {path: '/', component: bookingpage},
    {path: '/signup', component: signuppage}
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;