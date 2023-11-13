import {
  BadRequestError,
  DepartmentNotFoundError,
  EventSubscriptionError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ServerTimeoutError,
  UnauthorizedError,
} from "../../core/errors";
import { ErrorMonitor } from "../../utils/ErrorMonitor";
import i18n from "../../utils/i18n";

export const GenericErrorMapper = {
  mapErrorMessage: (error: Error): string => {
    if (error instanceof ServerTimeoutError) {
      return i18n.t("common.error.network");
    } else if (error instanceof InternalServerError) {
      return i18n.t("common.error.internal");
    } else if (error instanceof BadRequestError) {
      return i18n.t("common.error.bad_request");
    } else if (error instanceof UnauthorizedError) {
      return i18n.t("common.error.unauthorized");
    } else if (error instanceof ForbiddenError) {
      return i18n.t("common.error.forbidden");
    } else if (error instanceof NotFoundError) {
      return i18n.t("common.error.not_found");
    } else if (error instanceof DepartmentNotFoundError) {
      return i18n.t("anonymousloginzipcode.invalid_code");
    } else if (error instanceof EventSubscriptionError) {
      return error.message;
    } else if (error instanceof TypeError) {
      ErrorMonitor.log("[UI] Bad format", { error: error.message });
      return i18n.t("common.error.parsing");
    } else {
      ErrorMonitor.log("[UI] Unhandled error", { error: error.message });
      return i18n.t("common.error.generic");
    }
  },
};
