import React, { FunctionComponent } from 'react'
import { HomeRetaliationRowContainerViewModel } from '../HomeRowViewModel'
import { ScrollView } from 'react-native-gesture-handler'
import RetaliationCard from './RetaliationCard'
import { RetaliationCardViewModel } from './RetaliationCardViewModel'
import { StyleSheet, View } from 'react-native'
import { Spacing } from '../../../styles'

type Props = Readonly<{
  viewModel: HomeRetaliationRowContainerViewModel
}>

const HomeRetaliationRowContainer: FunctionComponent<Props> = ({
  viewModel,
}) => {
  return (
    <ScrollView>
      <Cards viewModel={viewModel} />
    </ScrollView>
  )
}

const Cards: FunctionComponent<Props> = ({ viewModel }) => {
  const styles = stylesFactory()
  return (
    <View style={styles.container}>
      {viewModel.retaliations.map(
        (retaliationViewModel: RetaliationCardViewModel) => {
          return <RetaliationCard viewModel={retaliationViewModel} />
        },
      )}
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: Spacing.margin,
    },
  })
}

export default HomeRetaliationRowContainer
