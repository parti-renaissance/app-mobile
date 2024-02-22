import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Markdown from '@ronradtke/react-native-markdown-display'
import { Colors, Spacing, Typography } from '@/styles'
import i18n from '@/utils/i18n'
import { PrimaryButton } from '@/screens/shared/Buttons'
import { CloseButton } from '@/screens/shared/NavigationHeaderButton'
import { StatefulView } from '@/screens/shared/StatefulView'
import { DoorToDoorBriefViewModel } from '@/screens/doorToDoor/tunnel/brief/DoorToDoorBriefViewModel'
import { useDoorToDoorBriefScreen } from '@/screens/doorToDoor/tunnel/brief/useDoorToDoorBriefScreen.hook'

import { useNavigation, router, useLocalSearchParams } from 'expo-router'
import {
  useDoorToDoorStore,
  useDtdTunnelStore,
} from '@/data/store/door-to-door'

const DoorToDoorBriefScreen = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams<{
    campaignId: string
    door: string
    block: string
    floor: string
    canCloseFloor: string
  }>()
  const { address } = useDoorToDoorStore()
  const { tunnel } = useDtdTunnelStore()
  const { statefulState, onAction } = useDoorToDoorBriefScreen(
    address.building.campaignStatistics.campaignId,
    {
      id: address.building.id,
      block: tunnel.block,
      floor: tunnel.floor,
      door: tunnel.door,
      type: address.building.type,
    },
    tunnel.canCloseFloor,
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
    })
  }, [navigation])

  const TutorialContent = (viewModel: DoorToDoorBriefViewModel) => {
    return (
      <>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>
            {i18n.t('doorToDoor.tunnel.door.tutorial.title')}
          </Text>
          <Markdown style={Typography.markdownStyle} mergeStyle={false}>
            {viewModel.markdown}
          </Markdown>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('doorToDoor.tunnel.door.tutorial.action')}
            onPress={onAction}
          />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatefulView contentComponent={TutorialContent} state={statefulState} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: Spacing.margin,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.margin,
  },
  title: {
    ...Typography.largeTitle,
  },
})

export default DoorToDoorBriefScreen
