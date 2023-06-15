import { Input } from 'antd'
import { RenderProps } from '../table'

export default (props: RenderProps) => {
  return (
    <Input
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      style={{ width: 100 }}
    />
  )
}
