import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSession } from '../../core/entities/PhoningSession'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { PhoningContactTutorialScreenProp, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { PhoningSessionNavigationData } from '../shared/PhoningSessionNavigationData'

const PhoningContactTutorialScreen: FunctionComponent<PhoningContactTutorialScreenProp> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<ViewState.Type<void>>(
    new ViewState.Content({}),
  )

  const handleSession = useCallback(
    (session: PhoningSession) => {
      const navigationData: PhoningSessionNavigationData = {
        campaignId: route.params.campaignId,
        campaignTitle: route.params.campaignTitle,
        sessionId: session.id,
        device: 'current',
        adherent: null,
      }
      navigation.replace(Screen.phonePollDetail, {
        data: navigationData,
      })
    },
    [navigation, route.params.campaignId, route.params.campaignTitle],
  )

  const loadSession = useCallback(() => {
    setStatefulState(new ViewState.Loading())
    PhoningCampaignRepository.getInstance()
      .getPhoningCampaignSession(route.params.campaignId)
      .then(handleSession)
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            loadSession()
          }),
        )
      })
  }, [route.params.campaignId, handleSession])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.pop()} />,
    })
  })
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningcontacttutorial.title')}</Text>
      <StatefulView
        state={statefulState}
        contentComponent={() => (
          <>
            <VerticalSpacer spacing={Spacing.extraLargeMargin} />
            <Text style={styles.body}>
              {i18n.t('phoningcontacttutorial.description')}
            </Text>
            <FlexibleVerticalSpacer minSpacing={Spacing.margin} />
            <PrimaryButton
              title={i18n.t('phoningsession.call_started')}
              onPress={() => loadSession()}
            />
            <VerticalSpacer spacing={Spacing.margin} />
          </>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    ...Typography.body,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningContactTutorialScreen
