import { useContext, useEffect } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { isWeb, useMedia } from 'tamagui'
import { ScrollContext } from './scrollContext'

type Props = {
  onEndReached?: () => void
  onEndReachedThreshold?: number
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  scrollEventThrottle?: number
  ref?: React.RefObject<HTMLDivElement>
}

export const usePageLayoutScroll = (props?: Props) => {
  const { scrollActive, layoutRef } = useContext(ScrollContext)

  useEffect(() => {
    if (!isWeb) return
    if (!scrollActive) return
    if (layoutRef === null) return
    if (layoutRef.current === null) return
    if (props?.ref) {
      props.ref = layoutRef
    }
    const scrollView = layoutRef.current

    const handleScrollReachedEnd = () => {
      if (!scrollActive || !props?.onEndReached) return
      const { scrollTop, scrollHeight, clientHeight } = scrollView
      const threshold = props.onEndReachedThreshold ?? 0.5
      const thresholdPixels = scrollHeight * threshold
      if (scrollTop + clientHeight >= thresholdPixels) {
        props.onEndReached()
      }
    }

    let timeoutId: ReturnType<typeof setTimeout>
    const handleScroll = (e: Event) => {
      const event = e as WheelEvent
      if (!scrollActive || !props?.onScroll) return
      const nativeEvent = {
        nativeEvent: {
          contentOffset: { y: event.pageY },
          contentSize: { height: scrollView.scrollHeight, width: scrollView.scrollWidth },
          layoutMeasurement: { height: scrollView.clientHeight, width: scrollView.clientWidth },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>

      if (props?.scrollEventThrottle) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          props.onScroll?.(nativeEvent)
        }, props.scrollEventThrottle)
      } else {
        props.onScroll?.(nativeEvent)
      }
    }

    scrollView.addEventListener('scroll', handleScroll)
    scrollView.addEventListener('scroll', handleScrollReachedEnd)

    return () => {
      scrollView.removeEventListener('scroll', handleScroll)
      scrollView.removeEventListener('scroll', handleScrollReachedEnd)
      clearTimeout(timeoutId)
    }
  }, [scrollActive])

  return { isWebPageLayoutScrollActive: scrollActive, layoutRef }
}
