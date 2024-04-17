import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { useTools } from '@/hooks/useTools'
import CardTool from '@/screens/tools/components/CardTool'
import { getToken, useMedia, View } from 'tamagui'

const ResourcesList = () => {
  const media = useMedia()
  const { data, refetch, isRefetching } = useTools()

  const tools = data.pages
    .map((_) => _.items)
    .flat()
    .map((resource) => ({
      name: resource.label,
      url: resource.url,
      imageUrl: resource.image_url,
    }))

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: getToken('$4', 'space'),
        paddingTop: getToken(media.gtSm ? '$7' : '$4', 'space'),
        paddingHorizontal: getToken(media.gtSm ? '$7' : '$4', 'space'),
        paddingBottom: getToken('$6', 'space'),
      }}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
    >
      {tools?.map((item) => (
        <View key={item.url + item.name} width={media.gtSm ? 'calc(50% - 16px)' : '100%'}>
          <CardTool {...item} />
        </View>
      ))}
    </ScrollView>
  )
}

export default ResourcesList
