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
  ratio?: number
  width?: number
  height?: number
}

function AutoSizeImage({ width, height, ...props }: AutoSizeImageProps) {
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(width && height ? { width, height } : null)

  return (
    <Animated.View style={[styles.imageContainer]}>
      <Image
        style={[
          styles.image,
          {
            aspectRatio: imageSize ? imageSize.width / imageSize.height : (props.ratio ?? 16 / 9),
          },
        ]}
        source={typeof props.source === 'string' ? { uri: props.source } : props.source}
        contentFit={'contain'}
        onLoad={(evt) => {
          if (evt.source && !imageSize) {
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
