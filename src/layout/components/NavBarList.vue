<template>
  <div class="flex justify-between items-center px-4 bg-default border-b">
    <div
      class="bg-default mr-2 cursor-pointer w-9 py-1 border center rounded"
      @click="prevNav(route.name as string)"
    >
      <div class="i-ion-ios-arrow-left hover:text-primary"></div>
    </div>
    <div
      class="flex-1 py-1.5 flex gap-x-2 items-center overflow-x-auto overflow-y-hidden"
    >
      <div
        v-for="item in navList"
        :key="item.name"
        ref="itemRef"
        class="cursor-pointer whitespace-nowrap bg-default gap-x-1 border center py-1 px-2 rounded"
        :class="[
          { 'text-white bg-primary border-0': route.name === item.name },
        ]"
        @click="onTagRoute(item.name)"
      >
        {{ item.title }}
        <div
          class="i-ion-close"
          @click.stop="closeNav(item.name, route.name as string)"
        ></div>
      </div>
    </div>
    <div
      class="bg-default ml-2 cursor-pointer border-l border-y w-9 py-1 center rounded-l"
      @click="nextNav(route.name as string)"
    >
      <div class="i-ion-ios-arrow-right hover:text-primary"></div>
    </div>
    <el-dropdown @command="onCommand">
      <div
        class="bg-default cursor-pointer py-1 border-x border-y w-9 center rounded-r"
      >
        <div class="i-ion-build hover:text-primary"></div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in ToolList"
            :key="item.name"
            :command="item.path"
          >
            <div :class="item.icon" class="mr-2"></div>
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ToolList } from '../config'
import useAppStore from '@/store/app'
const {
  prevNav,
  nextNav,
  closeNav,
  closeAllNav,
  closeCurrentNav,
  closeRightNav,
  closeLeftNav,
} = useAppStore()
const { navList } = storeToRefs(useAppStore())

const route = useRoute()
const router = useRouter()

function onTagRoute(name: string) {
  router.push({
    name: name,
  })
}

function onCommand(command: string) {
  switch (command) {
    case 'reload':
      location.reload()
      break
    case 'current':
      closeCurrentNav(route.name as string)
      break
    case 'left':
      closeLeftNav(route.name as string)
      break
    case 'right':
      closeRightNav(route.name as string)
      break
    case 'all':
      closeAllNav()
      break
  }
}
</script>
