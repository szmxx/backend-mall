export default {
  mounted(el: HTMLElement, binding: Record<string, unknown>) {
    if (binding.value) {
      if (el.nodeName === 'INPUT') {
        el?.focus?.()
      } else {
        el?.querySelector?.('input')?.focus?.()
      }
    }
  },
}
