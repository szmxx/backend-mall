<template>
  <div class="bg-default w-full h-full p-4 rounded">
    <el-tabs v-model="current">
      <el-tab-pane name="unread">
        <template #label>
          <span>
            <span>未读消息</span>
          </span>
        </template>
        <div class="flex-col flex">
          <div
            v-for="item in unreadList"
            :key="item.id"
            class="flex justify-between gap-x-8 items-center border-b py-3"
          >
            <div>
              {{ item.name }}
            </div>
            <div class="flex gap-x-4 items-center">
              <div class="whitespace-nowrap">
                {{ formatTime(item.created_at, 'YYYY-MM-DD HH:mm:ss') }}
              </div>
              <el-button ghost size="small">标为已读</el-button>
            </div>
          </div>
          <el-button type="primary" class="w-fit mt-4">全部标为已读</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane name="readed">
        <template #label>
          <span>
            <span>已读消息</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/utils'
const current = ref('unread')

const unreadList = ref([
  {
    id: 1,
    name: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
    created_at: new Date(),
  },
  {
    id: 2,
    name: '今晚12点整发大红包，先到先得',
    created_at: new Date(),
  },
])
</script>
