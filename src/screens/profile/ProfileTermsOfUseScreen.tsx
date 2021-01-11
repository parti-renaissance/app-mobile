import React from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors } from '../../styles'
import PdfView from '../shared/PdfView'
import { ASSET_CGU } from '../../utils/Const'

const ProfileTermsOfUseScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PdfView style={styles.pdf} assetFileName={ASSET_CGU} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  pdf: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
})

export default ProfileTermsOfUseScreen
