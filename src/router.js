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
import Schedules from './components/Schedules.vue';
import AdminProfile from './components/AdminProfile.vue';

const routes = [
  { path: '/', component: Homepage },
  { path: '/signup', component: Signup },
  { path: '/login', component: Loginpage },
  { path: '/bookingpage', component: Bookingpage },
  { path: '/retrieve', component: AccountRetrieval },
  { path: '/changepass', component: PasswordReset },
  { path: '/maindashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/schedules', component: Schedules },
  {
    path: '/adminprofile',
    component: AdminProfile,
    meta: { requiresAuth: true } // Add meta field to specify authentication requirement
  },
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

// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login page if not authenticated
  } else {
    next(); // Continue navigation
  }
});

export default router;
