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

  useEffect(() => {
    if (props.connector) {
      props.connector.rowKey = props.rowKey
    }
  }, [props.rowKey, props.connector])

  const columns = props.columns.map((item) => {
    return {
      render: getRenderer(props.rowKey, item, props.connector),
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
