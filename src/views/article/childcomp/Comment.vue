<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in commentList"
        :key="index"
        :commentItem="item"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import { getComments } from "@/network/comment.js";
export default {
  components: { CommentItem },
  name: "Comment",
  data() {
    return {
      // 当前文章评论列表
      commentList: this.list,
      loading: false,
      finished: false,
      // 获取下一页数据的页码
      offset: null,
      // 每次获取的评论数量限制
      limit: 10
    };
  },
  props: {
    // source的值，传入文章id，表示获取文章评论，传入评论id，表示获取回复评论
    source: {
      required: true,
      type: [String,Number,Object]
    },
    // type的值，传入字符串a，表示获取文章评论数字，传入字符串c，表示获取评论回复数据
    type: {
      required: true
    },
    list: {
      default(){
        return []
      }
    }
  },
  methods: {
    // 请求文章评论列表数据或评论回复数据
    async onLoad() {
      // 只有在文章id存在时该方法才会被调用
      if (this.source) {
        try {
          console.log('传入的source',this.source);
          // 获取评论列表数据
          const { data } = await getComments({
            type: this.type,
            source: this.source.toString(),
            offset: this.offset, // 页码，不传为null时默认从第一页开始读取数据
            limit: this.limit,
          });
          console.log('请求到的评论数据',data);
          const result = data.data
          const total_count = result.total_count
          this.$bus.$emit('totalcount',total_count)
          // 设置下一次请求id
          this.offset = result.last_id
          this.commentList.push(...result.results)
          // 关闭loading状态
          this.loading = false;
          // 当所有评论数据加载后完成
          if(result.results.length === 0){
            this.finished = true
          }
        } catch (e) {}
        
      }
    },
  }
};
</script>

<style>
</style>