import { createApp } from 'vue'
// vuex
import { setupStore } from './store'
// i18n
import { setupI18n } from './locales'
// router
import { setupRouter } from './router'
// css
import './assets/css/main.css'
// App
import App from './App.vue'
// 实例化对象
const app = createApp(App)
async function setupApp() {
  // 挂载vuex状态管理
  await setupStore(app)
  // setupStore(app)
  // 翻译
  await setupI18n(app)
  // 挂载路由
  await setupRouter(app)
  // 挂载
  app.mount('#app')
}
// 
setupApp()
