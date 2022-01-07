import i18n from '../../utils/i18n'
import { PollDetailProgressBarViewModel } from './PollDetailProgressBarViewModel'
import { StepType } from '../../core/entities/StepType'

const formattedStepType = (stepType: StepType): string | undefined => {
  switch (stepType) {
    case 'remoteQuestion':
      return undefined
    case 'userProfile':
      return i18n.t('polldetail.user_profile_progress')
    case 'consentData':
      return i18n.t('polldetail.consent_data_progress')
    case 'phoneSatisfaction':
      return i18n.t('phonepolldetail.phone_satisfaction')
    case 'doorToDoorQualification':
      return i18n.t('doorToDoor.tunnel.door.qualification.title')
  }
}

const title = (formattedProgress: string, stepType: StepType): string => {
  const step = formattedStepType(stepType)
  if (!step) {
    return formattedProgress
  }
  return i18n.t('polldetail.progress_format_step', {
    progress: formattedProgress,
    step: step,
    interpolation: { escapeValue: false },
  })
}

export const PollDetailProgressBarViewModelMapper = {
  map: (
    currentStep: number,
    numberOfSteps: number,
    stepType: StepType,
  ): PollDetailProgressBarViewModel => {
    const formattedProgress = i18n.t('polldetail.progress_format', {
      currentStep: currentStep + 1,
      numberOfSteps: numberOfSteps,
    })
    return {
      title: title(formattedProgress, stepType),
      progress: (currentStep + 1) / numberOfSteps,
    }
  },
}
