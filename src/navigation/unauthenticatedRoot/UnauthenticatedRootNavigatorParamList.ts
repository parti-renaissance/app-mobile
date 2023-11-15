import { NavigatorScreenParams } from '@react-navigation/native'
import { ForgottenPasswordModalNavigatorParamList } from '../forgottenPassword/ForgottenPasswordModalNavigatorParamList'
import { ListPickerModalNavigatorParamList } from '../listPickerModal/ListPickerModalNavigatorParamList'
import { LocationPickerModalNavigatorParamList } from '../locationPickerModal/LocationPickerModalNavigatorParamList'

export type UnauthenticatedRootNavigatorParamList = {
  OnboardingNavigator: undefined
  ForgottenPasswordModal: NavigatorScreenParams<ForgottenPasswordModalNavigatorParamList>
  LocationPickerModal: NavigatorScreenParams<LocationPickerModalNavigatorParamList>
  ListPickerModal: NavigatorScreenParams<ListPickerModalNavigatorParamList>
}
