import { Region } from '../../core/entities/Region'
import { RegionViewModel } from './RegionViewModel'

export const RegionViewModelMapper = {
  map: (region: Region): RegionViewModel => {
    return {
      title: region.name,
      subtitle: region.subtitle,
      text: region.description,
      bannerUrl: region.banner,
      logoUrl: region.logo,
      websiteUrl: region.externalLink,
    }
  },
}
