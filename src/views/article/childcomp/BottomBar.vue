<template>
  <div class="bottom-bar">
    <!-- 写评论按钮 -->
    <div class="writeComment">
      <van-button 
        round
        @click="$emit('writecomment')">写评论</van-button>
    </div>
    <div class="operate">
      <!-- 点赞按钮 -->
      <div>
        <van-icon
          :name="ifGood === 1 ? 'good-job' : 'good-job-o'"
          :style="ifGood ===1 && { color: 'orange' }"
          class="good"
          @click="goodclick"
        />
      </div>
      <!-- 评论按钮 -->
      <div><van-icon 
        name="comment-o" 
        class="comment"
        :badge="com_count" /></div>
      <!-- 收藏按钮 -->
      <div>
        <van-icon
          :name="ifStar ? 'star' : 'star-o'"
          :style="ifStar && { color: 'orange' }"
          class="star"
          @click="starclick"
        />
      </div>
      <!-- 分享按钮 -->
      <div><van-icon name="share-o" class="share" /></div>
    </div>
  </div>
</template>

<script>
import {
  starNews,
  cancelStar,
  likeNew,
  likeCancel,
} from "@/network/article.js";
import { Toast } from "vant";
export default {
  name: "BottomBar",
  data() {
    return {
      // 是否点赞
      ifGood: this.ifGoodOnline,
      // 是否收藏
      ifStar: this.ifStarOnline,
      // 文章评论总数
      totalCount: this.com_count
    };
  },
  props: {
    // 文章id
    art_id: {
      required: true,
      default() {
        return 0;
      },
    },
    // 线上文章是否被点赞
    ifGoodOnline: {
      default() {
        return -1;
      },
    },
    // 线上文章是否被收藏
    ifStarOnline: {
      default() {
        return false;
      },
    },
    // 文章总评论数
    com_count: {
      default() {
        return 0
      }
    }
  },
  mounted () {
    this.$bus.$on('totalcount',(total_count) => {
      this.total_count = total_count
    })
  },
  methods: {
    async goodclick() {
      // 文章已经被点赞，取消点赞
      if (this.art_id) {
        if (this.ifGood === 1) {
          Toast.loading({
            forbidClick: true,
          });
          try {
            const msg = await likeCancel(this.art_id);
            this.ifGood = -1;
            Toast.clear();
          } catch (e) {
            let msg = "";
            if (e.response) {
              switch (e.response.status) {
                case 401:
                  msg = "您还未登录，请先登录";
                  break;
                case 507:
                  msg = "服务器异常";
                  break;
              }
            } else {
              msg = "网络异常";
            }
            Toast({
              message: msg,
              closeOnClick: true,
            });
          } // 文章没有被点赞，点赞文章
        } else {
          Toast.loading({
            forbidClick: true,
          });
          try {
            const msg = await likeNew(this.art_id);
            console.log('点赞文章',msg)
            this.ifGood = 1;
            console.log
            Toast.clear();
          } catch (e) {
            let msg = "";
            if (e.response) {
              switch (e.response.status) {
                case 401:
                  msg = "您还未登录，请先登录";
                  break;
                case 507:
                  msg = "服务器异常";
                  break;
              }
            } else {
              msg = "网络异常";
            }
            Toast({
              message: msg,
              closeOnClick: true,
            });
          }
        }
      }
    },
    async starclick() {
      // 文章已经收藏，则取消收藏
      if (this.art_id) {
        if (this.ifStar) {
          Toast.loading({
            forbidClick: true,
          });
          try {
            const msg = await cancelStar(this.art_id);
            this.ifStar = !this.ifStar;
            Toast.clear();
          } catch (e) {
            let msg = "";
            if (e.response) {
              switch (e.response.status) {
                case 401:
                  msg = "您还未登录，请先登录";
                  break;
                case 507:
                  msg = "服务器异常";
                  break;
              }
            } else {
              msg = "网络异常";
            }
            Toast({
              message: msg,
              closeOnClick: true,
            });
          } // 文章未收藏，收藏文章
        } else {
          Toast.loading({
            forbidClick: true,
          });
          try {
            const msg = await starNews(this.art_id);
            this.ifStar = !this.ifStar;
            Toast.clear();
          } catch (e) {
            let msg = "";
            if (e.response) {
              switch (e.response.status) {
                case 401:
                  msg = "您还未登录，请先登录";
                  break;
                case 507:
                  msg = "服务器异常";
                  break;
              }
            } else {
              msg = "网络异常";
            }
            Toast({
              message: msg,
              closeOnClick: true,
            });
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  box-sizing: border-box;
  width: 100vw;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  border-top: 1px solid #d8d8d8;
  padding: 0 12px;
  align-items: center;
}

.bottom-bar > div {
  width: 50%;
  line-height: 49px;
}

.operate {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
}

.operate .van-icon {
  vertical-align: middle;
}

.writeComment .van-button--round {
  width: 140px;
  height: 22px;
}
</style>