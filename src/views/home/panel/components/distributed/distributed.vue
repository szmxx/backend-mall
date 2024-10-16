<template>
  <div class="relative w-full sm:h-125 flex bg-default rounded <sm:(flex-col)">
    <div
      class="flex sm:(flex-col w-30% h-full p-4) <sm:(w-full gap-x-2 pt-14 px-2 h-60) border-r overflow-y-hidden"
    >
      <div class="sm:h-1/2 <sm:(w-1/2 bg-color rounded) flex flex-col">
        <div class="<sm:px-4 pt-4">访问来源</div>
        <div ref="pieRef" class="flex-1 w-full"></div>
      </div>
      <div class="sm:h-1/2 <sm:(w-1/2 bg-color rounded) flex flex-col">
        <div class="<sm:px-4 pt-4">访问统计</div>
        <div ref="lineRef" class="flex-1 w-full"></div>
      </div>
    </div>
    <Map class="<sm:(h-100! px-2 mt-2 w-full)"></Map>
    <div class="w-full absolute top-2 z-9">
      <div class="absolute left-25% top-2">用户分布</div>
      <div class="absolute right-2">
        <el-date-picker
          v-model="time"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="ShortCuts"
          :clearable="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from '../map/index'
import { ShortCuts } from '../../config'
import { Chart } from '@antv/g2'
import { dayjs } from 'element-plus'

const time = ref<Date[]>([])
initTime()
function initTime() {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
  time.value = [start, end]
}

const instance: Record<string, Chart | null> = {
  pie: null,
  line: null,
}
const pieRef = ref()
const lineRef = ref()
onMounted(() => {
  initPieChart()
  initLineChart()
})

function initPieChart(options = {}) {
  instance.pie = new Chart({
    container: pieRef.value,
    autoFit: true,
    ...options,
  })
  instance.pie.coordinate({
    type: 'theta',
    innerRadius: 0.45,
    outerRadius: 1,
  })
  updatePieChart()
}

function initLineChart(options = {}) {
  instance.line = new Chart({
    container: lineRef.value,
    autoFit: true,
    ...options,
  })
  updateLineChart()
}

const mode = useColorMode({})
function updatePieChart() {
  instance?.pie?.data({
    value: [
      { type: '运动', value: 0 },
      { type: '策略', value: 115 },
      { type: '上架', value: 120 },
      { type: '打分', value: 350 },
      { type: '其他', value: 150 },
    ],
  })
  instance?.pie
    ?.interval()
    .transform({ type: 'stackY' })
    .encode('y', 'value')
    .encode('color', 'type')
    .scale('color', {
      range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'],
    })
    .style('radius', 4)
    .style('stroke', '#fff')
    .style('lineWidth', 2)
    .animate('enter', { type: 'waveIn' })
    .label({
      text: 'type',
      fontWeight: 'bold',
      offset: 14,
      fill: mode.value === 'light' ? 'black' : 'white',
    })
    .tooltip({
      items: [
        (item) => ({
          name: item.type,
          value: item.value.toFixed(1),
        }),
      ],
    })
    .legend(false)

  instance?.pie?.render()
}

function getChartData(number = 20) {
  const list = []
  const date = new Date()
  for (let i = 0; i < number; i++) {
    date.setDate(i)
    list.push({
      date: dayjs(new Date(date)).format('MM-DD'),
      type: 'pv',
      value: ~~(Math.random() * 30000),
    })
    list.push({
      date: dayjs(new Date(date)).format('MM-DD'),
      type: 'uv',
      value: ~~(Math.random() * 30000),
    })
  }
  return list
}
function updateLineChart() {
  instance?.line?.data({
    value: getChartData(),
  })

  instance?.line
    ?.line()
    .encode('x', 'date')
    .encode('y', 'value')
    .encode('series', 'type')
    .encode('color', 'type')
    .scale('color', {
      range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'],
    })
    .style('shape', 'smooth')
    .style('strokeWidth', 3)
    .legend(false)

  instance?.line?.axis({
    x: {
      title: '',
      titleSpacing: -15,
      labelFill: mode.value === 'light' ? 'black' : 'white',
      tickCount: 5,
    },
    y: {
      title: '',
      titleSpacing: -15,
      labelFill: mode.value === 'light' ? 'black' : 'white',
    },
  })

  instance?.line?.render()
}
</script>
