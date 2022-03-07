import React, { FC, useLayoutEffect } from 'react'
import { StatefulView } from '../shared/StatefulView'
import { PersonalInformationsFormMapper } from '../../core/mapper/PersonalInformationsFormMapper'
import { PersonalInformationScreenContent } from './PersonalInformationScreenContent'
import { usePersonalInformationScreen } from './usePersonalInformationScreen.hook'
import SafeAreaView from 'react-native-safe-area-view'
import { StyleSheet } from 'react-native'
import { Colors } from '../../styles'
import { PersonalInformationModalNavigatorScreenProps } from '../../navigation/personalInformationModal/PersonalInformationModalNavigatorScreenProps'
import { HeaderTextButton } from './HeaderTextButton'
import i18n from '../../utils/i18n'

type PersonalInformationScreenProps = PersonalInformationModalNavigatorScreenProps<'PersonalInformation'>

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
          const form = PersonalInformationsFormMapper.mapFromDetailedProfile(
            detailedProfile,
          )
          return (
            <PersonalInformationScreenContent
              profileUuid={detailedProfile.uuid}
              initialForm={form}
            />
          )
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
