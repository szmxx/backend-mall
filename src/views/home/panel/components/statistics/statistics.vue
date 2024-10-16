<template>
  <div class="relative w-full sm:h-125 flex bg-default rounded <sm:(flex-col)">
    <div
      class="flex sm:(flex-col w-30% h-full pb-4) <sm:(w-full gap-x-4 pt-4 h-60) border-r px-4 overflow-y-hidden"
    >
      <div
        class="sm:h-1/2 <sm:(w-1/2 bg-color pl-4 pb-4 pr-2 rounded) overflow-hidden flex flex-col"
      >
        <div class="py-4">热销商品</div>
        <div class="flex-1 w-full flex flex-col gap-y-2 overflow-y-auto">
          <div v-for="item in hotlist" :key="item.id" class="flex gap-x-2">
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              class="flex-1"
              :percentage="(item.value / hottotal) * 100"
            >
              <div>{{ item.name }}</div>
            </el-progress>
            <el-button link>{{ item.value }}</el-button>
          </div>
        </div>
      </div>
      <div
        class="sm:h-1/2 <sm:(w-1/2 bg-color pl-4 pb-4 pr-2 rounded) overflow-hidden flex flex-col"
      >
        <div class="py-4">退货商品</div>
        <div class="flex-1 w-full flex flex-col gap-y-2 overflow-y-auto">
          <div v-for="item in returnlist" :key="item.id" class="flex gap-x-2">
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              class="flex-1"
              status="exception"
              :percentage="(item.value / returntotal) * 100"
            >
              <div>{{ item.name }}</div>
            </el-progress>
            <el-button link>{{ item.value }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="relative h-full w-full box-border flex flex-col gap-y-4">
      <div
        class="w-full z-9 flex justify-between p-4 gap-4 sm:items-center <sm:(flex-col pb-0)"
      >
        <div class="flex gap-x-2">
          <div class="bg-color px-2 pb-1 pt-2 rounded flex gap-y-1 flex-col">
            <div class="flex gap-x-2">
              <div>订单总数</div>
              <div v-show="rate('total_order') !== 0" class="flex items-center">
                <div
                  :class="[
                    +rate('total_order') > 0
                      ? 'i-ion-arrow-up-b text-danger'
                      : 'i-ion-arrow-down-b bg-success',
                  ]"
                ></div>
                <div class="text-xs">{{ rate('total_order') }}%</div>
              </div>
            </div>
            <div class="text-lg">{{ ordermap?.total_order || 0 }}</div>
          </div>
          <div class="bg-color px-2 pb-1 pt-2 rounded flex gap-y-1 flex-col">
            <div class="flex gap-x-2">
              <div>订单总额</div>
              <div v-show="rate('total_sale') !== 0" class="flex items-center">
                <div
                  :class="[
                    +rate('total_sale') > 0
                      ? 'i-ion-arrow-up-b text-danger'
                      : 'i-ion-arrow-down-b bg-success',
                  ]"
                ></div>
                <div class="text-xs">{{ rate('total_sale') }}%</div>
              </div>
            </div>
            <div class="text-lg">¥ {{ ordermap?.total_sale || 0 }}</div>
          </div>
        </div>
        <div>
          <el-date-picker
            v-model="time"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="ShortCuts"
            :clearable="false"
            class="<sm:w-full!"
          />
        </div>
      </div>
      <div ref="lineRef" class="flex-1 overflow-hidden <sm:max-h-100"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dayjs } from 'element-plus'
import { ShortCuts } from '../../config'
import { Chart } from '@antv/g2'
const time = ref<Date[]>([])
initTime()
function initTime() {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
  time.value = [start, end]
}

const hotlist = ref([
  { name: '运动', value: 0, type: 'a' },
  { name: '策略', value: 115, type: 'a' },
  { name: '上架', value: 120, type: 'a' },
  { name: '上架', value: 120, type: 'a' },
  { name: '上架', value: 120, type: 'a' },
  { name: '上架', value: 120, type: 'a' },
  { name: '打分', value: 350, type: 'b' },
  { name: '其他', value: 150, type: 'b' },
])
const hottotal = computed(() => {
  return hotlist.value.reduce((acc, cur) => {
    return acc + cur.value
  }, 0)
})
const returnlist = ref([
  { name: '运动', value: 0, type: 'a' },
  { name: '策略', value: 115, type: 'a' },
  { name: '上架', value: 120, type: 'a' },
  { name: '打分', value: 350, type: 'b' },
  { name: '打分', value: 350, type: 'b' },
  { name: '打分', value: 350, type: 'b' },
  { name: '打分', value: 350, type: 'b' },
  { name: '其他', value: 150, type: 'b' },
])
const returntotal = computed(() => {
  return returnlist.value.reduce((acc, cur) => {
    return acc + cur.value
  }, 0)
})

const ordermap = ref({
  total_order: 100,
  y_total_order: 10,
  total_sale: 90,
  y_total_sale: 110,
})
const instance: Record<string, Chart | null> = {
  line: null,
}
const lineRef = ref()
onMounted(() => {
  initLineChart()
})

function initLineChart(options = {}) {
  instance.line = new Chart({
    container: lineRef.value,
    autoFit: true,
    ...options,
  })
  updateLineChart()
}
function getChartData(number = 20) {
  const list = []
  const date = new Date()
  let value = 100
  for (let i = 0; i < number; i++) {
    date.setDate(i)
    value += 100
    list.push({
      date: dayjs(new Date(date)).format('MM-DD'),
      pay: value + ~~(Math.random() * 100),
      count: value + ~~(Math.random() * 100),
    })
  }
  console.log(list)
  return list
}

const mode = useColorMode({})
function updateLineChart() {
  instance?.line?.data({
    value: getChartData(),
  })
  console.log(mode.value)

  instance?.line
    ?.area()
    .encode('x', 'date')
    .encode('y', 'pay')
    .style(
      'fill',
      `linear-gradient(-90deg, ${
        mode.value === 'light' ? 'white' : 'black'
      } 0%, darkgreen 100%)`,
    )
    .axis('y', {
      position: 'left',
      title: '',
      tickCount: 5,
      labelFill: mode.value === 'light' ? 'black' : 'white',
    })

  instance?.line
    ?.area()
    .encode('x', 'date')
    .encode('y', 'count')
    .style(
      'fill',
      `linear-gradient(-90deg, ${
        mode.value === 'light' ? 'white' : 'black'
      } 0%, red 100%)`,
    )
    .scale('y', { independent: true })
    .axis('y', {
      position: 'right',
      title: '',
      titleSpacing: -10,
      tickCount: 5,
      labelFill: mode.value === 'light' ? 'black' : 'white',
    })

  instance?.line?.axis({
    x: {
      title: '',
      labelFill: mode.value === 'light' ? 'black' : 'white',
    },
  })
  instance?.line?.render()
}

function rate(key: string) {
  const current = ordermap?.value?.[key] || 0
  const prev = ordermap?.value?.[`y_${key}`] || 0
  if (prev !== 0) {
    return (((current - prev) / prev) * 100).toFixed(2)
  } else {
    return current !== 0 ? 100 : 0
  }
}
</script>
