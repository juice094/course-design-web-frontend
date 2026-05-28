import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/vendor/echarts-config'

import App from './App.vue'
import router from './router'
import { setNavigateToLogin } from './api/request'
import { permissionDirective } from './directives/permission'

// SAFETY: ElMessageBox/ElMessage 是 JS API 调用（非模板组件），
// unplugin-vue-components 不会自动注入它们的样式，需显式导入。
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'

import './styles/index.scss'

const app = createApp(App)

// 注册全局权限指令 v-permission="'student:delete'"
app.directive('permission', permissionDirective)

app.use(createPinia())
app.use(router)

// 注册 401 跳转处理器，使 request.ts 可通过 router 导航而非硬编码 location
setNavigateToLogin(() => router.push('/login'))

app.mount('#app')
