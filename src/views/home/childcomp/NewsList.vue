<template>
  <div ref="article">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :disabled="activePullRef"
      :success-duration="1000"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(item,index) in articles"
          :key="index"
          :article="item"
        >
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNews } from "@/network/home.js";
import ArticleItem from '@/components/content/ArticleItem.vue';
export default {
  components: { ArticleItem },
  name: "NewsList",
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      // 时间戳
      timestamp: Date.now(),
      refreshing: false,
      // 是否禁用下拉刷新
      activePullRef: false,
      // 下拉刷新成功显示信息
      successText: "刷新成功",
      // 列表数据加载失败，err设为true，显示错误提示
      error: false,
      // 当前标签页偏移量
      offset: 0
    };
  },
  props: {
    channel: {
      required: true,
      default() {
        return 0;
      },
    },
  },
  methods: {
    onLoad() {
      // 上拉加载数据
      this.getArticalData().then((res) => {
        const getData = res;
        if (getData && getData.length !== 0) {
          this.articles.push(...getData);
          // 数据请求完毕，取消refreshing状态
          this.loading = false;
        } else {
          //  数据长度为0时，表明所有数据请求完毕，此时禁用上拉加载功能
          this.finished = true;
        }
      });
    },
    onRefresh() {
      // 下拉加载数据
      // 将 refreshing 设置为 true，表示处于加载状态
      this.refreshing = true;
      this.getArticalData().then((res) => {
        const getData = res;
        if (getData && getData.length !== 0) {
          this.articles.unshift(...getData);
          // 数据请求完毕，取消refreshing状态
          this.refreshing = false;
          this.successText = `为您加载了${getData.length}条数据`;
        } else {
          //  数据长度为0时，表明所有数据请求完毕，此时禁用上拉加载功能
          this.activePullRef = true;
        }
      });
    },

    //  请求文章数据
    async getArticalData() {
      try {
        const { data } = await getNews({
          channel_id: this.channel,
          timestamp: this.timestamp,
          with_top: 1,
        });
        this.timestamp = data.data.pre_timestamp;
        console.log(data.data.results);
        return data.data.results;
      } catch (e) {
        //读取数据发生错误时显示错误提示
        this.error = true;
      }
    },
  },
  mounted () {
    const articleList = this.$refs.article
    articleList.onscroll = function () {
      console.log(articleList.scrollTop)
    }
  },
  // 在重新进入当前文章浏览页面时，将保存的偏移量设置回来
  activated () {
    
  },
  // 在点击文章进入文章详情页面浏览文章时，记录当前页面offset偏移量
  deactivated () {
    
  }
};
</script>

<style>
</style>