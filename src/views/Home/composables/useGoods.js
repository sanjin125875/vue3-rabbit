import { getGoodsAPI } from '@/apis/home.js';
import { onMounted, ref } from 'vue';

export function useGoods() {
  const goodsProduct = ref([]);

  const getGoodsList = async () => {
    const res = await getGoodsAPI();
    goodsProduct.value = res.result;
  };

  onMounted(() => {
    getGoodsList();
  });

  return {
    goodsProduct
  }
}
