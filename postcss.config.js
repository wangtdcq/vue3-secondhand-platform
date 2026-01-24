// postcss.config.js
import path from 'path'

export default (ctx) => {
  // 1. 获取当前正在处理的文件路径
  const file = ctx.file

  // 2. 定义判断逻辑：是否是移动端文件？
  // 兼容 Windows (\) 和 Mac/Linux (/) 的路径分隔符
  const isMobileFile =
    file && (file.includes('src/pages/mobile') || file.includes('src\\pages\\mobile'))

  return {
    plugins: {
      // === 核心修改 ===
      // 使用三元运算符：
      // 如果是 Mobile 文件 -> 加载配置对象
      // 如果不是 -> 设置为 false (直接禁用插件，不运行)
      'postcss-px-to-viewport-8-plugin': isMobileFile
        ? {
            // 1. 设计稿宽度：这里要根据你的 UI 设计稿来定
            // 如果设计稿是 750px 的，就写 750；如果是 375px 的，就写 375
            viewportWidth: 375,

            // 2. 单位转换精度：保留 5 位小数
            unitPrecision: 5,

            // 3. 需要转换的单位，通常是 px
            unitToConvert: 'px',

            // 4. 转换后的单位，使用 vw
            viewportUnit: 'vw',

            // 5. 不想被转换的类名（例如引用的第三方库不想乱变）
            selectorBlackList: ['ignore-'],

            // 6. 最小转换数值：小于 1px 的不转换
            minPixelValue: 1,

            // 7. 允许在媒体查询中转换
            mediaQuery: false,
            // 这里不需要写 exclude 了，因为如果不满足条件，插件根本不会加载
          }
        : false,
    },
  }
}
