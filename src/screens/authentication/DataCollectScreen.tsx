import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { DataCollectScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Styles } from '../../styles'
import { ASSET_DATA_PROTECTION } from '../../utils/Const'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import PdfView from '../shared/PdfView'

const DataCollectScreen: FunctionComponent<DataCollectScreenProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <PdfView style={styles.pdf} assetFileName={ASSET_DATA_PROTECTION} />
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('datacollect.accept')}
          onPress={() => navigation.navigate(Screen.anonymousLoginZipCode)}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
    overflow: 'hidden',
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
})

export default DataCollectScreen
