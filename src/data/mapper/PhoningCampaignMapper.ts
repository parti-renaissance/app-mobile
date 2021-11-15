import { RestPhoningCampaign } from '../restObjects/RestPhoningCampaign'
import { PhoningCampaign } from '../../core/entities/PhoningCampaign'

export const PhoningCampaignMapper = {
  map: (restObject: RestPhoningCampaign): PhoningCampaign => {
    return {
      id: restObject.uuid,
      title: restObject.title,
      brief: restObject.brief,
      permanent: restObject.permanent,
      goal: restObject.goal,
      callsCount: restObject.nb_calls,
      surveysCount: restObject.nb_surveys,
      finishAt: new Date(restObject.finish_at),
      scoreboard: restObject.scoreboard.map((item) => {
        return {
          caller: item.caller,
          calls: item.nb_calls,
          surveys: item.nb_surveys,
          position: item.position,
          firstName: item.firstName,
        }
      }),
    }
  },
}
