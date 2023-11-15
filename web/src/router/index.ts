import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/wall?id=0',
      component: () => import('../views/Ysindex.vue'),
      children: [
        {
          path: 'wall',
          name: 'wall',
          component: () => import('../views/interface/WallMessage.vue')
        }
      ]
    },
  ]
})

export default router