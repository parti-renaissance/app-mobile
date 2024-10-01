import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { VoxButton } from '@/components/Button'
import ModalOrPageBase from '@/components/ModalOrPageBase/ModalOrPageBase'
import { Asset } from 'expo-asset'
import { ImageResult, manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { Image, styled, Text, ThemeableStack, View, XStack, YStack } from 'tamagui'

const ImgCroperFrame = styled(ThemeableStack, {
  flex: 1,
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'black',
})

const ImgCroperOverlayFrame = styled(ThemeableStack, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
})

const IngCropperDarkFrame = styled(ThemeableStack, {
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
})
const { width, height } = Dimensions.get('screen')

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}
const CROP_SIZE = 300

const getMinImgWidthForCrop = (img: Asset) => {
  const imageMetaData = img
  const sizes = { width: imageMetaData.width!, height: imageMetaData.height! }
  const smallerSideLabel = sizes.width > sizes.height ? 'height' : 'width'
  const smallerSide = sizes[smallerSideLabel]
  if (smallerSide < CROP_SIZE) {
    const calcNewWidth = smallerSideLabel === 'width' ? CROP_SIZE : (CROP_SIZE * sizes.width) / sizes.height
    const calcNewHeight = smallerSideLabel === 'height' ? CROP_SIZE : (CROP_SIZE * sizes.height) / sizes.width
    return { width: calcNewWidth, height: calcNewHeight }
  }
  return false
}

type Size = {
  width: number
  height: number
}

const getMaxImgWidth = (img: Size) => {
  if (img.width! > width) {
    return { width: width, height: (width * img.height!) / img.width! }
  }
  return img
}

export default function ImageCroper() {
  const scale = useSharedValue(1)
  const startScale = useSharedValue(0)
  const translationX = useSharedValue(0)
  const translationY = useSharedValue(0)
  const prevTranslationX = useSharedValue(0)
  const prevTranslationY = useSharedValue(0)
  const [ready, setReady] = useState(false)
  const [image, setImage] = useState<ImageResult | null>(null)
  const originalImage = useRef<ImageResult | null>(null)
  const [originalSizes, setOriginalSizes] = useState({ width: 0, height: 0 })
  const defaultImagePosition = {
    x: (width - originalSizes.width) / 2,
    y: (height - originalSizes.height) / 2,
  }

  useEffect(() => {
    ;(async () => {
      const image = Asset.fromModule(require('@/assets/images/portrait-test.jpg'))
      await image.downloadAsync()
      const maybeNewSize = getMinImgWidthForCrop(image)
      if (maybeNewSize) {
        const newImg = await manipulateAsync(image.uri, [
          {
            resize: {
              width: maybeNewSize.width,
              height: maybeNewSize.height,
            },
          },
        ])
        originalImage.current = newImg
      } else {
        originalImage.current = image as ImageResult
      }
      const orignalSize = { width: originalImage.current.width!, height: originalImage.current.height! }
      setOriginalSizes(orignalSize)
      const showSize = getMaxImgWidth(orignalSize)
      const displaySizeRatio = showSize.width / orignalSize.width
      scale.value = displaySizeRatio
      setReady(true)
    })()
  }, [])

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value
    })
    .onUpdate((event) => {
      const w = originalSizes.width
      const h = originalSizes.height
      scale.value = clamp(startScale.value * event.scale, Math.max(CROP_SIZE / w, CROP_SIZE / h), Math.min(w / 100, h / 100))
    })
    .runOnJS(true)

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translationX.value }, { translateY: translationY.value }],
  }))

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value
      prevTranslationY.value = translationY.value
    })
    .onUpdate((event) => {
      const w = originalSizes.width
      const h = originalSizes.height
      const maxTranslateX = (w - CROP_SIZE / scale.value) / 2
      const maxTranslateY = (h - CROP_SIZE / scale.value) / 2
      translationX.value = clamp(prevTranslationX.value + event.translationX / scale.value, -maxTranslateX, maxTranslateX)
      translationY.value = clamp(prevTranslationY.value + event.translationY / scale.value, -maxTranslateY, maxTranslateY)
    })
    .runOnJS(true)

  const composed = Gesture.Simultaneous(pan, pinch)

  const calcCropSize = () => {
    const w = originalSizes.width
    const h = originalSizes.height
    const xOriginCropFrame = (w - CROP_SIZE / scale.value) / 2
    const yOriginCropFrame = (h - CROP_SIZE / scale.value) / 2
    const x = xOriginCropFrame - translationX.value
    const y = yOriginCropFrame - translationY.value

    return { x: x > 0 ? x : 0, y: y > 0 ? y : 0, width: CROP_SIZE / scale.value, height: CROP_SIZE / scale.value }
  }

  const cropImg = () => {
    const cropSize = calcCropSize()
    const crop = {
      originX: cropSize.x,
      originY: cropSize.y,
      width: cropSize.width,
      height: cropSize.height,
    }
    manipulateAsync(
      originalImage.current?.uri || '',
      [
        { crop },
        {
          resize: {
            width: CROP_SIZE,
            height: CROP_SIZE,
          },
        },
      ],
      { compress: 1, format: SaveFormat.PNG },
    ).then((result) => {
      setImage(result)
    })
  }

  return ready ? (
    <ModalOrPageBase open header={<View />} scrollable={false}>
      <GestureDetector gesture={composed}>
        <ImgCroperFrame>
          <Animated.Image
            style={[boxAnimatedStyles, { position: 'absolute', top: defaultImagePosition.y, right: defaultImagePosition.x }]}
            source={require('@/assets/images/portrait-test.jpg')}
          />

          <ImgCroperOverlayFrame>
            <YStack flex={1}>
              <IngCropperDarkFrame flex={1} />
              <XStack>
                <IngCropperDarkFrame flex={1} />
                <View width={CROP_SIZE} height={CROP_SIZE} borderWidth={3} borderColor={'black'} />
                <IngCropperDarkFrame flex={1} />
              </XStack>
              <IngCropperDarkFrame flex={1}>
                <YStack gap={16} p={16} justifyContent="center" alignItems="center">
                  <VoxButton onPress={cropImg}>Crop</VoxButton>
                  <View height={50} width={50} bg="red">
                    {ready && image ? (
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    ) : null}
                    <Text>{image?.uri}</Text>
                  </View>
                </YStack>
              </IngCropperDarkFrame>
            </YStack>
          </ImgCroperOverlayFrame>
        </ImgCroperFrame>
      </GestureDetector>
    </ModalOrPageBase>
  ) : null
}
