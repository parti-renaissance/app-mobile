import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import { TouchablePlatform } from '../../shared/TouchablePlatform'
import { InterestViewModel } from './CentersOfInterestViewModel'

type Props = Readonly<{
  viewModel: InterestViewModel
}>

const InterestView: FC<Props> = ({ viewModel }) => {
  const styles = useThemedStyles(stylesFactory)
  const containerStyle = viewModel.isSelected
    ? styles.containerSelected
    : undefined
  const labelStyle = viewModel.isSelected ? styles.labelSelected : undefined
  const imageStyle = viewModel.isSelected ? styles.imageSelected : undefined
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => {
          // TODO
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
      flex: 1,
      marginHorizontal: Spacing.unit,
      marginVertical: Spacing.unit,
    },
    containerSelected: {
      borderColor: theme.primaryColor,
      borderRadius: 4,
      borderWidth: 2,
    },
    imageSelected: {
      tintColor: theme.primaryColor,
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
    },
    labelSelected: {
      color: theme.primaryColor,
    },
  })
}

export default InterestView
