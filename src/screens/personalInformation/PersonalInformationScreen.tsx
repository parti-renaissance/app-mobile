import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../styles'
import CertifiedProfileView from './CertifiedProfileView'

type Props = Readonly<{}>

const PersonalInformationScreen: FC<Props> = () => {
  const isCertified = false
  return (
    <View style={styles.container}>
      <CertifiedProfileView
        style={styles.certifiedContainer}
        isCertified={isCertified}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  certifiedContainer: {
    margin: 16,
  },
})

export default PersonalInformationScreen
