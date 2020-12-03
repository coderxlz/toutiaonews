<template>
  <div>
    <van-nav-bar class="nav_bar">
      <template #title>
        <div class="search">
          <van-icon name="search" size="18" />
          <span>搜索</span>
        </div>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated class="scroll-wrap">
      <van-tab v-for="item in channel" :title="item.name" :key="item.id">
        <!-- 将当前频道ID传入news展示页面 -->
        <news-list :channel="item.id"> </news-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChanel } from "@/network/home.js";

import NewsList from "./childcomp/NewsList.vue";
export default {
  name: "Home",
  data() {
    return {
      active: 0,
      // 用户频道数
      channel: null,
    };
  },
  components: {
    NewsList,
  },
  created() {
    //页面初始化时，刷新用户频道数据
    this.UserChannel();
  },
  methods: {
    async UserChannel() {
      try {
        const { data } = await getUserChanel();
        this.channel = data.data.channels;
        console.log("频道总数", this.channel);
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
@import url("~assets/css/home.css");
</style>
