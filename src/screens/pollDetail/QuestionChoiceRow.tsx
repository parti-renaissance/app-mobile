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
    ? Colors.primaryButtonBackgroundHighlight
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

const styles = StyleSheet.create({
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
    tintColor: Colors.primaryButtonTextColor,
  },
  image: {
    alignSelf: 'center',
    flex: 1,
  },
  imageSelected: {
    marginStart: 24, // width of checkIcon
    tintColor: Colors.primaryButtonTextColor,
  },
  imageUnselected: {
    marginStart: 0,
    tintColor: Colors.secondaryButtonText,
  },
  row: {
    backgroundColor: Colors.secondaryButtonBackground,
    borderRadius: 32,
    flex: 1,
    marginBottom: Spacing.unit,
    overflow: 'hidden',
  },
  rowSelected: {
    backgroundColor: Colors.primaryColor,
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
    color: Colors.primaryButtonTextColor,
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

export default QuestionChoiceRow
