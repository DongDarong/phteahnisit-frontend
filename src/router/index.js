import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const Home = () => import('../pages/Home.vue')
const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')
const Rooms = () => import('../pages/Rooms.vue')
const RoomDetail = () => import('../pages/RoomDetail.vue')
const Favorites = () => import('../pages/Favorites.vue')

// Dashboard Pages
const DashboardHome = () => import('../pages/dashboard/DashboardHome.vue')
const MyRooms = () => import('../pages/dashboard/MyRooms.vue')
const AddRoom = () => import('../pages/dashboard/AddRoom.vue')
const EditRoom = () => import('../pages/dashboard/EditRoom.vue')
const Users = () => import('../pages/dashboard/Users.vue')
const Analytics = () => import('../pages/dashboard/Analytics.vue')
const RealtimeAnalytics = () => import('../pages/dashboard/RealtimeAnalytics.vue')

const MainLayout = () => import('../layouts/MainLayout.vue')
const DashboardLayout = () => import('../layouts/DashboardLayout.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'login', name: 'login', component: Login, meta: { guestOnly: true } },
        { path: 'register', name: 'register', component: Register, meta: { guestOnly: true } },
        { path: 'rooms', name: 'rooms', component: Rooms },
        { path: 'rooms/:id', name: 'room-detail', component: RoomDetail, props: true },
        { path: 'favorites', name: 'favorites', component: Favorites, meta: { requiresAuth: true } },
      ],
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true, roles: ['landlord', 'admin'] },
      children: [
        { path: '', name: 'dashboard', component: DashboardHome },
        { path: 'rooms', name: 'dashboard-rooms', component: MyRooms },
        { path: 'add-room', name: 'dashboard-add-room', component: AddRoom },
        { path: 'edit-room/:id', name: 'dashboard-edit-room', component: EditRoom, props: true },
        { path: 'users', name: 'dashboard-users', component: Users, meta: { requiresAdmin: true } },
        { path: 'analytics', name: 'dashboard-analytics', component: Analytics },
        { path: 'realtime', name: 'dashboard-realtime', component: RealtimeAnalytics },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  // Check role permissions for dashboard and other restricted routes
  if (to.meta.roles && !to.meta.roles.includes(auth.state.user?.role)) {
    return { name: 'home' }
  }

  if (to.meta.requiresAdmin && auth.state.user?.role !== 'admin') {
    return { name: 'dashboard' }
  }

  if (to.meta.guestOnly && auth.isAuthenticated()) {
    return { path: '/' }
  }

  return true
})

export default router
