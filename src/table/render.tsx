import { ColumnType, ObjectAny } from './type'
import type Connector from './connector'

interface Props {
  connector: Connector,
  renderType: string,
  record: ObjectAny,
  index: number,
}

const R = (props: Props) => {
  return (
    <div>

    </div>
  )
}

export default (renderType?: string, connector?: Connector) => {
  const render: ColumnType['render'] = (
    value,
    record,
    index,
  ) => {
    if (!connector || !renderType) {
      return value
    }

    const Renderer = connector.renders[renderType]

    if (!Renderer) {
      return value
    }

    return (
      <Renderer
        value={value}
        record={record}
        index={index}
      />
    )
  }

  return render
}
