<template>
  <div class="h-full flex flex-col">
    <MenuHeader :is-collapse="isCollapse" @toggle="onToggle"></MenuHeader>
    <div class="flex-1 overflow-y-auto">
      <el-menu
        :default-active="current as string"
        class="w-[220px] h-full border-0"
        :collapse="isCollapse"
        :unique-opened="true"
        @select="onSelect"
      >
        <el-sub-menu
          v-for="item in menuList"
          :key="item?.meta?.id as string"
          :index="`${item?.name as string}@@${item?.meta?.title}`"
        >
          <template #title>
            <div :class="[item?.meta?.icon, 'mr-2 min-w-6']"></div>
            <span>{{ item?.meta?.title }}</span>
          </template>

          <el-menu-item
            v-for="route in item.children"
            :key="route?.meta?.id as string"
            :index="`${route?.name as string}@@${route?.meta?.title}`"
          >
            <div :class="[route?.meta?.icon, 'mr-2 min-w-4']"></div>
            <span>{{ route?.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuHeader from './MenuHeader.vue'
import usePermissionStore from '@/store/permission'
const { menuList } = storeToRefs(usePermissionStore())
import useAppStore from '@/store/app'
const { addNavItem } = useAppStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change', 'toggle'])
const isCollapse = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('change', value)
  },
})

const router = useRouter()
function onSelect(index: string) {
  const [name, title] = index?.split?.('@@') || []
  if (name) {
    addNavItem({ name: name, title: title })
    router.push({
      name: name,
    })
  }
}
function onToggle() {
  emit('toggle')
}
const route = useRoute()
const current = computed(
  () => `${route?.name as string}@@${route?.meta?.title}`,
)

addNavItem({
  name: route?.name as string,
  title: route?.meta?.title as string,
})
</script>

<style scoped lang="scss">
.el-menu-item {
  @apply bg-color;
}
</style>
