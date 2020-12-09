<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar class="nav_bar">
      <template #title>
        <div class="search" @click="toSearch">
          <van-icon name="search" size="18" />
          <span>搜索</span>
        </div>
      </template>
    </van-nav-bar>
    <!-- 频道标签页 -->
    <van-tabs v-model="active" animated class="scroll-wrap" swipeable>
      <van-tab v-for="(item,index) in channel" :title="item.name" :key="index">
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
      <channel-control
        :userChannel="channel"
        :selChannel="active"
        @close="ifShowPopup = false"
        @update="active = $event">
      </channel-control>
    </van-popup>
  </div>
</template>

<script>
import { getUserChanel } from "@/network/home.js";

import { mapState } from "vuex";

import NewsList from "./childcomp/NewsList.vue";
import ChannelControl from "./childcomp/ChannelControl";

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
    ChannelControl,
    ChannelControl,
  },
  computed: {
    ...mapState(["token"]),
  },
  created() {
    //页面初始化时，刷新用户频道数据
    this.UserChannel();
  },
  methods: {
    // 异步请求用户订阅频道
    async UserChannel() {
      // 如果用户已登录，从服务器请求频道列表数据
      if (this.token) {
        try {
          const { data } = await getUserChanel();
          this.channel = data.data.channels;
          console.log("服务器数据：", this.channel);
        } catch (e) {}
      // 如果没有登录，再判断是否存在本地数据
      } else if (!localStorage.getItem("defaultChannels")) {
        try {
          // 不存在本地数据，从服务器请求默认数据列表
          const { data } = await getUserChanel();
          const channel = data.data.channels;
          localStorage.setItem("defaultChannels", JSON.stringify(channel));
        } catch (e) {}
      } else {
        // 存在本地数据，读取本地数据
        this.channel = JSON.parse(localStorage.getItem("defaultChannels"));
      }
    },
    // 菜单按钮被点击，弹出层显示
    menuClick() {
      this.ifShowPopup = true;
    },
    // 点击搜索按钮，跳转到搜索页面
    toSearch() {
      this.$router.push('/search')
    }
  },
};
</script>

<style scoped>
@import url("~assets/css/home.css");
</style>
