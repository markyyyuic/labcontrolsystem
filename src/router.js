import { createRouter, createWebHistory} from 'vue-router';
import bookingpage from './components/Bookingpage.vue';
import signuppage from './components/Signup.vue';
import loginpage from './components/Loginpage..vue'



const routes = [
    {path: '/', component: bookingpage},
    {path: '/signup', component: signuppage},
    {path: '/login', component: loginpage}
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;