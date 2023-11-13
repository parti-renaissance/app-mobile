import React, { FC } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  useWindowDimensions,
  View,
} from "react-native";
import HTML from "react-native-render-html";
import { DetailedEvent } from "../../core/entities/Event";
import { Colors, Spacing, Styles, Typography } from "../../styles";
import i18n from "../../utils/i18n";
import { BorderlessButton, PrimaryButton, SecondaryButton } from "../shared/Buttons";
import LoadingOverlay from "../shared/LoadingOverlay";
import TagView from "../shared/TagView";
import EventDetailsItemContainer from "./EventDetailsItemContainer";
import { useEventDetailsContent } from "./useEventDetailsContent.hook";

type Props = Readonly<{
  detailedEvent: DetailedEvent;
  onReloadEvent: () => void;
}>;

export const EventDetailsContent: FC<Props> = ({ detailedEvent, onReloadEvent }) => {
  const {
    viewModel,
    isLoading,
    addCalendarEvent,
    openOnlineUrl,
    openOrganizerUrl,
    shareEvent,
    unsubscribe,
    subscribe,
    onSeeMoreDescription,
  } = useEventDetailsContent(detailedEvent, onReloadEvent);

  const contentWidth = useWindowDimensions().width;

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
          <TagView style={styles.tag}>{viewModel.tag}</TagView>
          <Text style={styles.attendees}>{viewModel.attendeesNumber}</Text>
        </View>
        <Text style={styles.title}>{viewModel.title}</Text>
        <EventDetailsItemContainer
          style={styles.date}
          icon={require("../../assets/images/iconCalendar.png")}
        >
          <View>
            <Text style={styles.rowItemTitle}>{viewModel.date.title}</Text>
            <Text style={styles.rowItemDescription}>{viewModel.date.description}</Text>
            <BorderlessButton
              title={i18n.t("eventdetails.add_calendar")}
              textStyle={Styles.seeMoreButtonTextStyle}
              style={styles.seeMoreButtonContainer}
              onPress={addCalendarEvent}
            />
          </View>
        </EventDetailsItemContainer>
        {viewModel.onlineUrl ? (
          <EventDetailsItemContainer icon={require("../../assets/images/iconCameraHome.png")}>
            <View>
              <Text style={styles.rowItemTitle}>{i18n.t("eventdetails.online_event")}</Text>
              <BorderlessButton
                title={i18n.t("eventdetails.access_online_event")}
                textStyle={Styles.seeMoreButtonTextStyle}
                style={styles.seeMoreButtonContainer}
                onPress={openOnlineUrl}
              />
            </View>
          </EventDetailsItemContainer>
        ) : null}
        {viewModel.address ? (
          <EventDetailsItemContainer icon={require("../../assets/images/iconAddress.png")}>
            <Text style={styles.rowItemDescription}>{viewModel.address}</Text>
          </EventDetailsItemContainer>
        ) : null}
        <View style={styles.separator} />
        <EventDetailsItemContainer
          onPress={viewModel.organizer.isPressable ? openOrganizerUrl : undefined}
          icon={require("../../assets/images/iconOrganizer.png")}
        >
          <View style={styles.organizerContainer}>
            <Text style={styles.organizerTitle}>{viewModel.organizer.title}</Text>
            {viewModel.organizer?.description && (
              <Text style={styles.organizerDescription}>{viewModel.organizer?.description}</Text>
            )}
          </View>
          {viewModel.organizer?.openUrl ? (
            <Image source={require("../../assets/images/disclosureIndicator.png")} />
          ) : null}
        </EventDetailsItemContainer>
        {viewModel.canShare && (
          <>
            <View style={styles.separator} />
            <EventDetailsItemContainer icon={require("../../assets/images/iconShare.png")}>
              <View style={styles.eventItemsContainer}>
                <Text style={styles.rowItemDescription} numberOfLines={1} ellipsizeMode="tail">
                  {viewModel.eventUrl}
                </Text>
                <BorderlessButton
                  title={i18n.t("eventdetails.share_event")}
                  textStyle={Styles.seeMoreButtonTextStyle}
                  style={styles.seeMoreButtonContainer}
                  onPress={shareEvent}
                />
              </View>
            </EventDetailsItemContainer>
          </>
        )}
        <View style={styles.separator} />
        <Text style={styles.subtitle}>{i18n.t("eventdetails.description")}</Text>
        <HTML
          containerStyle={styles.htmlContainer}
          source={{
            html: viewModel.description,
          }}
          tagsStyles={{ p: paragraphStyle }}
          contentWidth={contentWidth}
        />
        {viewModel.canSeeMore ? (
          <BorderlessButton
            title={i18n.t("eventdetails.see_more")}
            textStyle={Styles.seeMoreButtonTextStyle}
            style={[styles.descriptionSeeMore, styles.seeMoreButtonContainer]}
            onPress={onSeeMoreDescription}
          />
        ) : null}
        <View style={styles.separator} />
      </ScrollView>
      <View style={styles.bottomContainer}>
        {viewModel.isSubscribed ? (
          <SecondaryButton
            leadingIcon={require("../../assets/images/checkIcon.png")}
            title={i18n.t("eventdetails.registered")}
            iconTint={Colors.primaryColor}
            iconPadding={Spacing.unit}
            onPress={unsubscribe}
          />
        ) : (
          <PrimaryButton title={i18n.t("eventdetails.register")} onPress={subscribe} />
        )}
      </View>
    </>
  );
};

const paragraphStyle: TextStyle = {
  ...Typography.body,
  color: Colors.darkText,
  marginBottom: Spacing.unit,
};

const styles = StyleSheet.create({
  attendees: {
    ...Typography.body,
    alignSelf: "flex-end",
    color: Colors.lightText,
    flexGrow: 1,
    textAlign: "right",
  },
  bottomContainer: {
    ...Styles.elevatedContainerStyle,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.margin,
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
  htmlContainer: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
  },
  image: {
    height: 203,
  },
  organizerContainer: {
    flex: 1,
  },
  organizerTitle: {
    ...Typography.body,
    color: Colors.darkText,
  },
  organizerDescription: {
    ...Typography.body,
    color: Colors.lightText,
    marginTop: Spacing.small,
  },
  rowItemDescription: {
    ...Typography.body,
    color: Colors.darkText,
    marginTop: Spacing.small,
  },
  rowItemTitle: {
    ...Typography.headline,
    color: Colors.darkText,
  },
  seeMoreButtonContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: Spacing.unit,
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  subtitle: {
    ...Typography.headline,
    color: Colors.darkText,
    marginHorizontal: Spacing.margin,
  },
  tag: {
    marginTop: Spacing.unit,
  },
  tagAttendeesContainer: {
    flexDirection: "row",
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  title: {
    ...Typography.title,
    color: Colors.titleText,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  wrapImage: {
    minHeight: 130,
  },
});
