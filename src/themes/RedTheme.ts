import RegionTheme from '../core/entities/RegionTheme'
import { Colors } from '../styles'
import Theme from './Theme'

const punch = '#df372a'
const punch80Light = '#E55F55'
const punch50Light = '#EF9B95'
const chablis = '#fff5f5'

const RedTheme: Theme = {
  id: RegionTheme.RED,
  primaryColor: punch,
  lightBackground: chablis,
  primaryButtonBackgroundDisabled: punch80Light,
  primaryButtonBackgroundHighlight: punch50Light,
  primaryButtonTextColor: Colors.white,
  coloredText: punch,
  image: {
    near: () => require('../assets/images/red/imageProche.png'),
    reforms: () => require('../assets/images/red/imageReformes.png'),
    covid: () => require('../assets/images/red/imageCovid.png'),
    desintox: () => require('../assets/images/red/imageDesintox.png'),
    answers: () => require('../assets/images/red/imageReponses.png'),
    error: () => require('../assets/images/red/imageErreur.png'),
    emptyPoll: () => require('../assets/images/red/imageSondage.png'),
    pollImage1: () => require('../assets/images/red/imageSondage01.png'),
    pollImage2: () => require('../assets/images/red/imageSondage02.png'),
    pollImage3: () => require('../assets/images/red/imageSondage03.png'),
    pollImage4: () => require('../assets/images/red/imageSondage04.png'),
    pollSuccess: () => require('../assets/images/red/imageMerci.png'),
    pollTools: () =>
      require('../assets/images/red/navigationBarLeftAccessoriesOutils.png'),
    profile: () => require('../assets/images/red/imageProfil.png'),
    profilePoll: () => require('../assets/images/red/imageSondageProfil.png'),
    region: () => require('../assets/images/red/imageRegion.png'),
    homeNews: () => require('../assets/images/red/imageActualite.png'),
    homeTools: () => require('../assets/images/red/imageOutilsprofil.png'),
    zipCode: () => require('../assets/images/red/imageCodePostal.png'),
  },
}

export default RedTheme
