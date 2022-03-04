import React, { FC } from 'react'
import { StatefulView } from '../shared/StatefulView'
import { PersonalInformationsFormMapper } from '../../core/mapper/PersonalInformationsFormMapper'
import { ProfileModalNavigatorScreenProps } from '../../navigation/profileModal/ProfileModalNavigatorScreenProps'
import { PersonalInformationScreenContent } from './PersonalInformationScreenContent'
import { usePersonalInformationScreen } from './usePersonalInformationScreen.hook'

type PersonalInformationScreenProps = ProfileModalNavigatorScreenProps<'PersonalInformation'>

const PersonalInformationScreen: FC<PersonalInformationScreenProps> = () => {
  const { statefulState } = usePersonalInformationScreen()
  return (
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
  )
}

export default PersonalInformationScreen
