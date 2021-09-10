import React, { FunctionComponent } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { Spacing, Typography } from '../../../styles'
import CardView from '../../shared/CardView'
import { useTheme } from '../../../themes'
import ProgressBar from '../../shared/ProgressBar'
import { Button } from 'react-native-paper'
import { PrimaryButton } from '../../shared/Buttons'

type Props = Readonly<{
  viewModel: PhoningCallContactRowViewModel
  onCallButtonPressed: () => void
}>

export interface PhoningCallContactRowViewModel {
  id: string
  progress: number
}

const PhoningCallContactRow: FunctionComponent<Props> = ({
  viewModel,
  onCallButtonPressed,
}) => {
  const { theme } = useTheme()
  return (
    <CardView style={styles.cardView} backgroundColor={theme.lightBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Title Lorem Ipsum'}</Text>
        <Image
          style={styles.image}
          source={require('../../../assets/images/blue/imageActualite.png')}
        />
        <Text style={styles.body}>
          {
            'body Lorem Ipsum, appelez un contact pour tenter de le convaincre de voter Emmanuel Macron'
          }
        </Text>
        <ProgressBar progress={viewModel.progress} color={theme.primaryColor} />
        <PrimaryButton
          style={styles.callButton}
          title={'Appeler un de vos contact'}
          onPress={onCallButtonPressed}
          shape={'rounded'}
        />
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  body: {
    ...Typography.body,
    marginBottom: Spacing.margin,
  },
  cardView: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  callButton: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  container: {
    padding: Spacing.margin,
  },
  image: {
    marginStart: Spacing.unit,
  },
  title: {
    ...Typography.subheadline,
    lineHeight: 20,
    marginBottom: Spacing.margin,
  },
})

export default PhoningCallContactRow
