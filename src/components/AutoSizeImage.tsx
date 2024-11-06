import { useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { Image } from 'expo-image'

interface AutoSizeImageProps {
  source: string | number
  onPress?: () => void
  onLoad?: () => void
  hasMore?: boolean
  isLast?: boolean
  token?: string
}

function AutoSizeImage(props: AutoSizeImageProps) {
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 1, height: 1 })

  const showOverlay = useMemo(() => props.hasMore && props.isLast, [])

  const headers = props.token
    ? {
        'X-Moonstore-UUID': props.token,
      }
    : undefined

  return (
    <Animated.View style={[styles.imageContainer]}>
      <Image
        // blurRadius={showOverlay ? 2 : 0}
        style={[
          styles.image,
          {
            aspectRatio: imageSize ? imageSize.width / imageSize.height : 1,
          },
        ]}
        source={typeof props.source === 'string' ? { uri: props.source, headers } : props.source}
        contentFit={'contain'}
        onLoad={(evt) => {
          if (evt.source && imageSize.height !== evt.source.height) {
            setImageSize({
              width: evt.source.width,
              height: evt.source.height,
            })
            props.onLoad?.()
          }
        }}
      />
    </Animated.View>
  )
}

export default AutoSizeImage

const styles = StyleSheet.create({
  image: {
    height: '100%',
    flex: 1,
    zIndex: 1,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexBasis: 2,
    justifyContent: 'space-between',
    gap: 4,
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    zIndex: 20,
  },
})
