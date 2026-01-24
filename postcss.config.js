// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
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

      // === 核心配置：MPA 隔离 ===
      // 只对 src/pages/mobile 目录下的文件生效
      // 这样 src/pages/pc 下的代码依然是 px，不会变大变小
      include: /\/src\/pages\/mobile\//,
    },
  },
}
