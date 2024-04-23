import React from 'react'
import VoxCard, { VoxCardContent } from '@/components/VoxCard/VoxCard'
import { Analytics } from '@/utils/Analytics'
import { ArrowUpRight } from '@tamagui/lucide-icons'
import * as WebBrowser from 'expo-web-browser'
import { Image, Text, View } from 'tamagui'

interface CardToolProps {
  name?: string
  url: string
  imageUrl: string
}

const CardTool = ({ name, url, imageUrl }: CardToolProps) => {
  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(url)
    await Analytics.logUrlOpened(url)
  }

  const [maybeType, ...maybeName] = name?.trim().split(':')

  const type = maybeName.length > 0 ? maybeType.trim() : undefined
  const title = maybeName.length > 0 ? maybeName.join(':').trim() : name

  return (
    <VoxCard
      borderRadius="$radius.8"
      onPress={() => handlePress()}
      borderWidth={1}
      borderColor="$gray3"
      height="$13"
      flexDirection="column"
      justifyContent="flex-end"
      cursor="pointer"
    >
      <VoxCardContent>
        <View flexDirection="row" gap={2} justifyContent="flex-end">
          {imageUrl ? (
            <Image
              source={{
                uri: imageUrl,
              }}
              width={'$5'}
              height={'$5'}
            />
          ) : (
            <View width={'$5'} height={'$5'} backgroundColor="none" />
          )}
        </View>

        <View flexDirection="row" gap={2} width="100%" flexShrink={1}>
          <Text>
            {type && (
              <Text fontWeight="$2" textTransform="uppercase">
                {type}
              </Text>
            )}{' '}
            {title && (
              <Text fontWeight="$4" textTransform="uppercase">
                {title}
              </Text>
            )}
          </Text>
        </View>

        <View flexDirection="row" gap="$2">
          <Text fontWeight="$7" fontSize="$1" color="$gray8" justifyContent={'center'}>
            Ouvrir
          </Text>
          <ArrowUpRight size={16} />
        </View>
      </VoxCardContent>
    </VoxCard>
  )
}

export default CardTool
