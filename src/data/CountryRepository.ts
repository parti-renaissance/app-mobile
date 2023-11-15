import { Country } from '../core/entities/Country'

interface CountryDataEntity {
  name: string
  alpha2: string
  alpha3: string
  status: string
  currencies: string[]
  languages: string[]
  countryCallingCodes: string[]
  ioc: string
  emoji: string
}

export class CountryRepository {
  private static instance: CountryRepository
  private cachedCountries: Country[] = []

  public getCountries(): Country[] {
    if (this.cachedCountries.length > 0) {
      return this.cachedCountries
    }
    const countries = (
      require('country-data').countries.all as CountryDataEntity[]
    )
      .filter((country) => {
        return (
          country.status === 'assigned' &&
          country.countryCallingCodes.length > 0
        )
      })
      .map((country): Country => {
        return {
          code: country.alpha2,
          callingCode: country.countryCallingCodes[0] ?? '',
        }
      })
    this.cachedCountries = countries
    return countries
  }

  public getCallingCodeForCountryCode(countryCode: string): string {
    return (
      this.getCountries().find((c) => c.code === countryCode)?.callingCode ??
      '+33'
    )
  }

  public static getInstance(): CountryRepository {
    if (!CountryRepository.instance) {
      CountryRepository.instance = new CountryRepository()
    }
    return CountryRepository.instance
  }
}
