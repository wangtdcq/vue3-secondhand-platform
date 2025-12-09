export default function debounce2(func, wait, immediate) {
  //防御性编程：检查传入的是否是函数
  if (typeof func !== 'function') {
    throw new TypeError('debounce expected a function')
  }
  let timer = null
  let result = null
  const debounced = function (...args) {
    let context = this
    if (timer) clearTimeout(timer)

    if (immediate) {
      //立即执行
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) {
        result = func.apply(context, args)
      }
    } else {
      //常规延迟执行
      timer = setTimeout(() => {
        result = func.apply(context, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function () {
    //取消防抖
    clearTimeout(timer)
    timer = null
  }
  return debounced
}
