import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing, Typography } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { PrimaryButton } from '../shared/Buttons'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'
import i18n from '../../utils/i18n'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/PhoningSessionModalNavigator'

type PhoningSessionNumberFoundOtherDeviceScreenProps = PhoningSessionModalNavigatorScreenProps<'PhoningSessionNumberFoundOtherDevice'>

const PhoningSessionNumberFoundOtherDeviceScreen: FunctionComponent<PhoningSessionNumberFoundOtherDeviceScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  const phoneNumber = route.params.data.adherent.phone.number

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
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      <FlexibleVerticalSpacer minSpacing={Spacing.margin} />
      <PrimaryButton
        title={i18n.t('phoningsession.call_started')}
        onPress={() =>
          navigation.replace('PhoneCallStatusPicker', {
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
    paddingBottom: Spacing.margin,
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
