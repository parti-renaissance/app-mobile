import { NavigatorScreenParams } from '@react-navigation/native'
import { LocationPickerModalNavigatorParamList } from '../locationPickerModal/LocationPickerModalNavigatorParamList'

export type UnauthenticatedRootNavigatorParamList = {
  OnboardingNavigator: undefined
  ForgottenPassword: { email?: string }
  LocationPickerModal: NavigatorScreenParams<LocationPickerModalNavigatorParamList>
}
