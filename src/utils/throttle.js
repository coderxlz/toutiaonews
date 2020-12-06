// 节流函数，用于限制搜索框推荐搜索请求
export const throttle = function(fun,time) {
  let timer = null
  return function() {
    if(timer) {
      return
    }
    timer = setTimeout(() => {
      fun.call(this)
      timer = null
    }, time);
  }
}

// function throttle(fun, time) {
//   let timer = null
//   let _this = this
//   return function () {
//     if (timer) {
//       return
//     }
//     timer = setTimeout(() => {
//       console.log('--------')
//       fun.call(_this)
//       timer = null
//     }, time);
//   }
// }

// function test() {
//     console.log('test')
// }

// let fun = throttle(test,1000)

// setInterval(() => {
//   fun()
// }, 100);

