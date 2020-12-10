<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- accept属性，image/*表示只能选取图片文件
         input输入框自带两个事件，change和input，但是change事件有一个小问题，
         对于文件的选取，如果两次选取的是同一个文件，那么change事件只会触发一次 -->
    <input 
      type="file" 
      accept="image/*" 
      hidden 
      ref="file"
      @change="onFileChange">
    <van-cell 
      is-link 
      title="头像"
      @click="$refs.file.click()">
      <template #default>
        <van-image width="30" height="30" round :src="photo" fit="cover" />
      </template>
    </van-cell>
    <van-cell
      is-link
      title="昵称"
      :value="name"
      @click="namePopShow = true"
    ></van-cell>
    <van-cell
      is-link
      title="性别"
      :value="gender === 1 ? '女' : '男'"
      @click="genderPopShow = true"
    ></van-cell>
    <van-cell 
      is-link 
      title="生日" 
      :value="birthday"
      @click="birthdayPopShow = true"
    ></van-cell>
    <!-- 头像弹出层 -->
    <avatar-pop
      v-if="avatarPopShow"
      :avatarPopShow="avatarPopShow"
      @close="avatarPopShow = false"
      :avatar=avatar
      @updateAvatar="photo = $event"
    />
    <!-- 昵称弹出层 -->
    <name-pop
      v-if="namePopShow"
      :namePopShow="namePopShow"
      @close="namePopShow = false"
      :name.sync="name"
    />
    <!-- 使用sync修饰符实现属性的双向绑定
           属性内部会帮我们做两件事
           1.:name = 父组件属性
           2.@update:name = 父组件属性 = $event -->
    <!-- 性别弹出层 -->
    <gender-pop
      @close="genderPopShow = false"
      :genderPopShow="genderPopShow"
      :currentIndex.sync="gender"/>
    <!-- 生日弹出层 -->
    <birthday-pop
      v-if="birthdayPopShow"
      @close="birthdayPopShow = false"
      :birthday.sync="birthday"
      :birthdayPopShow="birthdayPopShow"/>
  </div>
</template>

<script>
import { getProfile } from "@/network/profile.js";
import NamePop from "./childcomp/NamePop.vue";
import GenderPop from './childcomp/GenderPop.vue';
import BirthdayPop from './childcomp/BirthdayPop.vue';
import AvatarPop from './childcomp/AvatarPop.vue';
export default {
  components: { NamePop, GenderPop, BirthdayPop, AvatarPop },
  name: "EditProfile",
  data() {
    return {
      // 用户昵称
      name: null,
      // 用户性别
      gender: 0,
      // 生日
      birthday: null,
      // 用户头像
      photo: null,
      // 用户头像对象
      avatar: null,
      // 头像弹出层是否显示
      avatarPopShow: false,
      // 昵称弹出层是否显示
      namePopShow: false,
      // 性别弹出层是否显示
      genderPopShow: false,
      // 生日弹出层是否显示
      birthdayPopShow: false,
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    // 获取用户个人资料
    async getUserProfile() {
      try {
        const { data } = await getProfile();
        console.log(data);
        const getData = data.data;
        this.name = getData.name;
        this.gender = getData.gender;
        this.photo = getData.photo;
        this.birthday = getData.birthday;
      } catch (e) {}
    },
    // file输入框中选择文件改变时，触发事件
    onFileChange() {
      this.avatarPopShow = true
      // 将用户上传的头像文件对象传入到头像编辑组件之中
      this.avatar = this.$refs.file.files[0]

      // 为了解决选择相同文件不触发onFileChange事件
      // 每次手动清空file输入框中的value值
      this.$refs.file.value = ""
    }
  },
};
</script>

<style scoped>
.van-nav-bar {
  background-color: rgb(0, 146, 255);
}

.van-nav-bar /deep/ .van-nav-bar__title,
.van-nav-bar /deep/ .van-icon {
  color: #ffffff;
}
</style>
