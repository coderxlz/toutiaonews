import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'

import { Dialog } from 'vant';

// 引入vantcss样式文件
import 'vant/lib/index.css'

import './assets/css/index.css'

// 引入js文件，设置基准rem值
import 'lib-flexible'

// 引入data格式化js文件
import './utils/day'

Vue.config.productionTip = false

Vue.use(vant)
Vue.use(Dialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
