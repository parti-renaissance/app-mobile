import React, { FunctionComponent, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from 'react-native'
import { PhoningSessionCallStatus } from '../../core/entities/PhoningSessionConfiguration'

import { Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import QuestionChoiceRow from '../pollDetail/QuestionChoiceRow'
import { QuestionChoiceRowViewModel } from '../pollDetail/QuestionChoiceRowViewModel'
import { PrimaryButton } from '../shared/Buttons'
import { PhonePollDetailCallStatusViewModelMapper } from './PhonePollDetailCallStatusViewModelMapper'

type Props = Readonly<{
  callStatuses: Array<PhoningSessionCallStatus>
  onInterruption: (statusCode: string) => void
}>

const PhonePollDetailInterruptionModalContent: FunctionComponent<Props> = ({
  callStatuses,
  onInterruption,
}) => {
  const [selectedStatusCode, setSelectedStatusCode] = useState<string>()

  const viewModel = PhonePollDetailCallStatusViewModelMapper.map(
    callStatuses,
    selectedStatusCode,
  )

  const renderItem = ({
    item,
  }: ListRenderItemInfo<QuestionChoiceRowViewModel>) => {
    return (
      <QuestionChoiceRow
        viewModel={item}
        onPress={() => setSelectedStatusCode(item.id)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('phonepolldetail.interruption_alert.title')}
      </Text>
      <FlatList
        bounces={false}
        data={viewModel.choices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <PrimaryButton
        style={styles.button}
        disabled={!viewModel.isActionEnabled}
        onPress={() => selectedStatusCode && onInterruption(selectedStatusCode)}
        title={i18n.t('phonepolldetail.interruption_alert.action')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginBottom: Spacing.unit,
    marginTop: Spacing.margin,
  },
  container: {
    maxHeight: '100%',
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
    paddingVertical: Spacing.margin,
  },
})

export default PhonePollDetailInterruptionModalContent
