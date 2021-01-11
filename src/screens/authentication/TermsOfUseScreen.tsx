import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { TermsOfUseScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Styles } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import PdfView from '../shared/PdfView'
import { ASSET_CGU } from '../../utils/Const'

const TermsOfUseScreen: FunctionComponent<TermsOfUseScreenProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <PdfView style={styles.pdf} assetFileName={ASSET_CGU} />
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('termsofuse.accept')}
            onPress={() => navigation.navigate(Screen.dataCollect)}
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
  pdf: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default TermsOfUseScreen
