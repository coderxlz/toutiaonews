<template>
  <div class="avatarPop">
    <van-popup
      v-model="avatarPopShow"
      :close-on-click-overlay="false"
      position="bottom"
    >
      <div class="showImage">
        <img :src="avatarBlob" alt="" ref="image" />
      </div>
      <van-nav-bar
        left-text="取消"
        right-text="确认"
        @click-left="cancel"
        @click-right="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { updateAvatar } from "@/network/profile.js";
import { Toast } from "vant";

// 图片裁剪工具包Cropper.js以及样式文件
import Cropper from "cropperjs";
import 'cropperjs/dist/cropper.css';

export default {
  name: "AvatarPop",
  data() {
    return {
      // 用户头像blob
      avatarBlob: window.URL.createObjectURL(this.avatar),
      // 裁切器实例
      cropper: null
    };
  },
  props: {
    // 头像裁剪弹出层是否显示，默认为flase
    avatarPopShow: false,
    // 用户头像对象
    avatar: null,
  },
  mounted() {
    // 图片裁切工具包需要操作dom，所以在mounted中初始化
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1,           // 裁切框尺寸长宽比，例如16 / 9
        viewMode: 1,              
        dragMode: 'move',
        cropBoxMovable: false,    // 裁切框是否可以拖动
        cropBoxResizable: false,  // 裁切框是否可以改变大小
        background: false,        // 是否使用默认背景色
        movable: true,           // 图片是否可以移动         
    });
  },
  methods: {
    // getCroppedCanvas()方法可以获得cropper裁切器裁剪到的HTMLCanvasElement对象
    // 调用HTMLCanvasElement.toBLob()可以得到对应blob数据
    // 使用promise进行包装，从而可以使用async函数，避免编写回调函数过于嵌套
    getCroppedCanvas() {
      return new Promise((resolve,reject) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },

    async confirm() {
      Toast.loading({
        forbidClick: true,
        duration: 0
      });

      const file = await this.getCroppedCanvas()
      //content-type类型为 multipart/form-data时，必须要提交FormData数据对象，而不是json数据对象{}
      //formData数据对象专门用于文件上传
      const fd = new FormData();

      fd.append("photo", file);
 
      await updateAvatar(fd);
      Toast({
        message: "上传成功！",
      });
      this.$emit("updateAvatar", window.URL.createObjectURL(file));
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.van-popup--bottom {
  height: 100%;
  background-color: #000000;
}

.van-nav-bar {
  background-color: #000000;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.showImage  img {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>