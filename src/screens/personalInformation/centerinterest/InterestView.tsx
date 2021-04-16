import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import { TouchablePlatform } from '../../shared/TouchablePlatform'
import { InterestViewModel } from './CentersOfInterestViewModel'

type Props = Readonly<{
  viewModel: InterestViewModel
  onInterestSelected: (code: string) => void
}>

const InterestView: FC<Props> = ({ viewModel, onInterestSelected }) => {
  const styles = useThemedStyles(stylesFactory)
  const containerStyle = viewModel.isSelected
    ? styles.containerSelected
    : styles.containerUnselected
  const labelStyle = viewModel.isSelected ? styles.labelSelected : undefined
  const imageStyle = viewModel.isSelected
    ? styles.imageSelected
    : styles.imageUnselected
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => {
          onInterestSelected(viewModel.code)
        }}
      >
        <View style={styles.innerContainer}>
          <Image style={imageStyle} source={viewModel.image} />
          <Text style={[styles.label, labelStyle]} numberOfLines={2}>
            {viewModel.label}
          </Text>
        </View>
      </TouchablePlatform>
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 2,
      flex: 1,
      marginHorizontal: Spacing.small,
      marginVertical: Spacing.small,
    },
    containerSelected: {
      borderColor: theme.primaryColor,
    },
    containerUnselected: {
      borderColor: Colors.defaultBackground,
    },
    imageSelected: {
      tintColor: theme.primaryColor,
    },
    imageUnselected: {
      tintColor: Colors.lightText,
    },
    innerContainer: {
      alignItems: 'center',
      height: 94,
      justifyContent: 'center',
      padding: Spacing.small,
    },
    label: {
      ...Typography.body,
      marginTop: Spacing.unit,
      textAlign: 'center',
      tintColor: Colors.darkText,
    },
    labelSelected: {
      color: theme.primaryColor,
    },
  })
}

export default InterestView
