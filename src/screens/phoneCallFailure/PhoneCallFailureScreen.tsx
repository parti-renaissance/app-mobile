import React, { FunctionComponent, useLayoutEffect } from 'react'
import { Text, StyleSheet, Image } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoneCallFailureScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'

const PhoneCallFailureScreen: FunctionComponent<PhoneCallFailureScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerLeft: () => <CloseButton onPress={() => navigation.pop()} />,
      })
    }
    updateNavigationHeader()
  }, [navigation])

  const { theme } = useTheme()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningsession.failure.title')}</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <Text style={styles.body}>
        {i18n.t('phoningsession.failure.new_call_description')}
      </Text>
      <VerticalSpacer spacing={Spacing.mediumMargin} />
      <Image
        style={styles.image}
        source={theme.image.phoningSessionFailure()}
        resizeMode="cover"
      />
      <VerticalSpacer spacing={Spacing.largeMargin} />
      <PrimaryButton
        title={i18n.t('phoningsession.new_call')}
        onPress={() =>
          navigation.replace(Screen.phoningSessionLoader, {
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
  image: {
    aspectRatio: 320 / 194,
    height: undefined,
    width: '100%',
  },
  title: {
    ...Typography.title,
  },
})

export default PhoneCallFailureScreen
