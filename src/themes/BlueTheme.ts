import RegionTheme from '../core/entities/RegionTheme'
import { Colors } from '../styles'
import Theme from './Theme'

const blueRibbon = '#0d65ff'
const blueRibbon80Light = '#4387ff'
const blueRibbon50Light = '#86b2ff'
const iceBlue = '#f5faff'
const anakiwa = '#b1d8ff'

const BlueTheme: Theme = {
  id: RegionTheme.BLUE,
  primaryColor: blueRibbon,
  lightBackground: iceBlue,
  primaryButtonBackgroundDisabled: blueRibbon80Light,
  primaryButtonBackgroundHighlight: blueRibbon50Light,
  primaryButtonTextColor: Colors.white,
  coloredText: blueRibbon,
  quickPollProgress: anakiwa,
  image: {
    near: () => require('../assets/images/blue/imageProche.png'),
    reforms: () => require('../assets/images/blue/imageReformes.png'),
    anotherMandate: () =>
      require('../assets/images/blue/imageAnotherMandate.png'),
    error: () => require('../assets/images/blue/imageErreur.png'),
    emptyPoll: () => require('../assets/images/blue/imageSondage.png'),
    pollImage1: () => require('../assets/images/blue/imageSondage01.png'),
    pollImage2: () => require('../assets/images/blue/imageSondage02.png'),
    pollImage3: () => require('../assets/images/blue/imageSondage03.png'),
    pollImage4: () => require('../assets/images/blue/imageSondage04.png'),
    pollSuccess: () => require('../assets/images/blue/imageMerci.png'),
    pollTools: () =>
      require('../assets/images/blue/navigationBarLeftAccessoriesOutils.png'),
    profile: () => require('../assets/images/blue/imageProfil.png'),
    profilePoll: () => require('../assets/images/blue/imageSondageProfil.png'),
    region: () => require('../assets/images/blue/imageRegion.png'),
    homeNews: () => require('../assets/images/blue/imageActualite.png'),
    homeTools: () => require('../assets/images/blue/imageOutilsprofil.png'),
    zipCode: () => require('../assets/images/blue/imageCodePostal.png'),
    notification: () => require('../assets/images/blue/imageNotification.png'),
    phoningSessionFailure: () =>
      require('../assets/images/blue/phoningSessionFailure.png'),
    emptyCampaigns: () => require('../assets/images/blue/imagePhoning.png'),
    polls: () => require('../assets/images/blue/imagePolls.png'),
    doorToDoor: () => require('../assets/images/blue/imageDoorToDoor.png'),
    phoning: () => require('../assets/images/blue/imagePhoningV2.png'),
    locationPhone: () => require('../assets/images/blue/locationPhone.png'),
    house: () => require('../assets/images/blue/imageHouse.png'),
  },
}

export default BlueTheme
