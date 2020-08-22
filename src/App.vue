<template>
  <div>
    <toolbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'

export default {
  name: 'app',
  components: {
    Toolbar
  }
}
</script>

<style lang="scss">
  html, body{
    padding: 0;
    margin: 0;
  }
</style>
