import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import * as metatags from '@/config/metatags'
import { items } from '@/screens/formations/bread-crumbs-items'
import FormationScreen, { MyRef } from '@/screens/formations/page'
import { ImageBackground } from 'expo-image'
import Head from 'expo-router/head'
import { useMedia, View, YStack } from 'tamagui'

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})

const ToolsScreen: React.FC = () => {
  const [selected, setSelected] = React.useState<'local' | 'national'>('national')
  const media = useMedia()
  const topVisual = media.sm ? 270 : 317
  const scrollRef = React.useRef<MyRef | null>(null)

  return (
    <YStack flex={1} bg="$textSurface">
      <Head>
        <title>{metatags.createTitle('Ressources')}</title>
      </Head>
      <YStack height={topVisual} overflow="hidden">
        <ImageBackground source={require('@/assets/images/bg-formation.png')} contentFit="cover" style={[styles.image, { height: topVisual }]} />
      </YStack>
      <PageLayout marginTop={-topVisual} bg="transparent">
        <PageLayout.SideBarLeft
          showOn="gtSm"
          $md={{
            width: 200,
            pl: '$5',
          }}
        >
          <View marginTop={topVisual}>
            <BreadCrumb
              items={items}
              vertical
              onChange={(x) => {
                scrollRef.current?.scrollToSection(x)
              }}
              value={selected}
            />
          </View>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          {/* <BreadCrumb items={items} /> */}
          <FormationScreen filter={selected} ref={scrollRef} onChangeFilter={(x) => setSelected(x)} />
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <View marginTop={150}></View>
        </PageLayout.SideBarRight>
      </PageLayout>
    </YStack>
  )
}

export default ToolsScreen
