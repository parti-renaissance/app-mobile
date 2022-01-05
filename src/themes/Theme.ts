import { ImageSourcePropType } from 'react-native'

interface ThemedImages {
  near: () => ImageSourcePropType
  reforms: () => ImageSourcePropType
  anotherMandate: () => ImageSourcePropType
  error: () => ImageSourcePropType
  emptyPoll: () => ImageSourcePropType
  pollImage1: () => ImageSourcePropType
  pollImage2: () => ImageSourcePropType
  pollImage3: () => ImageSourcePropType
  pollImage4: () => ImageSourcePropType
  pollSuccess: () => ImageSourcePropType
  pollTools: () => ImageSourcePropType
  profile: () => ImageSourcePropType
  profilePoll: () => ImageSourcePropType
  region: () => ImageSourcePropType
  homeNews: () => ImageSourcePropType
  homeTools: () => ImageSourcePropType
  zipCode: () => ImageSourcePropType
  notification: () => ImageSourcePropType
  phoningSessionFailure: () => ImageSourcePropType
  emptyCampaigns: () => ImageSourcePropType
  polls: () => ImageSourcePropType
  doorToDoor: () => ImageSourcePropType
  phoning: () => ImageSourcePropType
  locationPhone: () => ImageSourcePropType
  house: () => ImageSourcePropType
  appartementBuilding: () => ImageSourcePropType
}

export default interface Theme {
  image: ThemedImages
}
