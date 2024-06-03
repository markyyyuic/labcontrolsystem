// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import displayschedule from './components/ScheduleDisplayer.vue';

const routes = [
  { path: '/', component: displayschedule },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
