import React, { FunctionComponent } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Text } from 'react-native'
import { Colors, Typography } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import { BuildingDetailScreenProp } from '../../navigation'
import i18n from '../../utils/i18n'
import BuildingStatusView from './BuilidingStatusView'
import { BuildingStatusViewModelMapper } from './BuildingStatusViewModelMapper'
import { BuildingStatus } from '../../core/entities/BuildingStatus'
import { margin, mediumMargin } from '../../styles/spacing'

const BuildingDetailScreen: FunctionComponent<BuildingDetailScreenProp> = ({}) => {
  const styles = useThemedStyles(stylesFactory)
  const { theme } = useTheme()

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <Image source={theme.image.house()} />
      <Text style={styles.address}>{i18n.t('addresse.placeholder')}</Text>
      <Text style={styles.lastVisit}>{i18n.t('lastVisit.placeholder')}</Text>
      <BuildingStatusView
        viewModel={BuildingStatusViewModelMapper.map(BuildingStatus.TOCOMPLETE)}
      />
    </SafeAreaView>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    address: {
      ...Typography.title2,
      marginTop: mediumMargin,
      textAlign: 'center',
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    lastVisit: {
      ...Typography.body,
      marginBottom: margin,
      textAlign: 'center',
    },
  })
}

export default BuildingDetailScreen
