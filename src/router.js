// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Bookingpage from './components/Bookingpage.vue';
import Signup from './components/Signup.vue';
import Loginpage from './components/Loginpage..vue';
import Homepage from './components/Homepage.vue';
import AccountRetrieval from './components/AccountRetrieval.vue';
import PasswordReset from './components/PasswordReset.vue';
import Dashboard from './components/Dashboard.vue';
import CheckoutForm from './components/CheckoutForm.vue';

const routes = [
  { path: '/', component: Homepage },
  { path: '/signup', component: Signup },
  { path: '/login', component: Loginpage },
  { path: '/bookingpage', component: Bookingpage },
  { path: '/retrieve', component: AccountRetrieval },
  { path: '/changepass', component: PasswordReset },
  { path: '/maindashboard', component: Dashboard },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutForm,
    props: route => ({ bookingData: route.params.bookingData })
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
