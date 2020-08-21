import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '@/components/Calendar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/events'
  },
  {
    path: '/events',
    component: Calendar
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;



