import { create } from 'zustand'
import { PhoningCampaign } from '@/core/entities/PhoningCampaign'
import { PhoningSession } from '@/core/entities/PhoningSession'

type PhoningCampaignStore = {
    campaign: PhoningCampaign|null
    setCampaign: (campaign: PhoningCampaign) => void
}

export const useCampaignStore = create<PhoningCampaignStore>((set) => ({
  campaign: null,
  setCampaign: (campaign: PhoningCampaign) => set({ campaign })
}))


type PhoningCharterStore = {
    charter: string | null
    setCharter: (harter: PhoningCharterStore['charter']) => void
}

export const useCharterStore = create<PhoningCharterStore>((set) => ({
  charter: null,
  setCharter: (charter: PhoningCharterStore['charter']) => set({ charter })
}))


type PhoningSessionStore = {
    session: PhoningSession | null
    setSession: (adherant: PhoningSession) => void
}

export const useSessionStore = create<PhoningSessionStore>((set) => ({
  session: null,
  setSession: (x) => set({ session: x })
}))
