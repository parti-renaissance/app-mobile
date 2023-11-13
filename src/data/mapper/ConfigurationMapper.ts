import { Interest } from "../../core/entities/Interest";
import {
  Notification,
  NotificationCategory,
  NotificationMedia,
} from "../../core/entities/Notification";
import {
  RestInterestConfiguration,
  RestSubscriptionTypeConfiguration,
} from "../restObjects/RestConfigurations";

export const ConfigurationMapper = {
  mapInterest: (restInterest: RestInterestConfiguration): Interest => {
    return {
      code: restInterest.code,
      label: restInterest.label,
    };
  },
  mapSubscriptions: (restInterest: RestSubscriptionTypeConfiguration): Notification => {
    return {
      id: restInterest.code,
      label: restInterest.label,
      category: mapCategory(restInterest.code),
      media: mapMedia(restInterest.code),
    };
  },
};

function mapCategory(code: string): NotificationCategory {
  // hardcoded value on purpose
  switch (code) {
    case "militant_action_sms":
    case "subscribed_emails_movement_information":
    case "subscribed_emails_weekly_letter":
      return "national";
    default:
      return "local";
  }
}

function mapMedia(code: string): NotificationMedia {
  // hardcoded value on purpose
  if (code === "militant_action_sms") {
    return "sms";
  } else {
    return "email";
  }
}
