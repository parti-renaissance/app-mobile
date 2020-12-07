import { Profile } from '../../core/entities/Profile'
import { RestProfileResponse } from '../restObjects/RestProfileResponse'

export const ProfileFromRestProfileResponseMapper = {
  map: (result: RestProfileResponse): Profile => {
    return {
      firstName: result.first_name,
      lastName: result.last_name,
      uuid: result.uuid,
      zipCode: result.postal_code,
      totalSurveys: result.surveys.total,
      totalSurveysLastMonth: result.surveys.last_month,
    }
  },
}
