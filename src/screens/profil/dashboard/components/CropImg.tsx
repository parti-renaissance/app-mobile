import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { VoxButton } from '@/components/Button'
import ModalOrPageBase from '@/components/ModalOrPageBase/ModalOrPageBase'
import VoxCard from '@/components/VoxCard/VoxCard'
import { ImageResult, manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { isWeb, styled, ThemeableStack, useMedia, XStack, YStack } from 'tamagui'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  flex: {
    flex: 1,
  },
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

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}
const CROP_SIZE = 300

const getMinImgWidthForCrop = (img: ImageResult) => {
  const imageMetaData = img
  const sizes = { width: imageMetaData.width, height: imageMetaData.height }
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

const getMaxImgWidth = (img: Size, { width }: Size) => {
  let newSize = img
  if (img.width > width) {
    newSize = { width: width, height: (width * img.height!) / img.width! }
  }
  if (newSize.height < CROP_SIZE) {
    newSize = { width: (CROP_SIZE * newSize.width) / newSize.height, height: CROP_SIZE }
  }
  return newSize
}

function ImageCroper(props: { windowSize: { width: number; height: number }; image: ImageResult; onChange: (image: string) => void }) {
  const scale = useSharedValue(1)
  const startScale = useSharedValue(0)
  const translationX = useSharedValue(0)
  const translationY = useSharedValue(0)
  const prevTranslationX = useSharedValue(0)
  const prevTranslationY = useSharedValue(0)
  const [ready, setReady] = useState(false)
  const originalImage = useRef<ImageResult | null>(null)
  const [originalSizes, setOriginalSizes] = useState({ width: 0, height: 0 })
  const defaultImagePosition = {
    x: (props.windowSize.width - originalSizes.width) / 2,
    y: (props.windowSize.height - originalSizes.height) / 2,
  }

  const frameRef = useRef<View>(null)
  const media = useMedia()

  useEffect(() => {
    if (frameRef.current && isWeb && ready) {
      const el = frameRef.current as unknown as HTMLElement
      el.onwheel = (e) => {
        e.preventDefault()
        const w = originalSizes.width
        const h = originalSizes.height
        const maxScale = Math.min(w / 100, h / 100)
        scale.value = clamp(scale.value - e.deltaY / props.windowSize.height, Math.max(CROP_SIZE / w, CROP_SIZE / h), maxScale)
        const maxTranslateX = (w - CROP_SIZE / scale.value) / 2
        const maxTranslateY = (h - CROP_SIZE / scale.value) / 2
        translationX.value = clamp(translationX.value, -maxTranslateX, maxTranslateX)
        translationY.value = clamp(translationY.value, -maxTranslateY, maxTranslateY)
      }
    }
  }, [ready])

  useEffect(() => {
    ;(async () => {
      const image = props.image
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
      const orignalSize = { width: originalImage.current.width, height: originalImage.current.height }
      setOriginalSizes(orignalSize)
      const showSize = getMaxImgWidth(orignalSize, props.windowSize)
      const displaySizeRatio = showSize.width / orignalSize.width
      scale.value = displaySizeRatio
      setReady(true)
    })()
  }, [props.image])

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
            width: 360,
            height: 360,
          },
        },
      ],
      { compress: 0.5, format: SaveFormat.JPEG, base64: true },
    ).then((result) => {
      props.onChange('data:image/jpeg;base64,' + result.base64!)
    })
  }

  const dimentionStyle = media.gtMd ? props.windowSize : {}

  return ready && originalSizes.width > 0 ? (
    <GestureDetector gesture={composed}>
      <View ref={frameRef} style={[dimentionStyle, styles.container, media.gtMd ? {} : styles.flex]}>
        <Animated.Image
          style={[
            boxAnimatedStyles,
            { position: 'absolute', top: defaultImagePosition.y, right: defaultImagePosition.x, width: originalSizes.width, height: originalSizes.height },
          ]}
          source={{ uri: props.image.uri }}
        />

        <ImgCroperOverlayFrame style={[dimentionStyle]}>
          <YStack flex={1}>
            <IngCropperDarkFrame flex={1} />
            <XStack>
              <IngCropperDarkFrame flex={1} />
              <YStack width={CROP_SIZE} height={CROP_SIZE} borderWidth={3} borderColor={'white'} />
              <IngCropperDarkFrame flex={1} />
            </XStack>
            <IngCropperDarkFrame flex={1}>
              <YStack gap={16} p={16} justifyContent="center" alignItems="center" position="absolute" bottom={0} right={0}>
                <VoxButton theme="yellow" size="lg" onPress={cropImg}>
                  Terminé
                </VoxButton>
              </YStack>
            </IngCropperDarkFrame>
          </YStack>
        </ImgCroperOverlayFrame>
      </View>
    </GestureDetector>
  ) : null
}
const windowSize = Dimensions.get(isWeb ? 'window' : 'screen')

export default function ModalImageCroper(props: { image: ImageResult | null; onClose: (img: string) => void; open: boolean }) {
  const media = useMedia()
  return (
    <ModalOrPageBase header={<View />} scrollable={false} open={props.open}>
      {props.image ? (
        media.md ? (
          <ImageCroper image={props.image} onChange={props.onClose} windowSize={windowSize} />
        ) : (
          <VoxCard width={600} height={600} overflow="hidden">
            <ImageCroper
              image={props.image}
              onChange={props.onClose}
              windowSize={{
                width: 600,
                height: 600,
              }}
            />
          </VoxCard>
        )
      ) : null}
    </ModalOrPageBase>
  )
}
