import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'
import i18n from '@/utils/i18n'

export default function AppLayout() {
    return (
    <Stack screenOptions={headerBlank}>
        <Stack.Screen name="location-picker" options={{ presentation:'fullScreenModal' }} />
        <Stack.Screen
            name='center-of-interest'
            options={{ title: i18n.t('centerofinterest.title') }}
        />
        <Stack.Screen
            name='notification/index'
            options={{ title: i18n.t('notificationmenu.title') }}
        />
    </Stack>)
}
