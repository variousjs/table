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

export interface ColumnType<D extends object = ObjectAny> extends AntdColumnType<D> {
  renderType?: string,
  componentProps?: ObjectAny,
}

export interface TableProps<D extends object = ObjectAny> extends AntdTableProps<D> {
  connector?: Connector,
}

export interface RenderProps<D extends object = ObjectAny> extends Cell {
  onChange: (value: Cell['value']) => void,
  record: D,
  index: number,
  column: ColumnType<D>,
}

export type Render<D extends object = ObjectAny> = ComponentType<RenderProps<D>>

// Internal

export type Renders = Record<string, Render>

export interface RenderFromStateProps {
  rowKey: string,
  connector: Connector,
  record: ObjectAny,
  index: number,
  column: ColumnType<any>,
}
