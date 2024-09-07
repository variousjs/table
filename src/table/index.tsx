import React, { useEffect } from 'react'
import { Table as AntdTable } from 'antd'
import getRenderer from './render'
import {
  State, TableProps, ColumnType,
} from './type'

export { default as Connector } from './connector'
export type { ColumnType, TableProps, RenderProps } from './type'

const Table = (props: TableProps) => {
  useEffect(() => {
    if (!props.connector || !props.dataSource || !props.rowKey || !props.columns) {
      return
    }

    props.connector.rowKey = props.rowKey

    const state = {} as State
    props.columns.forEach((item) => {
      const { dataIndex } = item
      props.dataSource!.forEach((data) => {
        if (data[dataIndex] === undefined) {
          return
        }
        const key = `${props.rowKey}_${data[props.rowKey]}_${dataIndex}`
        const store = props.connector!.store.getStore()
        if (!store[key]) {
          state[key] = {
            value: data[dataIndex],
            rowKey: props.rowKey,
            rowKeyValue: data[props.rowKey],
            dataIndex,
          }
        }
      })
    })

    props.connector.setTableState(state)
  }, [props.connector, props.dataSource, props.rowKey, props.columns])

  const columns = props.columns.map((item) => {
    return {
      render: getRenderer(props.rowKey, item, props.connector),
      ...item,
    }
  })

  return (
    <AntdTable
      {...props}
      columns={columns}
    />
  )
}

export default Table
