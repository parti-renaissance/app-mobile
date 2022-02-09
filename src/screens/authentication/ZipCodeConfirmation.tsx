import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Department } from '../../core/entities/Department'
import { AnonymousLoginInteractor } from '../../core/interactor/AnonymousLoginInteractor'
import RegionsRepository from '../../data/RegionsRepository'
import { ZipCodeConfirmationScreenProps } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { AlertUtils } from '../shared/AlertUtils'
import { PrimaryButton } from '../shared/Buttons'
import CircularIcon from '../shared/CircularIcon'
import LoadingOverlay from '../shared/LoadingOverlay'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'

type ContentProps = Readonly<{
  department: string
  zipCode: string
}>

const ZipCodeConfirmationContent: FunctionComponent<ContentProps> = ({
  department,
  zipCode,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const authenticate = () => {
    setIsLoading(true)
    new AnonymousLoginInteractor()
      .login(zipCode)
      .catch((error) => AlertUtils.showNetworkAlert(error, authenticate))
      .finally(() => setIsLoading(false))
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <CircularIcon
        style={styles.icon}
        source={require('../../assets/images/zipCodeConfirmationIcon.png')}
      />
      <Text style={styles.title}>
        {i18n.t('zipcodeconfirmation.title', { department: department })}
      </Text>
      <Text style={styles.description}>
        {i18n.t('zipcodeconfirmation.description')}
      </Text>
      <PrimaryButton
        style={styles.continueButton}
        title={i18n.t('zipcodeconfirmation.continue')}
        onPress={authenticate}
      />
    </SafeAreaView>
  )
}

const ZipCodeConfirmationScreen = ({
  route,
}: ZipCodeConfirmationScreenProps) => {
  const zipCode = route.params.zipCode

  const [statefulState, setStatefulState] = useState<ViewState<Department>>(
    ViewState.Loading(),
  )

  useEffect(() => {
    const fetchData = () => {
      RegionsRepository.getInstance()
        .getDepartment(zipCode, 'remote', 'Anonymous')
        .then((department) => {
          setStatefulState(ViewState.Content(department))
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
  }, [zipCode])

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(department) => {
        return (
          <ZipCodeConfirmationContent
            department={department.name}
            zipCode={route.params.zipCode}
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  continueButton: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  description: {
    ...Typography.body,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: Spacing.margin,
    marginTop: Spacing.unit,
  },
  title: {
    ...Typography.title,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
  },
})

export default ZipCodeConfirmationScreen
