import React, { FC } from 'react'
import { StatefulView } from '../shared/StatefulView'
import { PersonalInformationsFormMapper } from '../../core/mapper/PersonalInformationsFormMapper'
import { ProfileModalNavigatorScreenProps } from '../../navigation/profileModal/ProfileModalNavigatorScreenProps'
import { PersonalInformationScreenContent } from './PersonalInformationScreenContent'
import { usePersonalInformationScreen } from './usePersonalInformationScreen.hook'
import SafeAreaView from 'react-native-safe-area-view'
import { StyleSheet } from 'react-native'
import { Colors } from '../../styles'

type PersonalInformationScreenProps = ProfileModalNavigatorScreenProps<'PersonalInformation'>

const PersonalInformationScreen: FC<PersonalInformationScreenProps> = () => {
  const { statefulState } = usePersonalInformationScreen()
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
