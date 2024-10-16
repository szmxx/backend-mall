<template>
  <div ref="countRef">{{ initValue }}</div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
const countRef = ref()
const props = defineProps({
  initValue: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    default: 0,
  },
  decimal: {
    type: Number,
    default: 0,
  },
})
onMounted(() => {
  init()
})

function init() {
  const countUp = new CountUp(countRef.value, props.value, {
    decimalPlaces: props.decimal,
  })
  if (!countUp.error) {
    countUp.start()
  } else {
    console.error(countUp.error)
  }
}
</script>
