import FB from '@/config/firebaseConfig'

export type AnalyticsScreens =
  | 'Accueil'
  | 'Actualités'
  | 'Actions'
  | 'Événements'
  | 'Ressources'

export const Analytics = {
  logScreen: async (screenName: string) => {
    await FB.analytics.logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    })
  },
  logUrlOpened: async (url: string) => {
    FB.analytics.logEvent('external_link_opened', { url: url })
  },
  logNavBarItemSelected: async (screen: AnalyticsScreens) => {
    FB.analytics.logEvent('nav_bar', {
      button_type: screen,
      interaction: 'nav_bar',
    })
  },
  logNewsOpen: async () => {
    FB.analytics.logEvent('news', {
      button_type: 'open_news',
      interaction: 'open',
    })
  },
  logHomeNewsOpen: async () => {
    FB.analytics.logEvent('hero_news', {
      button_type: 'open_hero_news',
      interaction: 'open',
    })
  },
  // TODO: (Pierre Felgines) 2022/02/28 Delete this analytics once validated
  logHomeNewsMore: async () => {
    FB.analytics.logEvent('hero_news', {
      button_type: 'all_news',
      interaction: 'cta',
    })
  },
  // TODO: (Pierre Felgines) 2022/02/28 Delete this analytics once validated
  logHomeToolOpen: async (name: string) => {
    FB.analytics.logEvent('hero_tool', {
      button_type: name,
      interaction: 'cta',
    })
  },
  // TODO: (Pierre Felgines) 2022/02/28 Delete this analytics once validated
  logHomeToolsMore: async () => {
    FB.analytics.logEvent('hero_tool', {
      button_type: 'all_tools',
      interaction: 'cta',
    })
  },
  logHomeRegionMore: async () => {
    FB.analytics.logEvent('hero_article', {
      button_type: 'en_savoir_plus',
      interaction: 'cta',
    })
  },
  logHomeEventOpen: async (name: string, category: string) => {
    FB.analytics.logEvent('heroe', {
      button_type: name,
      event_category: category,
      interaction: 'cta',
    })
  },
  logRegionDetails: async () => {
    FB.analytics.logEvent('hero_article', {
      button_type: 'plus_de_detail',
      interaction: 'cta',
    })
  },
  logEventShare: async (eventName: string) => {
    FB.analytics.logEvent('share_events', {
      button_type: eventName,
      interaction: 'partage',
    })
  },
  logEventAddToCalendar: async (eventName: string) => {
    FB.analytics.logEvent('add_calendar', {
      button_type: eventName,
      interaction: 'rappel',
    })
  },
  logEventRegister: async (eventName: string) => {
    FB.analytics.logEvent('inscription_events', {
      button_type: eventName,
      interaction: 'inscription',
    })
  },
  logToolSelected: async (name: string) => {
    FB.analytics.logEvent('tool', {
      button_type: name,
      interaction: 'cta',
    })
  },
  logActionsPolls: async () => {
    FB.analytics.logEvent('questionnaire', {
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
    FB.analytics.logEvent('menu_events', {
      button_type: button_type,
      interaction: 'menu',
    })
  },
  logEventSelected: async (name: string, category: string) => {
    FB.analytics.logEvent('events', {
      button_type: `open_${name}`,
      event_category: category,
      interaction: 'open',
    })
  },
  enable: async () => {
    FB.analytics.setAnalyticsCollectionEnabled(true)
  },
  disable: async () => {
    FB.analytics.setAnalyticsCollectionEnabled(false)
  },
}
