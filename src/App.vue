<script setup>
import { ref } from 'vue'
import axios from 'axios';
import {getCategoryAPI} from '@/apis/testAPI'

getCategoryAPI().then(res => {
  console.log(res)
})
</script>

<template>
  <!-- 一级路由出口组件 -->
  <RouterView />
  <div class="test">
    test scss
  </div>
</template>

<style scoped lang="scss">
.test{
  color: $priceColor;
}
</style>
