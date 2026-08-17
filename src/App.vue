<script setup>
import { ref } from 'vue'
import axios from 'axios';
import {getCategoryAPI} from '@/apis/testAPI'

getCategoryAPI().then(res => {
  console.log(res)
})
</script>

<template>
  <div class="container">
    <el-button type="primary">Primary</el-button>
  </div>
</template>

<style scoped>

</style>
