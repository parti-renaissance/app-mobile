import React, { FC, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DetailedProfile } from "../../core/entities/DetailedProfile";
import { PersonalInformationModalNavigatorScreenProps } from "../../navigation/personalInformationModal/PersonalInformationModalNavigatorScreenProps";
import { Colors, Spacing, Typography } from "../../styles";
import { DisplayNameFormatter } from "../../utils/DisplayNameFormatter";
import i18n from "../../utils/i18n";
import BirthdayPicker from "../shared/BirthdayPicker";
import KeyboardOffsetView from "../shared/KeyboardOffsetView";
import LoadingOverlay from "../shared/LoadingOverlay";
import GenderPicker from "./GenderPicker";
import { HeaderTextButton } from "./HeaderTextButton";
import LabelInputContainer from "./LabelInputContainer";
import LabelTextInput from "./LabelTextInput";
import LocationPicker from "./LocationPicker";
import { NationalityPicker } from "./NationalityPicker";
import PhoneNumberInput from "./PhoneNumberInput";
import { usePersonalInformationScreenContent } from "./usePersonalInformationScreenContent.hook";

type Props = Readonly<{
  profile: DetailedProfile;
}>;

export const PersonalInformationScreenContent: FC<Props> = ({ profile }) => {
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const genderOther = useRef<TextInput>(null);
  const facebookRef = useRef<TextInput>(null);
  const linkedInRef = useRef<TextInput>(null);
  const twitterRef = useRef<TextInput>(null);
  const telegramRef = useRef<TextInput>(null);

  const {
    form,
    isLoading,
    callingCode,
    displayCustomGender,
    getError,
    onFirstNameChange,
    onLastNameChange,
    onGenderChange,
    onCustomGenderChange,
    onBirthdateChange,
    onNationalityPress,
    onLocationPickerPress,
    onEmailChange,
    onPhoneNumberChange,
    onCallingCodePress,
    onFacebookChange,
    onTwitterChange,
    onLinkedInChange,
    onTelegramChange,
    onSubmit,
  } = usePersonalInformationScreenContent(profile);

  const navigation =
    useNavigation<
      PersonalInformationModalNavigatorScreenProps<"PersonalInformation">["navigation"]
    >();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderTextButton
          title={i18n.t("personalinformation.save")}
          type="primary"
          onPress={onSubmit}
        />
      ),
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardOffsetView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <LoadingOverlay visible={isLoading} />
        <View>
          <Text style={styles.section}>{i18n.t("personalinformation.section_identity")}</Text>
          <LabelTextInput
            ref={firstNameRef}
            nextInput={lastNameRef}
            label={i18n.t("personalinformation.first_name")}
            textInputProps={{
              textContentType: "givenName",
            }}
            defaultValue={form.firstName}
            onValueChange={onFirstNameChange}
            errorMessage={getError("first_name")}
          />
          <LabelTextInput
            ref={lastNameRef}
            label={i18n.t("personalinformation.last_name")}
            textInputProps={{
              textContentType: "familyName",
            }}
            defaultValue={form.lastName}
            onValueChange={onLastNameChange}
            errorMessage={getError("last_name")}
          />
          <GenderPicker
            onValueChange={onGenderChange}
            defaultValue={form.gender}
            errorMessage={getError("gender")}
          />
          {displayCustomGender && (
            <LabelTextInput
              ref={genderOther}
              label={i18n.t("personalinformation.gender_other")}
              defaultValue={form.customGender}
              onValueChange={onCustomGenderChange}
            />
          )}
          <LabelInputContainer
            label={i18n.t("personalinformation.birthdate")}
            errorMessage={getError("birthdate")}
          >
            <BirthdayPicker
              date={form.birthdate}
              placeholder={i18n.t("personalinformation.placeholder")}
              onDateChange={onBirthdateChange}
              maximumDate={new Date()}
              textAlign="right"
            />
          </LabelInputContainer>
          <LabelInputContainer
            label={i18n.t("personalinformation.nationality")}
            errorMessage={getError("nationality")}
          >
            <NationalityPicker
              country={DisplayNameFormatter.formatRegion(form.countryCode)}
              onPress={onNationalityPress}
            />
          </LabelInputContainer>
          <Text style={styles.section}>{i18n.t("personalinformation.section_coordinates")}</Text>
          <LabelInputContainer
            label={i18n.t("personalinformation.address")}
            errorMessage={getError("address")}
          >
            <LocationPicker
              address={form.address}
              placeholder={i18n.t("personalinformation.placeholder")}
              onPress={onLocationPickerPress}
            />
          </LabelInputContainer>
          <LabelTextInput
            label={i18n.t("personalinformation.email")}
            textInputProps={{
              keyboardType: "email-address",
              textContentType: "emailAddress",
              autoCapitalize: "none",
              autoCorrect: false,
            }}
            defaultValue={form.email}
            onValueChange={onEmailChange}
            errorMessage={getError("email_address")}
          />
          <PhoneNumberInput
            phoneNumber={form.phoneNumber}
            label={i18n.t("personalinformation.phone")}
            placeholder={i18n.t("personalinformation.placeholder")}
            nextInput={facebookRef}
            onPhoneNumberChange={onPhoneNumberChange}
            onCallingCodePress={onCallingCodePress}
            callingCode={callingCode}
            errorMessage={getError("phone")}
          />
          <Text style={styles.section}>{i18n.t("personalinformation.section_social")}</Text>
          <LabelTextInput
            ref={facebookRef}
            nextInput={linkedInRef}
            label={i18n.t("personalinformation.facebook")}
            defaultValue={form.facebook}
            onValueChange={onFacebookChange}
            errorMessage={getError("facebook_page_url")}
          />
          <LabelTextInput
            ref={linkedInRef}
            nextInput={twitterRef}
            label={i18n.t("personalinformation.linkedin")}
            defaultValue={form.linkedin}
            onValueChange={onLinkedInChange}
            errorMessage={getError("linkedin_page_url")}
          />
          <LabelTextInput
            ref={twitterRef}
            nextInput={telegramRef}
            label={i18n.t("personalinformation.twitter")}
            defaultValue={form.twitter}
            onValueChange={onTwitterChange}
            errorMessage={getError("twitter_page_url")}
          />
          <LabelTextInput
            ref={telegramRef}
            isLastInput={true}
            label={i18n.t("personalinformation.telegram")}
            defaultValue={form.telegram}
            onValueChange={onTelegramChange}
            errorMessage={getError("telegram_page_url")}
          />
        </View>
      </ScrollView>
    </KeyboardOffsetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  contentContainer: {
    paddingHorizontal: Spacing.margin,
    paddingBottom: Spacing.margin,
  },
  countryPickerContainerButton: {
    alignSelf: "flex-end",
  },
  section: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginTop: Spacing.mediumMargin,
  },
});
