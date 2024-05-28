import { createRouter, createWebHistory} from 'vue-router';
import bookingpage from './components/Bookingpage.vue';
import signuppage from './components/Signup.vue';
import loginpage from './components/Loginpage..vue'
import Homepage from './components/Homepage.vue'
import AccountRetrieval from './components/AccountRetrieval.vue'
import resetpass from './components/PasswordReset.vue'



const routes = [
    {path: '/', component: Homepage},
    {path: '/signup', component: signuppage},
    {path: '/login', component: loginpage},
    {path: '/bookingpage', component: bookingpage},
    {path: '/retrieve', component: AccountRetrieval},
    {path: '/changepass', component: resetpass}
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;