import { Moment } from 'moment-timezone'
import { ImageSourcePropType } from 'react-native'
import {
  DoorToDoorAddress,
  DoorToDoorAddressStatus,
} from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { PoiAddressCardViewModel } from './PoiAddressCardViewModel'

export const PoiAddressCardViewModelMapper = {
  map: (
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
          statusIcon: mapStatusIcon(
            poiAddress.building.campaignStatistics.status,
          ),
          passage: mapDate(poiAddress.building.campaignStatistics.lastPassage),
          nbSurveys: poiAddress.building.campaignStatistics.nbSurveys,
          note: 'ÉLECTEURS RENCONTRÉS', // TODO - changes static data with api
        }
      : undefined
  },
}

function mapDate(lastPassage: Moment): string {
  return lastPassage.format(i18n.t('doorToDoor.date_format'))
}

function mapStatusIcon(status: DoorToDoorAddressStatus): ImageSourcePropType {
  switch (status) {
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
