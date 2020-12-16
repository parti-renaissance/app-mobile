import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Colors } from '../../styles'
import { ProfileScreenProps } from '../../navigation'
import { StatefulView, ViewState } from '../shared/StatefulView'
import ProfileAnonymous from './ProfileAnonymous'
import { Screen } from '../../navigation'
import ProfileAuthenticated from './ProfileAuthenticated'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import {
  GetUserProfileInteractor,
  GetUserProfileInteractorResult,
  ProfileAnonymousResult,
  ProfileAuthenticatedResult,
} from '../../core/interactor/GetUserProfileInteractor'
import { ProfileScreenViewModelMapper } from './ProfileScreenViewModelMapper'

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<GetUserProfileInteractorResult>
  >(new ViewState.Loading())

  const ProfileDispatcher = (content: GetUserProfileInteractorResult) => {
    if (content instanceof ProfileAnonymousResult) {
      const openZipCode = () => {
        navigation.navigate(Screen.profileZipCode, {
          zipCode: content.zipCode,
        })
      }
      const openTermsOfUse = () => {
        navigation.navigate(Screen.profileTermsOfUse)
      }

      const openLogin = () => {
        navigation.navigate(Screen.profileLogin)
      }
      const viewModel = ProfileScreenViewModelMapper.mapFromDepartment(
        content.department,
      )
      return (
        <ProfileAnonymous
          openTermsOfUse={openTermsOfUse}
          openLogin={openLogin}
          openZipCode={openZipCode}
          viewModel={viewModel}
        />
      )
    } else if (content instanceof ProfileAuthenticatedResult) {
      const viewModel = ProfileScreenViewModelMapper.map(
        content.profile,
        content.department,
      )
      return <ProfileAuthenticated viewModel={viewModel} />
    } else {
      throw Error('unreachable')
    }
  }

  useFocusEffect(
    useCallback(() => {
      setStatefulState(new ViewState.Loading())
      new GetUserProfileInteractor()
        .execute()
        .then((result) => {
          setStatefulState(new ViewState.Content(result))
        })
        .catch((error) => {
          console.error(error)
          setStatefulState(
            new ViewState.Error(GenericErrorMapper.mapErrorMessage(error)),
          )
        })
    }, []),
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={ProfileDispatcher}
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

export default ProfileScreen
