// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 确认这行存在

const app = createApp(App)
app.use(router)  // 确认这行存在
app.mount('#app')