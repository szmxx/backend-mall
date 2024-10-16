<template>
  <common-form
    :model="model"
    component-class="w-full"
    :list="InfoFormList"
    :label-width="100"
    :footer="false"
    :redirect="false"
  >
  </common-form>
</template>

<script setup lang="ts">
import { InfoFormList } from '../config'

const model = ref({})
</script>
