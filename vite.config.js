import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//elementplus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //配置elementPlus采用Sass样式配色系统
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    visualizer({
      open: true, // 打包完成后自动打开浏览器显示报告
      gzipSize: true, // 显示 gzip 压缩后的大小
      brotliSize: true, // 显示 brotli 压缩后的大小
      filename: 'stats.html', // 输出文件的名字，默认也是 stats.html
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
        silenceDeprecations: [
          'legacy-js-api',
          'color-functions',
          'global-builtin', // <--- 必须加这个！对应你截图里的警告
          'import', // <--- 强烈建议加这个，对应截图里提到的 "/d/import"
        ],
        //自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
          `,
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // id 是文件的绝对路径
          if (id.includes('node_modules')) {
            // 1. 把 Element Plus 单独拆成一个包
            if (id.includes('element-plus')) {
              return
            }

            // 2. 把 Lodash 单独拆成一个包
            if (id.includes('lodash')) {
              return 'lodash'
            }

            // 3. 把 Vue 相关的库 (vue, vue-router, pinia) 拆成一个 common 包
            if (id.includes('@vue') || id.includes('vue-router') || id.includes('pinia')) {
              return 'vendor-core'
            }

            // 4. 其他所有 node_modules 里的东西打包成 vendor
            return 'vendor'
          }
        },
      },
    },
  },
})
