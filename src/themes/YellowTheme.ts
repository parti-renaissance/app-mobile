import { Colors } from '../styles'
import Theme from './Theme'

const dandelion = '#fdd45c'
const dandelion80Light = '#FDDE80'
const dandelion50Light = '#FEEAAE'
const islandSpice = '#FFFCF5'
const corn = '#ecae03'
const creamBrulee = '#ffe495'

const YellowTheme: Theme = {
  primaryColor: dandelion,
  lightBackground: islandSpice,
  primaryButtonBackgroundDisabled: dandelion80Light,
  primaryButtonBackgroundHighlight: dandelion50Light,
  primaryButtonTextColor: Colors.shipGray,
  coloredText: corn,
  quickPollProgress: creamBrulee,
  image: {
    near: () => require('../assets/images/yellow/imageProche.png'),
    reforms: () => require('../assets/images/yellow/imageReformes.png'),
    anotherMandate: () =>
      require('../assets/images/yellow/imageAnotherMandate.png'),
    error: () => require('../assets/images/yellow/imageErreur.png'),
    emptyPoll: () => require('../assets/images/yellow/imageSondage.png'),
    pollImage1: () => require('../assets/images/yellow/imageSondage01.png'),
    pollImage2: () => require('../assets/images/yellow/imageSondage02.png'),
    pollImage3: () => require('../assets/images/yellow/imageSondage03.png'),
    pollImage4: () => require('../assets/images/yellow/imageSondage04.png'),
    pollSuccess: () => require('../assets/images/yellow/imageMerci.png'),
    pollTools: () =>
      require('../assets/images/yellow/navigationBarLeftAccessoriesOutils.png'),
    profile: () => require('../assets/images/yellow/imageProfil.png'),
    profilePoll: () =>
      require('../assets/images/yellow/imageSondageProfil.png'),
    region: () => require('../assets/images/yellow/imageRegion.png'),
    homeNews: () => require('../assets/images/yellow/imageActualite.png'),
    homeTools: () => require('../assets/images/yellow/imageOutilsprofil.png'),
    zipCode: () => require('../assets/images/yellow/imageCodePostal.png'),
    notification: () =>
      require('../assets/images/yellow/imageNotification.png'),
    phoningSessionFailure: () =>
      require('../assets/images/yellow/phoningSessionFailure.png'),
    emptyCampaigns: () => require('../assets/images/yellow/imagePhoning.png'),
    polls: () => require('../assets/images/yellow/imagePolls.png'),
    doorToDoor: () => require('../assets/images/yellow/imageDoorToDoor.png'),
    phoning: () => require('../assets/images/yellow/imagePhoningV2.png'),
    locationPhone: () => require('../assets/images/yellow/locationPhone.png'),
    house: () => require('../assets/images/yellow/imageHouse.png'),
    appartementBuilding: () =>
      require('../assets/images/yellow/appartementBuilding.png'),
  },
}

export default YellowTheme
