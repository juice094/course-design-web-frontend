// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../home/views/HomeView.vue'
import LoginView from "../home/views/LoginView.vue";
import StudentHomeView from "../student/views/StudentHomeView.vue";
import StaffHomeView from "../staff/views/StaffHomeView.vue";
import AdminHomeView from "../admin/views/AdminHomeView.vue";
import WebTechView from "../home/views/WebTechView.vue";
import BusinessAdminView from "../home/views/BusinessAdminView.vue";
import ComputerScienceView from "../home/views/ComputerScienceView.vue";
import SoftwareEngineeringView from "../home/views/SoftwareEngineeringView.vue";
import DataAnalysisView from "../home/views/DataAnalysisView.vue";
import ITView from "../home/views/ITView.vue";
import AIView from "../home/views/AIView.vue";
import CyberSecurityView from "../home/views/CyberSecurityView.vue";
import CloudComputingView from "../home/views/CloudComputingView.vue";
import IoTView from "../home/views/IoTView.vue";
import AboutView from "../home/views/AboutView.vue";
import AdmissionsView from "../home/views/AdmissionsView.vue";
import AcademicsView from "../home/views/AcademicsView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login', name: 'Login',
        component: LoginView,
        meta: {title: '登录 - 教务系统平台'}
    },
    {
        path: '/students', name: 'StudentHome',
        component: StudentHomeView,
        meta: { title: '学生 - 教务系统平台' }
    },
    {
        path: '/staff', name: 'StaffHome',
        component: StaffHomeView,
        meta: { title: '教职工 - 教务系统平台' }
    },
    {
        path: '/admin', name: 'AdminHome',
        component: AdminHomeView,
        meta: { title: '管理员 - 教务系统平台' }
    },
    {
        path: '/courses/web-tech',
        name: 'WebTech',
        component: WebTechView,
        meta: { title: 'Web技术 - 教务系统平台' }
    },
    {
        path: '/courses/business-admin',
        name: 'BusinessAdmin',
        component: BusinessAdminView,
        meta: { title: '工商管理 - 教务系统平台' }
    },
    {
        path: '/courses/computer-science',
        name: 'ComputerScience',
        component: ComputerScienceView,
        meta: { title: '计算机科学 - 教务系统平台' }
    },
    {
        path: '/courses/software-engineering',
        name: 'SoftwareEngineering',
        component: SoftwareEngineeringView,
        meta: { title: '软件工程 - 教务系统平台' }
    },
    {
        path: '/courses/data-analysis',
        name: 'DataAnalysis',
        component: DataAnalysisView,
        meta: { title: '数据分析 - 教务系统平台' }
    },
    {
        path: '/courses/it',
        name: 'IT',
        component: ITView,
        meta: { title: '信息技术 - 教务系统平台' }
    },
    {
        path: '/courses/ai',
        name: 'AI',
        component: AIView,
        meta: { title: '人工智能 - 教务系统平台' }
    },
    {
        path: '/courses/cyber-security',
        name: 'CyberSecurity',
        component: CyberSecurityView,
        meta: { title: '网络安全 - 教务系统平台' }
    },
    {
        path: '/courses/cloud-computing',
        name: 'CloudComputing',
        component: CloudComputingView,
        meta: { title: '云计算 - 教务系统平台' }
    },
    {
        path: '/courses/iot',
        name: 'IoT',
        component: IoTView,
        meta: { title: '物联网工程 - 教务系统平台' }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        meta: { title: '关于我们 - 教务系统平台' }
    },
    {
        path: '/admissions',
        name: 'Admissions',
        component: AdmissionsView,
        meta: { title: '招生信息 - 教务系统平台' }
    },
    {
        path: '/academics',
        name: 'Academics',
        component: AcademicsView,
        meta: { title: '学术项目 - 教务系统平台' }
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router