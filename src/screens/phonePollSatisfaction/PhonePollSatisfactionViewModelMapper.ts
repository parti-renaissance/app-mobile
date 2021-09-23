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
        const answer = answers.get(question.code)
        switch (question.type) {
          case 'boolean':
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
          case 'text':
            return {
              id: question.code,
              title: question.label,
              data: [
                {
                  type: 'input',
                  value: {
                    id: question.code,
                    text: answer?.type === 'input' ? answer.value : '',
                  },
                },
              ],
            }
          case 'choice':
            const selectedChoiceId = answer?.value
            return {
              id: question.code,
              title: question.label,
              data: [
                {
                  type: 'single_choice',
                  value: {
                    id: question.code,
                    subtitle: i18n.t('polldetail.question_unique_choice'),
                    answers: question.choices.map((choice) => {
                      return {
                        id: choice.id,
                        title: choice.content,
                        isSelected: choice.id === selectedChoiceId,
                      }
                    }),
                  },
                },
              ],
            }
          case 'note':
            const rate =
              answer?.type === 'rate' ? (answer?.value as number) ?? 0 : 0
            return {
              id: question.code,
              title: question.label,
              data: [
                {
                  type: 'rate',
                  value: {
                    id: question.code,
                    values: question.values,
                    value: rate,
                    subtitle: i18n.t('polldetail.question_rate'),
                  },
                },
              ],
            }
        }
      },
    )

    return { sections }
  },
}
