// main.js - 完整示例
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// 引入初始化的样式文件
import "@/styles/common.scss";
// 全局指令注册
import { lazyPlugin } from "@/directives";
import { componentPlugin } from "@/composables/index.js";

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 1. 创建应用实例
const app = createApp(App);
const pinia = createPinia()

// 2. 注册插件
pinia.use(piniaPluginPersistedstate) // 持久化
app.use(pinia); // Pinia 先注册
app.use(router); // 路由后注册（也可以反过来）

app.use(lazyPlugin);
app.use(componentPlugin);


// 3. 挂载应用
app.mount("#app");
