<template>
  <div>
    <van-cell>
      <!-- 用户头像 -->
      <template #icon>
        <van-image
          width="35"
          height="35"
          :src="commentItem && commentItem.aut_photo"
          round
        />
      </template>
      <template #title>
        <div class="head">
          <span>{{ commentItem && commentItem.aut_name }}</span>
          <van-icon
            name="good-job-o"
            @click="likeclick"
            :class="{ active: ifLike }"
            >{{ commentItem && commentItem.like_count }}</van-icon
          >
        </div>
      </template>
      <template #label>
        <p>{{ commentItem && commentItem.content }}</p>
        <div class="com-bottom">
          <span class="date">{{
            commentItem && commentItem.pubdate | commentTimeForamt
          }}</span>
          <van-button 
            :disabled="ifClick"
            type="default" 
            round size="mini"
            @click="$bus.$emit('popOn',commentItem);"
            >{{ commentItem && commentItem.reply_count }} 回复</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { likeComment, cancelLikeComment } from "@/network/comment.js";
// 引入节流函数，防止用户频繁点击点赞按钮
import { throttle } from "@/utils/throttle.js"
import { Toast } from 'vant';
export default {
  name: "CommentItem",
  data() {
    return{
      // 当前评论是否处于点赞状态
      ifLike: this.commentItem.is_liking || false
    }
  },
  props: {
    // 评论信息
    commentItem: {
      required: true,
      default() {
        return null;
      },
    },
     // 回复按钮是否可以点击
    ifClick: {
      default() {
        return false
      }
    }
  },
  methods: {
    // 进行防抖处理，防止用户多次点击
     likeclick : throttle(async function() {
       // 如果该评论已经点赞，取消点赞
      if (this.commentItem && this.ifLike) {
        try {
          // 禁用点赞按钮，防止多次发送请求
          const msg = await cancelLikeComment(this.commentItem.com_id)
          this.ifLike = false
          this.commentItem.like_count--
        } catch (e) {}
      } else {
        // 没有点赞，点赞
        try {
          // 禁用点赞按钮
          const msg = await likeComment(this.commentItem.com_id)
          this.ifLike = true
          this.commentItem.like_count++
        } catch (e) {
          if(e && e.response.status === 401){
            Toast({
              message: "请先登录"
            })
          }
        }
      }
    },1000) 
  },
};
</script>

<style scoped>
.van-cell .van-image--round {
  margin-right: 12px;
}

.head {
  display: flex;
  justify-content: space-between;
}

.head span {
  font-size: 14px;
  color: #406599;
}

.head .van-icon {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.van-cell__label p {
  font-size: 17px;
  color: #222222;
  margin-top: 16px;
  margin-bottom: 12px;
}

.com-bottom {
  display: flex;
  align-items: center;
}

.com-bottom .date {
  margin-right: 20px;
  color: #222222;
}

.com-bottom .van-button {
  padding-left: 15px;
  padding-right: 15px;
}

.active {
  color: red;
}

.van-image--round img{
  width: 100%;
  height: 100%;
}
</style>