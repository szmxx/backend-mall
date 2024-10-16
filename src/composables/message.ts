interface IMessage {
  type?: 'success' | 'error' | 'info' | 'warning'
  message: string
}
interface IConfirm {
  type?: 'success' | 'error' | 'info' | 'warning'
  content: string
  title?: string
}
export function useMessage(config: Record<string, unknown> = {}) {
  const proxy = getCurrentInstance()?.proxy
  return (option: IMessage) => {
    const { type = 'success', message } = option
    proxy?.$message({
      type: type,
      message: message,
      ...config,
    })
  }
}

export function useConfirm(config: Record<string, unknown> = {}) {
  const proxy = getCurrentInstance()?.proxy
  return (option: IConfirm) => {
    const { title = '', content, type = 'success' } = option
    return proxy?.$confirm?.(content, title, {
      type: type,
      ...config,
    })
  }
}
