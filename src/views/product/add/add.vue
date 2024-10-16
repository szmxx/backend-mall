<template>
  <div class="flex flex-col gap-y-4 <sm:gap-y-8 py-4">
    <el-steps :active="current" align-center finish-status="success">
      <el-step
        v-for="item in StepList"
        :key="item.id"
        :title="(bool ? '' : '填写') + item.title"
      />
    </el-steps>
    <div class="center flex-col">
      <infomation v-show="current === 0" class="w-70% <sm:w-85%"></infomation>
      <market v-show="current === 1" class="w-70% <sm:w-85%"></market>
      <attribute v-show="current === 2" class="w-70% <sm:w-85%"></attribute>
      <relation v-show="current === 3" class="w-70% <sm:w-85%"></relation>
      <div class="flex mt-8">
        <el-button v-show="current !== 0" @click="onPrev">
          上一步，{{ prev }}
        </el-button>
        <el-button v-if="next" type="primary" @click="onNext">
          下一步，{{ next }}
        </el-button>
        <el-button v-else type="primary" @click="onFinish">
          完成，提交商品
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StepList } from './config'
import infomation from './components/infomation.vue'
import market from './components/market.vue'
import attribute from './components/attribute.vue'
import relation from './components/relation.vue'
import { isMobileDevice } from '@/utils'

const bool = isMobileDevice()
const current = ref(0)
const prev = computed(() => StepList?.[current?.value - 1]?.title)
const next = computed(() => StepList?.[current?.value + 1]?.title)

function onNext() {
  if (current.value < StepList.length - 1) {
    current.value += 1
  }
}
function onPrev() {
  current.value -= 1
}

function onFinish() {
  // pass
  console.log('')
}
</script>
