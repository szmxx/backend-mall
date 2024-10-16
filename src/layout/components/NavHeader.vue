<template>
  <div class="flex items-center justify-between min-h-[50px] border-b px">
    <div class="flex items-center">
      <div
        :class="[
          {
            'i-carbon-side-panel-open': isCollapse,
            'i-carbon-side-panel-close': !isCollapse,
          },
          'mr-4 <sm:(i-carbon-side-panel-open!)',
        ]"
        @click="onCommand('/toggle')"
      ></div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-show="!isHome" :to="{ path: '/' }">
          主页
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in list"
          :key="item?.meta?.id as string"
          :to="{ path: item?.path as string }"
          >{{ item?.meta?.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex items-center gap-x-4">
      <div
        v-if="!bool"
        :class="[
          {
            'i-ion-ios-contract': isFullScreen,
            'i-ion-ios-expand': !isFullScreen,
          },
        ]"
        @click="onCommand('/full')"
      ></div>
      <el-badge is-dot>
        <div
          class="i-ion-notifications-outline cursor-pointer"
          @click="onCommand('/notify')"
        ></div>
      </el-badge>

      <el-dropdown class="sm:ml-3" @command="onCommand">
        <div class="flex items-center gap-x-2">
          <img v-if="user.avatar" :src="user.avatar" class="w-7 rounded" />
          <div v-else class="i-ion-person text-medium"></div>
          <div>{{ user.nickname || user.username }}</div>
          <div class="i-ion-ios-arrow-down text-xs"></div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in FuncList"
              :key="item.name"
              :command="item.path"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FuncList } from '../config'
import { removeToken } from '@/utils/auth'
import { isMobileDevice } from '@/utils'
import useUserStore from '@/store/user'
import useAppStore from '@/store/app'
const { user } = storeToRefs(useUserStore())
const { addNavItem } = useAppStore()

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter()
const route = useRoute()
const bool = isMobileDevice()

const list = computed(() => {
  const routes = route.matched.filter((i) => i.meta.title)
  return bool ? [routes.at(-1)].filter((i) => i) : routes
})

const isHome = computed(() => route.path.startsWith('/home'))

const emit = defineEmits(['setting', 'toggle'])
function onCommand(command: string) {
  switch (command) {
    case 'UserIndex':
      router.push({
        name: command,
      })
      addNavItem({
        name: 'UserIndex',
        title: '个人中心',
      })
      break
    case '/login':
      removeToken()
      router.push(command)
      break
    case '/setting':
      emit('setting')
      break
    case '/toggle':
      emit('toggle')
      break
    case '/notify':
      router.push(command)
      addNavItem({
        name: 'NotifyIndex',
        title: '我的通知',
      })
      break
    case '/full':
      toggleFullScreen()
      break
  }
}

const isFullScreen = ref(false)
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    isFullScreen.value = true
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      isFullScreen.value = false
      document.exitFullscreen()
    }
  }
}
</script>
