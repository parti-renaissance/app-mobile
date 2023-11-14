import React, { FunctionComponent } from 'react'
import {
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing } from '../../styles'
import PollDetailQuestionInputContent from '../pollDetail/PollDetailQuestionInputContent'
import QuestionDualChoiceRow from '../pollDetailUserData/QuestionDualChoiceRow'
import QuestionUserProfileSectionHeader from '../pollDetailUserProfile/QuestionUserProfileSectionHeader'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import {
  PhonePollSatisfactionSectionContentViewModel,
  PhonePollSatisfactionViewModel,
} from './PhonePollSatisfactionViewModel'
import {
  PHONE_POLL_SATISFACTION_NO_ID,
  PHONE_POLL_SATISFACTION_YES_ID,
} from './PhonePollSatisfactionViewModelMapper'
import SatisfactionQuestionChoice from './question/SatisfactionQuestionChoice'
import QuestionRateRow from './rate/QuestionRateRow'

type Props = Readonly<{
  viewModel: PhonePollSatisfactionViewModel
  onUpdateBoolean: (questionId: string, choice: boolean) => void
  onUpdateRating: (questionId: string, rate: number) => void
  onUpdateChoice: (questionId: string, choiceId: string) => void
  onUpdateInput: (questionId: string, text: string) => void
}>

const PhonePollSatisfactionScreen: FunctionComponent<Props> = ({
  viewModel,
  onUpdateBoolean,
  onUpdateRating,
  onUpdateChoice,
  onUpdateInput,
}) => {
  const renderItem = (
    info: SectionListRenderItemInfo<PhonePollSatisfactionSectionContentViewModel>,
  ) => {
    switch (info.item.type) {
      case 'boolean':
        return (
          <QuestionDualChoiceRow
            viewModel={info.item.value}
            onPress={(choiceId) => {
              const questionId = info.item.value.id
              switch (choiceId) {
                case PHONE_POLL_SATISFACTION_YES_ID:
                  onUpdateBoolean(questionId, true)
                  break
                case PHONE_POLL_SATISFACTION_NO_ID:
                  onUpdateBoolean(questionId, false)
                  break
                default:
                  throw 'Wrong id for boolean question'
              }
            }}
          />
        )
      case 'rate':
        return (
          <QuestionRateRow
            viewModel={info.item.value}
            onRateUpdate={(rate: number) => {
              onUpdateRating(info.item.value.id, rate)
            }}
          />
        )
      case 'single_choice':
        return (
          <SatisfactionQuestionChoice
            viewModel={info.item.value}
            toggleChoice={(choiceId) => {
              onUpdateChoice(info.item.value.id, choiceId)
            }}
          />
        )
      case 'input':
        return (
          <PollDetailQuestionInputContent
            viewModel={info.item.value}
            onChangeText={(text: string) => {
              onUpdateInput(info.item.value.id, text)
            }}
          />
        )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardOffsetView>
        <SectionList
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContainer}
          style={styles.list}
          sections={viewModel.sections}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.value.id + index}
          renderSectionHeader={({ section: { title } }) => (
            <QuestionUserProfileSectionHeader title={title} />
          )}
        />
      </KeyboardOffsetView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: Spacing.largeMargin,
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.unit,
  },
})

export default PhonePollSatisfactionScreen
