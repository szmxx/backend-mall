<template>
  <div>
    <div class="i-carbon-sun"></div>
    <div class="iconfont iconxianzhuangfenxi"></div>
    <i-custom:dark />
    <i-custom-dark />

    <common-form v-model="formmodel" :list="formlist"></common-form>
  </div>
</template>

<script setup lang="ts">
const formlist = ref([
  {
    label: '广告名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入广告名称',
    'v-focus-next': 0,
  },
  {
    label: '年龄',
    prop: 'age',
    component: 'CommonInput',
    placeholder: '请输入广告名称',
    'v-focus-next': 1,
  },
  {
    label: '数字',
    prop: 'number',
    component: 'CommonInput',
    placeholder: '请输入广告名称',
    'v-focus-next': 2,
  },
])
const formmodel = ref({})
</script>
