import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Department } from '../../core/entities/Department'
import RegionsRepository from '../../data/RegionsRepository'
import { Screen, ZipCodeConfirmationScreenProps } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { StatefulView, ViewState } from '../shared/StatefulView'

type ContentProps = Readonly<{
  onPress?: () => void
  department: string
}>

const ZipCodeConfirmationContent: FunctionComponent<ContentProps> = ({
  onPress,
  department,
}) => {
  const { theme } = useTheme()
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={theme.image.region()} />
      <Text style={styles.title}>
        {i18n.t('zipcodeconfirmation.title', { department: department })}
      </Text>
      <Text style={styles.description}>
        {i18n.t('zipcodeconfirmation.description')}
      </Text>
      <PrimaryButton
        style={styles.continueButton}
        title={i18n.t('zipcodeconfirmation.continue')}
        onPress={onPress}
      />
    </SafeAreaView>
  )
}

const ZipCodeConfirmationScreen = ({
  route,
  navigation,
}: ZipCodeConfirmationScreenProps) => {
  const zipCode = route.params.zipCode

  const [statefulState, setStatefulState] = useState<
    ViewState.Type<Department>
  >(new ViewState.Loading())

  useEffect(() => {
    const fetchData = () => {
      RegionsRepository.getInstance()
        .getDepartment(zipCode, 'Anonymous')
        .then((department) => {
          setStatefulState(new ViewState.Content(department))
        })
        .catch((error) => {
          setStatefulState(
            new ViewState.Error(
              GenericErrorMapper.mapErrorMessage(error),
              () => {
                setStatefulState(new ViewState.Loading())
                fetchData()
              },
            ),
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
            onPress={() =>
              navigation.navigate(Screen.termsOfUse, {
                zipCode: zipCode,
              })
            }
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  logo: {
    height: 180,
    width: 320,
    alignSelf: 'center',
    marginTop: Spacing.unit,
  },
  title: {
    ...Typography.largeTitle,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
  },
  description: {
    ...Typography.body,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  continueButton: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
})

export default ZipCodeConfirmationScreen
