<template>
  <div class="layout">
    <keep-alive>
      <router-view />
    </keep-alive>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "components/content/Tabbar.vue";
export default {
  name: "Layout",
  components: {
    tabbar,
  },
};
</script>

<style>
</style>
