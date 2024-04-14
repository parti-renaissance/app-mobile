import React from 'react'
import VoxCard, { VoxCardContent } from '@/components/VoxCard/VoxCard'
import { Analytics } from '@/utils/Analytics'
import { ArrowUpRight } from '@tamagui/lucide-icons'
import * as WebBrowser from 'expo-web-browser'
import { Image, Text, useMedia, View } from 'tamagui'

interface CardToolProps {
  type?: string
  name?: string
  url: string
  imageUrl: string
}

const CardTool = ({ type, name, url, imageUrl }: CardToolProps) => {
  const media = useMedia()

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(url)

    // TODO: delete this line or not ?
    await Analytics.logUrlOpened(url)
  }

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
      {...(media.gtSm && { flexBasis: 1 })}
      flexGrow={1}
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
              <Text fontWeight="$4" fontSize="$14" textTransform="uppercase">
                {type}
              </Text>
            )}{' '}
            {name && (
              <Text fontWeight="$7" textTransform="uppercase">
                {name}
              </Text>
            )}
          </Text>
        </View>

        <View flexDirection="row" gap="$2">
          <Text fontWeight="$7" fontSize="$13" color="$gray8" justifyContent={'center'}>
            Ouvrir
          </Text>
          <ArrowUpRight size={16} />
        </View>
      </VoxCardContent>
    </VoxCard>
  )
}

export default CardTool
