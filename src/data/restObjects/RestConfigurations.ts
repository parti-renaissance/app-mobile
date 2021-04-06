export interface RestConfigurations {
  interests: Array<RestInterestConfiguration>
  subscription_types: Array<RestSubscriptionTypeConfiguration>
  positions: Array<RestPositionConfiguration>
  jobs: Array<string>
  activity_area: Array<string>
}

export interface RestInterestConfiguration {
  code: string
  label: string
}

export interface RestSubscriptionTypeConfiguration {
  code: string
  label: string
}

export interface RestPositionConfiguration {
  code: string
  label: string
}
