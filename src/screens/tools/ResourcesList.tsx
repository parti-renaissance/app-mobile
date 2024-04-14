import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { useTools } from '@/hooks/useTools'
import CardTool from '@/screens/tools/components/CardTool'
import { getToken, useMedia, View } from 'tamagui'

const ResourcesList = () => {
  const media = useMedia()
  const { data, refetch, isRefetching } = useTools()

  const tools = data?.pages.map((page) => page.items).flat()
  const toolsData = tools?.map((resource) => ({
    type: 'GUIDE',
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
        paddingTop: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingHorizontal: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingBottom: getToken('$6', 'space'),
      }}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
    >
      {toolsData?.map((item) => (
        <View key={item.url} width={media.gtSm ? 'calc(50% - 16px)' : '100%'}>
          <CardTool {...item} />
        </View>
      ))}
    </ScrollView>
  )
}

export default ResourcesList
