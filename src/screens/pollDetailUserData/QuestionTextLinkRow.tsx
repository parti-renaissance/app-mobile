import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { QuestionTextLinkRowViewModel } from './QuestionTextLinkRowViewModel'

type Props = Readonly<{
  viewModel: QuestionTextLinkRowViewModel
  onLinkPress?: () => void
}>

const QuestionTextLinkRow: FunctionComponent<Props> = ({
  viewModel,
  onLinkPress,
}) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <Text style={styles.text}>
      <Text>{viewModel.content}</Text>
      <Text style={styles.link} onPress={onLinkPress}>
        {viewModel.highlightedSuffix}
      </Text>
    </Text>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    text: {
      ...Typography.body,
      marginBottom: Spacing.margin,
    },
    link: {
      textDecorationLine: 'underline',
      color: theme.coloredText,
    },
  })
}

export default QuestionTextLinkRow
