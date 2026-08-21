// 封装分类业务数据相关代码
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getTopCategoryAPI } from "@/apis/category";
import { onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
    const route = useRoute();
    const topCategory = ref({});

    const getTopCategory = async (id = route.params.id) => {
        const res = await getTopCategoryAPI(id);
        topCategory.value = res.result;
    };

    // 期望在路由参数变化的时候，分类接口重新发送
    onBeforeRouteUpdate((to) => {
        getTopCategory(to.params.id);
    });

    return{
        topCategory
    }
}