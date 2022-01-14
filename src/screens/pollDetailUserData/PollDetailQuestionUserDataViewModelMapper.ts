import { UserConsentData } from '../../core/entities/UserConsentData'
import i18n from '../../utils/i18n'
import {
  PollDetailQuestionUserDataSectionViewModel,
  PollDetailQuestionUserDataViewModel,
} from './PollDetailQuestionUserDataViewModel'

export const CONSENT_ITEM_ID = 'consent'
export const INVITATION_ITEM_ID = 'invitation'
export const YES_ID = 'yes'
export const NO_ID = 'no'

export enum FORM_INPUT_ID {
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
  zipCode = 'zipCode',
}

const consentSection = (
  data: UserConsentData,
): PollDetailQuestionUserDataSectionViewModel => {
  return {
    id: 'consent',
    title: i18n.t('polldetail.user_form.consent_title'),
    data: [
      {
        type: 'textLink',
        value: {
          id: 'consentLink',
          content: i18n.t('polldetail.user_form.consent_subtitle'),
          highlightedSuffix: i18n.t(
            'polldetail.user_form.consent_subtitle_suffix',
          ),
        },
      },
      {
        type: 'dualChoice',
        value: {
          id: CONSENT_ITEM_ID,
          first: {
            id: YES_ID,
            title: i18n.t('polldetail.user_form.positive_choice'),
            isSelected: data.isConsenting === true,
          },
          second: {
            id: NO_ID,
            title: i18n.t('polldetail.user_form.negative_choice'),
            isSelected: data.isConsenting === false,
          },
        },
      },
    ],
  }
}

const formSection = (
  data: UserConsentData,
): PollDetailQuestionUserDataSectionViewModel => {
  return {
    id: 'form',
    title: i18n.t('polldetail.user_form.form_title'),
    data: [
      {
        type: 'textInput',
        value: {
          id: FORM_INPUT_ID.firstName,
          title: i18n.t('polldetail.user_form.first_name'),
          value: data.firstName ?? '',
          autocapitalize: 'words',
          keyboardType: 'default',
        },
      },
      {
        type: 'textInput',
        value: {
          id: FORM_INPUT_ID.lastName,
          title: i18n.t('polldetail.user_form.last_name'),
          value: data.lastName ?? '',
          autocapitalize: 'words',
          keyboardType: 'default',
        },
      },
      {
        type: 'textInput',
        value: {
          id: FORM_INPUT_ID.email,
          title: i18n.t('polldetail.user_form.email'),
          value: data.email ?? '',
          autocapitalize: 'none',
          keyboardType: 'email-address',
        },
      },
      {
        type: 'textInput',
        value: {
          id: FORM_INPUT_ID.zipCode,
          title: i18n.t('polldetail.user_form.zip_code'),
          value: data.zipCode ?? '',
          autocapitalize: 'none',
          keyboardType: 'number-pad',
          maxLength: 5,
        },
      },
    ],
  }
}

export const PollDetailQuestionUserDataViewModelMapper = {
  map: (data: UserConsentData): PollDetailQuestionUserDataViewModel => {
    var sections: Array<PollDetailQuestionUserDataSectionViewModel> = [
      consentSection(data),
    ]
    if (data.isConsenting) {
      sections.push(formSection(data))
    }
    return { sections: sections }
  },
}
