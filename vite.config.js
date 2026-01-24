import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import vueDevTools from 'vite-plugin-vue-devtools'

import path from 'path'

//elementplus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// import { visualizer } from 'rollup-plugin-visualizer'

// 引入Vant插件
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // Vant配置自动按需引入
    Components({
      resolvers: [VantResolver(), ElementPlusResolver()],
      // 建议：指定生成的类型声明文件位置，避免污染根目录
      dts: 'src/components.d.ts',
    }),
    //vueDevTools(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver({ importStyle: 'sass' })] }),
    {
      name: 'force-exit-after-build',
      closeBundle() {
        if (process.env.NODE_ENV === 'production') {
          console.log('📦 Build finished. Waiting for I/O flush...')
          // ⏳ 延迟 1000 毫秒（1秒）再退出，给文件写入留出时间
          setTimeout(() => {
            console.log('👋 Forcing process exit now.')
            process.exit(0)
          }, 1000)
        }
      },
    },
    // 建议：在 Netlify 构建时可以先注释掉 visualizer，排查完问题再加回来
    // visualizer({
    //   open: false,
    //   gzipSize: true,
    //   brotliSize: false, // <--- 关掉这个提升速度
    //   filename: 'stats.html',
    // }),
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
    outDir: 'dist',

    sourcemap: false,
    // ⚠️ 删除了 manualChunks，使用 Vite 默认策略
    // 默认策略现在已经非常好了，不需要手动分包

    rollupOptions: {
      // 【关键配置】多入口设置
      input: {
        // PC 端入口 (对应根目录 index.html)
        main: path.resolve(__dirname, 'index.html'),
        // 移动端入口 (对应根目录 mobile.html)
        mobile: path.resolve(__dirname, 'mobile.html'),
      },
      output: {
        // (可选) 让打包后的资源文件分类存放，看起来更整洁
        // 1. 入口文件（index.html 和 mobile.html 引用的那个 main.ts 编译后的结果）
        entryFileNames: 'static/js/[name]-[hash].js',

        // 2. 代码分块（你用 import() 动态引入的组件，或者 node_modules 里拆出来的包）
        chunkFileNames: 'static/js/[name]-[hash].js',

        // 3. 静态资源（CSS、图片、字体等）
        // 这里的逻辑是：如果是 css 就放 css 目录，其他的（图片字体）都放 assets 目录
        assetFileNames: (assetInfo) => {
          // 结尾是 .css 的文件
          if (assetInfo.name.endsWith('.css')) {
            return 'static/css/[name]-[hash][extname]'
          }
          // 其他图片、字体等文件
          return 'static/assets/[name]-[hash][extname]'
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: true,
      proxy: {
        '/api': {
          target: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
          changeOrigin: true,
          rewite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})
