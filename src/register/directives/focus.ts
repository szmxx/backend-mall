export default {
  mounted(el: HTMLElement, binding: Record<string, unknown>) {
    if (binding.value) {
      if (el.nodeName === 'INPUT') {
        el?.focus?.()
      } else {
        setTimeout(() => {
          el?.querySelector?.('input')?.focus?.()
        })
      }
    }
  },
}
