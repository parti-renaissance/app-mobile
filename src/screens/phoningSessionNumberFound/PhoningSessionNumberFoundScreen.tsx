import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { Text, StyleSheet, Linking, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'
import i18n from '../../utils/i18n'
import CircularIcon from '../shared/CircularIcon'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/PhoningSessionModalNavigator'

type PhoningSessionNumberFoundScreenProps = PhoningSessionModalNavigatorScreenProps<'PhoningSessionNumberFound'>

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
      <View style={styles.imageContainer}>
        <CircularIcon
          source={require('../../assets/images/phoneNumberFoundIcon.png')}
        />
      </View>
      <SecondaryButton
        title={i18n.t('phoningsession.number_found.recall')}
        onPress={() => callNumber()}
      />
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton
        title={i18n.t('phoningsession.call_started')}
        onPress={() =>
          navigation.replace(Screen.phoneCallStatusPicker, {
            data: route.params.data,
          })
        }
      />
      <VerticalSpacer spacing={Spacing.margin} />
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
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningSessionNumberFoundScreen
