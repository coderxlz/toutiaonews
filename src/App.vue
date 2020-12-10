<template>
  <div id="app">
    <!-- 当有多个组件都不需要进行缓存时，使用数组形式
    :exclude="['Article','Profile']",include同理
    当不使用include时，默认缓存当前挂载节点下所有根路由-->
    <keep-alive :include="cacheComponents">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['cacheComponents'])
  }
}
</script>

<style>

</style>
