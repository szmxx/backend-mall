<template>
  <div class="center bg-color w-full h-full">
    <div class="flex-1 <sm:(absolute w-full) h-full">
      <img src="@/assets/bg.jpg" class="w-full h-full" object-cover />
    </div>
    <div class="w-25% z-99 sm:bg-default h-full center <sm:w-full">
      <Login v-show="current === 'home'" @action="onAction"></Login>
      <Forget v-show="current === 'forget'" @action="onAction"></Forget>
      <Register v-show="current === 'register'" @action="onAction"></Register>
    </div>
    <footer class="absolute bottom-1 w-fit text-center text-light">
      <p>© {{ year }}-PRESENT {{ title }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Login from './components/Login.vue'
import Forget from './components/Forget.vue'
import Register from './components/Register.vue'
import useAppStore from '@/store/app'

const current = ref('home')
const year = computed(() => new Date().getFullYear())
const { config } = useAppStore()

const title = config?.title

function onAction(type: string) {
  current.value = type
}
</script>
