import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  PhoningSessionNumberFoundOtherDeviceScreenProps,
  Screen,
} from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { PrimaryButton } from '../shared/Buttons'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'
import i18n from '../../utils/i18n'

// TODO: (Pierre Felgines) Remove stub
const PHONE_NUMBER = '+33 6 03 04 05 06'

const PhoningSessionNumberFoundOtherDeviceScreen: FunctionComponent<PhoningSessionNumberFoundOtherDeviceScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('phoningsession.other_device.title')}
      </Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <Text style={styles.body}>
        {i18n.t('phoningsession.other_device.description')}
      </Text>
      <VerticalSpacer spacing={Spacing.extraExtraLargeMargin} />
      <Text style={styles.phoneNumber}>{PHONE_NUMBER}</Text>
      <FlexibleVerticalSpacer minSpacing={Spacing.margin} />
      <PrimaryButton
        title={i18n.t('phoningsession.call_started')}
        onPress={() =>
          navigation.replace(Screen.phoneCallStatusPicker, {
            data: route.params.data,
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
  phoneNumber: {
    ...Typography.title,
    textAlign: 'center',
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningSessionNumberFoundOtherDeviceScreen
