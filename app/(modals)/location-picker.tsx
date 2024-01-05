import { LocationPickerScreen } from '@/screens/locationPicker/LocationPickerScreen'
import { CloseButton } from '@/screens/shared/NavigationHeaderButton'
import i18n from '@/utils/i18n'
import { Stack, useNavigation } from 'expo-router'

function Root() {
  const navigation = useNavigation()
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
          title: i18n.t('personalinformation.address'),
        }}
      />

      <LocationPickerScreen />
    </>
  )
}

export default Root
