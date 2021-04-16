import { ImageSourcePropType } from 'react-native'
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
    image: mapImage(interest.code),
  }
}
function mapImage(code: string): ImageSourcePropType {
  switch (code) {
    case 'agriculture':
      return require('../../../assets/images/interests/iconAgriculture.png')
    case 'culture':
      return require('../../../assets/images/interests/iconCulture.png')
    case 'economie':
      return require('../../../assets/images/interests/iconEconomie.png')
    case 'education':
      return require('../../../assets/images/interests/iconEducation.png')
    case 'egalite':
      return require('../../../assets/images/interests/iconEgalite.png')
    case 'emploi':
      return require('../../../assets/images/interests/iconEmploi.png')
    case 'environement':
      return require('../../../assets/images/interests/iconEnvironement.png')
    case 'europe':
      return require('../../../assets/images/interests/iconEurope.png')
    case 'international':
      return require('../../../assets/images/interests/iconInternational.png')
    case 'justice':
      return require('../../../assets/images/interests/iconJustice.png')
    case 'numerique':
      return require('../../../assets/images/interests/iconNumerique.png')
    case 'sante':
      return require('../../../assets/images/interests/iconSante.png')
    case 'securite':
      return require('../../../assets/images/interests/iconSecurite.png')
    case 'institution':
      return require('../../../assets/images/interests/iconInstitution.png')
    case 'territoire':
    case 'jeunesse':
    case 'social':
    case 'sport':
    default:
      return require('../../../assets/images/interests/iconGeneric.png')
  }
}
