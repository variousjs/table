import Nycticorax from 'nycticorax'
import type N from 'nycticorax'
import { State, Renders, Cell } from './type'

export default class {
  public store: N<State>
  public renders: Renders

  constructor(renders: Renders) {
    this.store = new Nycticorax<State>()
    this.store.createStore({})
    this.renders = renders
  }

  public setTableState(state: State) {
    this.store.emit(state)
  }

  public setCellState(key: string, data: Cell) {
    this.store.emit({ [key]: data })
  }
}
