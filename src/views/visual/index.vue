<template>
  <div ref="container" class="virtual-list-container" @scroll="handleScroll">
    <div
      class="virtual-list-phantom"
      :style="{ height: totalHeight + 'px' }"
    ></div>
    <div
      class="virtual-list-content"
      :style="{ transform: `translate3d(0, ${startOffset}px, 0)` }"
    >
      <component
        :is="itemComponent"
        v-for="item in visibleData"
        :key="item.id"
        :data="item"
        @resize="onItemResize(item.id, $event)"
      ></component>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, defineComponent } from 'vue'

export default defineComponent({
  name: 'VirtualList',
  props: {
    itemComponent: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    loadMore: {
      type: Function,
      default: null,
    },
    estimatedItemHeight: {
      type: Number,
      default: 50,
    },
  },
  setup(props) {
    const container = ref(null)
    const startIndex = ref(0)
    const endIndex = ref(0)
    const startOffset = ref(0)
    const itemHeights = ref({})
    const itemPositions = ref([])

    const updateItemPositions = () => {
      let currentPosition = 0
      itemPositions.value = props.items.map((item) => {
        const height = itemHeights.value[item.id] || props.estimatedItemHeight
        const position = {
          top: currentPosition,
          bottom: currentPosition + height,
          height,
        }
        currentPosition += height
        return position
      })
    }

    const totalHeight = computed(() => {
      return itemPositions.value.length > 0
        ? itemPositions.value[itemPositions.value.length - 1].bottom
        : props.items.length * props.estimatedItemHeight
    })

    const visibleData = computed(() => {
      return props.items.slice(startIndex.value, endIndex.value)
    })

    const getStartIndex = (scrollTop) => {
      return itemPositions.value.findIndex((pos) => pos.bottom > scrollTop)
    }

    const getEndIndex = (startIndex, containerHeight, scrollTop) => {
      let endIndex = startIndex
      let heightSum = 0
      while (
        endIndex < itemPositions.value.length &&
        heightSum < containerHeight
      ) {
        heightSum += itemPositions.value[endIndex].height
        endIndex++
      }
      return endIndex
    }

    const updateVisibleData = () => {
      const { scrollTop, clientHeight } = container.value
      startIndex.value = getStartIndex(scrollTop)
      endIndex.value = getEndIndex(startIndex.value, clientHeight, scrollTop)
      startOffset.value =
        startIndex.value > 0
          ? itemPositions.value[startIndex.value - 1].bottom
          : 0
    }

    const handleScroll = () => {
      updateVisibleData()
      if (
        props.loadMore &&
        container.value.scrollHeight - container.value.scrollTop <=
          container.value.clientHeight * 2
      ) {
        props.loadMore()
      }
    }

    const onItemResize = (id, size) => {
      itemHeights.value[id] = size.height
      updateItemPositions()
      updateVisibleData()
    }

    onMounted(() => {
      updateItemPositions()
      updateVisibleData()
    })

    return {
      container,
      startOffset,
      totalHeight,
      visibleData,
      handleScroll,
      onItemResize,
    }
  },
})
</script>

<style scoped>
.virtual-list-container {
  position: relative;
  overflow-y: auto;
  height: 100%;
}

.virtual-list-phantom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
}

.virtual-list-content {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
