<template>
  <div>
    <div class="top" v-if="token">
      <van-cell-group>
        <van-cell center class="base-info">
          <template #icon>
            <van-image
              class="avatar"
              width="66"
              height="66"
              :src="userData && userData.photo"
              fit="cover"
              round
            />
          </template>

          <template #title>
            <div class="username">{{ userData && userData.name }}</div>
          </template>

          <template #right-icon>
            <div class="edit" @click="$router.push('/editprofile')">
              编辑资料
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-grid class="info" :border="false">
        <van-grid-item>
          <template #icon>
            <div class="newsnum">{{ userData && userData.art_count }}</div>
          </template>
          <template #text>
            <div class="info-detail">头条</div>
          </template>
        </van-grid-item>

        <van-grid-item>
          <template #icon>
            <div class="carenum">{{ userData && userData.follow_count }}</div>
          </template>
          <template #text>
            <div class="info-detail">关注</div>
          </template>
        </van-grid-item>

        <van-grid-item>
          <template #icon>
            <div class="fannum">{{ userData && userData.fans_count }}</div>
          </template>
          <template #text>
            <div class="info-detail">粉丝</div>
          </template>
        </van-grid-item>

        <van-grid-item>
          <template #icon>
            <div class="goodnum">{{ userData && userData.like_count }}</div>
          </template>
          <template #text>
            <div class="info-detail">获赞</div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div
      class="offline"
      v-else
      @click="
        $router.push({
          name: 'login',
          query: {
            redirect: '/profile',
          },
        })
      "
    >
      <div>
        <img src="~assets/img/avatar.png" alt="" />
      </div>
      <div>登录/注册</div>
    </div>

    <van-grid class="option" column-num="2" :border="false">
      <van-grid-item>
        <template #icon>
          <van-icon class="icon-left" name="star-o" />
        </template>
        <template #text>
          <div class="option-text">收藏</div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <van-icon class="icon-right" name="browsing-history-o" />
        </template>
        <template #text>
          <div class="option-text">历史</div>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell-group>
      <van-cell title="消息通知" is-link url="/vant/mobile.html" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="小智同学" is-link url="/vant/mobile.html" />
    </van-cell-group>
    <van-cell-group>
      <van-cell
        title="退出登录"
        id="logout"
        center
        @click="logout"
        v-if="token"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserDetail } from "../../network/profile";
export default {
  name: "Profile",
  data() {
    return {
      userData: null,
    };
  },
  created() {
    this.getUserData();
  },
  computed: {
    //将state中的令牌属性映射到computed中
    ...mapState(["token"]),
  },
  methods: {
    logout() {
      //点击退出按钮时，出现确认框需要用户确认
      this.$dialog
        .confirm({
          title: "系统提示",
          message: "确认退出登录吗？",
        })
        // 点击确认后，触发then回调
        .then(() => {
          //清除令牌，操作state一定要通过commit
          this.$store.commit("clearToken");
          this.$router.replace("/login");
          // 清除页面缓存，为展示新的登录用户资料做准备
          this.$store.commit("clearCache");
        })
        // 点击取消后，触发catch回调
        .catch(() => {
          // on cancel
        });
    },
    // 用户资料信息请求
    async getUserData() {
      const { data } = await getUserDetail();
      this.userData = data.data;
    },
  },
};
</script>

<style scoped>
@import url("~assets/css/profile.css");
@import url("~assets/css/index.css");
</style>
