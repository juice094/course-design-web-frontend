import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken, removeUserInfo } from '@/utils/auth'
import { ApiError } from './error'

let navigateToLogin: (() => void) | null = null

/**
 * 注册 401 跳转处理器。
 * 由 main.ts 在应用初始化时注入，避免 request.ts 与 router 之间产生循环依赖。
 */
export function setNavigateToLogin(fn: () => void): void {
  navigateToLogin = fn
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器：注入 Token
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code !== 200) {
      ElMessage.error(data.message || '请求失败')
      return Promise.reject(new ApiError(data.code, data.message || '请求失败'))
    }
    return data
  },
  (error) => {
    const { response } = error
    if (response?.status === 401) {
      ElMessage.error('登录已过期，请重新登录')
      removeToken()
      removeUserInfo()
      // 优先使用注入的 router 导航，避免硬编码 hash 路由
      if (navigateToLogin) {
        navigateToLogin()
      } else {
        window.location.href = '/#/login'
      }
    } else {
      const message = response?.data?.message || error.message || '网络错误'
      ElMessage.error(message)
    }
    return Promise.reject(error)
  }
)

export default request
