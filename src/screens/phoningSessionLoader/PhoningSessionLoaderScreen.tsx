import React, { FunctionComponent, useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSession } from '../../core/entities/PhoningSession'
import { PhoningSessionAdherent } from '../../core/entities/PhoningSessionAdherent'
import {
  PhoningSessionFinishedCampaignError,
  PhoningSessionNoNumberError,
} from '../../core/errors'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { Screen } from '../../navigation'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/PhoningSessionModalNavigator'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { VerticalSpacer } from '../shared/Spacer'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { ViewStateUtils } from '../shared/ViewStateUtils'

type PhoningSessionLoaderScreenProps = PhoningSessionModalNavigatorScreenProps<'PhoningSessionLoader'>

const PhoningSessionLoaderScreen: FunctionComponent<PhoningSessionLoaderScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  const [statefulState, setStatefulState] = useState<ViewState<void>>(
    ViewState.Loading(),
  )

  useEffect(() => {
    const handleSession = (
      session: PhoningSession,
      adherent: PhoningSessionAdherent,
    ) => {
      const navigationData = {
        campaignId: route.params.campaignId,
        campaignTitle: route.params.campaignTitle,
        sessionId: session.id,
        adherent: adherent,
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
      navigation.setOptions({ headerLeft: () => null })
      setStatefulState(ViewState.Loading())
      PhoningCampaignRepository.getInstance()
        .getPhoningCampaignSession(route.params.campaignId)
        .then((session) => {
          // session adherent is only null when creating a session for the permanent campaign it should not be the case here
          if (session.adherent) {
            handleSession(session, session.adherent)
          } else {
            throw new PhoningSessionNoNumberError('')
          }
        })
        .catch((error) => {
          if (
            error instanceof PhoningSessionNoNumberError ||
            error instanceof PhoningSessionFinishedCampaignError
          ) {
            navigation.replace(Screen.phoningSessionNoNumberAvailable, {
              message: error.message,
            })
          } else {
            // We add a close button when there is an error to be able to leave
            navigation.setOptions({
              headerLeft: () => (
                <CloseButton onPress={() => navigation.pop()} />
              ),
            })
            setStatefulState(ViewStateUtils.networkError(error, loadSession))
          }
        })
    }

    loadSession()
  }, [
    route.params.campaignId,
    route.params.campaignTitle,
    route.params.device,
    navigation,
  ])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningsession.loader.title')}</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <StatefulView state={statefulState} contentComponent={() => <></>} />
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
