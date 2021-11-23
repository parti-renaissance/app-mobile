import RegionTheme from '../core/entities/RegionTheme'
import { Colors } from '../styles'
import Theme from './Theme'

const pizazz = '#ff8b01'
const pizazz80Light = '#FFA539'
const pizazz50Light = '#FFC580'
const soapstone = '#fff9f6'
const macaroniAndCheese = '#fec183'

const OrangeTheme: Theme = {
  id: RegionTheme.ORANGE,
  primaryColor: pizazz,
  lightBackground: soapstone,
  primaryButtonBackgroundDisabled: pizazz80Light,
  primaryButtonBackgroundHighlight: pizazz50Light,
  primaryButtonTextColor: Colors.white,
  coloredText: pizazz,
  quickPollProgress: macaroniAndCheese,
  image: {
    near: () => require('../assets/images/orange/imageProche.png'),
    reforms: () => require('../assets/images/orange/imageReformes.png'),
    anotherMandate: () =>
      require('../assets/images/orange/imageAnotherMandate.png'),
    error: () => require('../assets/images/orange/imageErreur.png'),
    emptyPoll: () => require('../assets/images/orange/imageSondage.png'),
    pollImage1: () => require('../assets/images/orange/imageSondage01.png'),
    pollImage2: () => require('../assets/images/orange/imageSondage02.png'),
    pollImage3: () => require('../assets/images/orange/imageSondage03.png'),
    pollImage4: () => require('../assets/images/orange/imageSondage04.png'),
    pollSuccess: () => require('../assets/images/orange/imageMerci.png'),
    pollTools: () =>
      require('../assets/images/orange/navigationBarLeftAccessoriesOutils.png'),
    profile: () => require('../assets/images/orange/imageProfil.png'),
    profilePoll: () =>
      require('../assets/images/orange/imageSondageProfil.png'),
    region: () => require('../assets/images/orange/imageRegion.png'),
    homeNews: () => require('../assets/images/orange/imageActualite.png'),
    homeTools: () => require('../assets/images/orange/imageOutilsprofil.png'),
    zipCode: () => require('../assets/images/orange/imageCodePostal.png'),
    notification: () =>
      require('../assets/images/orange/imageNotification.png'),
    phoningSessionFailure: () =>
      require('../assets/images/orange/phoningSessionFailure.png'),
    emptyCampaigns: () => require('../assets/images/orange/imagePhoning.png'),
    polls: () => require('../assets/images/orange/imagePolls.png'),
    doorToDoor: () => require('../assets/images/orange/imageDoorToDoor.png'),
    phoning: () => require('../assets/images/orange/imagePhoningV2.png'),
    locationPhone: () => require('../assets/images/orange/locationPhone.png'),
    house: () => require('../assets/images/orange/imageHouse.png'),
  },
}

export default OrangeTheme
