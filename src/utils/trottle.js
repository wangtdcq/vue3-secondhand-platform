export default function trottle(func, delay, { leading = true, trailing = false } = {}) {
  let timer = null
  let lastCall = 0
  return function (...args) {
    let now = Date.now()
    if (leading && lastCall == 0) {
      lastCall = now
    }
    let remaining = delay - (now - lastCall)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastCall = now
      if (leading) {
        func.apply(this, args)
      }
    } else if (timer && trailing) {
      timer = setTimeout(() => {
        timer = null
        lastCall = leading ? Date.now() : 0
        func.apply(this, args)
      }, remaining)
    }
  }
}
