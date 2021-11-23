import React, { FunctionComponent } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Text } from 'react-native'
import { Colors } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import { BuildingDetailScreenProp } from '../../navigation'
import i18n from '../../utils/i18n'
import BuildingStatusView from './BuilidingStatusView'
import { BuildingStatusViewModelMapper } from './BuildingStatusViewModelMapper'
import { BuildingStatus } from '../../core/entities/BuildingStatus'

const BuildingDetailScreen: FunctionComponent<BuildingDetailScreenProp> = ({}) => {
  const styles = useThemedStyles(stylesFactory)
  const { theme } = useTheme()

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <Image source={theme.image.house()} />
      <Text>{i18n.t('addresse.placeholder')}</Text>
      <Text>{i18n.t('lastVisit.placeholder')}</Text>
      <BuildingStatusView
        viewModel={BuildingStatusViewModelMapper.map(BuildingStatus.TOCOMPLETE)}
      />
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
