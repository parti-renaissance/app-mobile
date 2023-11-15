import { Campaign } from '../../core/entities/Campaign'
import { RestCampaign } from '../restObjects/RestCampaign'

export const CampaignMapper = {
  map: (restCampaign: RestCampaign): Campaign => {
    return {
      subtitle: restCampaign.subtitle,
      description: restCampaign.description,
      externalLink: restCampaign.external_link,
      slug: restCampaign.slug,
      logo: restCampaign.logo,
      banner: restCampaign.banner,
    }
  },
}
