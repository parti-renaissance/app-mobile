import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { PoiAddressCardViewModel } from './PoiAddressCardViewModel'

export const PoiAddressCardViewModelMapper = {
  map: (poiAddress: DoorToDoorAddress): PoiAddressCardViewModel => {
    return {
      id: poiAddress.id,
      formattedAddress: i18n.t('doorToDoor.address', {
        number: poiAddress.number,
        street: poiAddress.address,
      }),
      icon: require('../../assets/images/papHomeIcon.png'),
      statusIcon: require('../../assets/images/papDoneIcon.png'),
      passage: 'Aucun passage', // TODO - changes static data with api
      indicator: '10/10', // TODO - changes static data with api
      note: 'PORTES FRAPPÉES', // TODO - changes static data with api
    }
  },
}
