import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);

    const addCart = (goods) => {
      // 添加过count+1
      //没有添加过直接push
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        item.count++;
      } else {
        cartList.value.push(goods);
      }
    };

    // 删除购物车
    const delCart = async (skuId) => {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
    };

    //  cartList.value = cartList.value.filter((item) => item.skuId !== skuId);

    const totalCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0),
    );
    const totalPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0),
    );

    return {
      cartList,
      addCart,
      delCart,
      totalCount,
      totalPrice,
    };
  },
  {
    persist: true,
  },
);
