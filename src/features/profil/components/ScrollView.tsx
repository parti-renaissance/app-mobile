import { useMemo } from 'react'
import { usePageLayoutScroll } from '@/components/layouts/PageLayout/usePageLayoutScroll'
import { ScrollViewProps, styled, ScrollView as TScrollView, useMedia } from 'tamagui'

const ScrollViewFrame = styled(TScrollView, {
  width: '100%',
  flex: 1,
})

function ScrollView(props: ScrollViewProps) {
  const { isWebPageLayoutScrollActive } = usePageLayoutScroll()
  const media = useMedia()

  const contentContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$medium' : undefined,
      pl: media.gtSm ? '$medium' : undefined,
      pr: media.gtSm ? '$medium' : undefined,
      pb: '$xxxlarge',
    }),
    [media],
  )

  return <ScrollViewFrame scrollEnabled={!isWebPageLayoutScrollActive} contentContainerStyle={contentContainerStyle} {...props} />
}

export default ScrollView
