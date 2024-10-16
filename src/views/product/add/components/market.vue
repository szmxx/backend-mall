<template>
  <common-form
    component-class="w-full"
    :list="MarketFormList"
    :label-width="100"
    :model="model"
    :footer="false"
    :redirect="false"
  >
    <template #vip>
      <el-tabs v-model="model.viptype" class="<sm:w-full">
        <el-tab-pane label="无优惠" name="none">暂无优惠方式</el-tab-pane>
        <el-tab-pane
          label="特惠促销"
          name="discountinfo"
          class="flex flex-col gap-y-4"
        >
          <el-form-item label="开始时间">
            <common-date
              v-model="model.discountinfo.start"
              type="datetime"
            ></common-date>
          </el-form-item>
          <el-form-item label="结束时间">
            <common-date
              v-model="model.discountinfo.end"
              type="datetime"
            ></common-date>
          </el-form-item>
          <el-form-item label="促销价格">
            <common-input-number
              v-model="model.discountinfo.price"
              type="number"
              placeholder="请输入促销价格"
            ></common-input-number>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          label="会员价格"
          name="vipinfo"
          class="flex flex-col gap-y-4"
        >
          <el-form-item label="白银会员">
            <common-input-number
              v-model="model.vipinfo.silver"
              type="number"
              placeholder="请输入促销价格"
            ></common-input-number>
          </el-form-item>
          <el-form-item label="黄金会员">
            <common-input-number
              v-model="model.vipinfo.gold"
              type="number"
              placeholder="请输入促销价格"
            ></common-input-number>
          </el-form-item>
          <el-form-item label="铂金会员">
            <common-input-number
              v-model="model.vipinfo.platinum"
              type="number"
              placeholder="请输入促销价格"
            ></common-input-number>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="阶梯价格" name="rankinfo">
          <common-table
            :max-height="300"
            :columns="RankColumnList"
            :data="model.rankinfo"
          >
            <template #number="{ row }">
              <common-input-number
                v-model="row.number"
                placeholder="请输入阶梯数量"
                type="number"
                :min="0"
                size="small"
                class="<sm:w-25!"
              ></common-input-number>
            </template>
            <template #discount="{ row }">
              <common-input-number
                v-model="row.discount"
                placeholder="请输入阶梯优惠"
                type="number"
                :max="10"
                :min="1"
                size="small"
                class="<sm:w-25!"
              ></common-input-number>
            </template>
            <template #operate="{ row }">
              <el-button link type="primary" @click="onRankAdd">添加</el-button>
              <el-button link type="danger" @click="onRankRemove(row)"
                >删除</el-button
              >
            </template>
          </common-table>
        </el-tab-pane>
        <el-tab-pane label="满减价格" name="fullinfo">
          <common-table
            :max-height="300"
            :columns="FullColumnList"
            :data="model.fullinfo"
          >
            <template #full="{ row }">
              <common-input-number
                v-model="row.full"
                placeholder="请输入满减价格"
                type="number"
                :min="0"
                size="small"
                class="<sm:w-25!"
              ></common-input-number>
            </template>
            <template #discount="{ row }">
              <common-input-number
                v-model="row.discount"
                placeholder="请输入满减优惠"
                type="number"
                :min="0"
                :max="row.full"
                size="small"
                class="<sm:w-25!"
              ></common-input-number>
            </template>
            <template #operate="{ row }">
              <el-button link type="primary" @click="onFullAdd">添加</el-button>
              <el-button link type="danger" @click="onFullRemove(row)"
                >删除</el-button
              >
            </template>
          </common-table>
        </el-tab-pane>
      </el-tabs>
    </template>
  </common-form>
</template>

<script setup lang="ts">
import { MarketFormList, RankColumnList, FullColumnList } from '../config'
import { uuid } from '@/utils'
const model = ref({
  givescore: 234,
  limitscore: 90,
  status: true,
  new: true,
  recommend: true,
  serviceassure: ['2'],
  title: '23',
  description: '234',
  keywords: '23',
  remark: 're',
  viptype: 'discountinfo',
  discountinfo: {
    start: new Date().toDateString(),
    end: new Date().toDateString(),
    price: '20',
  },
  vipinfo: {
    silver: '12',
    gold: '24',
    platinum: '23',
  },
  rankinfo: [
    {
      id: uuid(),
      number: '0',
      discount: '0',
    },
  ],
  fullinfo: [
    {
      id: uuid(),
      full: '0',
      discount: '0',
    },
  ],
})
function onRankAdd() {
  model.value.rankinfo.push({
    id: uuid(),
    number: '0',
    discount: '0',
  })
}
function onRankRemove(row: Record<string, unknown>) {
  if (model?.value?.rankinfo?.length > 1) {
    const index = model.value.rankinfo.findIndex((item) => item.id === row.id)
    if (index > -1) {
      model.value.rankinfo.splice(index, 1)
    }
  }
}
function onFullAdd() {
  model.value.fullinfo.push({
    id: uuid(),
    full: '0',
    discount: '0',
  })
}
function onFullRemove(row: Record<string, unknown>) {
  if (model?.value?.fullinfo?.length > 1) {
    const index = model.value.fullinfo.findIndex((item) => item.id === row.id)
    if (index > -1) {
      model.value.fullinfo.splice(index, 1)
    }
  }
}
</script>
