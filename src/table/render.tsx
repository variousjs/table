import { ColumnType, RenderFromStateProps } from './type'
import type Connector from './connector'

const RenderFromState = (props: RenderFromStateProps) => {
  const key = `${props.rowKey}_${props.record[props.rowKey]}_${props.dataIndex}`
  const store = props.connector.store.useStore(key)
  const current = store[key]

  if (!current) {
    return null
  }

  const Renderer = props.connector.renders[props.renderType]

  if (!Renderer) {
    return current.value
  }

  const onChange = (value: any) => {
    props.connector.setCellState(
      props.record[props.rowKey],
      props.dataIndex,
      { value },
    )
  }

  return (
    <Renderer
      {...current}
      record={props.record}
      index={props.index}
      dataIndex={props.dataIndex}
      onChange={onChange}
      rowKey={props.rowKey}
    />
  )
}

export default (rowKey: string, column: ColumnType, connector?: Connector) => {
  const render: ColumnType['render'] = (
    value,
    record,
    index,
  ) => {
    if (!connector || !column.renderType) {
      return value
    }

    return (
      <RenderFromState
        rowKey={rowKey}
        connector={connector}
        renderType={column.renderType}
        record={record}
        index={index}
        dataIndex={column.dataIndex}
      />
    )
  }

  return render
}
