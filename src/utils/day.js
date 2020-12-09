import Vue from 'vue'
// 对时间戳进行格式化
import dayjs from 'dayjs'
//配置RelativeTime插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置CustomParseFormat插件
import customParseFormat from 'dayjs/plugin/customParseFormat'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 使用中文语言包
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

// 设置全局过滤器
Vue.filter('timeFormat',data => {
  // dayjs()表示现在时间
  // 返回传入时间data距离现在的相对时间
  return dayjs().from(dayjs(data))
})

Vue.filter('commentTimeForamt',data => {
  // 使用dayjs进行格式化
  return dayjs(data).format('MM-DD HH:mm')
})