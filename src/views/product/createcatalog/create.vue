<template>
  <div class="p-4 bg-default">
    <common-form
      :model="model"
      component-class="w-full"
      :list="FormList"
      :label-width="100"
      :redirect="false"
    >
      <template #logo>
        <el-upload action="" :limit="1" :auto-upload="false">
          <template #trigger>
            <el-button type="primary">上传文件</el-button>
          </template>
          <template #tip>
            <div class="text-danger text-sm mt-2">
              限制一个文件，新的将覆盖旧的
            </div>
          </template>
        </el-upload>
      </template>
      <template #relation>
        <div>hellop</div>
      </template>
    </common-form>
  </div>
</template>

<script setup lang="ts">
import { FormList } from './config'

const model = ref({})
</script>
