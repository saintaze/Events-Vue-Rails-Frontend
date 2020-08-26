import Vue from 'vue'
import VueRouter from 'vue-router'
import CalendarEvents from '@/components/CalendarEvents.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    redirect: '/events'
  },
  {
    path: '/events',
    component: CalendarEvents
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;



