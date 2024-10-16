// 回调函数参数接口
interface ResizeCallbackParams {
  width: number
  height: number
  element: HTMLElement
}

// 配置项接口
interface ResizeObserverOptions {
  callback?: (params: ResizeCallbackParams) => void
  useResizeObserver?: boolean
  useMutationObserver?: boolean
  pollInterval?: number
}

class ElementResizeObserver {
  private callback: (params: ResizeCallbackParams) => void
  private element: HTMLElement | null
  private currentWidth: number
  private currentHeight: number
  private resizeObserver: ResizeObserver | null
  private mutationObserver: MutationObserver | null
  private rafId: number | null
  private config: Required<Omit<ResizeObserverOptions, 'callback'>>

  constructor(options: ResizeObserverOptions = {}) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.callback = options.callback || (() => {})
    this.element = null
    this.currentWidth = 0
    this.currentHeight = 0
    this.resizeObserver = null
    this.mutationObserver = null
    this.rafId = null

    // 使用类型推断确保 config 的所有属性都有默认值
    this.config = {
      useResizeObserver: options.useResizeObserver ?? true,
      useMutationObserver: options.useMutationObserver ?? true,
      pollInterval: options.pollInterval ?? 200,
    }
  }

  public observe(element: HTMLElement): void {
    if (!element) {
      throw new Error('必须提供一个有效的 DOM 元素')
    }

    this.element = element
    this.currentWidth = element.offsetWidth
    this.currentHeight = element.offsetHeight

    if (this.config.useResizeObserver && window.ResizeObserver) {
      this.setupResizeObserver()
    } else if (this.config.useMutationObserver && window.MutationObserver) {
      this.setupMutationObserver()
    } else {
      this.setupPolling()
    }
  }

  public disconnect(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
      this.mutationObserver = null
      window.removeEventListener('resize', this.handleWindowResize)
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.element = null
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          this.checkDimensions(width, height)
        }
      },
    )

    if (this.element) {
      this.resizeObserver.observe(this.element)
    }
  }

  private setupMutationObserver(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.checkDimensionsWithRAF()
    })

    if (this.element) {
      this.mutationObserver.observe(this.element, {
        attributes: true,
        childList: true,
        subtree: true,
      })
    }

    window.addEventListener('resize', this.handleWindowResize)
  }

  private handleWindowResize = (): void => {
    this.checkDimensionsWithRAF()
  }

  private setupPolling(): void {
    const poll = (): void => {
      if (this.element) {
        this.checkDimensions(
          this.element.offsetWidth,
          this.element.offsetHeight,
        )
      }
      setTimeout(poll, this.config.pollInterval)
    }
    poll()
  }

  private checkDimensionsWithRAF(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
    }
    this.rafId = requestAnimationFrame(() => {
      if (this.element) {
        this.checkDimensions(
          this.element.offsetWidth,
          this.element.offsetHeight,
        )
      }
    })
  }

  private checkDimensions(width: number, height: number): void {
    if (width !== this.currentWidth || height !== this.currentHeight) {
      this.currentWidth = width
      this.currentHeight = height
      if (this.element) {
        this.callback({
          width,
          height,
          element: this.element,
        })
      }
    }
  }
}

export default ElementResizeObserver
// 导出类型和实现
export type { ResizeObserverOptions, ResizeCallbackParams }
