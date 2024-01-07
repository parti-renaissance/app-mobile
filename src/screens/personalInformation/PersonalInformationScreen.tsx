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

type PersonalInformationScreenProps =
  PersonalInformationModalNavigatorScreenProps<'PersonalInformation'>

const PersonalInformationScreen: FC<PersonalInformationScreenProps> = ({
  navigation,
}) => {
  const { statefulState } = usePersonalInformationScreen()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderTextButton
          title={i18n.t('personalinformation.cancel')}
          onPress={() => navigation.goBack()}
        />
      ),
      title: i18n.t('personalinformation.title'),
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
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
