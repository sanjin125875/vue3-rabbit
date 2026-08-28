// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
        path: '/',
        component: Layout,
        children:[
          {
            path: '',
            component: Home
          },
          {
            path: 'category/:id',
            component: Category
          },
          {
            path: 'category/sub/:id',
            component: SubCategory
          },
          {
            path:'detail/:id',
            component: Detail
          },
          {
            path:'cartlist',
            // 动态导入，支持懒加载
            component: () => import('@/views/CartList/index.vue')
          },
          {
            path: 'checkout',
            component: () => import('@/views/Checkout/index.vue')
          },
          {
            path:'pay',
            component: () => import('@/views/Pay/index.vue')
          },
          {
            path:'paycallback',
            component: () => import('@/views/Pay/PayBack.vue')
          },
          {
            path:'member',
            component: () => import('@/views/Member/index.vue'),
            children:[
              {
                path: '',// 置空path
                component: () => import('@/views/Member/components/UserInfo.vue')
              },
              {
                path: 'order',
                component: () => import('@/views/Member/components/UserOrder.vue')
              }
            ]
          }
        ]
    },
    {
        path: '/login',
        component: Login
    }
  ],
  // 路由滚动行为定制
  scrollBehavior(){
    return {
      top: 0
    }
  }
})

export default router