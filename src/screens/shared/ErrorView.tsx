import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { PrimaryButton } from './Buttons'
import { ViewState } from './StatefulView'

type Props = Readonly<{
  state: ViewState.Error
}>

const ErrorView: FunctionComponent<Props> = (props) => {
  const currentState = props.state
  const { theme } = useTheme()
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={theme.image.error()} />
      <Text style={styles.title}>{i18n.t('common.error_title')}</Text>
      <Text style={styles.text}>{currentState.errorMessage}</Text>
      {currentState.onRetry !== undefined ? (
        <PrimaryButton
          title={i18n.t('common.error_reload')}
          onPress={currentState.onRetry}
          style={styles.retryButton}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: Colors.defaultBackground,
  },
  image: {
    alignSelf: 'center',
    height: 165,
    marginHorizontal: Spacing.margin,
    width: 221,
  },
  retryButton: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  text: {
    ...Typography.body,
    alignSelf: 'center',
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
    textAlign: 'center',
  },
  title: {
    ...Typography.largeTitle,
    alignSelf: 'center',
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
})

export default ErrorView
