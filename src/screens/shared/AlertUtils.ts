import { Alert, AlertButton, Platform } from 'react-native'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from './ErrorMapper'

interface AlertOptions {
  message?: string
}

const showAlert = (title: string, message: string, action: string, cancel: string, actionStyle: AlertButton['style'], onAction: () => void) => {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    if (window.confirm(message)) {
      onAction()
    }
    return
  }
  Alert.alert(
    title,
    message,
    [
      {
        text: action,
        onPress: onAction,
        style: actionStyle,
      },
      {
        text: cancel,
        style: 'cancel',
      },
    ],
    { cancelable: false },
  )
}

export const AlertUtils = {
  showNetworkAlert: (error: Error, onRetry: (() => void) | undefined, options: AlertOptions = {}) => {
    let alertButtons: AlertButton[]
    if (onRetry !== undefined) {
      alertButtons = [
        {
          text: i18n.t('common.error_retry'),
          style: 'default',
          onPress: onRetry,
        },
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
      ]
    } else {
      alertButtons = [
        {
          text: i18n.t('common.ok'),
          style: 'default',
        },
      ]
    }

    Alert.alert(i18n.t('common.error_title'), options.message ?? GenericErrorMapper.mapErrorMessage(error), alertButtons, { cancelable: false })
  },
  showSimpleAlert: (title: string, message: string, action: string, cancel: string, onAction: () => void) => {
    showAlert(title, message, action, cancel, 'default', onAction)
  },
  showDestructiveAlert: (title: string, message: string, action: string, cancel: string, onAction: () => void) => {
    showAlert(title, message, action, cancel, 'destructive', onAction)
  },
}
