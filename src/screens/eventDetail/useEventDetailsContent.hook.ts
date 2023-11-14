import { useState } from 'react'
import { Alert, Share } from 'react-native'
import * as AddCalendarEvent from 'react-native-add-calendar-event'
import { DetailedEvent } from '../../core/entities/Event'
import { ForbiddenError } from '../../core/errors'
import EventRepository from '../../data/EventRepository'
import { Analytics } from '../../utils/Analytics'
import i18n from '../../utils/i18n'
import { AlertUtils } from '../shared/AlertUtils'
import { ExternalLink } from '../shared/ExternalLink'
import { CreateEventOptionsMapper } from './CreateEventOptionsMapper'
import { EventDetailsViewModel } from './EventDetailsViewModel'
import { EventDetailsViewModelMapper } from './EventDetailsViewModelMapper'

export const useEventDetailsContent = (
  detailedEvent: DetailedEvent,
  onReloadEvent: () => void,
): {
  viewModel: EventDetailsViewModel
  isLoading: boolean
  addCalendarEvent: () => void
  openOnlineUrl: () => void
  openOrganizerUrl: () => void
  shareEvent: () => void
  unsubscribe: () => void
  subscribe: () => void
  onSeeMoreDescription: () => void
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [canSeeMore, setCanSeeMore] = useState<boolean>(true)

  const openOnlineUrl = () => {
    if (detailedEvent.visioUrl) {
      ExternalLink.openUrl(detailedEvent.visioUrl)
    }
  }

  const shareEvent = async () => {
    await Analytics.logEventShare(detailedEvent.name)
    if (detailedEvent.link) {
      Share.share({
        message: detailedEvent.link,
        url: detailedEvent.link,
      })
    }
  }

  const addCalendarEvent = async () => {
    await Analytics.logEventAddToCalendar(detailedEvent.name)
    const createOptions = CreateEventOptionsMapper.map(detailedEvent)
    AddCalendarEvent.presentEventCreatingDialog(createOptions)
  }

  const subscribe = async () => {
    setIsLoading(true)
    await Analytics.logEventRegister(detailedEvent.name)
    EventRepository.getInstance()
      .subscribeToEvent(detailedEvent.uuid)
      .then(() => onReloadEvent())
      .catch((error) => {
        let message: string | undefined
        if (error instanceof ForbiddenError) {
          message = i18n.t('eventdetails.connect_to_subscribe')
        }
        AlertUtils.showNetworkAlert(error, subscribe, { message })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const openOrganizerUrl = () => {
    if (detailedEvent.commitee?.url) {
      ExternalLink.openUrl(detailedEvent.commitee.url)
    }
  }

  const onSeeMoreDescription = () => {
    setCanSeeMore(false)
  }

  const performUnsubscription = () => {
    setIsLoading(true)
    EventRepository.getInstance()
      .unsubscribeFromEvent(viewModel.id)
      .then(() => onReloadEvent())
      .catch((error) => {
        AlertUtils.showNetworkAlert(error, performUnsubscription)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const unsubscribe = () => {
    Alert.alert(
      i18n.t('eventdetails.unsubscribe.title'),
      i18n.t('eventdetails.unsubscribe.content', { title: viewModel.title }),
      [
        {
          text: i18n.t('eventdetails.unsubscribe.confirm'),
          onPress: performUnsubscription,
        },
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  const viewModel = EventDetailsViewModelMapper.map(detailedEvent, canSeeMore)

  return {
    viewModel,
    isLoading,
    addCalendarEvent,
    openOnlineUrl,
    openOrganizerUrl,
    shareEvent,
    unsubscribe,
    subscribe,
    onSeeMoreDescription,
  }
}
