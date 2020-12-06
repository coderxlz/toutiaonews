<template>
  <div class="searchhistory">
    <van-cell title="搜索历史">
      <van-button 
        size="mini" 
        plain 
        icon="delete"
        @click="$emit('clear')">全部删除</van-button>
    </van-cell>
    <van-cell 
      v-if="history && history.length===0" 
      title="历史记录为空"></van-cell>
    <van-cell 
      v-for="(item,index) in history" 
      :key="index"
      :title="item"
      @click="$emit('search',item)">
      <van-icon 
        size="15" name="close" 
        @click="deleteHistory(item,$event)"/></van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    history:{
      required: true
    }
  },
  methods: {
    deleteHistory(item,e) {
      console.log(item,e)
      // 阻止事件冒泡
      e.stopPropagation()
      this.$emit('delete',item)
    }
  }
}
</script>

<style scoped>
  .searchhistory{
    position: fixed;
    top: 54px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y: scroll;
  }
</style>