<template>
  <div>
    <!-- 为新闻cell添加路由跳转，点击跳转到文章详情页并传递对应文章id -->
    <van-cell :to="'/article/'+article.art_id">
      <!-- 标题最多显示三行 -->
      <template #title class="van-multi-ellipsis--l3">
        {{ article.title }}
      </template>
      <!-- 一张图片的情况 -->
      <template #default v-if="article.cover.type === 1">
        <van-image :src="article.cover.images[0]"></van-image>
      </template>

      <template #label>
        <div v-if="article.cover.type === 3" class="image-list">
          <div v-for="(item, index) in article.cover.images" :key="index">
            <van-image :src="item"></van-image>
          </div>
        </div>
        <!-- 为设置样式，动态绑定class，在只有一张图片的情况下单独设置样式 -->
        <span :class="{'article_info':article.cover.type!==3}">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}条评论</span>
          <span>{{ article.pubdate | timeFormat }}</span>
        </span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
      default() {
        return null;
      },
    }
  },
};
</script>

<style scoped>
@import url("~assets/css/articleitem.css");
</style>