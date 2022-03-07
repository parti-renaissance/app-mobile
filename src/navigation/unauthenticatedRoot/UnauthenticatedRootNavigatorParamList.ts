import { NavigatorScreenParams } from '@react-navigation/native'
import { ForgottenPasswordModalNavigatorParamList } from '../forgottenPassword/ForgottenPasswordModalNavigatorParamList'
import { LocationPickerModalNavigatorParamList } from '../locationPickerModal/LocationPickerModalNavigatorParamList'

export type UnauthenticatedRootNavigatorParamList = {
  OnboardingNavigator: undefined
  ForgottenPasswordModal: NavigatorScreenParams<ForgottenPasswordModalNavigatorParamList>
  LocationPickerModal: NavigatorScreenParams<LocationPickerModalNavigatorParamList>
}
