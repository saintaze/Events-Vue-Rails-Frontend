import Calendar from '@/components/Calendar.vue'

export default [
  {
    path: '/',
    redirect: '/events'
    
  },
  {
    path: '/events',
    component: Calendar
  }
];