import { getDetail } from "@/apis/detail";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export function useDetail() {
    const goods = ref({})
    const route = useRoute()
    const getGoods = async () => {
        const res = await getDetail(route.params.id)
        goods.value = res.result
    }
    onMounted(() => getGoods())
    return {
        goods
    }
}