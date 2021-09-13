import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { Text, StyleSheet, Linking } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSessionNumberFoundScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { BorderlessButton, PrimaryButton } from '../shared/Buttons'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'
import i18n from '../../utils/i18n'

const PhoningSessionNumberFoundScreen: FunctionComponent<PhoningSessionNumberFoundScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  const phoneNumberUrl = (phoneNumber: string): string => {
    const whitespaceRegex = /\s/g
    const sanitizedPhoneNumber = phoneNumber.replace(whitespaceRegex, '')
    return `tel:${sanitizedPhoneNumber}`
  }

  const phoneNumber = route.params.data.adherent.phone.number

  const callNumber = useCallback(() => {
    const url = phoneNumberUrl(phoneNumber)
    Linking.openURL(url)
  }, [phoneNumber])

  useEffect(() => {
    callNumber()
  }, [callNumber])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('phoningsession.number_found.title')}
      </Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <Text style={styles.body}>
        {i18n.t('phoningsession.number_found.description')}
      </Text>
      <FlexibleVerticalSpacer minSpacing={Spacing.margin} />
      <PrimaryButton
        title={i18n.t('phoningsession.call_started')}
        onPress={() =>
          navigation.replace(Screen.phoneCallStatusPicker, {
            data: route.params.data,
          })
        }
      />
      <VerticalSpacer spacing={Spacing.unit} />
      <BorderlessButton
        title={i18n.t('phoningsession.number_found.recall')}
        onPress={() => callNumber()}
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

export default PhoningSessionNumberFoundScreen
