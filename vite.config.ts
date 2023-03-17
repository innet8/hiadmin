import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue(), splitVendorChunkPlugin()],
    server: {
      host: '0.0.0.0', // 服务器ip地址
      port: +env.APP_PORT || 3000, // 本地端口
      // open: true, // 是否自动在浏览器打开
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true
          // secure: false, // 验证 SSL 证书
          // rewrite: (path) => path.replace(/^\/api/, '/api/v1/'),  // 重写传过来的path路径
        },
        '/ws': {
          target: env.VITE_WEBSOCKET_URL,
          changeOrigin: true,
          ws: true // 开启 websocket 代理
          // secure: false
          // rewrite: (path) => path.replace(/^\/ws/, '/ws/v1/')
        }
      }
    },
    resolve: {
      // 配置路径别名
      alias: {
        '@': resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    build: {
      // outDir: 'dist', // 输出目录
      // assetsDir: 'assets', // 指定生成静态资源的存放路径
      target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      sourcemap: 'production' !== mode, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      chunkSizeWarningLimit: 1000, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      brotliSize: false, // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除console
          drop_debugger: true // 生产环境去除debugger
        }
      }
    }
  }
})
