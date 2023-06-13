import Nycticorax from 'nycticorax'
import type N from 'nycticorax'
import { State, Renders } from './type'

export default class {
  private store: N<State>
  public renders: Renders

  constructor(renders: Renders) {
    this.store = new Nycticorax<State>()
    this.store.createStore({})
    this.renders = renders
  }

  public setTableState(state: State) {
    this.store.emit(state)
  }
}
