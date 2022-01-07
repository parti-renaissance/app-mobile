import { Alert, AlertButton } from 'react-native'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from './ErrorMapper'

interface AlertOptions {
  message?: string
}

export const AlertUtils = {
  showNetworkAlert: (
    error: Error,
    onRetry: (() => void) | undefined,
    options: AlertOptions = {},
  ) => {
    let alertButtons: AlertButton[]
    if (onRetry !== undefined) {
      alertButtons = [
        {
          text: i18n.t('common.error_retry'),
          style: 'default',
          onPress: onRetry,
        },
        {
          text: i18n.t('shared.cancel'),
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

    Alert.alert(
      i18n.t('common.error_title'),
      options.message ?? GenericErrorMapper.mapErrorMessage(error),
      alertButtons,
      { cancelable: false },
    )
  },
  showSimpleAlert: (
    title: string,
    message: string,
    action: string,
    cancel: string,
    onAction: () => void,
  ) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: action,
          onPress: onAction,
        },
        {
          text: cancel,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  },
}
