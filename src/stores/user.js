// 管理用户数据相关
import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cart";

export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();

    // 定义用户管理的数据
    const userInfo = ref({});

    // 定义获取接口数据的函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    // 退出时清除用户信息和购物车数据
    const clearUserInfo = () => {
      userInfo.value = {};
      cartStore.clearCart();
    };

    // 返回state和action
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  },
);
