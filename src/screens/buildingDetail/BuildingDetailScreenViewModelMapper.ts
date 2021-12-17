import { BuildingHistoryViewModelMapper } from './BuildingHistoryViewModelMapper'
import { BuildingHistoryPoint } from './../../core/entities/BuildingHistory'
import { DoorToDoorAddressCampaign } from './../../core/entities/DoorToDoor'
import { BuildingStatusViewModelMapper } from './BuildingStatusViewModelMapper'
import { ImageSourcePropType } from 'react-native'
import { BuildingDetailScreenViewModel } from './BuildingDetailScreenViewModel'
import { BuildingLayoutViewModelMapper } from './BuildingLayoutViewModelMapper'
import Theme from '../../themes/Theme'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { Moment } from 'moment-timezone'

export const BuildingDetailScreenViewModelMapper = {
  map: (
    address: DoorToDoorAddress,
    history: BuildingHistoryPoint[],
    theme: Theme,
  ): BuildingDetailScreenViewModel => {
    const illustration = (): ImageSourcePropType => {
      switch (address.building.type) {
        case 'house':
          return theme.image.house()
        case 'building':
          return theme.image.appartementBuilding()
      }
    }
    return {
      address: i18n.t('doorToDoor.address', {
        number: address.number,
        street: address.address,
      }),
      lastVisit:
        lastVisit(address.building.campaignStatistics) ??
        i18n.t('common.noDataPlaceholder'),
      illustration: illustration(),
      status: BuildingStatusViewModelMapper.map(
        address.building.campaignStatistics,
      ),
      history: BuildingHistoryViewModelMapper.map(history),
      buildingLayout: BuildingLayoutViewModelMapper.map(address.building.type),
      campaignId: address.building.campaignStatistics.campaignId,
    }
  },
}

function lastVisit(campaign: DoorToDoorAddressCampaign): string {
  return campaign && campaign.lastPassage
    ? i18n.t('doorToDoor.lastPassage') + ' ' + mapDate(campaign.lastPassage)
    : i18n.t('doorToDoor.noPassage')
}

function mapDate(lastPassage: Moment): string {
  return lastPassage.format(i18n.t('doorToDoor.date_format'))
}
