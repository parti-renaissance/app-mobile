import RegionTheme from '../core/entities/RegionTheme'
import { Colors } from '../styles'
import Theme from './Theme'

const cupid = '#fac7c7'
const cupid80Light = '#FBD2D2'
const cupid50Light = '#FDE3E3'
const chablis = '#fff6f6'
const wildWatermelon = '#fe596a'

const PinkTheme: Theme = {
  id: RegionTheme.PINK,
  primaryColor: cupid,
  lightBackground: chablis,
  primaryButtonBackgroundDisabled: cupid80Light,
  primaryButtonBackgroundHighlight: cupid50Light,
  primaryButtonTextColor: Colors.shipGray,
  coloredText: wildWatermelon,
  image: {
    near: () => require('../assets/images/pink/imageProche.png'),
    reforms: () => require('../assets/images/pink/imageReformes.png'),
    covid: () => require('../assets/images/pink/imageCovid.png'),
    desintox: () => require('../assets/images/pink/imageDesintox.png'),
    answers: () => require('../assets/images/pink/imageReponses.png'),
    error: () => require('../assets/images/pink/imageErreur.png'),
    emptyPoll: () => require('../assets/images/pink/imageSondage.png'),
    pollImage1: () => require('../assets/images/pink/imageSondage01.png'),
    pollImage2: () => require('../assets/images/pink/imageSondage02.png'),
    pollImage3: () => require('../assets/images/pink/imageSondage03.png'),
    pollImage4: () => require('../assets/images/pink/imageSondage04.png'),
    pollSuccess: () => require('../assets/images/pink/imageMerci.png'),
    pollTools: () =>
      require('../assets/images/pink/navigationBarLeftAccessoriesOutils.png'),
    profile: () => require('../assets/images/pink/imageProfil.png'),
    profilePoll: () => require('../assets/images/pink/imageSondageProfil.png'),
    region: () => require('../assets/images/pink/imageRegion.png'),
    homeNews: () => require('../assets/images/pink/imageActualite.png'),
    homeTools: () => require('../assets/images/pink/imageOutilsprofil.png'),
    zipCode: () => require('../assets/images/pink/imageCodePostal.png'),
  },
}

export default PinkTheme
