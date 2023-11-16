<template>
  <div class="flex flex-nowrap h-full w-full">
    <div class="min-w-[220px] <sm:(absolute hidden)">
      <LeftMenu></LeftMenu>
    </div>
    <div class="flex flex-col flex-1 border-l">
      <div class="flex items-center min-h-[60px] border-b pl">
        <slot>DEMO 系统</slot>
      </div>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue'
</script>
