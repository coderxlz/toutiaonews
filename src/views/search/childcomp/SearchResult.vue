<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in searchResult"
      :key="index"
      :title="item.title"
    />
  </van-list>
</template>

<script>
import { getSearchResult } from "@/network/search.js";
export default {
  name: "SearchResult",
  data() {
    return {
      loading: false,
      finished: false,
      // 请求的结果
      searchResult: [],
      // 请求页数
      page: 1,
      // 每页数量
      per_page: 10,
    };
  },
  props: {
    searchValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 获取搜索结果数据
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchValue,
        });
        if (data.data.results.length) {
          // 存储搜索结果
          this.searchResult.push(...data.data.results);
          // 请求页码数+1
          this.page = this.page + 1;
          // 关闭loading状态
          this.loading = false;
          // 判断页面是否请求结束
        } else {
          this.finished = true;
        }
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.van-list {
  position: fixed;
  top: 54px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
</style>