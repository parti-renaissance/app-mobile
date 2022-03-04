import React, { FC, useEffect, useState } from 'react'
import { StatefulView } from '../shared/StatefulView'
import { ViewState } from '../shared/ViewState'
import { DetailedProfile } from '../../core/entities/DetailedProfile'
import ProfileRepository from '../../data/ProfileRepository'
import { PersonalInformationsFormMapper } from '../../core/mapper/PersonalInformationsFormMapper'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { ProfileModalNavigatorScreenProps } from '../../navigation/profileModal/ProfileModalNavigatorScreenProps'
import { PersonalInformationScreenContent } from './PersonalInformationScreenContent'

type PersonalInformationScreenProps = ProfileModalNavigatorScreenProps<'PersonalInformation'>

const PersonalInformationScreen: FC<PersonalInformationScreenProps> = () => {
  const [statefulState, setStatefulState] = useState<
    ViewState<DetailedProfile>
  >(ViewState.Loading())

  useEffect(() => {
    const fetchData = () => {
      ProfileRepository.getInstance()
        .getDetailedProfile()
        .then((detailedProfile) => {
          setStatefulState(ViewState.Content(detailedProfile))
        })
        .catch((error) => {
          setStatefulState(
            ViewStateUtils.networkError(error, () => {
              setStatefulState(ViewState.Loading())
              fetchData()
            }),
          )
        })
    }

    fetchData()
  }, [])

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
