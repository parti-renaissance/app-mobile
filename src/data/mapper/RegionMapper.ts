import { Region } from '../../core/entities/Region'
import RegionTheme from '../../core/entities/RegionTheme'
import { RestRegion } from '../restObjects/RestRegion'
import { CampaignMapper } from './CampaignMapper'
import { ThemeMapper } from './ThemeMapper'

export const RegionMapper = {
  map: (restRegion: RestRegion): Region => {
    return {
      id: restRegion.uuid,
      name: restRegion.name,
      code: restRegion.code,
      theme: restRegion.campaign
        ? ThemeMapper.map(restRegion.campaign.primary_color)
        : RegionTheme.BLUE,
      campaign: restRegion.campaign
        ? CampaignMapper.map(restRegion.campaign)
        : null,
    }
  },
}
