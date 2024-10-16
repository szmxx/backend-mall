<template>
  <div class="p-4 bg-default">
    <el-steps :active="current" align-center finish-status="success">
      <el-step v-for="item in StepList" :key="item.id" :title="item.title" />
    </el-steps>
    <div>
      <div class="flex justify-between items-center">
        <div>当前订单状态：{{ status }}</div>
        <div>
          <el-button>删除订单</el-button>
          <el-button>备注订单</el-button>
        </div>
      </div>
      <div>
        <div>基本信息</div>
        <common-table-list
          :columns="BasicColumnList"
          :data="basicData"
        ></common-table-list>
        <div>收货人信息</div>
        <common-table
          :columns="ReceiverColumnList"
          :data="receiverData"
        ></common-table>
        <div>商品信息</div>
        <common-table
          :columns="CommodityColumnList"
          :data="commodityData"
        ></common-table>
        <div>费用信息</div>
        <common-table-list
          :columns="PayColumnList"
          :data="payData"
        ></common-table-list>
        <div>操作信息</div>
        <common-table
          :columns="OperateColumnList"
          :data="operateData"
        ></common-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  StepList,
  BasicColumnList,
  ReceiverColumnList,
  CommodityColumnList,
  PayColumnList,
  OperateColumnList,
} from './config'

const current = ref('0')

const status = ref('')

const basicData = ref({})

const receiverData = ref([])

const commodityData = ref([])

const payData = ref({})

const operateData = ref([])
</script>
