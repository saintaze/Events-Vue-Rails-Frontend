<template>
  <div>
    <h1>Hello World</h1>
    <child />
  </div>
</template>

<script>
import Child from '@/components/Child.vue';

export default {
  name: 'parent',
  components: {
    Child
  }
}
</script>

<style>

</style>