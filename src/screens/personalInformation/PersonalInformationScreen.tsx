import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import CertifiedProfileView from './CertifiedProfileView'
import UserInputView from './UserInputView'

type Props = Readonly<{}>

const PersonalInformationScreen: FC<Props> = () => {
  const isCertified = false
  return (
    <KeyboardOffsetView>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <CertifiedProfileView
            style={styles.certifiedContainer}
            isCertified={isCertified}
          />
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_identity')}
          </Text>
          <UserInputView label={i18n.t('personalinformation.first_name')} />
          <UserInputView label={i18n.t('personalinformation.last_name')} />
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_coordinates')}
          </Text>
          <UserInputView label={i18n.t('personalinformation.email')} />
          <UserInputView label={i18n.t('personalinformation.phone')} />
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_social')}
          </Text>
          <UserInputView label={i18n.t('personalinformation.facebook')} />
          <UserInputView label={i18n.t('personalinformation.linkedin')} />
          <UserInputView label={i18n.t('personalinformation.twitter')} />
          <UserInputView label={i18n.t('personalinformation.telegram')} />
        </View>
      </ScrollView>
    </KeyboardOffsetView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.defaultBackground,
  },
  container: {
    padding: Spacing.margin,
    flex: 1,
  },
  certifiedContainer: {},
  section: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginTop: Spacing.margin,
  },
})

export default PersonalInformationScreen
