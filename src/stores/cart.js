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

    return {
      addCart,
      delCart,
      singleCheck,
      allCheck,
      cartList,
      isAll,
      totalCount,
      totalPrice,
    };
  },
  {
    persist: true,
  },
);
