<template>
  <div class="searchRec">
    <van-cell
      icon="search"
      v-for="(item, index) in recSearch"
      :key="index"
      @click="$emit('search',item)"
    >
      <template #title>
        <div v-html="highlight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchRec } from "@/network/search.js";
import { throttle } from "@/utils/throttle.js";

export default {
  name: "SearchRecommend",
  data() {
    return {
      // 推荐搜索列表
      recSearch: [],
    };
  },
  props: {
    searchValue: {
      type: String,
      required: true,
    },
  },
  watch: {
    // 在watch中监听搜索数据searchValue的变化，发送联想建议请求
    // 由于需要在组件未初始化时就进行监听，需要使用watch的完整写法
    searchValue: {
      // 对推荐搜索数据请求进行节流操作，优化性能
      handler: throttle(async function () {
        try {
          const { data } = await getSearchRec(this.searchValue);
          this.recSearch = data.data.options;
          console.log(this.recSearch);
        } catch (e) {}
      }, 500),
      immediate: true,
    },
  },
  methods: {
    // 关键字高亮设置，将查询结果关键字使用html标签包裹，再结合v-html达到显示效果
    highlight(item) {
      const res = item.replace(new RegExp(this.searchValue,'gi'),`<span style="color:red">${this.searchValue}</span>`)
      return res
    }
  }
};
</script>

<style scoped>
.searchRec {
  position: fixed;
  top: 54px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
</style>