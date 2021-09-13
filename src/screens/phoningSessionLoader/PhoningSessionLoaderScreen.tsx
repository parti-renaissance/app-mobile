import React, { FunctionComponent, useEffect } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSession } from '../../core/entities/PhoningSession'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { PhoningSessionLoaderScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LoadingView from '../shared/LoadingView'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'

const PhoningSessionLoaderScreen: FunctionComponent<PhoningSessionLoaderScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  useEffect(() => {
    const handleSession = (session: PhoningSession) => {
      const navigationData = {
        campaignId: route.params.campaignId,
        sessionId: session.id,
        adherent: session.adherent,
        device: route.params.device,
      }
      switch (route.params.device) {
        case 'current':
          navigation.replace(Screen.phoningSessionNumberFound, {
            data: navigationData,
          })
          break
        case 'external':
          navigation.replace(Screen.phoningSessionNumberFoundOtherDevice, {
            data: navigationData,
          })
          break
      }
    }

    const loadSession = () => {
      PhoningCampaignRepository.getInstance()
        .getPhoningCampaignSession(route.params.campaignId)
        .then(handleSession)
        .catch((error) => {
          // TODO: (Pierre Felgines) Handle error cases
          console.log('error', error)
        })
    }

    loadSession()
  }, [route.params.campaignId, route.params.device, navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningsession.loader.title')}</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <LoadingView />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningSessionLoaderScreen
