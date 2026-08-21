import {getNewAPI} from '@/apis/home.js'
import { ref } from 'vue';
import { onMounted } from 'vue';

export function useNews() {
  const newList = ref([]);

  const getNewList = async () => {
    const res = await getNewAPI();
    newList.value = res.result;
  };

  onMounted(() => getNewList());

  return {
    newList
  }
}
