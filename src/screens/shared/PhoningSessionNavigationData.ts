import { PhoningSessionAdherent } from '../../core/entities/PhoningSessionAdherent'

export type PhoningSessionDevice = 'current' | 'external'

export interface PhoningSessionNavigationData {
  campaignId: string
  campaignTitle: string
  sessionId: string
  device: PhoningSessionDevice
  adherent: PhoningSessionAdherent
}
