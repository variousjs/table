import React, { useEffect } from 'react'
import { Table as AntdTable } from 'antd'
import getRenderer from './render'
import {
  State, TableProps, ObjectAny, ColumnType,
} from './type'

export { default as Connector } from './connector'
export type { ColumnType, TableProps, RenderProps } from './type'

function Table<D extends object = ObjectAny>(props: TableProps<D>) {
  useEffect(() => {
    if (!props.connector || !props.dataSource || !props.rowKey || !props.columns) {
      return
    }

    props.connector.rowKey = props.rowKey as string

    const state = {} as State
    props.columns.forEach((item: ColumnType<D>) => {
      const dataIndex = item.dataIndex as keyof D
      const rowKey = props.rowKey as keyof D
      props.dataSource!.forEach((data) => {
        if (!dataIndex || data[dataIndex] === undefined) {
          return
        }
        const key = `${String(rowKey)}_${data[rowKey]}_${String(dataIndex)}`
        const store = props.connector!.store.getStore()
        if (!store[key]) {
          state[key] = {
            value: data[dataIndex],
            rowKey: props.rowKey as string,
            rowKeyValue: data[rowKey],
            dataIndex: dataIndex as string,
          }
        }
      })
    })

    props.connector.setTableState(state)
  }, [props.connector, props.dataSource, props.rowKey, props.columns])

  const columns = props.columns?.map((item) => {
    return {
      render: getRenderer(props.rowKey as string, item, props.connector),
      ...item,
    }
  })

  return (
    <AntdTable
      {...props}
      columns={columns as ColumnType<D>[]}
    />
  )
}

export default Table
