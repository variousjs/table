import { ColumnType, RenderFromStateProps } from './type'
import type Connector from './connector'

const RenderFromState = (props: RenderFromStateProps) => {
  const key = `${props.rowKey}_${props.record[props.rowKey]}_${props.column.dataIndex}`
  const store = props.connector.store.useStore(key)
  const current = store[key]

  if (!current) {
    return null
  }

  const Renderer = props.connector.renders[props.column.renderType!]

  if (!Renderer) {
    return current.value
  }

  const onChange = (value: any) => {
    props.connector.setCellState(
      props.record[props.rowKey],
      props.column.dataIndex,
      { value },
    )
  }

  return (
    <Renderer
      {...current}
      record={props.record}
      index={props.index}
      dataIndex={props.column.dataIndex}
      onChange={onChange}
      rowKey={props.rowKey}
      column={props.column}
    />
  )
}

export default (rowKey: string, column: ColumnType<any>, connector?: Connector) => {
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
        record={record}
        index={index}
        column={column}
      />
    )
  }

  return render
}
