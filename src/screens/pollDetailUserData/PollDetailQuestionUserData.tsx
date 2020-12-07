import React, { FunctionComponent } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  TextInput,
} from 'react-native'

import { Spacing } from '../../styles'
import QuestionUserProfileSectionHeader from '../pollDetailUserProfile/QuestionUserProfileSectionHeader'
import QuestionDualChoiceRow from './QuestionDualChoiceRow'
import {
  PollDetailQuestionUserDataSectionContentViewModel,
  PollDetailQuestionUserDataViewModel,
  QuestionTextInputRowViewModel,
} from './PollDetailQuestionUserDataViewModel'
import {
  CONSENT_ITEM_ID,
  FORM_INPUT_ID,
  INVITATION_ITEM_ID,
  YES_ID,
} from './PollDetailQuestionUserDataViewModelMapper'
import LabelTextInput from '../shared/LabelTextInput'
import { QuestionDualChoiceRowViewModel } from './QuestionDualChoiceRowViewModel'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import PollDetailPersonalDataInformations from './PollDetailPersonalDataInformations'
import ModalOverlay from '../shared/ModalOverlay'
import QuestionTextLinkRow from './QuestionTextLinkRow'

type Props = Readonly<{
  viewModel: PollDetailQuestionUserDataViewModel
  onConsent?: (isConsenting: boolean) => void
  onInvitation?: (isWillingToJoin: boolean) => void
  onFirstNameChange?: (firstName: string) => void
  onLastNameChange?: (lastName: string) => void
  onEmailChange?: (email: string) => void
  onZipCodeChange?: (zipCode: string) => void
  onBlur: () => void
}>

const booleanValue = (id: string): boolean => {
  return id === YES_ID
}

const PollDetailQuestionUserData: FunctionComponent<Props> = ({
  viewModel,
  onConsent,
  onInvitation,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onZipCodeChange,
  onBlur,
}) => {
  const refStorage: Record<string, TextInput> = {}

  const renderDualChoice = (
    dualChoiceViewModel: QuestionDualChoiceRowViewModel,
  ) => {
    return (
      <QuestionDualChoiceRow
        viewModel={dualChoiceViewModel}
        onPress={(choiceId) => {
          if (dualChoiceViewModel.id === CONSENT_ITEM_ID) {
            onConsent?.(booleanValue(choiceId))
          } else if (dualChoiceViewModel.id === INVITATION_ITEM_ID) {
            onInvitation?.(booleanValue(choiceId))
          }
        }}
      />
    )
  }

  const renderInput = (
    textInputViewModel: QuestionTextInputRowViewModel,
    index: number,
    section: SectionListData<PollDetailQuestionUserDataSectionContentViewModel>,
  ) => {
    const isLastItem = index === section.data.length - 1
    return (
      <LabelTextInput
        ref={(ref: TextInput) => (refStorage[textInputViewModel.id] = ref)}
        style={styles.textInput}
        label={textInputViewModel.title}
        textInputProps={{
          value: textInputViewModel.value,
          autoCapitalize: textInputViewModel.autocapitalize,
          keyboardType: textInputViewModel.keyboardType,
          maxLength: textInputViewModel.maxLength,
          returnKeyType: isLastItem ? 'done' : 'next',
          onChangeText: (text) => {
            switch (textInputViewModel.id) {
              case FORM_INPUT_ID.firstName:
                onFirstNameChange?.(text)
                break
              case FORM_INPUT_ID.lastName:
                onLastNameChange?.(text)
                break
              case FORM_INPUT_ID.email:
                onEmailChange?.(text)
                break
              case FORM_INPUT_ID.zipCode:
                onZipCodeChange?.(text)
                break
            }
          },
          onSubmitEditing: () => {
            if (index + 1 < section.data.length) {
              const nextId = section.data[index + 1].value.id
              refStorage[nextId]?.focus()
            }
          },
          onBlur: onBlur,
        }}
      />
    )
  }

  const renderItem = (
    info: SectionListRenderItemInfo<
      PollDetailQuestionUserDataSectionContentViewModel
    >,
  ) => {
    switch (info.item.type) {
      case 'dualChoice':
        return renderDualChoice(info.item.value)
      case 'textInput':
        return renderInput(info.item.value, info.index, info.section)
      case 'textLink':
        return (
          <QuestionTextLinkRow
            viewModel={info.item.value}
            onLinkPress={() => setModalVisible(true)}
          />
        )
    }
  }

  const [modalVisible, setModalVisible] = React.useState(false)

  return (
    <KeyboardOffsetView>
      <ModalOverlay
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        contentContainerStyle={styles.modal}
      >
        <PollDetailPersonalDataInformations />
      </ModalOverlay>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
  },
  list: {
    flex: 1,
  },
  textInput: {
    marginBottom: Spacing.margin,
  },
  modal: {
    paddingTop: 0,
    paddingBottom: 0,
  },
})

export default PollDetailQuestionUserData
