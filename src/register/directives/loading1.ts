import { createApp, h, reactive } from 'vue'

import LoadingComponent from './Loading.vue'

function createLoadingComponent(el, binding) {
  const state = reactive({ show: binding.value })
  const loadingInstance = createApp({
    render() {
      return h(LoadingComponent, { show: state.show })
    },
  })
  const loadingElement = document.createElement('div')
  el.appendChild(loadingElement)
  loadingInstance.mount(loadingElement)

  return {
    instance: loadingInstance,
    updateShow(value) {
      state.show = value
    },
    unmount() {
      loadingInstance.unmount()
      el.removeChild(loadingElement)
    },
  }
}

export default {
  mounted(el, binding) {
    const loadingControl = createLoadingComponent(el, binding)
    el._loading_control = loadingControl
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el._loading_control.updateShow(binding.value)
    }
  },
  unmounted(el) {
    if (el._loading_control) {
      el._loading_control.unmount()
      delete el._loading_control
    }
  },
}
