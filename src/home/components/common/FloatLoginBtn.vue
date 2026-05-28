<template>
  <div class="float-sidebar">
    <div class="sidebar-menu">
      <div class="menu-item" @click="navigateTo('/login')">
        <div class="menu-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span class="menu-text">登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.float-sidebar {
  position: fixed;
  right: 20px;
  top: 30%;
  transform: translateY(-50%);
  z-index: 1000;
}

.sidebar-menu {
  background: rgba(255, 255, 255, 0);
  border-radius: 8px 0 0 8px;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  padding: 15px 0;
  min-width: 140px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: rgba(102, 126, 234, 0.1);
}

.menu-icon {
  margin-bottom: 8px;
  color: #3498db;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-icon {
  color: #2980b9;
  transform: scale(1.1);
}

.menu-text {
  font-size: 13px;
  color: #3498db;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-text {
  color: #2980b9;
}
</style>
