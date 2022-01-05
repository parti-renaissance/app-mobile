import { Colors } from '../styles'
import Theme from './Theme'

const moodyBlue = '#6d5ed3'
const moodyBlue80Light = '#8A7EDC'
const moodyBlue50Light = '#B6AFE9'
const magnolia = '#faf6ff'
const moonRaker = '#bfc6f2'

const PurpleTheme: Theme = {
  primaryColor: moodyBlue,
  lightBackground: magnolia,
  primaryButtonBackgroundDisabled: moodyBlue80Light,
  primaryButtonBackgroundHighlight: moodyBlue50Light,
  primaryButtonTextColor: Colors.white,
  coloredText: moodyBlue,
  quickPollProgress: moonRaker,
  image: {
    near: () => require('../assets/images/purple/imageProche.png'),
    reforms: () => require('../assets/images/purple/imageReformes.png'),
    anotherMandate: () =>
      require('../assets/images/purple/imageAnotherMandate.png'),
    error: () => require('../assets/images/purple/imageErreur.png'),
    emptyPoll: () => require('../assets/images/purple/imageSondage.png'),
    pollImage1: () => require('../assets/images/purple/imageSondage01.png'),
    pollImage2: () => require('../assets/images/purple/imageSondage02.png'),
    pollImage3: () => require('../assets/images/purple/imageSondage03.png'),
    pollImage4: () => require('../assets/images/purple/imageSondage04.png'),
    pollSuccess: () => require('../assets/images/purple/imageMerci.png'),
    pollTools: () =>
      require('../assets/images/purple/navigationBarLeftAccessoriesOutils.png'),
    profile: () => require('../assets/images/purple/imageProfil.png'),
    profilePoll: () =>
      require('../assets/images/purple/imageSondageProfil.png'),
    region: () => require('../assets/images/purple/imageRegion.png'),
    homeNews: () => require('../assets/images/purple/imageActualite.png'),
    homeTools: () => require('../assets/images/purple/imageOutilsprofil.png'),
    zipCode: () => require('../assets/images/purple/imageCodePostal.png'),
    notification: () =>
      require('../assets/images/purple/imageNotification.png'),
    phoningSessionFailure: () =>
      require('../assets/images/purple/phoningSessionFailure.png'),
    emptyCampaigns: () => require('../assets/images/purple/imagePhoning.png'),
    polls: () => require('../assets/images/purple/imagePolls.png'),
    doorToDoor: () => require('../assets/images/purple/imageDoorToDoor.png'),
    phoning: () => require('../assets/images/purple/imagePhoningV2.png'),
    locationPhone: () => require('../assets/images/purple/locationPhone.png'),
    house: () => require('../assets/images/purple/imageHouse.png'),
    appartementBuilding: () =>
      require('../assets/images/purple/appartementBuilding.png'),
  },
}

export default PurpleTheme
