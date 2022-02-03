import React, { FC, useEffect, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Share,
  useWindowDimensions,
  Alert,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { EventDetailsScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import {
  BorderlessButton,
  PrimaryButton,
  SecondaryButton,
} from '../shared/Buttons'
import { ExternalLink } from '../shared/ExternalLink'
import EventDetailsItemContainer from './EventDetailsItemContainer'
import {
  EventDescriptionViewModel,
  EventDetailsViewModel,
} from './EventDetailsViewModel'
import TagView from './TagView'
import * as AddCalendarEvent from 'react-native-add-calendar-event'
import CardView from '../shared/CardView'
import PollRow from '../polls/PollRow'
import { StatefulView, ViewState } from '../shared/StatefulView'
import EventRepository from '../../data/EventRepository'
import { EventDetailsViewModelMapper } from './EventDetailsViewModelMapper'
import LoadingOverlay from '../shared/LoadingOverlay'
import HTML from 'react-native-render-html'
import { ForbiddenError } from '../../core/errors'
import { AlertUtils } from '../shared/AlertUtils'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { Analytics } from '../../utils/Analytics'

const EventDetailsContent = (
  viewModel: EventDetailsViewModel,
  navigateToSurvey: (surveyId: number) => void,
  refetchData: () => void,
) => {
  const contentWidth = useWindowDimensions().width
  const [descriptionViewModel, setDescriptionViewModel] = useState(
    initDescription(viewModel),
  )
  const openOnlineUrl = () => {
    if (viewModel.onlineUrl) {
      ExternalLink.openUrl(viewModel.onlineUrl)
    }
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const shareEvent = async () => {
    await Analytics.logEventShare(viewModel.title)
    if (viewModel.eventUrl) {
      Share.share({
        message: viewModel.eventUrl,
        url: viewModel.eventUrl,
      })
    }
  }
  const addCalendarEvent = async () => {
    await Analytics.logEventAddToCalendar(viewModel.title)
    AddCalendarEvent.presentEventCreatingDialog(viewModel.calendarEvent)
  }
  const subscribe = async () => {
    setIsLoading(true)
    await Analytics.logEventRegister(viewModel.title)
    EventRepository.getInstance()
      .subscribeToEvent(viewModel.id)
      .then(() => refetchData())
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

  const performUnsubscription = () => {
    setIsLoading(true)
    EventRepository.getInstance()
      .unsubscribeFromEvent(viewModel.id)
      .then(() => refetchData())
      .catch((error) => {
        AlertUtils.showNetworkAlert(error, performUnsubscription)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const openOrganizerUrl = viewModel.organizer.openUrl
    ? () => {
        if (viewModel.organizer.openUrl) {
          ExternalLink.openUrl(viewModel.organizer.openUrl)
        }
      }
    : undefined
  const openSurvey = () => {
    if (viewModel.survey) {
      const pollId = parseInt(viewModel.survey.id, 10)

      navigateToSurvey(pollId)
    }
  }
  const descriptionSeeMore = () => {
    setDescriptionViewModel({
      description: viewModel.description,
      canSeeMore: false,
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
  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <View style={styles.wrapImage}>
          {viewModel.imageUrl ? (
            <Image style={styles.image} source={{ uri: viewModel.imageUrl }} />
          ) : null}
        </View>
        <View style={styles.tagAttendeesContainer}>
          <TagView viewModel={viewModel.tag} />
          <Text style={styles.attendees}>{viewModel.attendeesNumber}</Text>
        </View>
        <Text style={styles.title}>{viewModel.title}</Text>
        <EventDetailsItemContainer
          style={styles.date}
          icon={require('../../assets/images/iconCalendar.png')}
        >
          <View>
            <Text style={styles.rowItemTitle}>{viewModel.date.title}</Text>
            <Text style={styles.rowItemDescription}>
              {viewModel.date.description}
            </Text>
            <BorderlessButton
              title={i18n.t('eventdetails.add_calendar')}
              textStyle={Styles.eventSeeMoreButtonTextStyle}
              style={Styles.eventSeeMoreButtonContainer}
              onPress={addCalendarEvent}
            />
          </View>
        </EventDetailsItemContainer>
        {viewModel.onlineUrl ? (
          <EventDetailsItemContainer
            icon={require('../../assets/images/iconCameraHome.png')}
          >
            <View>
              <Text style={styles.rowItemTitle}>
                {i18n.t('eventdetails.online_event')}
              </Text>
              <BorderlessButton
                title={i18n.t('eventdetails.access_online_event')}
                textStyle={Styles.eventSeeMoreButtonTextStyle}
                style={Styles.eventSeeMoreButtonContainer}
                onPress={openOnlineUrl}
              />
            </View>
          </EventDetailsItemContainer>
        ) : null}
        {viewModel.address ? (
          <EventDetailsItemContainer
            icon={require('../../assets/images/iconAddress.png')}
          >
            <Text style={styles.rowItemDescription}>{viewModel.address}</Text>
          </EventDetailsItemContainer>
        ) : null}
        <View style={styles.separator} />
        <EventDetailsItemContainer
          onPress={openOrganizerUrl}
          icon={require('../../assets/images/iconOrganizer.png')}
        >
          <View style={styles.organizerContainer}>
            <Text style={styles.rowItemTitle}>
              {viewModel.organizer?.title}
            </Text>
            {viewModel.organizer?.description ? (
              <Text style={styles.rowItemDescription}>
                {viewModel.organizer?.description}
              </Text>
            ) : null}
          </View>
          {viewModel.organizer?.openUrl ? (
            <Image
              source={require('../../assets/images/disclosureIndicator.png')}
            />
          ) : null}
        </EventDetailsItemContainer>
        <View style={styles.separator} />
        <EventDetailsItemContainer
          icon={require('../../assets/images/iconShare.png')}
        >
          <View style={styles.eventItemsContainer}>
            <Text
              style={styles.rowItemDescription}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {viewModel.eventUrl}
            </Text>
            <BorderlessButton
              title={i18n.t('eventdetails.share_event')}
              textStyle={Styles.eventSeeMoreButtonTextStyle}
              style={Styles.eventSeeMoreButtonContainer}
              onPress={shareEvent}
            />
          </View>
        </EventDetailsItemContainer>
        <View style={styles.separator} />
        <Text style={styles.subtitle}>
          {i18n.t('eventdetails.description')}
        </Text>
        <HTML
          containerStyle={styles.description}
          source={{ html: descriptionViewModel.description }}
          contentWidth={contentWidth}
        />
        {descriptionViewModel.canSeeMore ? (
          <BorderlessButton
            title={i18n.t('eventdetails.see_more')}
            textStyle={Styles.eventSeeMoreButtonTextStyle}
            style={[
              styles.descriptionSeeMore,
              Styles.eventSeeMoreButtonContainer,
            ]}
            onPress={descriptionSeeMore}
          />
        ) : null}
        <View style={styles.separator} />
        {viewModel.survey ? (
          <>
            <Text style={styles.subtitle}>
              {i18n.t('eventdetails.associated_survey')}
            </Text>
            <CardView
              style={styles.cardView}
              backgroundColor={Colors.defaultBackground}
            >
              <PollRow viewModel={viewModel.survey} onPress={openSurvey} />
            </CardView>
          </>
        ) : null}
      </ScrollView>
      <View style={styles.bottomContainer}>
        {viewModel.isSubscribed ? (
          <SecondaryButton
            leadingIcon={require('../../assets/images/checkIcon.png')}
            title={i18n.t('eventdetails.registered')}
            iconTint={Colors.primaryColor}
            iconPadding={Spacing.unit}
            onPress={unsubscribe}
          />
        ) : (
          <PrimaryButton
            title={i18n.t('eventdetails.register')}
            onPress={subscribe}
          />
        )}
      </View>
    </>
  )
}

const EventDetailsScreen: FC<EventDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<EventDetailsViewModel>
  >(new ViewState.Loading())
  const eventId = route.params.eventId
  // TODO use EventId when webservices are available
  console.log(eventId)

  const navigateToSurvey = (surveyId: number) => {
    // @ts-ignore It works and this navigation is nightmare to declare in typescript
    navigation.navigate(Screen.pollDetailModal, {
      screen: Screen.pollDetail,
      params: { pollId: surveyId },
    })
  }

  const fetchData = () => {
    EventRepository.getInstance()
      .getEventDetails(eventId)
      .then((result) => {
        const viewModel = EventDetailsViewModelMapper.map(result)
        setStatefulState(new ViewState.Content(viewModel))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, refetchData))
      })
  }

  useEffect(fetchData, [])

  const refetchData = () => {
    setStatefulState(new ViewState.Loading())
    fetchData()
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
      <StatefulView
        state={statefulState}
        contentComponent={(result) => {
          return EventDetailsContent(result, navigateToSurvey, refetchData)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  attendees: {
    ...Typography.body,
    alignSelf: 'flex-end',
    color: Colors.lightText,
    flexGrow: 1,
    textAlign: 'right',
  },
  bottomContainer: {
    ...Styles.elevatedContainerStyle,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.margin,
  },
  cardView: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  date: {
    marginTop: Spacing.margin,
  },
  description: {
    ...Typography.body,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
  },
  descriptionSeeMore: {
    marginHorizontal: Spacing.margin,
  },
  eventItemsContainer: {
    flex: 1,
  },
  image: {
    height: 203,
  },
  organizerContainer: {
    flex: 1,
  },
  rowItemDescription: {
    ...Typography.body,
    color: Colors.lightText,
  },
  rowItemTitle: {
    ...Typography.eventItemTitle,
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  subtitle: {
    ...Typography.eventItemTitle,
    fontSize: 14,
    marginHorizontal: Spacing.margin,
  },
  tagAttendeesContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  title: {
    ...Typography.title,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  wrapImage: {
    minHeight: 130,
  },
})

const initDescription = (
  viewModel: EventDetailsViewModel,
): EventDescriptionViewModel => {
  if (viewModel.survey && viewModel.description.length > DESCRIPTION_MAX_CHAR) {
    return {
      description:
        viewModel.description.substring(0, DESCRIPTION_MAX_CHAR) + '…',
      canSeeMore: true,
    }
  } else {
    return { description: viewModel.description, canSeeMore: false }
  }
}

const DESCRIPTION_MAX_CHAR = 500

export default EventDetailsScreen
