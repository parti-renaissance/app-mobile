import { RestPhoningCampaign } from '../restObjects/RestPhoningCampaign'
import { PhoningCampaign } from '../../core/entities/PhoningCampaign'

export const PhoningCampaignMapper = {
  map: (restObject: RestPhoningCampaign): PhoningCampaign => {
    return {
      id: restObject.uuid,
      title: restObject.title,
      brief: restObject.brief,
      goal: restObject.goal,
      callsCount: restObject.nb_calls,
      finishAt: new Date(restObject.finish_at),
    }
  },
}
