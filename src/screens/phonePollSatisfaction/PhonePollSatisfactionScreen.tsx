import React, { FunctionComponent } from 'react'
import {
  StyleSheet,
  SectionList,
  SectionListRenderItemInfo,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing } from '../../styles'
import QuestionDualChoiceRow from '../pollDetailUserData/QuestionDualChoiceRow'
import QuestionUserProfileSectionHeader from '../pollDetailUserProfile/QuestionUserProfileSectionHeader'
import {
  PhonePollSatisfactionSectionContentViewModel,
  PhonePollSatisfactionViewModel,
} from './PhonePollSatisfactionViewModel'
import {
  PHONE_POLL_SATISFACTION_NO_ID,
  PHONE_POLL_SATISFACTION_YES_ID,
} from './PhonePollSatisfactionViewModelMapper'

type Props = Readonly<{
  viewModel: PhonePollSatisfactionViewModel
  onUpdateBoolean: (questionId: string, choice: boolean) => void
}>

const PhonePollSatisfactionScreen: FunctionComponent<Props> = ({
  viewModel,
  onUpdateBoolean,
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
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
})

export default PhonePollSatisfactionScreen
