import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing, Styles } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import PdfView from '../shared/PdfView'
import { ASSET_CGU } from '../../utils/Const'
import { UnauthenticatedRootNavigatorScreenProps } from '../../navigation/UnauthenticatedRootNavigator'

type TermsOfUseScreenProps = UnauthenticatedRootNavigatorScreenProps<'TermsOfUse'>

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
            onPress={() => navigation.navigate('DataCollect')}
          />
        </View>
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
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  pdf: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    flexGrow: 1,
  },
})

export default TermsOfUseScreen
