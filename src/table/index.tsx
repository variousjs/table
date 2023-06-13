import React, { useEffect } from 'react'
import { Table } from 'antd'
import getRenderer from './render'
import {
  State, TableProps, ColumnType,
} from './type'

export { default as Connector } from './connector'
export type { ColumnType, ColumnsType, TableProps, RenderProps } from './type'

export default (props: TableProps) => {
  useEffect(() => {
    if (!props.connector || !props.dataSource) {
      return
    }

    const state = {} as State
    props.columns.forEach((item: ColumnType) => {
      const { dataIndex } = item
      props.dataSource!.forEach((data) => {
        const rowKeyValue = data[props.rowKey]
        state[`${props.rowKey}_${rowKeyValue}_${dataIndex}`] = {
          dataIndex,
          value: data[dataIndex],
        }
      })
    })

    props.connector.setTableState(state)
  }, [props.connector, props.dataSource, props.rowKey, props.columns])

  const columns = props.columns.map((item) => {
    return {
      shouldCellUpdate: () => !props.connector,
      render: getRenderer(item.renderType, props.connector),
      ...item,
    }
  })

  return (
    <Table
      {...props}
      columns={columns}
    />
  )
}
