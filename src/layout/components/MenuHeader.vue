<template>
  <div
    class="h-[50px] flex items-center justify-between p-4 border-b <sm:border-r"
  >
    <div class="flex items-center gap-x-4">
      <img class="rounded w-9" src="@/assets/logo.jpeg" />
      <div
        v-show="!isCollapse"
        :class="[
          {
            'bg-primary center text-white p-2 rounded-50%': isCollapse,
          },
          'text-medium font-bold',
        ]"
      >
        {{ isCollapse ? title?.[0] : title }}
      </div>
    </div>

    <div
      :class="[
        {
          'i-carbon-side-panel-open': isCollapse,
          'i-carbon-side-panel-close': !isCollapse,
        },
        'sm:hidden',
      ]"
      @click="onToggle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store/app'
const { config } = useStore()
const title = config?.title

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['toggle'])
function onToggle() {
  emit('toggle')
}
</script>
