import React, { FunctionComponent, useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'

type PhoneCallFailureScreenProps =
  PhoningSessionModalNavigatorScreenProps<'PhoneCallFailure'>

const PhoneCallFailureScreen: FunctionComponent<
  PhoneCallFailureScreenProps
> = ({ navigation, route }) => {
  usePreventGoingBack()

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerLeft: () => <CloseButton onPress={() => navigation.pop()} />,
      })
    }
    updateNavigationHeader()
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningsession.failure.title')}</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <Text style={styles.body}>
        {i18n.t('phoningsession.failure.new_call_description')}
      </Text>
      <VerticalSpacer spacing={Spacing.largeMargin} />
      <PrimaryButton
        title={i18n.t('phoningsession.new_call')}
        onPress={() =>
          navigation.replace('PhoningSessionLoader', {
            campaignId: route.params.data.campaignId,
            campaignTitle: route.params.data.campaignTitle,
            device: route.params.data.device,
          })
        }
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

export default PhoneCallFailureScreen
