import type {
  ColumnType as AntdColumnType,
  TableProps as AntdTableProps,
} from 'antd/es/table'
import type Connector from './connector'
import { ComponentType } from 'react'

export type ObjectAny = Record<string, any>

export interface Cell {
  dataIndex: string,
  value: any,
}

export interface State {
  [rowKey_rowKeyValue_dataIndex: string]: Cell,
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

export interface RenderProps {
  value: any,
  onChange?: (value: any) => void,
  record: ObjectAny,
  index: number,
}

export type Renders = Record<string, ComponentType<RenderProps>>
