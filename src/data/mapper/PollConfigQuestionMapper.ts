import {
  PollExtraQuestion,
  PollExtraQuestionOptions,
  PollExtraQuestionPage,
  PollExtraQuestionType,
} from '../../core/entities/PollExtraQuestion'
import {
  NO_ID,
  YES_ID,
} from '../../screens/pollDetailUserData/PollDetailQuestionUserDataViewModelMapper'
import {
  RestPollConfigQuestion,
  RestPollConfigQuestionBooleanOptions,
  RestPollConfigQuestionChoiceOptions,
  RestPollConfigQuestionCompounOptions,
  RestPollConfigQuestionOptions,
  RestPollConfigQuestionPage,
  RestPollConfigQuestionTextOptions,
  RestPollConfigQuestionType,
} from '../restObjects/RestPollConfigQuestion'

export const PollConfigQuestionPageMapper = {
  map: (restObject: RestPollConfigQuestionPage): PollExtraQuestionPage => {
    return {
      description: restObject.description,
      questions: PollConfigQuestionMapper.map(restObject.questions),
    }
  },
}

export const PollConfigQuestionMapper = {
  map: (restArray: Array<RestPollConfigQuestion>): Array<PollExtraQuestion> => {
    return restArray.map((question) => {
      const dependency = question.dependency
        ? {
            question: question.dependency.question,
            choices: question.dependency.choices.map((choice) => {
              let value: string = ''
              if (typeof choice === 'boolean') {
                value = choice ? YES_ID : NO_ID
              } else if (typeof choice === 'string') {
                value = choice
              }
              return value
            }),
          }
        : undefined

      let type: string
      switch (question.type) {
        case 'boolean':
          type = 'dualChoice'
          break
        case 'choice':
          type = 'choice'
          break
        case 'compound':
          type = 'compound'
          break
        case 'text':
          type = 'text'
          break
      }

      return {
        code: question.code,
        type: type as PollExtraQuestionType,
        dependency: dependency,
        options: PollConfigQuestionOptionsMapper.map(
          question.type,
          question.options,
        ),
      }
    })
  },
}

export const PollConfigQuestionOptionsMapper = {
  map: (
    type: RestPollConfigQuestionType,
    restObject: RestPollConfigQuestionOptions,
  ): PollExtraQuestionOptions => {
    switch (type) {
      case 'boolean':
        const booleanOptions = restObject as RestPollConfigQuestionBooleanOptions
        return {
          title: booleanOptions.label,
          subtitle: booleanOptions.help,
          required: booleanOptions.required,
        }
      case 'choice':
        const choiceOptions = restObject as RestPollConfigQuestionChoiceOptions
        const choices = Array.from(
          new Map(Object.entries(choiceOptions.choices)),
          ([name, value]) => {
            return { code: name, label: value }
          },
        )
        let columns: number
        switch (choiceOptions.widget) {
          case 'single_row':
            columns = choices.length
            break
          case 'cols_1':
            columns = 1
            break
          case 'cols_2':
            columns = 2
            break
        }
        return {
          title: choiceOptions.label,
          required: choiceOptions.required,
          columns: columns,
          multiple: choiceOptions.multiple,
          choices: choices,
        }
      case 'compound':
        const compoundOptions = restObject as RestPollConfigQuestionCompounOptions
        return {
          label: compoundOptions.label,
          required: compoundOptions.required,
          children: PollConfigQuestionMapper.map(compoundOptions.children),
        }
      case 'text':
        const textOptions = restObject as RestPollConfigQuestionTextOptions
        return {
          label: textOptions.label,
          required: textOptions.required,
          placeholder: textOptions.placeholder,
        }
    }
  },
}
