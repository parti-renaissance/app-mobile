import React, { FunctionComponent } from 'react'
import { SectionList, StyleSheet, Text } from 'react-native'
import { Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import QuestionChoiceRow from '../pollDetail/QuestionChoiceRow'
import { QuestionChoiceRowViewModel } from '../pollDetail/QuestionChoiceRowViewModel'
import { PollDetailQuestionUserProfileViewModel } from './PollDetailQuestionUserProfileViewModel'
import { UserProfileSection } from './PollDetailQuestionUserProfileViewModelMapper'
import QuestionGenderRow from './QuestionGenderRow'
import { QuestionGenderRowViewModel } from './QuestionGenderRowViewModel'
import QuestionUserProfileSectionHeader from './QuestionUserProfileSectionHeader'

type Props = Readonly<{
  viewModel: PollDetailQuestionUserProfileViewModel
  onGenderChange?: (genderId: string) => void
  onAgeChange?: (ageId: string) => void
  onProfessionChange?: (professionId: string) => void
}>

const PollDetailQuestionUserProfile: FunctionComponent<Props> = ({
  viewModel,
  onGenderChange,
  onAgeChange,
  onProfessionChange,
}) => {
  const renderGender = (item: QuestionGenderRowViewModel): JSX.Element => {
    return (
      <QuestionGenderRow
        viewModel={item}
        onGenderSelected={(genderId) => onGenderChange?.(genderId)}
      />
    )
  }

  const renderChoice = (
    item: QuestionChoiceRowViewModel,
    sectionId: string,
  ): JSX.Element => {
    return (
      <QuestionChoiceRow
        viewModel={item}
        onPress={() => {
          switch (sectionId) {
            case UserProfileSection.Gender:
              break // no op
            case UserProfileSection.Age:
              onAgeChange?.(item.id)
              break
            case UserProfileSection.Profession:
              onProfessionChange?.(item.id)
              break
          }
        }}
      />
    )
  }

  return (
    <SectionList
      stickySectionHeadersEnabled={false}
      contentContainerStyle={styles.container}
      style={styles.list}
      sections={viewModel.sections}
      renderItem={({ item, section }) => {
        switch (item.type) {
          case 'gender':
            return renderGender(item.value)
          case 'choice':
            return renderChoice(item.value, section.id)
        }
      }}
      keyExtractor={(item, index) => item.value.id + index}
      renderSectionHeader={({ section: { title } }) => (
        <QuestionUserProfileSectionHeader title={title} />
      )}
      ListHeaderComponent={() => {
        return (
          <Text style={styles.headerText}>
            {i18n.t('polldetail.profile.header')}
          </Text>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  headerText: {
    ...Typography.body,
  },
  list: {
    flex: 1,
  },
})

export default PollDetailQuestionUserProfile
