import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RetaliationDetailScreenProp } from '../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'

const RetaliationDetailScreen: FunctionComponent<RetaliationDetailScreenProp> = ({
  route,
}) => {
  const viewModel = route.params.viewModel

  const copyAndNavigate = () => {
    // TODO copy `viewModel.retaliation` to clipboard and navigate to defined url
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{viewModel.title}</Text>
        <VerticalSpacer spacing={256} /> { /* TODO Remove spacer and put retaliation card */ }
        <Text style={styles.subtitle}>{i18n.t('retaliation.title')}</Text>
        <Text style={styles.retaliation}>{viewModel.retaliation}</Text>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('retaliation.execute')}
          onPress={copyAndNavigate}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    padding: Spacing.margin,
  },
  retaliation: {
    ...Typography.body,
    marginVertical: Spacing.unit,
  },
  subtitle: {
    ...Typography.title2,
  },
  title: {
    ...Typography.title,
  },
})

export default RetaliationDetailScreen
