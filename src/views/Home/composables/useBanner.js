import { getBannerAPI } from "@/apis/home";
import { onMounted, ref } from "vue";

export function useBanner() {
  // 定义banner数据列表
  const bannerList = ref([]);

  // 获取banner数据
  const getBannerList = async () => {
    const res = await getBannerAPI();
    console.log(res);
    bannerList.value = res.result;
  };

  onMounted(() => {
    getBannerList();
  });

  return {
    bannerList,
  };
}
