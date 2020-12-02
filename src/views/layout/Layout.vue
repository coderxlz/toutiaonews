<template>
  <div class="layout">
    <router-view/>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from 'components/content/Tabbar.vue'
export default {
  name: 'Layout',
  components: {
    tabbar
  }
}
</script>

<style>

</style>
