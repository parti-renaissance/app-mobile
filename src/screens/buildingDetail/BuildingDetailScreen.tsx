import React, { FunctionComponent } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import { BuildingDetailScreenProp } from '../../navigation'

const BuildingDetailScreen: FunctionComponent<BuildingDetailScreenProp> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <SafeAreaView style={styles.container}>
      <View />
    </SafeAreaView>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
  })
}

export default BuildingDetailScreen
