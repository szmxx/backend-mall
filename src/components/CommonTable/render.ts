interface PropTypeItem {
  scope: Record<string, Record<string, unknown>>
  render: (arg: Record<string, Record<string, unknown>>) => unknown
}
export default function TableRender(props: PropTypeItem) {
  return props.render(props.scope)
}
TableRender.props = ['scope', 'render']
