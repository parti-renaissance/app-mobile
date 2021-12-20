import React, { FunctionComponent } from 'react'
import {
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  StyleProp,
  View,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { QuestionChoiceRowViewModel } from './QuestionChoiceRowViewModel'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  viewModel: QuestionChoiceRowViewModel
  onPress?: () => void
}>

const QuestionChoiceRow: FunctionComponent<Props> = ({
  viewModel,
  onPress,
  style,
}) => {
  const { theme } = useTheme()
  const styles = useThemedStyles(stylesFactory)

  const rowStyle = viewModel.isSelected
    ? styles.rowSelected
    : styles.rowUnselected
  const imageStyle = viewModel.isSelected
    ? styles.imageSelected
    : styles.imageUnselected
  const textStyle = viewModel.isSelected
    ? styles.textSelected
    : styles.textUnselected
  const touchHighlight = viewModel.isSelected
    ? theme.primaryButtonBackgroundHighlight
    : rowStyle.backgroundColor

  return (
    <View style={[styles.row, rowStyle, style]}>
      <TouchablePlatform
        style={styles.touchContainer}
        onPress={onPress}
        touchHighlight={touchHighlight}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {viewModel.image ? (
              <Image
                style={[styles.image, imageStyle]}
                source={viewModel.image}
              />
            ) : null}
            <Text style={[styles.text, textStyle]}>{viewModel.title}</Text>
          </View>
          {viewModel.isSelected ? (
            <Image
              style={styles.icon}
              source={require('../../assets/images/checkIcon.png')}
            />
          ) : null}
        </View>
      </TouchablePlatform>
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: Spacing.mediumMargin,
      paddingVertical: 10,
    },
    contentContainer: {
      flex: 1,
    },
    icon: {
      tintColor: theme.primaryButtonTextColor,
    },
    image: {
      alignSelf: 'center',
      flex: 1,
    },
    imageSelected: {
      marginStart: 24, // width of checkIcon
      tintColor: theme.primaryButtonTextColor,
    },
    imageUnselected: {
      marginStart: 0,
      tintColor: Colors.secondaryButtonText,
    },
    row: {
      backgroundColor: Colors.secondaryButtonBackground,
      flex: 1,
      marginBottom: Spacing.unit,
      overflow: 'hidden',
    },
    rowSelected: {
      backgroundColor: theme.primaryColor,
    },
    rowUnselected: {
      backgroundColor: Colors.secondaryButtonBackground,
    },
    text: {
      ...Typography.subheadline,
      flex: 1,
      lineHeight: 24,
      minHeight: 24, // height of checkIcon
      textAlign: 'center',
    },
    textSelected: {
      color: theme.primaryButtonTextColor,
      paddingStart: 24, // width of checkIcon
    },
    textUnselected: {
      color: Colors.secondaryButtonText,
      paddingStart: 0,
    },
    touchContainer: {
      flex: 1,
    },
  })
}

export default QuestionChoiceRow
