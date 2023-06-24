import type {
  ColumnType as AntdColumnType,
  TableProps as AntdTableProps,
} from 'antd/es/table'
import type Connector from './connector'
import { ComponentType } from 'react'

export type ObjectAny = Record<string, any>

export interface Cell {
  value: any,
  error?: string,
  disabled?: boolean,
  rowKey: string,
  rowKeyValue: any,
  dataIndex: string,
}

export interface State {
  [rowKey_rowKeyValue_dataIndex: string]: Cell | undefined,
}

export interface ColumnType extends AntdColumnType<ObjectAny> {
  dataIndex: string,
  renderType?: string,
  hidden?: boolean,
}
export type ColumnsType = ColumnType[]

export interface TableProps extends AntdTableProps<ObjectAny> {
  rowKey: string,
  connector?: Connector,
  columns: ColumnsType,
}

export interface RenderProps extends Cell {
  onChange: (value: any) => void,
  record: ObjectAny,
  index: number,
  dataIndex: string,
  uniqueKey: string,
  rowKey: string,
}

export type Renders = Record<string, ComponentType<RenderProps>>

export interface RenderFromStateProps {
  rowKey: string,
  connector: Connector,
  renderType: string,
  record: ObjectAny,
  index: number,
  dataIndex: string,
}
