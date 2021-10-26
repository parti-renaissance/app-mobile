import { PhoningSessionAdherent } from '../../core/entities/PhoningSessionAdherent'

export type PhoningSessionDevice = 'current' | 'external'

export interface PhoningSessionNavigationData {
  campaignId: string
  campaignTitle: string
  sessionId: string
  device: PhoningSessionDevice
  adherent: PhoningSessionAdherent | null
  // The adherent is not provided only for the permanent campaign.
}

// Some screens in the phoning workflow need an adherent.
export interface PhoningSessionNavigationDataRequiredAdherent {
  campaignId: string
  campaignTitle: string
  sessionId: string
  device: PhoningSessionDevice
  adherent: PhoningSessionAdherent
}
