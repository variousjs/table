import Nycticorax from 'nycticorax'
import type N from 'nycticorax'
import { TableProps } from 'antd/es/table'
import { State, Renders, Cell, ObjectAny } from './type'

export default class<D extends object = ObjectAny> {
  public store: N<State>
  public renders: Renders
  public rowKey?: TableProps<D>['rowKey']

  constructor(renders: Renders) {
    this.store = new Nycticorax<State>()
    this.store.createStore({})
    this.renders = renders
  }

  public setTableState(state: State) {
    this.store.emit(state)
  }

  public setCellState(
    rowKeyValue: any,
    dataIndex: string,
    data: Pick<Cell, 'value' | 'disabled' | 'error'>,
  ) {
    const key = `${String(this.rowKey)}_${rowKeyValue}_${dataIndex}`
    const store = this.store.getStore()

    if (!store[key]) {
      return
    }

    const next: Cell = {
      ...store[key]!,
      value: data.value,
      disabled: data.disabled,
      error: data.error,
    }

    this.store.emit({ [key]: next })
  }

  public getCellState(rowKeyValue: any, dataIndex: string) {
    if (!this.rowKey) {
      return null
    }
    const store = this.store.getStore()
    const key = `${String(this.rowKey)}_${rowKeyValue}_${dataIndex}`
    return store[key]
  }

  public deleteRow(rowKeyValue: any) {
    const store = this.store.getStore()
    const next = {} as State

    Object.keys(store)
      .filter((key) => store[key]?.rowKeyValue === rowKeyValue)
      .forEach((key) => next[key] = undefined)

    this.store.emit(next, true)
  }

  public getTableState(dataSource: ObjectAny[]) {
    const store = this.store.getStore()
    return dataSource.map((item) => {
      const next = { ...item }
      Object.keys(item).forEach((dataIndex) => {
        const key = `${String(this.rowKey)}_${item[String(this.rowKey!)]}_${dataIndex}`
        if (store[key]) {
          next[dataIndex] = store[key]?.value
        }
      })
      return next
    })
  }
}
