<template>
  <div class="layout">
    <!-- keep-alive只针对同一级路由之间的切换具有缓存状态
    子集路由之间需要再加keep-alive -->
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
  mounted () {
    // 在layout组件重新渲染并挂载时重新将layout组件进行缓存
    this.$store.commit('setCache','Layout')
  },
  destroyed () {
    console.log('layout销毁了')
  },
  created () {
    console.log('layout创建了')
  }
};
</script>

<style>
</style>
