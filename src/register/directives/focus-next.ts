import { DirectiveBinding } from 'vue'

const FOCUS_NEXT_CLASS = 'focus-next'
let mountOrder = 0

interface FocusNextElement extends HTMLElement {
  __focusNextHandler?: (e: KeyboardEvent) => void
  __focusOrder?: number
}

const findNextInput = (currentOrder: number): HTMLElement | null => {
  const elements = Array.from(
    document.querySelectorAll(`.${FOCUS_NEXT_CLASS}`),
  ) as FocusNextElement[]
  const sortedElements = elements.sort(
    (a, b) => (a.__focusOrder || 0) - (b.__focusOrder || 0),
  )

  const nextIndex = sortedElements.findIndex(
    (el) => (el.__focusOrder || 0) > currentOrder,
  )

  if (nextIndex !== -1) {
    const input = sortedElements[nextIndex].querySelector('input')
    return input
  }

  return null
}

const handleEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    const currentInput = e.target as HTMLInputElement
    const currentEl = currentInput.closest(
      `.${FOCUS_NEXT_CLASS}`,
    ) as FocusNextElement
    const currentOrder = currentEl.__focusOrder || 0
    const nextInput = findNextInput(currentOrder)
    if (nextInput) {
      nextInput.focus()
    }
  }
}

export default {
  mounted(el: FocusNextElement, binding: DirectiveBinding) {
    el.classList.add(FOCUS_NEXT_CLASS)
    if (binding.value !== undefined) {
      el.__focusOrder = Number(binding.value)
    } else {
      el.__focusOrder = mountOrder++
    }
    const input = el.querySelector('input')
    if (input) {
      el.__focusNextHandler = handleEnter
      input.addEventListener('keydown', el.__focusNextHandler)
    }
  },
  updated(el: FocusNextElement, binding: DirectiveBinding) {
    if (binding.value !== undefined && binding.value !== binding.oldValue) {
      el.__focusOrder = Number(binding.value)
    }
  },
  unmounted(el: FocusNextElement) {
    const input = el.querySelector('input')
    if (input && el.__focusNextHandler) {
      input.removeEventListener('keydown', el.__focusNextHandler)
    }
  },
}
