export enum AuthorizationStatus {
  /**
   * The app user has not yet chosen whether to allow the application to create notifications. Usually
   * this status is returned prior to the first call of `requestPermission`.
   *
   * @platform ios iOS
   */
  NOT_DETERMINED = -1,

  /**
   * The app is not authorized to create notifications.
   */
  DENIED = 0,

  /**
   * The app is authorized to create notifications.
   */
  AUTHORIZED = 1,

  /**
   * The app is currently authorized to post non-interrupting user notifications
   * @platform ios iOS >= 12
   */
  PROVISIONAL = 2,

  /**
   * The app is authorized to create notifications for a limited amount of time.
   * Used in App Clips.
   * @platform ios iOS >= 14
   */
  EPHEMERAL = 3,
}
