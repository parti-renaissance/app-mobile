import { BuildingBlock } from './../../core/entities/BuildingBlock'
import { BuildingHistoryViewModelMapper } from './BuildingHistoryViewModelMapper'
import { BuildingHistoryPoint } from './../../core/entities/BuildingHistory'
import { DoorToDoorAddressCampaign } from './../../core/entities/DoorToDoor'
import { BuildingStatusViewModelMapper } from './BuildingStatusViewModelMapper'
import { ImageSourcePropType } from 'react-native'
import { BuildingDetailScreenViewModel } from './BuildingDetailScreenViewModel'
import { BuildingLayoutViewModelMapper } from './BuildingLayoutViewModelMapper'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import i18n from '../../utils/i18n'
import { formatLocalizedDate } from '../../utils/DateFormatter'

export const BuildingDetailScreenViewModelMapper = {
  map: (
    address: DoorToDoorAddress,
    history: BuildingHistoryPoint[],
    layout: BuildingBlock[],
  ): BuildingDetailScreenViewModel => {
    const illustration = (): ImageSourcePropType => {
      switch (address.building.type) {
        case 'house':
          return require('../../assets/images/imageHouse.png')
        case 'building':
          return require('../../assets/images/imageBuilding.png')
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
      status: BuildingStatusViewModelMapper.map(address, layout),
      history: BuildingHistoryViewModelMapper.map(history),
      buildingLayout: BuildingLayoutViewModelMapper.map(
        address.building.type,
        address.building.campaignStatistics.status,
        layout,
      ),
      campaignId: address.building.campaignStatistics.campaignId,
    }
  },
}

function lastVisit(campaign: DoorToDoorAddressCampaign): string {
  return campaign && campaign.lastPassage
    ? i18n.t('doorToDoor.lastPassage') + ' ' + mapDate(campaign.lastPassage)
    : i18n.t('doorToDoor.noPassage')
}

function mapDate(lastPassage: Date): string {
  return formatLocalizedDate(lastPassage, i18n.t('doorToDoor.date_format'))
}
