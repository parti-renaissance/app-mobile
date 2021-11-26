import { Moment } from 'moment-timezone'
import { ImageSourcePropType } from 'react-native'
import {
  DoorToDoorAddress,
  DoorToDoorAddressCampaign,
} from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { DoorToDoorDisplayMode } from './DoorToDoor'
import { PoiAddressCardViewModel } from './PoiAddressCardViewModel'

export const PoiAddressCardViewModelMapper = {
  map: (
    displayMode: DoorToDoorDisplayMode,
    poiAddress?: DoorToDoorAddress,
  ): PoiAddressCardViewModel | undefined => {
    return poiAddress
      ? {
          id: poiAddress.id,
          formattedAddress: i18n.t('doorToDoor.address', {
            number: poiAddress.number,
            street: poiAddress.address,
          }),
          icon:
            poiAddress.building.type === 'house'
              ? require('../../assets/images/papHomeIcon.png')
              : require('../../assets/images/papBuildingIcon.png'),
          statusIcon: mapStatusIcon(poiAddress.building.campaignStatistics),
          passage: mapLastPassage(poiAddress.building.campaignStatistics),
          nbSurveys: poiAddress.building.campaignStatistics
            ? poiAddress.building.campaignStatistics.nbSurveys
            : 0,
          label:
            displayMode === 'map'
              ? i18n.t('doorToDoor.doorKnocked')
              : i18n.t('doorToDoor.electorsMet'),
        }
      : undefined
  },
}

function mapLastPassage(campaignStatistics: DoorToDoorAddressCampaign): string {
  return campaignStatistics && campaignStatistics.lastPassage
    ? i18n.t('doorToDoor.lastPassage') +
        '\n' +
        i18n.t('doorToDoor.lastPassageBy', {
          firstname: campaignStatistics.lastPassageDoneBy.firstName,
          lastname: campaignStatistics.lastPassageDoneBy.lastName
            .charAt(0)
            .toUpperCase(),
          date: mapDate(campaignStatistics.lastPassage),
        })
    : i18n.t('doorToDoor.noPassage')
}

function mapDate(lastPassage: Moment): string {
  return lastPassage.format(i18n.t('doorToDoor.date_format'))
}

function mapStatusIcon(
  campaignStatistics: DoorToDoorAddressCampaign,
): ImageSourcePropType {
  switch (campaignStatistics?.status) {
    case 'todo':
      return require('../../assets/images/papTodoIcon.png')
    case 'ongoing':
      return require('../../assets/images/papToFinishIcon.png')
    case 'completed':
      return require('../../assets/images/papDoneIcon.png')

    default:
      return require('../../assets/images/papTodoIcon.png')
  }
}
