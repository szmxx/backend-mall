<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div v-tooltip="{ direction: direction, maxWidth: 800 }" class="line-clamp-2">
    <div>
      {{ msg }}
    </div>
    <span slot="content"
      >这是通过<strong>自定义属性</strong>定义的 tooltip 内容{{
        direction
      }}</span
    >
  </div>
  <div v-tooltip="{ direction: 'bottom' }" class="line-clamp-2">
    <div>
      我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担
    </div>
    <span slot="content"
      >这是通过<strong>自定义属性</strong>定义的 tooltip 内容{{
        direction
      }}</span
    >
  </div>
  <div class="flex gap-4 flex-wrap">
    <LineChart
      class="max-w-[calc(25%-0.75rem)] h-80"
      :load="onLoad"
      mode="normal"
    ></LineChart>
    <LineChart
      v-for="i in Array.from({ length: 20 }, (_, index) => index)"
      :key="i"
      class="max-w-[calc(25%-0.75rem)] h-80 rounded p-2"
      :option="computeOption()"
      :load="Math.random() > 0.5 ? onLoad : void 0"
      mode="normal"
    ></LineChart>
    <BarChart
      v-for="i in Array.from({ length: 20 }, (_, index) => index)"
      :key="i"
      class="max-w-[calc(25%-0.75rem)] h-80 rounded p-2"
      :option="computeOption()"
      :load="Math.random() > 0.5 ? onLoad : void 0"
      mode="normal"
    ></BarChart>
    <PieChart
      v-for="i in Array.from({ length: 20 }, (_, index) => index)"
      :key="i"
      class="max-w-[calc(25%-0.75rem)] h-80 rounded p-2"
      :option="computePieOption()"
      :load="Math.random() > 0.5 ? onPieLoad : void 0"
      mode="normal"
    ></PieChart>
    <RadarChart
      v-for="i in Array.from({ length: 20 }, (_, index) => index)"
      :key="i"
      class="max-w-[calc(25%-0.75rem)] h-80 rounded p-2"
      :option="computeRadarOption()"
      :load="Math.random() > 0.5 ? onRadarLoad : void 0"
      mode="normal"
    ></RadarChart>
    <GaugeChart
      v-for="i in Array.from({ length: 20 }, (_, index) => index)"
      :key="i"
      class="max-w-[calc(25%-0.75rem)] h-80 rounded p-2"
      :option="computeGaugeOption()"
      :load="Math.random() > 0.5 ? onGaugeLoad : void 0"
      mode="normal"
    ></GaugeChart>
  </div>
</template>

<script setup lang="ts">
import LineChart from './components/LineChart/index.vue'
import BarChart from './components/BarChart/index.vue'
import PieChart from './components/PieChart/index.vue'
import RadarChart from './components/RadarChart/index.vue'
import GaugeChart from './components/GaugeChart/index.vue'
defineOptions({
  name: 'Chart',
})

const direction = ref('bottom-left')
const msg = ref(
  '我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担我的大的负担',
)

setTimeout(() => {
  msg.value = '我的大的负担我的大的负担我的大的'
}, 3000)

function generate() {
  const series = [
    {
      name: '产品',
      data: [400, 90, 12, 90, 800, 9, 40, 555],
    },
    {
      name: '研发',
      data: Array.from({ length: 8 }, (_, index) => {
        return ~~((index + 1) * Math.random() * 1000)
      }),
    },
  ]
  return series
}
function onLoad() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const series = generate()
      const option = {
        legend: {
          data: series.map((i) => i.name),
        },
        series: series,
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五'],
          boundaryGap: false,
        },
      }
      Math.random() > 0.5 ? resolve(option) : reject()
    }, 3000)
  })
}
function computeOption() {
  const series = generate()
  const option = {
    legend: {
      data: series.map((i) => i.name),
    },
    series: series,
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五'],
      boundaryGap: false,
    },
  }
  return option
}

function generatePie() {
  const series = [
    {
      name: '产品',
      data: Array.from({ length: 8 }, (_, index) => {
        return {
          name: '饼图' + index,
          value: ~~((index + 1) * Math.random() * 1000),
        }
      }),
    },
  ]
  return series
}

function computePieOption() {
  const series = generatePie()
  const option = {
    series: series,
  }
  return option
}

function onPieLoad() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const series = generatePie()
      const option = {
        series: series,
      }
      Math.random() > 0.5 ? resolve(option) : reject()
    }, 3000)
  })
}

function generateRadar() {
  const series = [
    {
      name: '产品',
      data: Array.from({ length: 3 }, (_, index) => {
        return {
          name: '雷达' + index,
          value: Array.from({ length: 8 }, () => {
            return ~~((Math.random() + 1) * 1000)
          }),
        }
      }),
    },
  ]
  return series
}

function onRadarLoad() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const series = generateRadar()
      const option = {
        radar: [
          {
            indicator: Array.from({ length: 8 }, (_, index) => {
              return {
                name: '栏目' + index,
                max: 2500, // max 应该超过其他值，要不然有警告
              }
            }),
          },
        ],
        series: series,
      }
      Math.random() > 0.5 ? resolve(option) : reject()
    }, 3000)
  })
}

function computeRadarOption() {
  const series = generateRadar()
  const option = {
    radar: [
      {
        indicator: Array.from({ length: 8 }, (_, index) => {
          return {
            name: '栏目' + index,
            max: 2500,
          }
        }),
      },
    ],
    series: series,
  }
  return option
}

function generateGauge() {
  const series = [
    {
      name: '产品',
      data: [
        {
          name: '仪表盘',
          value: 50,
        },
      ],
    },
  ]
  return series
}

function onGaugeLoad() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const series = generateGauge()
      const option = {
        series: series,
      }
      Math.random() > 0.5 ? resolve(option) : reject()
    }, 3000)
  })
}

function computeGaugeOption() {
  const series = generateGauge()
  const option = {
    series: series,
  }
  return option
}

// 提示重新加载
// onMounted(() => {
//   window.onbeforeunload = (event) => {
//     // 那个路由页面需要，就把path的名字修改成那个，比如我当前页面的path是/vue
//     // 兼容IE8和Firefox 4之前的事件对象写法（不加也行，现在少有项目兼容老版本浏览器了）
//     event = event || window.event
//     if (event) {
//       event.returnValue = ''
//     }
//     // Chrome支持, Safari支持, Firefox 4版本以后支持, Opera 12版本以后支持 , IE 9版本以后支持
//     return ''
//   }
// })
</script>
