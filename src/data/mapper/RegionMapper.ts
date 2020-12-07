import { Region } from '../../core/entities/Region'
import { RestRegion } from '../restObjects/RestRegion'
import { ThemeMapper } from './ThemeMapper'

export const RegionMapper = {
  map: (restRegion: RestRegion): Region => {
    return {
      id: restRegion.uuid,
      name: restRegion.name,
      code: restRegion.code,
      subtitle: restRegion.subtitle,
      description: restRegion.description,
      theme: ThemeMapper.map(restRegion.primary_color),
      externalLink: restRegion.external_link,
      slug: restRegion.slug,
      logo: restRegion.logo,
      banner: restRegion.banner,
    }
  },
}
