import React from 'react'
import { RenderProps } from '../table'

export default (props: RenderProps) => {
  return (
    <>
      {props.value.split('').join('-')}
    </>
  )
}
