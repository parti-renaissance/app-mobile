import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { NotificationMenuScreenProps, Screen } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import { useTheme } from '../../../themes'
import i18n from '../../../utils/i18n'
import ProfileSettingsItem from '../../profile/ProfileSettingsItem'

const NotificationMenuScreen = (props: NotificationMenuScreenProps) => {
  const { theme } = useTheme()
  const onLocal = () => {
    props.navigation.navigate(Screen.notifications, { category: 'local' })
  }
  const onNational = () => {
    props.navigation.navigate(Screen.notifications, { category: 'national' })
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={theme.image.notification()} />
      <Text style={styles.description}>
        {i18n.t('notificationmenu.description')}
      </Text>
      <ProfileSettingsItem
        title={i18n.t('notificationmenu.local')}
        onPress={onLocal}
      />
      <ProfileSettingsItem
        title={i18n.t('notificationmenu.national')}
        onPress={onNational}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  description: {
    ...Typography.headline,
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  logo: {
    alignSelf: 'center',
  },
})

export default NotificationMenuScreen
