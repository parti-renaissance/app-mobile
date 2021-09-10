import React, { FunctionComponent } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { Spacing, Typography } from '../../../styles'
import CardView from '../../shared/CardView'
import { useTheme } from '../../../themes'
import ProgressBar from '../../shared/ProgressBar'
import { PrimaryButton } from '../../shared/Buttons'
import i18n from '../../../utils/i18n'

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
        <Text style={styles.title}>{i18n.t('phoning.callcontact.title')}</Text>
        <Image
          style={styles.image}
          source={require('../../../assets/images/blue/imageActualite.png')}
        />
        <Text style={styles.body}>{i18n.t('phoning.callcontact.body')}</Text>
        <ProgressBar progress={viewModel.progress} color={theme.primaryColor} />
        <PrimaryButton
          style={styles.callButton}
          title={i18n.t('phoning.callcontact.callbuttontitle')}
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
