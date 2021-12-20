import {
  PollExtraCompoundAnswer,
  PollExtraMultipleChoicesAnswer,
  PollExtraSingleChoiceAnswer,
  PollExtraTextAnswer,
} from '../../../../../core/entities/PollExtraAnswer'
import {
  PollExtraQuestion,
  PollExtraQuestionChoiceOptions,
  PollExtraQuestionCompoundOptions,
  PollExtraQuestionTextOptions,
} from '../../../../../core/entities/PollExtraQuestion'
import { PollDetailQuestionChoiceViewModel } from '../../../../pollDetail/PollDetailQuestionChoiceViewModel'
import { PollDetailQuestionInputViewModel } from '../../../../pollDetail/PollDetailQuestionInputViewModel'
import { QualificationFormUserDataViewModel } from '../../qualification/QualificationFormUserDataViewModel'

export const PollExtraQuestionMapper = {
  mapInput: (
    question: PollExtraQuestion,
    answer: PollExtraTextAnswer,
  ): PollDetailQuestionInputViewModel => {
    const options = question.options as PollExtraQuestionTextOptions
    return {
      title: options.label,
      content: {
        id: question.code,
        text: answer.value,
      },
    }
  },
  mapSingleChoice: (
    question: PollExtraQuestion,
    answer: PollExtraSingleChoiceAnswer | undefined,
  ): PollDetailQuestionChoiceViewModel => {
    const options = question.options as PollExtraQuestionChoiceOptions
    return {
      title: options.title,
      subtitle: options.subtitle,
      answers: options.choices.map((choice) => {
        return {
          id: choice.code,
          title: choice.label,
          isSelected: answer?.choiceId === choice.code,
        }
      }),
    }
  },
  mapMultipleChoice: (
    question: PollExtraQuestion,
    answer: PollExtraMultipleChoicesAnswer | undefined,
  ): PollDetailQuestionChoiceViewModel => {
    const options = question.options as PollExtraQuestionChoiceOptions
    return {
      title: options.title,
      subtitle: options.subtitle,
      answers: options.choices.map((choice) => {
        return {
          id: choice.code,
          title: choice.label,
          isSelected: answer?.choiceIds?.includes(choice.code) ?? false,
        }
      }),
    }
  },
  mapCompound: (
    question: PollExtraQuestion,
    answer: PollExtraCompoundAnswer,
  ): QualificationFormUserDataViewModel => {
    const options = question.options as PollExtraQuestionCompoundOptions
    const textSubQuestions = options.children.filter(
      (child) => child.type === 'text',
    )
    return {
      id: question.code,
      title: options.label,
      data: textSubQuestions.map((textSubQuestion) => {
        const subQuestyionOptions = textSubQuestion.options as PollExtraQuestionTextOptions
        return {
          id: textSubQuestion.code,
          title: subQuestyionOptions.label,
          value: answer.values.get(textSubQuestion.code) ?? '',
          autocapitalize: 'none',
          keyboardType: 'default',
        }
      }),
    }
  },
}
