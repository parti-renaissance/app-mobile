import React from 'react'
import { FlatList } from 'react-native'
import { useTools } from '@/hooks/useTools'
import CardTool from '@/screens/tools/components/CardTool'
import { getToken, useMedia } from 'tamagui'

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
    <FlatList
      contentContainerStyle={{
        gap: getToken('$4', 'space'),
        paddingTop: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingLeft: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingRight: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingBottom: getToken('$6', 'space'),
      }}
      data={toolsData}
      renderItem={({ item }) => <CardTool {...item} />}
      keyExtractor={(item) => item.url}
      refreshing={isRefetching}
      onRefresh={() => refetch()}
      onEndReachedThreshold={0.5}
    />
  )
}

export default ResourcesList
