import React from 'react'
import VoxCard, { VoxCardContent } from '@/components/VoxCard/VoxCard'
import { Analytics } from '@/utils/Analytics'
import { ArrowUpRight } from '@tamagui/lucide-icons'
import * as WebBrowser from 'expo-web-browser'
import { Image, Text, View } from 'tamagui'

interface CardToolProps {
  type?: string
  name?: string
  url: string
  imageUrl: string
}

const CardTool = ({ type, name, url, imageUrl }: CardToolProps) => {
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
    >
      <VoxCardContent>
        <View flexDirection="row" gap={2} justifyContent="flex-end">
          <Image
            source={{
              uri: imageUrl,
            }}
            width={'$5'}
            height={'$5'}
          />
        </View>

        <View flexDirection="row" gap={2} width="100%" flexShrink={1}>
          {type && (
            <Text fontWeight="$4" fontSize="$14" textTransform="uppercase">
              {type}
            </Text>
          )}

          {name && (
            <Text fontWeight="$7" textTransform="uppercase">
              {name}
            </Text>
          )}
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
