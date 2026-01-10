import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//elementplus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    //vueDevTools(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver({ importStyle: 'sass' })] }),
    // 建议：在 Netlify 构建时可以先注释掉 visualizer，排查完问题再加回来
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: false, // <--- 关掉这个提升速度
      filename: 'stats.html',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'import'],
        // ⚠️ 重要修改：
        // 确保 var.scss 里只有变量($color: red) 和 mixin。
        // 绝不要在这里引入包含实际 CSS 样式的 index.scss！
        // 如果 index.scss 里有样式，请移到 main.ts 中 import。
        additionalData: `
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
  build: {
    sourcemap: false,
    // ⚠️ 删除了 manualChunks，使用 Vite 默认策略
    // 默认策略现在已经非常好了，不需要手动分包
    rollupOptions: {
      output: {
        // 保持默认即可，不要手动配置 manualChunks
      },
    },
  },
})
