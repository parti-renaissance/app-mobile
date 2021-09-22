import { PhoningSatisfactionAnswer } from '../../core/entities/PhoningSatisfactionAnswer'
import { PhoningSatisfactionQuestion } from '../../core/entities/PhoningSessionConfiguration'
import i18n from '../../utils/i18n'
import {
  PhonePollSatisfactionSectionViewModel,
  PhonePollSatisfactionViewModel,
} from './PhonePollSatisfactionViewModel'

export const PHONE_POLL_SATISFACTION_YES_ID = 'yes'
export const PHONE_POLL_SATISFACTION_NO_ID = 'no'

export const PhonePollSatisfactionViewModelMapper = {
  map: (
    questions: Array<PhoningSatisfactionQuestion>,
    answers: Map<string, PhoningSatisfactionAnswer>,
  ): PhonePollSatisfactionViewModel => {
    const sections: Array<PhonePollSatisfactionSectionViewModel> = questions.map(
      (question) => {
        switch (question.type) {
          case 'boolean':
            const answer = answers.get(question.code)
            const isYesAnswer =
              answer?.type === 'boolean' ? answer?.value : undefined
            return {
              id: question.code,
              title: question.label,
              data: [
                {
                  type: 'boolean',
                  value: {
                    id: question.code,
                    first: {
                      id: PHONE_POLL_SATISFACTION_YES_ID,
                      title: i18n.t('polldetail.user_form.positive_choice'),
                      isSelected: isYesAnswer === true,
                    },
                    second: {
                      id: PHONE_POLL_SATISFACTION_NO_ID,
                      title: i18n.t('polldetail.user_form.negative_choice'),
                      isSelected: isYesAnswer === false,
                    },
                  },
                },
              ],
            }
        }
      },
    )

    // TODO (Romain GF) 20/09/2021 Use real data when back ready
    const inputId = 'test-input-id'
    const inputAnswer = answers.get(inputId)
    sections.splice(0, 0, {
      id: inputId,
      title: '_INPUT_TITLE_',
      data: [
        {
          type: 'input',
          value: {
            id: inputId,
            text:
              inputAnswer && inputAnswer?.type === 'input'
                ? inputAnswer.value
                : '',
          },
        },
      ],
    })

    return { sections }
  },
}
