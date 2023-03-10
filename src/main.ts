import { createApp } from 'vue'
// vuex
import { createPinia } from 'pinia'
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
  app.use(createPinia())
  // 挂载i18n翻译
  await setupI18n(app)
  // 挂载路由
  await setupRouter(app)
  // 挂载
  app.mount('#app')
}
//
setupApp()
