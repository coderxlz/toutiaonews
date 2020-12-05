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

    <van-tabs v-model="active" animated class="scroll-wrap" swipeable>
      <van-tab v-for="item in channel" :title="item.name" :key="item.id">
        <!-- 将当前频道ID传入news展示页面 -->
        <news-list :channel="item.id"> </news-list>
      </van-tab>
      <!-- 标签栏右侧菜单按钮 -->
      <template #nav-right>
        <div class="box" @click="menuClick">
          <van-icon name="wap-nav" />
        </div>
      </template>
    </van-tabs>
    <!-- 弹出层，最好将弹出层挂载到body之上，因此写在外部 -->
    <!-- 图标位置 -->
    <van-popup
      v-model="ifShowPopup"
      closeable
      close-icon-position="top-left"
      position="bottom"
      round
      overlay-class="mypopup"
    >
      <!-- 在模板中使用$event来接受事件参数 -->
      <tab-control
        :userChannel="channel"
        :selChannel="active"
        @close="ifShowPopup = false"
        @update="active = $event"
      >
      </tab-control>
    </van-popup>
  </div>
</template>

<script>
import { getUserChanel } from "@/network/home.js"

import { mapState } from "vuex"

import NewsList from "./childcomp/NewsList.vue"
import TabControl from "./childcomp/TabControl"

export default {
  name: "Home",
  data() {
    return {
      // 当前激活tab索引值
      active: 0,
      // 用户频道数
      channel: null,
      // 是否显示弹出层
      ifShowPopup: false,
    };
  },
  components: {
    NewsList,
    TabControl,

  },
  computed: {
    ...mapState(['token'])
  },
  created() {
    //页面初始化时，刷新用户频道数据
    this.UserChannel();
  },
  methods: {
    // 异步请求用户订阅频道
    async UserChannel() {
      // 如果用户已登录，从服务器请求频道列表数据
      if(this.token){
        try {
        const { data } = await getUserChanel();
        this.channel = data.data.channels;
        console.log("服务器数据：", this.channel);
      } catch (e) {}
      }else{
        // 未登录情况下从本地读取频道列表数据
        // 将得到的频道列表存储进localStorage，localStorage没有数据的情况下存储
        if(!localStorage.getItem('defaultChannels')){
          localStorage.setItem('defaultChannels',JSON.stringify(this.channel))
        }
        this.channel = JSON.parse(localStorage.getItem('defaultChannels'))
        console.log('本地数据：',this.channel)
      }
      
    },
    // 菜单按钮被点击，弹出层显示
    menuClick() {
      this.ifShowPopup = true
    }
  }
};
</script>

<style scoped>
@import url("~assets/css/home.css");
</style>
