<!-- src/views/LoginView.vue -->
<<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <h1>教务系统平台</h1>
        <p>Academic Administration System</p>
      </div>

      <!-- 角色切换 -->
      <div class="role-tabs">
        <div
            v-for="role in roles"
            :key="role.type"
            class="role-tab"
            :class="{ active: currentRole === role.type }"
            @click="currentRole = role.type"
        >
          {{ role.name }}
        </div>
      </div>

      <!-- 登录表单 -->
      <div class="login-form">
        <div class="form-item">
          <label>
            <span class="required">*</span>
            用户名
          </label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input
                type="text"
                v-model="form.username"
                :placeholder="'请输入' + currentRoleName + '用户名'"
            />
          </div>
        </div>

        <div class="form-item">
          <label>
            <span class="required">*</span>
            密码
          </label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
            />
          </div>
        </div>

        <button class="login-btn" @click="handleLogin">登录</button>
      </div>

      <!-- 测试账号提示 -->
      <div class="test-accounts">
        <p class="test-title">测试账号：</p>
        <div class="account-tags">
          <span
              v-for="account in currentAccounts"
              :key="account.username"
              class="account-tag"
              :class="account.role"
              @click="fillAccount(account)"
          >
            {{ account.username }} / {{ account.password }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 当前选中的角色
const currentRole = ref('student')

// 角色配置
const roles = [
  { type: 'student', name: '学生登录' },
  { type: 'teacher', name: '教师登录' },
  { type: 'admin', name: '管理员登录' }
]

// 当前角色名称
const currentRoleName = computed(() => {
  const map = { student: '学生', teacher: '教师', admin: '管理员' }
  return map[currentRole.value]
})

// 测试账号
const accounts = {
  student: [
    { username: 'student', password: 'student123', role: 'student' }
  ],
  teacher: [
    { username: 'teacher', password: 'teacher123', role: 'teacher' }
  ],
  admin: [
    { username: 'admin', password: 'admin123', role: 'admin' }
  ]
}

// 当前角色的测试账号
const currentAccounts = computed(() => accounts[currentRole.value])

// 表单数据
const form = ref({
  username: '',
  password: ''
})

// 填充测试账号
const fillAccount = (account) => {
  form.value.username = account.username
  form.value.password = account.password
}

// 登录处理
const handleLogin = () => {
  if (!form.value.username || !form.value.password) {
    alert('请输入用户名和密码')
    return
  }

  // 验证测试账号
  const validAccounts = accounts[currentRole.value]
  const matched = validAccounts.find(
      a => a.username === form.value.username && a.password === form.value.password
  )

  if (matched) {
    alert(currentRoleName.value + '登录成功！')
    // 跳转到对应页面
    const routes = {
      student: '/students',
      teacher: '/staff',
      admin: '/admin'
    }
    router.push(routes[currentRole.value])
  } else {
    alert('用户名或密码错误')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0f7fa 0%, #f5f5dc 100%);
  font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
}

.login-box {
  width: 420px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

/* 头部标题 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 26px;
  color: #1a5f2a;
  margin: 0 0 8px;
  font-weight: 600;
}

.login-header p {
  font-size: 14px;
  color: #999;
  margin: 0;
}

/* 角色切换 */
.role-tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
}

.role-tab {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  font-size: 15px;
  color: #666;
  transition: all 0.3s;
  position: relative;
}

.role-tab:hover {
  color: #1a5f2a;
}

.role-tab.active {
  color: #1a5f2a;
  font-weight: 600;
}

.role-tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 20%;
  width: 60%;
  height: 2px;
  background: #1a5f2a;
  border-radius: 2px;
}

/* 表单 */
.login-form {
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.required {
  color: #e74c3c;
  margin-right: 4px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 12px;
  transition: all 0.3s;
}

.input-wrapper:focus-within {
  border-color: #1a5f2a;
  box-shadow: 0 0 0 3px rgba(26, 95, 42, 0.1);
}

.input-icon {
  font-size: 16px;
  margin-right: 8px;
  color: #999;
}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 0;
  font-size: 14px;
  color: #333;
  background: transparent;
}

.input-wrapper input::placeholder {
  color: #bbb;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  padding: 14px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.login-btn:hover {
  background: #66b1ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* 测试账号 */
.test-accounts {
  border-top: 1px dashed #e0e0e0;
  padding-top: 20px;
}

.test-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px;
}

.account-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.account-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.account-tag.student {
  background: #fff3e0;
  color: #e65100;
}

.account-tag.teacher {
  background: #e8f5e9;
  color: #2e7d32;
}

.account-tag.admin {
  background: #e3f2fd;
  color: #1565c0;
}

.account-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (max-width: 480px) {
  .login-box {
    width: 90%;
    padding: 30px 20px;
  }
}
</style>