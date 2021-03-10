import React, { FC, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import CertifiedProfileView from './CertifiedProfileView'
import LabelInputContainer from './LabelInputContainer'
import LabelTextInput from './LabelTextInput'

type Props = Readonly<{}>

const PersonalInformationScreen: FC<Props> = () => {
  const firstNameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)
  const facebookRef = useRef<TextInput>(null)
  const linkedInRef = useRef<TextInput>(null)
  const twitterRef = useRef<TextInput>(null)
  const telegramRef = useRef<TextInput>(null)
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
          <LabelTextInput
            ref={firstNameRef}
            nextInput={lastNameRef}
            label={i18n.t('personalinformation.first_name')}
          />
          <LabelTextInput
            ref={lastNameRef}
            label={i18n.t('personalinformation.last_name')}
          />
          <LabelInputContainer
            label={i18n.t('personalinformation.gender')}
          ></LabelInputContainer>
          <LabelInputContainer
            label={i18n.t('personalinformation.birthdate')}
          ></LabelInputContainer>
          <LabelInputContainer
            label={i18n.t('personalinformation.nationality')}
          ></LabelInputContainer>
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_coordinates')}
          </Text>
          <LabelInputContainer
            label={i18n.t('personalinformation.address')}
          ></LabelInputContainer>
          <LabelTextInput label={i18n.t('personalinformation.email')} />
          <LabelTextInput label={i18n.t('personalinformation.phone')} />
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_social')}
          </Text>
          <LabelTextInput
            ref={facebookRef}
            nextInput={linkedInRef}
            label={i18n.t('personalinformation.facebook')}
          />
          <LabelTextInput
            ref={linkedInRef}
            nextInput={twitterRef}
            label={i18n.t('personalinformation.linkedin')}
          />
          <LabelTextInput
            ref={twitterRef}
            nextInput={telegramRef}
            label={i18n.t('personalinformation.twitter')}
          />
          <LabelTextInput
            ref={telegramRef}
            isLastInput={true}
            label={i18n.t('personalinformation.telegram')}
          />
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
