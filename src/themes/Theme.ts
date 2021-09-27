import { ImageSourcePropType } from 'react-native'
import RegionTheme from '../core/entities/RegionTheme'

interface ThemedImages {
  near: () => ImageSourcePropType
  reforms: () => ImageSourcePropType
  covid: () => ImageSourcePropType
  desintox: () => ImageSourcePropType
  answers: () => ImageSourcePropType
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
}

export default interface Theme {
  id: RegionTheme
  primaryColor: string
  lightBackground: string
  primaryButtonBackgroundDisabled: string
  primaryButtonBackgroundHighlight: string
  primaryButtonTextColor: string
  coloredText: string
  quickPollProgress: string
  image: ThemedImages
}
