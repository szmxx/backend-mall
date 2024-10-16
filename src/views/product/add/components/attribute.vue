<template>
  <div>
    <common-form
      :model="model"
      component-class="w-full"
      :list="AttributeFormList"
      :label-width="100"
      :footer="false"
      :redirect="false"
    >
      <template #specification>
        <div>specification</div>
        <common-table :columns="SkuColumnList" :data="model.skuList">
          <template #sale="{ row }">
            <common-input
              v-model="row.sale"
              placeholder="请输入销售价格"
            ></common-input>
          </template>
          <template #discount="{ row }">
            <common-input v-model="row.discount"></common-input>
          </template>
          <template #stock="{ row }">
            <common-input v-model="row.stock"></common-input>
          </template>
          <template #stockalarm="{ row }">
            <common-input v-model="row.stockalarm"></common-input>
          </template>
          <template #itemnumber="{ row }">
            <common-input v-model="row.itemnumber"></common-input>
          </template>
          <template #operate>
            <el-button link type="danger">删除</el-button>
          </template>
        </common-table>
      </template>
      <template #image>
        <div>image</div>
      </template>
      <template #album>
        <el-upload
          v-model:file-list="model.albumList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="onPreview"
          :on-remove="onRemoveImage"
        >
          <div class="i-ion-plus text-xl"></div>
        </el-upload>
      </template>
      <template #params>
        <div>params</div>
      </template>
      <template #detail>
        <div class="h-150">
          <common-editor v-model="model.detail"></common-editor>
        </div>
      </template>
    </common-form>
    <common-dialog v-model="preview.visible">
      <img w-full :src="preview.url" alt="Preview Image" />
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import { AttributeFormList, SkuColumnList } from '../config'
import type { UploadUserFile } from 'element-plus'
const model = ref({
  detail: '',
  skuList: [
    {
      sale: '123',
    },
  ],
  albumList: [
    {
      name: '1.jpg',
      url: '/static/image/1.jpg',
    },
    {
      name: '2.jpg',
      url: '/static/image/2.jpg',
    },
  ],
})

const preview = ref({
  visible: false,
  url: '',
})

function onPreview(file: UploadUserFile) {
  preview.value = {
    url: file.url!,
    visible: true,
  }
}
function onRemoveImage() {
  // pass
}
</script>
