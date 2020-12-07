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
  const textStyle = viewModel.isSelected
    ? styles.textSelected
    : styles.textUnselected
  const touchHighlight = viewModel.isSelected
    ? theme.primaryButtonBackgroundHighlight
    : rowStyle.backgroundColor

  return (
    <View style={[styles.row, rowStyle, style]}>
      <TouchablePlatform onPress={onPress} touchHighlight={touchHighlight}>
        <View style={styles.container}>
          <Text style={[styles.text, textStyle]}>{viewModel.title}</Text>
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
    row: {
      backgroundColor: Colors.secondaryButtonBackground,
      borderRadius: 100,
      marginBottom: Spacing.unit,
      overflow: 'hidden',
      flex: 1,
    },
    rowUnselected: {
      backgroundColor: Colors.secondaryButtonBackground,
    },
    rowSelected: {
      backgroundColor: theme.primaryColor,
    },
    container: {
      paddingHorizontal: Spacing.mediumMargin,
      paddingVertical: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      flex: 1,
      textAlign: 'center',
      minHeight: 24, // height of checkIcon
      lineHeight: 24,
      ...Typography.subheadline,
    },
    textUnselected: {
      paddingStart: 0,
      color: Colors.secondaryButtonText,
    },
    textSelected: {
      color: theme.primaryButtonTextColor,
      paddingStart: 24, // width of checkIcon
    },
    icon: {
      tintColor: theme.primaryButtonTextColor,
    },
  })
}

export default QuestionChoiceRow
