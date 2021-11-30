import { DoorToDoorCampaignCardViewModel } from './DoorToDoorCampaignCardViewModel'

export const DoorToDoorCampaignCardViewModelMapper = {
  map: (): DoorToDoorCampaignCardViewModel => {
    return {
      name: 'Campagne nationale', // TODO - changes static data with api
      date: 'jusqu’au 3 jan. 2022', // TODO - changes static data with api & i18n
      goal: '03/30', // TODO - changes static data with api & i18n
    }
  },
}
