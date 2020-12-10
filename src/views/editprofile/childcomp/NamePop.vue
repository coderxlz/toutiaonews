<template>
  <div class="profile">
    <!-- 头像弹出框 -->
    <van-popup
      v-model="namePopShow"
      position="bottom"
      :close-on-click-overlay="false"
      @click-overlay="$emit('close')"
    >
      <van-nav-bar
        title="修改昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onClickRight"
      />
      <van-field
        v-model.trim="newName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
        :rules="[{ pattern: /^.{1,7}$/, message: '请输入正确内容' }]"
      />
    </van-popup>
  </div>
</template>

<script>
import { setProfile } from "@/network/profile.js";
import { Toast } from "vant";
export default {
  name: "NamePop",
  data() {
    return {
      // 用户新昵称
      newName: "",
    };
  },
  props: {
    // 昵称弹出层是否显示
    namePopShow: false,
    // 用户原始名称
    name: null,
  },
  methods: {
    // 完成名称修改
    async onClickRight() {
      if (this.newName) {
        try {
          Toast.loading({
            forbidClick: true,
          });
          const data = await setProfile({
            name: this.newName,
          });
          console.log(data);
          this.$emit("close");
          this.$emit("update:name", this.newName);
        } catch (e) {
          if (e && e.response && e.response.status === 409) {
            Toast({
              message: "昵称已存在",
            });
            this.newName = "";
          }
        }
      } else {
        Toast({
          message: "昵称不能为空",
        });
      }
    },
  },
};
</script>

<style scoped>
.van-popup--bottom {
  height: 40%;
  background-color: rgb(245, 247, 247);
}
</style>
