<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="onFocus"

      />
    </form>
    <!-- 结果列表 -->
    <search-result  
      v-if="ifSearch" 
      :searchValue="searchValue"/>
    <!-- 推荐列表 -->
    <search-recommend 
      v-else-if="searchValue"
      :searchValue="searchValue"
      @search="onSearch($event)"/>
    <!-- 历史记录 -->
    <search-history 
      v-else
      :history="history"
      @search="onSearch($event)"
      @delete="deleteHistory($event)"
      @clear="clearHistory"/>
  </div>
</template>

<script>
import SearchHistory from "./childcomp/SearchHistory.vue";
import SearchRecommend from "./childcomp/SearchRecommend.vue";
import SearchResult from "./childcomp/SearchResult.vue";

import { getSearchHistory } from "@/network/search.js"

import { mapState } from "vuex"

export default {
  name: "Search",
  components: {
    SearchHistory,
    SearchRecommend,
    SearchResult,
  },
  data() {
    return {
      searchValue: "",
      // 搜索列表是否显示
      ifSearch: false,
      // 记录搜索历史
      history: []
    };
  },
  created () {
    // 根据用户登录与否，对历史记录进行请求
    // 如果未登录，调用本地存储，否则调用线上接口
    if(this.token){
      this.getHistory()
    }else{
      this.history = JSON.parse(localStorage.getItem('searchHistory')) || []
    }
  },
  methods: {
    onSearch(val) {
      this.searchValue = val
      this.ifSearch = true
      // 存储搜索历史，并去除重复历史
      const index = this.history.findIndex(item => {
        return item === this.searchValue
      })
      if(index === -1){
        this.history.unshift(this.searchValue)
        
      }else{
        // 数据重复，删除之前的数据重新添加
        this.history.splice(index,1)
        this.history.unshift(this.searchValue)
      }
    },
    // 当输入框内容为空并且获得焦点时显示历史记录
    onFocus() {
      if(!this.searchValue===""){
        this.ifSearch = true
      }else{
        this.ifSearch = false
      }
    },
    // 删除history中的历史记录
    deleteHistory(item) {
      const index = this.history.findIndex(item => {
        return item === this.searchValue
      })
      this.history.splice(index,1)
    },
    // 清空历史记录
    clearHistory(e) {
      
      this.history = []
      localStorage.removeItem('searchHistory')
    },
    // 获取线上历史记录数据
    async getHistory() {
      try {
        const { data } = await getSearchHistory()
        this.history = data.data.keywords
      }catch(e) {}
    }
  },
  // 在watch中监视history属性，在未登录状态下，只要发生改变，无论是删除还是添加，就存储history数据到localStorage中
  // 大大减少了代码的书写量
  watch: {
    history() {
      if(!this.token)
      localStorage.setItem('searchHistory',JSON.stringify(this.history))
    }
  },
  computed: {
    ...mapState(['token'])
  }
};
</script>

<style scoped>
.van-search {
  background-color: #3296fa;
}

.van-search /deep/ .van-search__action {
  color: #fff;
}
</style>