import React from 'react'
import { FlatList } from 'react-native'
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

  const numCols = media.gtSm ? 2 : 1

  return (
    <FlatList
      key={numCols}
      numColumns={numCols}
      contentContainerStyle={{
        gap: getToken('$4', 'space'),
        paddingTop: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingHorizontal: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
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
