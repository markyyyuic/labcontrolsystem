
import { createRouter, createWebHistory } from 'vue-router';
import displayschedule from './components/ScheduleDisplayer.vue';
import login from './components/Login.vue';
import registration from './components/Registration.vue';
import NavBar from './components/NavigationBar.vue';
import maindashboard from './components/maindashboard.vue';
import userprofile from './components/profile.vue';
import scheduploader from './components/ScheduleUploader.vue';
import schedulemanager from './components/ScheduleManager.vue'



const routes = [
  { 
    path: '/', 
  component: displayschedule 
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/registration',
    component: registration
  },
  {
    path: '/navbar',
    component: NavBar
  },
  {
    path: '/maindashboard',
    component: maindashboard
  },
  {
    path: '/profile',
    component: userprofile
  },
  {
    path: '/uploadschedule',
    component: scheduploader
  },
  {
    path: '/manageschedule',
    component: schedulemanager
  },



]

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
