import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { PoiAddressCardViewModel } from './PoiAddressCardViewModel'

export const PoiAddressCardViewModelMapper = {
  map: (poiAddress: DoorToDoorAddress): PoiAddressCardViewModel => {
    return {
      id: poiAddress.id,
      formattedAddress: poiAddress.formattedAddress,
      icon: require('../../assets/images/papHomeIcon.png'),
      statusIcon: require('../../assets/images/papDoneIcon.png'),
      passage: 'Aucun passage',
      indicator: '10/10',
      note: 'PORTES FRAPPÉES',
    }
  },
}
