// main.js - 完整示例
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 引入初始化的样式文件
import '@/styles/common.scss'

// 1. 创建应用实例
 


const app = createApp(App)

// 2. 注册插件
app.use(createPinia())  // Pinia 先注册
app.use(router)         // 路由后注册（也可以反过来）

// 3. 挂载应用
app.mount('#app')

// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

// 定义全局指令
 app.directive('img-lazy', {
      mounted (el, binding) {
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        console.log(el, binding.value)
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })