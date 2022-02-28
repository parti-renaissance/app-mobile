import analytics from '@react-native-firebase/analytics'

export type AnalyticsScreens =
  | 'Accueil'
  | 'Actualités'
  | 'Actions'
  | 'Événements'
  | 'Ressources'

export const Analytics = {
  logScreen: async (screenName: string) => {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    })
  },
  logUrlOpened: async (url: string) => {
    await analytics().logEvent('external_link_opened', { url: url })
  },
  logNavBarItemSelected: async (screen: AnalyticsScreens) => {
    await analytics().logEvent('nav_bar', {
      button_type: screen,
      interaction: 'nav_bar',
    })
  },
  logNewsOpen: async () => {
    await analytics().logEvent('news', {
      button_type: 'open_news',
      interaction: 'open',
    })
  },
  logHomeNewsOpen: async () => {
    await analytics().logEvent('hero_news', {
      button_type: 'open_hero_news',
      interaction: 'open',
    })
  },
  // TODO: (Pierre Felgines) 2022/02/28 Delete this analytics once validated
  logHomeNewsMore: async () => {
    await analytics().logEvent('hero_news', {
      button_type: 'all_news',
      interaction: 'cta',
    })
  },
  // TODO: (Pierre Felgines) 2022/02/28 Delete this analytics once validated
  logHomeToolOpen: async (name: string) => {
    await analytics().logEvent('hero_tool', {
      button_type: name,
      interaction: 'cta',
    })
  },
  // TODO: (Pierre Felgines) 2022/02/28 Delete this analytics once validated
  logHomeToolsMore: async () => {
    await analytics().logEvent('hero_tool', {
      button_type: 'all_tools',
      interaction: 'cta',
    })
  },
  logHomeRegionMore: async () => {
    await analytics().logEvent('hero_article', {
      button_type: 'en_savoir_plus',
      interaction: 'cta',
    })
  },
  logHomeEventOpen: async (name: string, category: string) => {
    await analytics().logEvent('heroe', {
      button_type: name,
      event_category: category,
      interaction: 'cta',
    })
  },
  logRegionDetails: async () => {
    await analytics().logEvent('hero_article', {
      button_type: 'plus_de_detail',
      interaction: 'cta',
    })
  },
  logEventShare: async (eventName: string) => {
    await analytics().logEvent('share_events', {
      button_type: eventName,
      interaction: 'partage',
    })
  },
  logEventAddToCalendar: async (eventName: string) => {
    await analytics().logEvent('add_calendar', {
      button_type: eventName,
      interaction: 'rappel',
    })
  },
  logEventRegister: async (eventName: string) => {
    await analytics().logEvent('inscription_events', {
      button_type: eventName,
      interaction: 'inscription',
    })
  },
  logToolSelected: async (name: string) => {
    await analytics().logEvent('tool', {
      button_type: name,
      interaction: 'cta',
    })
  },
  logActionsPolls: async () => {
    await analytics().logEvent('questionnaire', {
      button_type: 'questionnaire',
      interaction: 'cta',
    })
  },
  logEventTabSelected: async (key: string) => {
    let button_type: string
    switch (key) {
      case 'home':
        button_type = 'menu_hero'
        break
      case 'calendar':
        button_type = 'menu_calendrier'
        break
      case 'myEvents':
        button_type = 'menu_mes_events'
        break
      default:
        return
    }
    await analytics().logEvent('menu_events', {
      button_type: button_type,
      interaction: 'menu',
    })
  },
  logEventSelected: async (name: string, category: string) => {
    await analytics().logEvent('events', {
      button_type: `open_${name}`,
      event_category: category,
      interaction: 'open',
    })
  },
  enable: async () => {
    await analytics().setAnalyticsCollectionEnabled(true)
  },
  disable: async () => {
    await analytics().setAnalyticsCollectionEnabled(false)
  },
}
