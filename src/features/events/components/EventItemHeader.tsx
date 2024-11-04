import React, { Children, isValidElement, ReactElement } from 'react'
import { XStack } from 'tamagui'

type EventItemHeader = {
  children: [ReactElement] | [ReactElement, ReactElement] | [ReactElement, ReactElement, ReactElement]
}

export const EventItemHeader = ({ children }: EventItemHeader) => {
  //@ts-expect-error child type on string
  const elements = Children.map(children, (child) => isValidElement(child) && child?.type(child.props)).filter(Boolean)

  if (elements && elements.length < 3) {
    return (
      <XStack justifyContent="space-between" gap={8}>
        {elements}
      </XStack>
    )
  }

  const [first, second, last] = elements

  return (
    <XStack justifyContent="space-between" alignItems="flex-start" gap={8}>
      <XStack flexWrap="wrap" flexShrink={1} gap={8}>
        {[first, second]}
      </XStack>
      <XStack>{[last]}</XStack>
    </XStack>
  )
}
