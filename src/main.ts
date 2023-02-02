import { createApp } from 'vue'
// vuex
import { createPinia } from 'pinia'
// router
import router from './router'
// css
import './assets/css/main.css'
// App
import App from './App.vue'
// 实例化对象
createApp(App).use(createPinia()).use(router).mount('#app')
