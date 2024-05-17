import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

interface IUser {
  id: string;
  email: string;
  name: string;
}

router.beforeEach((to, from, next) => {
  const userLoggedIn = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
  const tokenLoggedIn = localStorage.getItem('token') || '';
  if (to.path !== '/login' && (!userLoggedIn.email || !tokenLoggedIn)) {
    next('/login');
  } else {
    next();
  }
});

export default router
