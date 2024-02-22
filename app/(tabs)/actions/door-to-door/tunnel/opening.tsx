import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Spacing, Typography } from '@/styles'
import i18n from '@/utils/i18n'
import LoadingOverlay from '@/screens/shared/LoadingOverlay'
import { StatefulView } from '@/screens/shared/StatefulView'
import { TunnelDoorOpeningChoiceCard } from '@/screens/doorToDoor/tunnel/opening/TunnelDoorOpeningChoiceCard'
import { TunnelDoorOpeningChoiceCardViewModel } from '@/screens/doorToDoor/tunnel/opening/TunnelDoorOpeningChoiceCardViewModel'
import { useTunnelDoorOpeningScreen } from '@/screens/doorToDoor/tunnel/opening/useTunnelDoorOpeningScreen.hook'

import {
  useDoorToDoorStore,
  useDtdTunnelStore,
} from '@/data/store/door-to-door'

const TunnelDoorOpeningScreen = () => {
  const {
    address: { building },
  } = useDoorToDoorStore()
  const { tunnel } = useDtdTunnelStore()
  const { statefulState, isSendingChoice, onStatusSelected } =
    useTunnelDoorOpeningScreen(building.campaignStatistics.campaignId, {
      id: building.id,
      floor: tunnel.floor,
      door: tunnel.door,
      block: tunnel.block,
      type: building.type,
    })

  const ContentComponent = (
    viewModels: TunnelDoorOpeningChoiceCardViewModel[],
  ) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {i18n.t('doorToDoor.tunnel.opening.title')}
        </Text>
        {viewModels.map((viewModel) => {
          return (
            <TunnelDoorOpeningChoiceCard
              key={viewModel.id}
              style={styles.card}
              viewModel={viewModel}
              onPress={() => onStatusSelected(viewModel.id)}
            />
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isSendingChoice} />
      <StatefulView state={statefulState} contentComponent={ContentComponent} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.margin,
  },
  title: {
    ...Typography.title3,
    marginBottom: Spacing.margin,
  },
  card: {
    flex: 1,
  },
})

export default TunnelDoorOpeningScreen
