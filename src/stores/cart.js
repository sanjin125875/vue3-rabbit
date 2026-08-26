import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => !!userStore.userInfo.token);
    const cartList = ref([]);

    // 提交锁：防止 addCart 被重复调用（双击或事件重复绑定导致两次 insert 接口）
    const insertingCart = ref(false);

    const addCart = async (goods) => {
      // 1) 插入中直接拦截，阻断重复调用
      if (insertingCart.value) return;
      insertingCart.value = true;

      const { skuId, count } = goods;
      try {
        // 登录
        if (isLogin.value) {
          // 登录之后的加入购车逻辑：先插入，再拉取最新列表
          await insertCartAPI({ skuId, count });
          const res = await findNewCartListAPI();
          cartList.value = res.result;
        } else {
          // 本地：添加过 count+1，没有就直接 push
          const item = cartList.value.find(
            (item) => goods.skuId === item.skuId,
          );
          if (item) {
            item.count += count;
          } else {
            cartList.value.push(goods);
          }
        }
      } finally {
        insertingCart.value = false;
      }
    };

    // 提交锁：防止 delCart 被多次触发
    const deletingCart = ref(false);

    // 删除购物车
    const delCart = async (skuId) => {
      if (deletingCart.value) return;
      deletingCart.value = true;
      try {
        if (isLogin.value) {
          // 登录态：先调服务端删除接口，成功后再刷新本地
          await delCartAPI([skuId]);
          const res = await findNewCartListAPI();
          cartList.value = res.result;
        } else {
          // 未登录：仅做本地过滤删除（findIndex+splice 在 -1 时会删除最后一项，改用 filter）
          cartList.value = cartList.value.filter(
            (item) => item.skuId !== skuId,
          );
        }
      } finally {
        deletingCart.value = false;
      }
    };

    // 清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    const allCheck = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    const isAll = computed(() =>
      // 就是筛选出来选中的，如果全是选中的话就是isAll => true
      cartList.value.every((item) => item.selected),
    );

    const totalCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0),
    );
    const totalPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0),
    );

    // 已选数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0),
    );
    // 已选择商品价钱
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0),
    );

    return {
      addCart,
      delCart,
      singleCheck,
      allCheck,
      clearCart,
      cartList,
      isAll,
      totalCount,
      totalPrice,
      selectedCount,
      selectedPrice,
      insertingCart,
      deletingCart,
    };
  },
  {
    persist: true,
  },
);
