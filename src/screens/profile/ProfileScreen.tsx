import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import AuthenticationRepository from '../../data/AuthenticationRepository'
import { Colors } from '../../styles'
import { ProfileScreenProps } from '../../navigation'
import { StatefulView, ViewState } from '../shared/StatefulView'
import ProfileAnonymous from './ProfileAnonymous'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import { useProfile } from './useProfile'
import { Screen } from '../../navigation'
import ProfileAuthenticated from './ProfileAuthenticated'
import ProfileRepository from '../../data/ProfileRepository'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { AuthenticationState } from '../../core/entities/AuthenticationState'

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const [anonymousStatefulState, setAnonymousStatefulState] = useState<
    ViewState.Type<string>
  >(new ViewState.Loading())
  const { statefulState, refresh } = useProfile()
  const [state, setState] = useState({
    isAnonymousUser: true,
  })

  const ProfileContent = (viewModel: ProfileScreenViewModel) => {
    return <ProfileAuthenticated viewModel={viewModel} />
  }

  const AnonymousProfileContent = (zipCode: string) => {
    const openZipCode = () => {
      navigation.navigate(Screen.profileZipCode, {
        zipCode: zipCode,
      })
    }
    const openTermsOfUse = () => {
      navigation.navigate(Screen.profileTermsOfUse)
    }

    const openLogin = () => {
      navigation.navigate(Screen.profileLogin)
    }
    return (
      <ProfileAnonymous
        openTermsOfUse={openTermsOfUse}
        openLogin={openLogin}
        openZipCode={openZipCode}
      />
    )
  }

  useFocusEffect(
    useCallback(() => {
      AuthenticationRepository.getInstance()
        .getAuthenticationState()
        .then((authenticationState) => {
          const isAnonymousUser =
            authenticationState === AuthenticationState.Anonymous
          if (!isAnonymousUser) {
            refresh()
          } else {
            ProfileRepository.getInstance()
              .getZipCode()
              .then((zipCode) => {
                setAnonymousStatefulState(new ViewState.Content(zipCode))
              })
              .catch((error) => {
                console.error(error)
                setAnonymousStatefulState(
                  new ViewState.Error(
                    GenericErrorMapper.mapErrorMessage(error),
                  ),
                )
              })
          }
          setState({ isAnonymousUser })
        })
    }, [refresh]),
  )

  return (
    <SafeAreaView style={styles.container}>
      {state.isAnonymousUser ? (
        <StatefulView
          state={anonymousStatefulState}
          contentComponent={AnonymousProfileContent}
        />
      ) : (
        <StatefulView state={statefulState} contentComponent={ProfileContent} />
      )}
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
