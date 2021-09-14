export type PhoningSessionDevice = 'current' | 'external'

export interface PhoningSessionNavigationData {
  campaignId: string
  sessionId: string
  device: PhoningSessionDevice
}
