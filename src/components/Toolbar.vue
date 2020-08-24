<template>
  <header class="header">
    {{brandName}}
  </header>
</template>

<script>
import { BRAND_NAME } from '@/constants.js';

export default {
  name: 'toolbar',
  data(){
    return {
      brandName: BRAND_NAME
    }
  }
}
</script>

<style lang="scss">
  .header {
    height: 40px;
    line-height: 40px;
    padding-left: 1.5em;
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-family: Lucida Grande,Helvetica,Arial,Verdana,sans-serif;
    font-size: 14px;
  }
</style>