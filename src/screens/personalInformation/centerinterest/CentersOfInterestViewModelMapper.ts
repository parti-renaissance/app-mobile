import { Interest } from '../../../core/entities/Interest'
import { CentersOfInterestInteractorResult } from '../../../core/interactor/GetCentersOfInterestInteractor'
import {
  CentersOfInterestViewModel,
  InterestViewModel,
} from './CentersOfInterestViewModel'

export const CentersOfInterestViewModelMapper = {
  map: (
    result: CentersOfInterestInteractorResult,
  ): CentersOfInterestViewModel => {
    const viewModelResults = result.interests.map((value) =>
      mapInterest(result, value),
    )
    return {
      interests: viewModelResults,
    }
  },
}
function mapInterest(
  result: CentersOfInterestInteractorResult,
  interest: Interest,
): InterestViewModel {
  return {
    code: interest.code,
    label: interest.label,
    isSelected: result.userInterests.includes(interest.code),
    image: require('../../../assets/images/interests/iconGeneric.png'),
  }
}
