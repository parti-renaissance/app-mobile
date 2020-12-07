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
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { QuestionGenderButtonViewModel } from './QuestionGenderButtonViewModel'
import { useTheme, useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  viewModel: QuestionGenderButtonViewModel
  onPress?: () => void
}>

const QuestionGenderButton: FunctionComponent<Props> = ({
  viewModel,
  onPress,
  style,
}) => {
  const { theme } = useTheme()
  const styles = useThemedStyles(stylesFactory)
  const buttonStyle = viewModel.isSelected
    ? styles.buttonSelected
    : styles.buttonUnselected
  const textStyle = viewModel.isSelected
    ? styles.textSelected
    : styles.textUnselected
  const imageStyle = viewModel.isSelected
    ? styles.imageSelected
    : styles.imageUnselected
  const touchHighlight = viewModel.isSelected
    ? theme.primaryButtonBackgroundHighlight
    : buttonStyle.backgroundColor

  return (
    <View style={[styles.button, buttonStyle, style]}>
      <TouchablePlatform touchHighlight={touchHighlight} onPress={onPress}>
        <View style={styles.container}>
          <Image
            resizeMode="center"
            style={[styles.image, imageStyle]}
            source={viewModel.image}
          />
          <Text style={[styles.text, textStyle]}>{viewModel.title}</Text>
        </View>
      </TouchablePlatform>
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      flex: 1,
      backgroundColor: Colors.secondaryButtonBackground,
      borderRadius: 8,
      overflow: 'hidden',
    },
    buttonUnselected: {
      backgroundColor: Colors.secondaryButtonBackground,
    },
    buttonSelected: {
      backgroundColor: theme.primaryColor,
    },
    text: {
      ...Typography.subheadline,
    },
    textUnselected: {
      color: Colors.secondaryButtonText,
    },
    textSelected: {
      color: theme.primaryButtonTextColor,
    },
    image: {
      width: 42,
      height: 42,
    },
    imageUnselected: {
      tintColor: Colors.secondaryButtonText,
    },
    imageSelected: {
      tintColor: theme.primaryButtonTextColor,
    },
    container: {
      paddingVertical: Spacing.unit,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}

export default QuestionGenderButton
