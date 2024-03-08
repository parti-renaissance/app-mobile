import React from 'react'
import { Progress } from 'tamagui'

type Props = Readonly<{
  progress: number
  color: string
}>

const ProgressBar = (props: Props) => {
  return (
    <Progress value={props.progress * 100}>
      <Progress.Indicator bg={props.color} animation="bouncy" />
    </Progress>
  )
}

export default ProgressBar
