<template>
  <div class="genderPop">
    <van-popup 
      v-model="genderPopShow" 
      position="bottom"
      :close-on-click-overlay="false"
      @click-overlay="$emit('close')">
      <van-picker
        title="修改性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { setProfile } from '@/network/profile.js'
import { Toast } from 'vant';
export default {
  name: "GenderPop",
  data () {
    return {
      columns: [{
        values: ["男","女"],
        defaultIndex: this.currentIndex
      }]
    }
  },
  props: {
    // 当前性别索引值
    currentIndex: {
      required: true,
      default: 0
    },
    // 弹出层是否显示
    genderPopShow: {
      required: true,
      default: false
    }
  },
  methods: {
    async onConfirm(pick,index){
      Toast.loading({
        forbidClick: true
      })
      try{
        const data = await setProfile({
          gender: index
        })
        this.$emit('update:currentIndex',index)
        this.$emit('close')
        Toast({
          message: "修改成功"
        })
      }
      catch(e){
        Toast({
          message: "错误"
        })
      }
    },
    onCancel() {
      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.van-popup--bottom {
  height: 40%;
  background-color: rgb(245, 247, 247);
}
</style>