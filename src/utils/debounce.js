export default function debounce(func, wait, { leading = true, trailing = true } = {}) {
  //防御性编程：检查传入的是否是函数
  if (typeof func !== 'function') {
    throw new TypeError('debounce expected a function')
  }
  let timer = null
  let result = null
  let lastArgs
  let lastThis
  const debounced = function (...args) {
    lastArgs = args
    lastThis = this
    if (timer) clearTimeout(timer)

    if (leading && !timer) {
      result = func.apply(lastThis, lastArgs)
      lastArgs = null
      lastThis = null
    }
    timer = setTimeout(() => {
      timer = null
      if (trailing && lastArgs) {
        result = func.apply(lastThis, lastArgs)
        lastArgs = null
        lastThis = null
      }
    }, wait)
    return result
  }
  debounced.cancel = function () {
    //取消防抖
    clearTimeout(timer)
    timer = null
    lastArgs = null
    lastThis = null
  }
  return debounced
}
