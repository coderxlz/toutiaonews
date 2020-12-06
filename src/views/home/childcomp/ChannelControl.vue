<template>
  <div>
    <van-cell class="myChannel" center :border="false">
      <template #title>
        <span>我的频道</span>
      </template>
      <template>
        <van-button size="mini" :text="isEdit?'完成':'编辑'" @click="isEdit = !isEdit"></van-button>
      </template>
    </van-cell>

    <!-- 展示我的频道 -->
    <van-grid :border="false" class="channels mychannel" :gutter="11">
      <van-grid-item 
        v-for="(item,index) in userChannel" 
        :key="item.id" 
        @click="handleUserChannel(item,index)"
        :class="{'active':index === selChannel}">
        <template #icon v-if="isEdit && item.id != 0"><van-icon name="close" /></template>
        <template #text>{{ item.name }}</template>
      </van-grid-item>

    </van-grid>
    <van-cell center :border="false">
      <template #title>
        <span>频道推荐</span>
      </template>
    </van-cell>
    <!-- 展示所有推荐频道 -->
    <van-grid :border="false" class="channels" :gutter="11">
      <van-grid-item
        v-for="item in recChannels"
        :key="item.id"
        @click="recClick(item)"
      >
        <template #text>
          <van-icon name="plus">{{ item.name }}</van-icon>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels,commitChannels,deleteChannel } from "@/network/home.js";
import { addChannel,removeChannel } from "@/utils/storage.js"

import { mapState } from 'vuex'
import { readData } from '../../../utils/storage';

export default {
  name: "ChannelControl",
  created() {
    this.getChannels();
  },
  data() {
    return {
      allChannels: null,
      // 记录频道列表是否处于编辑状态
      isEdit: false
    };
  },
  props: {
    // 用户频道数据
    userChannel: {
      required: true,
      default() {
        return null;
      },
    },
    // 当前选中频道索引值
    selChannel:{
      required: true,
      dafault() {
        return 0
      }
    }
  },
  methods: {
    // 获取所有频道列表数据
    async getChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (e) {}
    },

    // 当点击推荐频道时，将频道添加到用户频道中
    async recClick(item) {
      this.userChannel.push(item);
      const data = {
        channels:[
          {
            id: item.id,
            seq: this.userChannel.length
          }
        ]
      }
      // 根据用户登录状态，将频道列表数据进行持久化
      if(this.token){
        // 如果登录，将数据保存到服务器
        try {
          const getData = await commitChannels(data)
          console.log('云存储',getData)
        } catch (e) {}
        
      }else{
        // 如果未登录，将数据存储到本地进行持久化
        addChannel(item)
      }
    },

    // 操作用户频道
    handleUserChannel(channel,index) {
      // 当处于编辑状态时，删除频道
      // 同时推荐频道无法删除
      if(this.isEdit && channel.id!=0) {
        // 如果删除的是当前选中频道索引值之前的频道，则需要更新索引值，将其减一
        if(index <= this.selChannel){
          this.$emit('update',this.selChannel - 1)
        }
        this.userChannel.splice(index,1)
        
        if(this.token){
          deleteChannel(channel.id)
        }
        // 如果离线状态，同步localStorage数据
        else{
          removeChannel(channel)
        }
      }
      // 当处于非编辑状态时，跳转到对应频道
      else {
        // 向父组件发射关闭事件
        console.log('发送id',index)
        this.$emit('close')
        // 向父组件发射当前选中索引值
        this.$emit('update',index)
      }
    }
  },
  // 在computed中所定义的计算属性本质上就把他看成和data里面的数据一样，可以直接拿来使用
  // 并不是方法，因此使用时不能加上()，否则会报错，此外，computed一般存储对data中数据进行
  // 二次转换后的来的数据，同时，computed中存储的数据也具有响应性，当data中的数据改变时，
  // computed中依赖data数据的数据也会做相应变化
  computed: {
    // 推荐列表 = 所有频道列表 - 用户频道列表
    recChannels() {
      // 在用户列表以及全部列表不为空时触发
      if (this.userChannel && this.allChannels) {
        // 运用filter过滤全部列表，获得推荐列表rec
        const rec = this.allChannels.filter((channel) => {
          return !this.userChannel.find((userChannel) => {
            return channel.id === userChannel.id;
          });
        });
        // 将推荐列表rec存储进data
        return rec;
      }
    },
    ...mapState(['token'])
  },
};
</script>

<style scoped>
.myChannel {
  margin-top: 54px;
}

.van-cell {
  border: none;
}

.van-button {
  border-radius: 20px;
  border: 1px solid #f86060;
  color: red;
  padding: 10px;
}

.channels /deep/ .van-grid-item {
  width: 80px;
  height: 43px;
  white-space: nowrap;
}

.van-grid-item /deep/ .van-grid-item__content {
  background-color: #f4f5f6;
  border-radius: 5px;
}

.mychannel /deep/ .active{
  color: red;
}
</style>