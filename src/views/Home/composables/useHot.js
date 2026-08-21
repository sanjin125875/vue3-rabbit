import { getHotAPI } from "@/apis/home.js";
import { ref } from "vue";
import { onMounted } from "vue";

export function useHot() {
  const hotList = ref([]);

  const getHotList = async () => {
    const res = await getHotAPI();
    console.log(res);

    hotList.value = res.result;
  };

  onMounted(() => getHotList());

  return {
    hotList
  }
}
