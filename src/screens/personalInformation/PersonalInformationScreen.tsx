import React, { FC, useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PersonalInformationModalNavigatorScreenProps } from '../../navigation/personalInformationModal/PersonalInformationModalNavigatorScreenProps'
import { Colors } from '../../styles'
import i18n from '../../utils/i18n'
import { StatefulView } from '../shared/StatefulView'
import { HeaderTextButton } from './HeaderTextButton'
import { PersonalInformationScreenContent } from './PersonalInformationScreenContent'
import { usePersonalInformationScreen } from './usePersonalInformationScreen.hook'
import { Stack, router } from 'expo-router'

type PersonalInformationScreenProps =
  PersonalInformationModalNavigatorScreenProps<'PersonalInformation'>

const PersonalInformationScreen: FC<PersonalInformationScreenProps> = () => {
  const { statefulState } = usePersonalInformationScreen()

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{
        headerLeft: () => (
          <HeaderTextButton
            title={i18n.t('personalinformation.cancel')}
            onPress={() => router.push('../')}
          />
        ),
        title: i18n.t('personalinformation.title'),
      }} />
      <StatefulView
        state={statefulState}
        contentComponent={(detailedProfile) => {
          return <PersonalInformationScreenContent profile={detailedProfile} />
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
})

export default PersonalInformationScreen
