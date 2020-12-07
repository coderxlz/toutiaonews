<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 文章部分 -->
    <div class="news">
      <!-- 标题栏 -->
      <van-cell>
        <template #title>
          <p>{{ article && article.title }}</p>
        </template>
      </van-cell>
      <!-- 作者信息栏 -->
      <van-cell center :border="false">
        <template #icon>
          <van-image
            width="38"
            height="38"
            :src="article && article.aut_photo"
            round
          />
        </template>
        <template #title>
          <span>{{ article && article.aut_name }}</span>
        </template>
        <template #label>
          <span>{{ article && article.pubdata | timeFormat }}</span>
        </template>
        <template>
          <van-button
            size="small"
            icon="plus"
            round
            :type="ifFollow ? 'default' : 'info'"
            :text="ifFollow ? '已关注' : '关注'"
            @click="followClick"
            :loading="ifFollowLoading"
          ></van-button>
        </template>
      </van-cell>
      <!-- 文章主体部分 -->
      <p
        v-html="article && article.content"
        class="markdown-body"
        ref="news"
      ></p>
    </div>
    <!-- 底部导航栏部分 -->
    <bottom-bar
      :ifGood="ifGood"
      :ifStar="ifStar"></bottom-bar>
  </div>
</template>

<script>
import "@/assets/css/github-markdown.css";
import { getDetailNews, 
         follow, 
         deleteFollow,
         starNews,
         cancelStar } from "@/network/article.js";
import { Toast } from "vant";
// 引入图片预览组件，需要单独引入
import { ImagePreview } from "vant";
import BottomBar from './childcomp/BottomBar.vue';
export default {
  components: { BottomBar },
  name: "Article",
  data() {
    return {
      // 文章信息
      article: null,
      // 用户id
      user_id: null,
      // 是否关注用户
      ifFollow: false,
      // 关注用户按钮是否处于加载状态
      ifFollowLoading: false,
      // 用户是否点赞
      ifGood: false,
      // 文章是否收藏
      ifStar: false
    };
  },
  created() {
    // 根据文章id请求文章信息
    this.getNews();
  },
  mounted() {
    /**
     * 放在此处无效，仍然无法保证拿到img数据
     */
    // // 获得所有图片组件
    // this.$nextTick(function () {
    //   const images = news.querySelectorAll("img");
    //   console.log(images);
    // });
  },
  props: {
    articleId: {
      // 使用[]可以表示枚举，表示该属性可能有多种类型
      type: String,
      required: true,
    },
  },
  methods: {
    async getNews() {
      // 请求数据
      try {
        const { data } = await getDetailNews(this.articleId);
        console.log(data);
        const getData = data.data;
        // 此时文章数据更新
        this.article = getData;
        this.ifFollow = getData.is_followed;
        this.user_id = getData.aut_id;
        // 给文章中所有图片添加预览效果，注意，只能放在此处，才能保证一定是在异步请求的图片数据已经得到后再取的img元素
        // 无法放在mounted中并结合$nextTick的方式使用，
        // 因为$nextTick只能保证回调函数会在下一次dom更新循环之后调用，但再下一次dom更新循环之后，
        // 异步请求的图片数据并不一定会得到响应，因此得到的图片组件仍然可能为空
        // const news = this.$refs.news;
        // console.log(news);
        // 获得所有图片组件
        this.$nextTick(function () {
          this.addPreview();
        });
      } catch (e) {}
    },
    onClickRight() {},
    // 给图片添加预览状态
    addPreview() {
      const news = this.$refs.news;
      const images = news.querySelectorAll("img");
      const imgSrcs = [];
      images.forEach((img, index) => {
        imgSrcs.push(img.src);
        img.onclick = function () {
          // 为所有图片添加预览效果
          ImagePreview({
            images: imgSrcs,
            startPosition: index,
          });
        };
      });
    },
    // 关注以及取消关注用户
    async followClick() {
      if (this.ifFollow) {
        // 已经关注，取消关注
        try {
          this.ifFollowLoading = true;
          const res = await deleteFollow(this.user_id);
          this.ifFollowLoading = false;
          this.ifFollow = false
          console.log(res);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            Toast("您还没有登录，请先登录");
            this.ifFollowLoading = false;
            return
          }
          this.ifFollowLoading = false
        }
      } else {
        // 没有关注用户，关注用户
        try {
          this.ifFollowLoading = true;
          const res = await follow(this.user_id);
          this.ifFollowLoading = false;
          this.ifFollow = true
          console.log(res.status);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            Toast("您还没有登录，请先登录");
            this.ifFollowLoading = false;
            return
          }
          this.ifFollowLoading = false
        }
      }
    }
  },
};
</script>

<style scoped>
.van-nav-bar__content {
  position: fixed;
}

.van-nav-bar {
  background-color: #3296fa;
}

.van-nav-bar /deep/ .van-icon {
  color: #fff;
}

.van-cell__value /deep/ .van-button--info {
  width: 85px;
  height: 29px;
}

.markdown-body {
  padding: 14px;
  background-color: #fff;
}

.van-cell__title /deep/ p {
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 20px;
  padding-top: 16px;
}

.van-image--round {
  margin-right: 4px;
}

.van-cell__title span {
  font-size: 12px;
}

.van-cell__title /deep/ .van-cell__label {
  margin-top: 0;
}

.markdown-body /deep/ ol,
.markdown-body /deep/ ul {
  padding-left: unset;
}

.news {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  bottom: 50px;
}
</style>

