import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, Image, Linking } from 'react-native'
import { Spacing, Typography } from '../../styles'
import CardView from '../shared/CardView'
import { useTheme, useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { RetaliationCardViewModel } from './RetaliationCardViewModel'
import Clipboard from '@react-native-community/clipboard'

type Props = Readonly<{
  viewModel: RetaliationCardViewModel
}>

export const Retaliate = (text: string, url: string) => {
  Clipboard.setString(text)
  Linking.openURL(url)
}

const RetaliationCard: FunctionComponent<Props> = ({ viewModel }) => {
  const { theme } = useTheme()
  const styles = useThemedStyles(stylesFactory)
  return (
    <CardView style={styles.cardView} backgroundColor={theme.lightBackground}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={viewModel.socialIcon} />
          <Text style={styles.title}>{viewModel.title}</Text>
        </View>
        <Text style={styles.body}>{viewModel.body}</Text>
      </View>
    </CardView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    body: {
      ...Typography.body,
      marginTop: Spacing.margin,
    },
    cardView: {
      marginHorizontal: Spacing.margin,
      marginVertical: Spacing.margin,
    },
    container: {
      padding: Spacing.margin,
    },
    title: {
      ...Typography.title2,
      marginBottom: Spacing.margin,
      marginLeft: Spacing.margin,
    },
    titleContainer: {
      flexDirection: 'row',
    },
  })
}

export default RetaliationCard
