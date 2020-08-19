<template>
  <div id="app">
    <nav>
      <router-link to="/events" exact >Events</router-link>
      <router-link to="/login">Signin</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
  name: 'App',
  components: {
    Calendar
  }
}
</script>

<style lang="scss">
 html, body {
   padding: 0,;
   margin: 0;
 }
</style>
