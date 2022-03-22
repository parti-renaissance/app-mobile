import {
  PhoningSessionDevice,
  PhoningSessionNavigationData,
  PhoningSessionNavigationDataRequiredAdherent,
} from '../../screens/shared/PhoningSessionNavigationData'

export type PhoningSessionModalNavigatorParamList = {
  PhoningSessionLoader: {
    campaignId: string
    campaignTitle?: string
    device?: PhoningSessionDevice
  }
  PhoningSessionLoaderPermanentCampaign: {
    campaignId: string
    campaignTitle: string
  }
  PhoningSessionNumberFound: {
    data: PhoningSessionNavigationDataRequiredAdherent
  }
  PhoningSessionNumberFoundOtherDevice: {
    data: PhoningSessionNavigationDataRequiredAdherent
  }
  PhoningSessionNoNumberAvailable: { message: string }
  PhoneCallStatusPicker: { data: PhoningSessionNavigationDataRequiredAdherent }
  PhoneCallFailure: { data: PhoningSessionNavigationData }
  PhonePollDetail: { data: PhoningSessionNavigationData }
  PhonePollDetailSuccess: { data: PhoningSessionNavigationData; title: string }
}
