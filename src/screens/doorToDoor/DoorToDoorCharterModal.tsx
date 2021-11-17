import React, { FC } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import Markdown from 'react-native-markdown-display'
import SafeAreaView from 'react-native-safe-area-view'
import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { NavigationHeaderButton } from '../shared/NavigationHeaderButton'

type Props = {
  charter: string
  onAcceptCharter: () => void
  onDismissModal: () => void
}

const DoorToDoorCharterModal: FC<Props> = (props) => {
  const acceptCharter = () => {
    DoorToDoorRepository.getInstance()
      .acceptDoorToDoorCharter()
      .then(() => props.onAcceptCharter())
      .catch((error: Error) => {
        displayError(GenericErrorMapper.mapErrorMessage(error))
      })
  }

  const displayError = (error: string) => {
    Alert.alert(
      i18n.t('common.error_title'),
      error,
      [
        {
          text: i18n.t('common.ok'),
          style: 'default',
        },
      ],
      { cancelable: false },
    )
  }

  const markdownStyle = { body: styles.chartContainer }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <NavigationHeaderButton
          source={require('../../assets/images/navigationBarClose.png')}
          onPress={props.onDismissModal}
        />
      </View>
      <ScrollView>
        <Markdown style={markdownStyle}>{props.charter}</Markdown>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('doorToDoor.charter.accept')}
          onPress={acceptCharter}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  chartContainer: {
    margin: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    ...Typography.title2,
    textAlign: 'center',
  },
})

export default DoorToDoorCharterModal
