import { getCategoryFilterAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export function useSubCategory() {
  const categoryData = ref({});

  const route = useRoute();

  const getCategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id);
    categoryData.value = res.result;
  };

  onMounted(() => getCategoryData());

  return {
    categoryData
  }
}
