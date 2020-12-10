<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-cell class="head">
        <template #icon >
          <van-icon 
            name="cross" 
            @click="show = false"
          />
        </template>
        <template #title>
          <span>8条回复</span>
        </template>
      </van-cell>
      <comment-item
        :commentItem="commentItem"
        :ifClick="false"
      ></comment-item>
      <!-- 回复评论展示区 -->
      <van-cell title="所有评论回复"></van-cell>
      <!-- 复用组件Comment，传入评论id -->
      <comment
        :type="'c'"
        :source="com_id"
      ></comment>
      <!-- 弹出层底部回复按钮 -->
      <div class="popBottomButton">
        <van-button 
          text="回复" 
          round type="info" 
          @click="showReply = !showReply"
        ></van-button>
      </div>
      <write-comment
        :ifBottomShow="showReply"
        :target="com_id"
        :art_id="art_id"
        @close="showReply = !showReply"
      ></write-comment>
    </van-popup>
  </div>
</template>

<script>
import Comment from './Comment.vue'
import CommentItem from './CommentItem'
import WriteComment from './WriteComment.vue'
export default {
  components: {
    CommentItem,
    Comment,
    WriteComment
  },
  name: "Reply",
  data () {
    return {
      // 是否显示弹出层
      show: false,
      // 底部评论编辑弹出层是否显示
      showReply: false,
      // 当前查看评论回复的评论对象
      commentItem: null,
      // 当前评论id
      com_id: 0,
      // 回复评论列表
      replyList: null,
      // 获取下一页数据的页码
      offset: null,
      // 每次获取的评论数量限制
      limit: 10
    }
  },
  props: {
    art_id: {
      required: true,
      default() {
        return 0
      }
    }
  },
  mounted () {
    // 收到由CommentItem发送来的全局事件
    this.$bus.$on('popOn',(commentItem) => {
      this.show = true
      this.com_id = commentItem.com_id
      this.commentItem = commentItem
      console.log('当前评论',this.commentItem)
    })
  }
}
</script>

<style scoped>
.head{
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
}

.head .van-cell__title{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.popBottomButton{
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popBottomButton .van-button--info{
  height: 40px;
  padding-left: 30px;
  padding-right: 30px ;
  margin-bottom: 5px;
}
</style>