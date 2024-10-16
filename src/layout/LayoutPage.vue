<template>
  <div class="flex flex-nowrap h-full w-full">
    <el-drawer
      v-if="bool"
      v-model="collapse"
      :with-header="false"
      direction="ltr"
      class="w-[220px]!"
    >
      <LeftMenu
        v-model="isCollapse"
        class="absolute w-full h-full top-0 left-0"
        @toggle="onToggle"
      ></LeftMenu>
    </el-drawer>
    <div v-else :class="[{ '<sm:hidden': isCollapse }]">
      <LeftMenu v-model="isCollapse" @toggle="onToggle"></LeftMenu>
    </div>
    <div
      class="flex flex-col relative z-1 <sm:w-full sm:w-[calc(100vw-220px)] flex-1 border-l"
    >
      <nav-header @setting="toggleDrawer" @toggle="onToggle"></nav-header>
      <nav-bar-list></nav-bar-list>
      <div
        class="bg-color relative p-4 h-[calc(100vh-60px)] box-border overflow-y-auto"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
  <el-drawer
    v-model="visible"
    class="<sm:w-75%! sm:w-25%!"
    title="系统设置"
    direction="rtl"
  >
    <div v-for="item in SettingList" :key="item.key" class="flex flex-col">
      <label class="text-hint">{{ item.name }}</label>
      <template v-if="item.key === 'color'">
        <div class="flex gap-2 my-4 flex-wrap" @click="onColor">
          <div
            v-for="color in ColorList"
            :key="color"
            :data-color="color"
            class="w-8 h-8 rounded"
            :style="{
              'background-color': `rgb(${color})`,
              border: color === setting.theme ? '1px solid' : '',
            }"
          ></div>
        </div>
      </template>
      <template v-if="item.key === 'mode'">
        <el-radio-group v-model="setting.mode" size="small" class="my-4">
          <el-radio-button
            v-for="item in ModeList"
            :key="item.value"
            :label="item.value"
          >
            <div :class="item.icon"></div>
          </el-radio-button>
        </el-radio-group>
      </template>
      <template v-if="item.key === 'size'">
        <el-radio-group
          v-model="setting.size"
          size="small"
          class="my-4 flex-nowrap!"
        >
          <el-radio-button
            v-for="item in SizeList"
            :key="item.value"
            :label="item.value"
          >
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </template>
      <template v-if="item.key === 'lang'">
        <el-radio-group v-model="setting.lang" size="small" class="my-4">
          <el-radio-button
            v-for="item in LangList"
            :key="item.value"
            :label="item.value"
          >
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </template>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue'
import NavBarList from './components/NavBarList.vue'
import NavHeader from './components/NavHeader.vue'
import useAppStore from '@/store/app'
const { setting } = storeToRefs(useAppStore())
import { ColorList, SettingList, SizeList, LangList, ModeList } from './config'
import { isMobileDevice } from '@/utils'

const bool = isMobileDevice()

const isCollapse = ref(false)
const collapse = ref(false)
function onToggle() {
  isCollapse.value = bool ? false : !isCollapse.value
  collapse.value = !collapse.value
}

const visible = ref(false)
function toggleDrawer() {
  visible.value = !visible.value
}

function onColor(evt: MouseEvent) {
  const el = evt.target as HTMLElement
  if (el.dataset.color) {
    setting.value.theme = el.dataset.color
  }
}
</script>
