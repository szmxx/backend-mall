import ResizeObserverAPI from '@/utils/ResizeObserver'
const TOOLTIP_CLASS = 'v-tooltip'

export default {
  mounted(el: HTMLElement, binding: Record<string, unknown>) {
    initializeTooltip(el, binding)
  },
  updated(el: HTMLElement, binding: Record<string, unknown>) {
    updateTooltip(el, binding)
  },
  unmounted(el: HTMLElement) {
    destroyTooltip(el)
  },
}

function isOverflow(el: HTMLElement) {
  const style = window.getComputedStyle(el)
  // 获取最大行数 (设定的line-clamp值)
  const maxLines = parseInt(style['-webkit-line-clamp'])
  if (maxLines) {
    const elementHeight = el.scrollHeight
    // 获取元素的行高
    const lineHeight = parseFloat(style.lineHeight)
    // 计算当前文本的实际行数
    const actualLines = Math.round(elementHeight / lineHeight)
    return actualLines > maxLines
  } else {
    return el.scrollWidth > el.clientWidth
  }
}
function isOverflowRAF(el: HTMLElement) {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(isOverflow(el))
    })
  })
}

function createTooltipElement(binding: Record<string, unknown>) {
  const tooltipContent = document.createElement('div')
  tooltipContent.className = TOOLTIP_CLASS

  const defaultStyles = {
    position: 'absolute',
    display: 'none',
    zIndex: '9999',
    maxWidth: (binding?.value?.maxWidth || 200) + 'px',
    padding: '5px',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  }

  Object.assign(tooltipContent.style, defaultStyles)

  if (binding.value && binding.value.class) {
    tooltipContent.classList.add(binding.value.class)
  }

  return tooltipContent
}

function initializeTooltip(el, binding) {
  const tooltipContent = createTooltipElement(binding)

  // 添加 observer
  el._observer = new ResizeObserverAPI({
    async callback() {
      const bool = await isOverflowRAF(el)
      el._isOverflow = bool
    },
  })
  el._observer.observe(el)

  el._tooltipDirection = getTooltipDirection(binding)

  // 设置内容
  updateTooltipContent(el, tooltipContent, binding)
  document.body.appendChild(tooltipContent)
  el._tooltip = tooltipContent

  el._showTooltipTimer = null
  el._hideTooltipTimer = null

  // 保存事件监听器函数作为元素的属性
  el._showTooltipHandler = () => showTooltip(el)
  el._hideTooltipHandler = () => scheduleHideTooltip(el)
  el._cancelHideTooltipHandler = () => cancelHideTooltip(el)
  el._scrollHandler = () => handleScroll(el)

  el.addEventListener('mouseenter', el._showTooltipHandler)
  el.addEventListener('mouseleave', el._hideTooltipHandler)

  tooltipContent.addEventListener('mouseenter', el._cancelHideTooltipHandler)
  tooltipContent.addEventListener('mouseleave', el._hideTooltipHandler)
  window.addEventListener('scroll', el._scrollHandler, true)
}

function updateTooltip(el, binding) {
  if (el._tooltip) {
    el._tooltipDirection = getTooltipDirection(binding)
    updateTooltipContent(el, el._tooltip, binding)
  }
}

function updateTooltipContent(el, tooltipContent, binding) {
  let content = ''

  // 检查是否有使用slot="content"的子元素
  const slotElement = el.querySelector('[slot="content"]')
  if (slotElement) {
    content = slotElement.innerHTML
    tooltipContent.innerHTML = content
    // 隐藏
    slotElement.style.display = 'none'
  } else if (binding.value && binding.value.content) {
    content = binding.value.content
    tooltipContent.textContent = content
  } else {
    tooltipContent.textContent = ''
    return
  }
}

function destroyTooltip(el) {
  if (el._observer) {
    el._observer.disconnect()
    el._observer = null
    delete el._observer
  }
  if (el._tooltip) {
    document.body.removeChild(el._tooltip)
    el.removeEventListener('mouseenter', el._showTooltipHandler)
    el.removeEventListener('mouseleave', el._hideTooltipHandler)
    el._tooltip.removeEventListener('mouseenter', el._cancelHideTooltipHandler)
    el._tooltip.removeEventListener('mouseleave', el._hideTooltipHandler)
  }
  window.removeEventListener('scroll', el._scrollHandler, true)
  clearTimeout(el._showTooltipTimer)
  clearTimeout(el._hideTooltipTimer)
  delete el._tooltip
  delete el._showTooltipTimer
  delete el._hideTooltipTimer
  delete el._showTooltipHandler
  delete el._hideTooltipHandler
  delete el._cancelHideTooltipHandler
  delete el._scrollHandler
}

function showTooltip(el) {
  clearTimeout(el._hideTooltipTimer)
  el._showTooltipTimer = setTimeout(() => {
    const tooltip = el._tooltip
    if (tooltip && el._isOverflow) {
      tooltip.style.display = 'block'
      positionTooltip(el, tooltip)
      el._isTooltipVisible = true
    }
  }, 100)
}

function cancelHideTooltip(el) {
  clearTimeout(el._hideTooltipTimer)
}

function hideTooltip(el) {
  if (el._tooltip) {
    el._tooltip.style.display = 'none'
    el._isTooltipVisible = false
  }
}

function scheduleHideTooltip(el) {
  clearTimeout(el._showTooltipTimer)
  el._hideTooltipTimer = setTimeout(() => hideTooltip(el), 300)
}

function handleScroll(el) {
  if (el._isTooltipVisible) {
    hideTooltip(el)
  }
}

function getTooltipDirection(binding) {
  const validDirections = [
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]
  const direction = binding.value && binding.value.direction
  return validDirections.includes(direction) ? direction : 'top'
}

function positionTooltip(el, tooltip) {
  const rect = el.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const direction = el._tooltipDirection

  let left, top

  switch (direction) {
    case 'top':
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      top = rect.top - tooltipRect.height - 5
      break
    case 'top-left':
      left = rect.left
      top = rect.top - tooltipRect.height - 5
      break
    case 'top-right':
      left = rect.right - tooltipRect.width
      top = rect.top - tooltipRect.height - 5
      break
    case 'bottom':
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      top = rect.bottom + 5
      break
    case 'bottom-left':
      left = rect.left
      top = rect.bottom + 5
      break
    case 'bottom-right':
      left = rect.right - tooltipRect.width
      top = rect.bottom + 5
      break
    case 'left':
      left = rect.left - tooltipRect.width - 5
      top = rect.top + rect.height / 2 - tooltipRect.height / 2
      break
    case 'right':
      left = rect.right + 5
      top = rect.top + rect.height / 2 - tooltipRect.height / 2
      break
    default:
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      top = rect.top - tooltipRect.height - 5
  }

  // 确保 tooltip 不会超出视窗
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  if (left < 0) left = 0
  if (left + tooltipRect.width > viewportWidth)
    left = viewportWidth - tooltipRect.width
  if (top < 0) top = 0
  if (top + tooltipRect.height > viewportHeight)
    top = viewportHeight - tooltipRect.height

  // 应用计算出的位置
  tooltip.style.left = `${left + window.pageXOffset}px`
  tooltip.style.top = `${top + window.pageYOffset}px`
}
