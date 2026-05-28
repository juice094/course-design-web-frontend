<template>
  <el-container class="app-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="sidebar">
      <div class="logo">
        <el-icon size="28" color="#fff"><LayoutDashboard :size="28" color="#fff" /></el-icon>
        <span v-show="!isCollapse" class="logo-text">教务平台</span>
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#1e293b"
        text-color="#94a3b8"
        active-text-color="#fff"
        @select="handleMenuSelect"
      >
        <el-menu-item
          v-for="menu in filteredMenus"
          :key="menu.path"
          :index="menu.path"
        >
          <el-icon>
            <component :is="iconMap[menu.icon]" :size="18" />
          </el-icon>
          <template #title>{{ menu.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部 Header -->
      <el-header class="app-header" height="64px">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="toggleCollapse">
            <PanelLeftClose v-if="!isCollapse" :size="20" />
            <PanelLeftOpen v-else :size="20" />
          </el-icon>
          <Breadcrumb />
        </div>

        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="32" :icon="User" />
              <span class="username">{{ userStore.userInfo?.realName }}</span>
              <el-icon><ChevronDown :size="14" /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="role" disabled>
                  角色：{{ roleName }}
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main class="app-main">
        <RouterView :key="route.fullPath" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  ChevronDown,
  Home,
  BookOpen,
  BarChart3,
  Plus,
  CalendarDays,
  Star,
  FileText,
  Info,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { ROLE_NAMES } from '@/utils/permission'
import { adminRoutes } from '@/router/admin'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isCollapse = ref(false)

const activeMenu = computed(() => route.path)

const roleName = computed(() => {
  const role = userStore.userInfo?.role
  return role ? ROLE_NAMES[role] : ''
})

// 图标映射：路由 meta.icon（lucide 名）→ 组件
const iconMap: Record<string, any> = {
  Home,
  User,
  BookOpen,
  BarChart3,
  Plus,
  CalendarDays,
  Star,
  FileText,
  Info,
}

// 从路由配置自动生成菜单，避免与路由定义不同源
const allMenus = computed(() => {
  const adminRoute = adminRoutes.find((r) => r.path === '/')
  return (adminRoute?.children || [])
    .filter((c) => c.meta?.menu)
    .map((c) => ({
      path: c.path === '' ? '/' : `/${c.path}`,
      title: c.meta!.title as string,
      icon: c.meta!.icon as string,
      code: c.meta!.menu as string,
    }))
})

const filteredMenus = computed(() =>
  allMenus.value.filter((m) => userStore.checkMenu(m.code))
)

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}

function handleMenuSelect(index: string) {
  if (index !== route.path) {
    router.push(index)
  }
}

function handleCommand(cmd: string) {
  if (cmd === 'logout') {
    ElMessageBox.confirm('确定退出登录吗？', '提示', { type: 'warning' }).then(() => {
      userStore.logout()
      router.push('/login')
      ElMessage.success('已退出登录')
    })
  }
}
</script>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
}

.sidebar {
  background: #1e293b;
  transition: width 0.3s;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-bottom: 1px solid #334155;
}

.logo-text {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  font-size: 20px;
  color: #606266;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #606266;
  .username {
    font-size: 14px;
  }
}

.app-main {
  background: #f5f7fa;
  padding: 20px;
}
</style>
