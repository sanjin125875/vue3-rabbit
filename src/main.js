// main.js - 完整示例
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 1. 创建应用实例
const app = createApp(App)

// 2. 注册插件
app.use(createPinia())  // Pinia 先注册
app.use(router)         // 路由后注册（也可以反过来）

// 3. 挂载应用
app.mount('#app')