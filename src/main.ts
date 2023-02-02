import { createApp } from 'vue'
import { createPinia } from 'pinia'
// css
import './assets/css/main.css'
// App
import App from './App.vue'
// router
import router from './router'
//
createApp(App).use(createPinia()).use(router).mount('#app')
