import React, { FunctionComponent } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { TermsOfUseScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'

const TermsOfUseScreen: FunctionComponent<TermsOfUseScreenProps> = ({
  route,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.title}>{i18n.t('termsofuse.title')}</Text>
          <Text style={styles.content}>{i18n.t('termsofuse.content')}</Text>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('termsofuse.accept')}
            onPress={() =>
              navigation.navigate(Screen.dataCollect, {
                zipCode: route.params.zipCode,
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  textContainer: {
    flex: 1,
    flexGrow: 1,
  },
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  title: {
    ...Typography.largeTitle,
    marginTop: Spacing.unit,
    marginHorizontal: Spacing.margin,
  },
  content: {
    ...Typography.body,
    margin: Spacing.margin,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default TermsOfUseScreen
