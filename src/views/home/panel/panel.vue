<template>
  <div class="flex flex-col gap-y-4 w-full">
    <div class="flex gap-4 flex-wrap">
      <div
        v-for="item in CoreList"
        :key="item.name"
        class="flex gap-x-2 px-4 items-center justify-between rounded flex-1 py-4 bg-default"
      >
        <div class="flex flex-col gap-y-4">
          <div class="whitespace-nowrap flex gap-x-2">
            今日{{ item.name }}
            <div v-show="rate(item) !== 0" class="flex items-center">
              <div
                :class="[
                  +rate(item) > 0
                    ? 'i-ion-arrow-up-b text-danger'
                    : 'i-ion-arrow-down-b bg-success',
                ]"
              ></div>
              <div class="text-xs">{{ rate(item) }}%</div>
            </div>
          </div>
          <div class="flex flex-col gap-y-4">
            <div class="text-8 <sm:text-6 whitespace-nowrap flex gap-x-1">
              {{ item.unit }}
              <CommonCount
                :decimal="item.decimal"
                :value="coreMap?.[item.key]"
              ></CommonCount>
            </div>
            <div class="flex gap-x-2 text-sm text-hint whitespace-nowrap">
              <div>昨日</div>
              <div class="flex gap-x-1">
                {{ item.unit }}
                <CommonCount
                  :decimal="item.decimal"
                  :value="coreMap?.[item.y_key]"
                ></CommonCount>
              </div>
            </div>
          </div>
        </div>

        <div
          :class="[item.icon, item.color, 'text-10 center <sm:text-6']"
        ></div>
      </div>
    </div>
    <table-cell
      class="bg-default rounded overflow-hidden"
      title="待处理业务"
      :list="DealList"
      :map="dealMap"
    ></table-cell>

    <div class="flex gap-4 flex-wrap">
      <cell
        class="rounded overflow-hidden bg-default flex-1 min-w-40"
        title="商品总览"
        :list="CommodityOverview"
        :map="commodityMap"
      ></cell>
      <cell
        class="rounded overflow-hidden bg-default flex-1 min-w-40"
        title="用户总览"
        :list="UserOverview"
        :map="userMap"
      ></cell>
    </div>
    <statistics></statistics>
    <distributed></distributed>
  </div>
</template>

<script setup lang="ts">
import TableCell from './components/table-cell.vue'
import Cell from './components/cell.vue'
import distributed from './components/distributed/index'
import statistics from './components/statistics/index'
import { CoreList, DealList, CommodityOverview, UserOverview } from './config'
const coreMap = ref<Record<string, number>>({
  total_order: 100,
  total_sale: 1.12345,
})

const dealMap = ref({
  penging_pay: 1000,
})

const commodityMap = ref({})
const userMap = ref({})

function rate(item: (typeof CoreList)[0]) {
  const current = coreMap?.value?.[item?.key] || 0
  const prev = coreMap?.value?.[item?.y_key] || 0
  if (prev !== 0) {
    return (((current - prev) / prev) * 100).toFixed(2)
  } else {
    return current !== 0 ? 100 : 0
  }
}
</script>
