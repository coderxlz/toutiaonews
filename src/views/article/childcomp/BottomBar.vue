<template>
  <div class="bottom-bar">
    <div class="writeComment">
      <van-button round>写评论</van-button>
    </div>
    <div class="operate">
      <div><van-icon 
        :name="ifGood?'good-job':'good-job-o'"
        :style="ifGood && {color:'orange'}" 
        class="good" /></div>
      <div><van-icon 
        name="comment-o" 
        class="comment" /></div>
      <div><van-icon 
        :name="ifStar?'star':'star-o'"
        :style="ifStar && {color:'orange'}" 
        class="star" /></div>
      <div><van-icon 
        name="share-o" 
        class="share" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  props: {
    // 是否点赞
    ifGood: {
      default(){
        return false
      }
    },
    // 是否收藏
    ifStar: {
      default(){
        return false
      }
    }
  }
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
}

.bottom-bar>div{
  width: 50%;
  line-height: 49px;
}

.operate{
  display: flex;
  justify-content: space-around;
  font-size: 20px;
}

.operate .van-icon{
  vertical-align: middle;
  
}

.writeComment .van-button--round{
  width: 140px;
  height: 22px;
}
</style>