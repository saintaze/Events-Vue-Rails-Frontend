<template>
  <main class="main">
    <calendar />
    <events />
  </main>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import Events from '@/components/Events.vue'


export default {
  name: 'calendar-events',
  components: {
    Calendar,
    Events
  }
}
</script>

<style lang="scss">

.main {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 1050px;
  margin: 50px auto;
  padding: 0 1rem;
}

</style>