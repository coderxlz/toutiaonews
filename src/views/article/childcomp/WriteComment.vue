<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '20%' }"
      :overlay-style="{ backgroundColor: 'transparent' }"
      @close="$emit('close')"
    >
    <div class="comment">
    <!-- 评论内容输入框 -->
    <!-- 使用v-model的修饰符trim去除输入消息两端的空格 -->
      <van-field
        v-model.trim="message"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="友善是交流的起点"
        show-word-limit
      />
      <div>
        <van-button 
          type="info" 
          size="small" 
          text="发表"
          @click="publish"
          :disabled="!message"></van-button>
      </div>
    </div>
    
    </van-popup>
  </div>
</template>

<script>
import { addComment } from '@/network/comment.js'
import { Toast } from 'vant';
export default {
  name: "WriteComment",
  data() {
    return {
      // 是否显示评论弹出层
      show: this.ifBottomShow,
      // 评论框输入内容
      message: "",
      // 新的评论内容
      newComment: null
    };
  },
  props: {
    // target，评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
    target: {
      required: true
    },
    // 文章id，对评论内容发表回复时，
    // 需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
    art_id: {
      type: [String,Number,Object]
    },
    // 底部评论编辑框是否显示
    ifBottomShow: false
  },
  methods: {
    // 对文章进行评论
    async publish() {
      try{
        const { data } = await addComment({
          target: this.target,
          content: this.message
        })
        const getData = data.data
        // 获取新的评论对象
        this.newComment = getData.new_obj
        // 将评论对象传递给父组件
        this.$emit('newComment',this.newComment)
        console.log(data)
        // 清空输入框消息
        this.message = ""
        // 关闭弹出层
        this.show = false
      }
      catch(e){
        if(e && e.response.status === 401){
          Toast({
            message: '请先登录'
          })
        }
      }
    }
  },
  watch: {
    ifBottomShow() {
      this.show = this.ifBottomShow
    }
  }
};
</script>

<style scoped>
  .comment{
    display: flex;
    align-items: center;
    height: 100%;
  }

  .comment .van-field{
    border: 1px solid rgb(143, 140, 140);
  }

  .comment /deep/ .van-button{
    width: 50px;
  }

</style>