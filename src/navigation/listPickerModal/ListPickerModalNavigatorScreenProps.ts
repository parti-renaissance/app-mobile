import { StackScreenProps } from '@react-navigation/stack'
import { ListPickerModalNavigatorParamList } from './ListPickerModalNavigatorParamList'

export type ListPickerModalNavigatorScreenProps<
  T extends keyof ListPickerModalNavigatorParamList,
> = StackScreenProps<ListPickerModalNavigatorParamList, T>
