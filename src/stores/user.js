// 管理用户数据相关
import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 定义用户管理的数据
    const userInfo = ref({});

    // 定义获取接口数据的函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    // 返回state和action
    return {
      userInfo,
      getUserInfo,
    };
  },
  {
    persist: true,
  },
);
