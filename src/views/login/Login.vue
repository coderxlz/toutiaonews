<template>
  <div>
      <van-nav-bar
      title="登录"
      left-arrow
      validate-trigger="onSubmit"
    />
    <!-- 提交表单部分 -->
<van-form 
    @submit="onSubmit"
    @failed="subFail"
    :show-error-message= "false"
    :show-error= "false">
  <van-field

    center
    clearable
    name="phoNumber"
    v-model="user.mobile"
    left-icon="phone-o"
    placeholder="请输入手机号"
    :rules="this.formatRules.mobile"
  />
  <van-field
    center
    name="code"
    v-model="user.code"
    clearable
    left-icon="clock-o"
    placeholder="请输入验证码"
    :rules="this.formatRules.code"
  >
  
  <template #button>
    <van-count-down id="counter" :time="60 * 1000" format="ss s" v-if="showCounter" @finish="showCounter = false"/>
    <van-button v-else size="small" type="primary" 
                native-type="button" @click="sendCode(user.mobile)" 
                :loading="ifSendCodeLoading">发送验证码</van-button>
                <!-- 设置发送验证码点击等待响应时进入加载状态，防止用户网速慢多次点击 -->
  </template>
  </van-field>

  <div class="loginwrap">
  <van-button type="info" block  class="login">登录</van-button>
</div>

</van-form>

万能验证码：246810
  </div>
</template>

<script>
import { ifPass,getCode } from '../../network/login'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data () {
    return {
      //用户提交表单数据
      user: {
        mobile: '13966604177',
        code: '246810'
      },
      //定义表单认证规则
      formatRules: {
        mobile: [
          {required: true,message: '手机号不能为空'},
          {pattern: /^1[3|5|8|9]\d{9}$/,message: '请输入正确的手机号'}
        ],
        code: [
          {required: true,message: '验证码不能为空'},
          {pattern: /\d{6}/,message: '验证码格式错误'}
        ]
      },
      //是否显示计时器
      showCounter: false,
      //验证码发送按钮是否处于加载状态
      ifSendCodeLoading: false
    }
  },
  methods: {
    //登录验证
    async onSubmit(){
      
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        //运用对象结构
        const { data } = await ifPass(this.user)
        //新的Toast提示会干掉之前的提示，不需要手动关闭
        Toast.success({
          message: '登录成功',
          position: top
        })
        //登录成功，存储服务器返回的token令牌
        console.log(data)
        this.$store.commit('saveToken',{token: data.data.token,refresh_token: data.data.refresh_token})
      } catch (e) {
        console.log(e)
        Toast.fail ({
          message: '手机号码或验证码错误',
          position: top
        }) 
      }  

    },
    //发送验证码请求
    async sendCode(number){
      let resCode = null
      try { 
        this.ifSendCodeLoading = true
        resCode = await getCode(number)
        Toast({
          message: '验证码发送成功，请注意查收',
          position: top
        })
        this.ifSendCodeLoading = false
        this.showCounter = true
      } catch(e) {
        Toast({
          message: '服务器繁忙，请稍后再试',
          position: top
        })
        this.ifSendCodeLoading = false
    }
  },
    //表单验证失败时，触发事件
    subFail(errinfo){
      if(errinfo || errinfo.errors || errinfo.errors[0]){
        const msg = errinfo.errors[0].message
        Toast({
        message: msg,
        position: top
      })
      }
    }
    
  },
  
}
</script>

<style>
@import url('~assets/css/login.css');
</style>
