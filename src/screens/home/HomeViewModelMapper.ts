import { AuthenticationState } from '../../core/entities/AuthenticationState'
import { News } from '../../core/entities/News'
import { Poll } from '../../core/entities/Poll'
import { Profile } from '../../core/entities/Profile'
import { QuickPoll } from '../../core/entities/QuickPoll'
import { Region } from '../../core/entities/Region'
import { Tool } from '../../core/entities/Tool'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import { PollRowViewModelMapper } from '../polls/PollRowViewModelMapper'
import { RegionViewModelMapper } from '../regions/RegionViewModelMapper'
import { HomeNewsRowViewModelMapper } from './HomeNewsRowViewModelMapper'
import { HomeSectionViewModel } from './HomeRowViewModel'
import { HomeToolRowViewModelMapper } from './HomeToolRowViewModelMapper'
import { HomeViewModel } from './HomeViewModel'

const MAX_NEWS = 3
const MAX_POLLS = 2
const MAX_TOOLS = 2

export const HomeViewModelMapper = {
  map: (
    theme: Theme,
    profile: Profile | undefined,
    region: Region | undefined,
    news: Array<News>,
    polls: Array<Poll>,
    tools: Array<Tool>,
    authenticationState: AuthenticationState,
    quickPoll: QuickPoll | undefined,
  ): HomeViewModel => {
    const rows: Array<HomeSectionViewModel> = []

    appendQuickPoll(quickPoll, rows)
    appendRegion(region, rows)
    appendNews(news, rows)
    appendPolls(polls, rows, theme)
    appendTools(tools, rows)
    appendAdhere(authenticationState, rows)

    return {
      title: greeting(profile),
      rows: rows,
    }
  },
}

function greeting(profile?: Profile): string {
  if (profile) {
    const name = i18n.t('profile.name', {
      firstName: profile.firstName,
      lastName: profile.lastName,
    })
    return i18n.t('home.greeting_name', { username: name })
  } else {
    return i18n.t('home.greeting')
  }
}

function appendQuickPoll(
  quickPoll: QuickPoll | undefined,
  rows: HomeSectionViewModel[],
) {
  if (!quickPoll || quickPoll.result.answers.length < 2) {
    return
  }
  const leadingAnswer = quickPoll.result.answers[0]
  const trailingAnswer = quickPoll.result.answers[1]
  rows.push({
    id: quickPoll.id,
    sectionViewModel: { sectionName: i18n.t('home.section_quick_poll') },
    data: [
      {
        type: 'quick_poll',
        value: {
          id: quickPoll.id,
          title: quickPoll.question,
          leadingAnswerViewModel: {
            id: leadingAnswer.id,
            title: leadingAnswer.value,
          },
          trailingAnswerViewModel: {
            id: trailingAnswer.id,
            title: trailingAnswer.value,
          },
        },
      },
    ],
  })
}

function appendRegion(
  region: Region | undefined,
  rows: HomeSectionViewModel[],
) {
  if (region !== undefined && region.campaign) {
    rows.push({
      id: 'region_content',
      sectionViewModel: { sectionName: i18n.t('home.section_region') },
      data: [
        {
          type: 'region',
          value: RegionViewModelMapper.map(region.name, region.campaign),
        },
      ],
    })
  }
}

function appendNews(news: News[], rows: HomeSectionViewModel[]) {
  if (news.length !== 0) {
    const subNews = news.slice(0, MAX_NEWS)
    rows.push({
      id: 'news_content',
      sectionViewModel: { sectionName: i18n.t('home.news.section') },
      data: [
        {
          type: 'news',
          value: {
            news: subNews.map((newsItem) => {
              return HomeNewsRowViewModelMapper.map(newsItem)
            }),
          },
        },
      ],
    })
  }
}

function appendPolls(
  polls: Poll[],
  rows: HomeSectionViewModel[],
  theme: Theme,
) {
  if (polls.length !== 0) {
    const subPolls = polls.slice(0, MAX_POLLS)
    rows.push({
      id: 'polls_content',
      sectionViewModel: { sectionName: i18n.t('home.section_polls') },
      data: [
        {
          type: 'polls',
          value: {
            polls: subPolls.map((poll) => {
              return PollRowViewModelMapper.map(theme, poll)
            }),
          },
        },
      ],
    })
  }
}

function appendTools(tools: Tool[], rows: HomeSectionViewModel[]) {
  if (tools.length !== 0) {
    const subTools = tools.slice(0, MAX_TOOLS)
    rows.push({
      id: 'tools_content',
      sectionViewModel: { sectionName: i18n.t('home.section_tools') },
      data: [
        {
          type: 'tools',
          value: { tools: subTools.map(HomeToolRowViewModelMapper.map) },
        },
      ],
    })
  }
}

function appendAdhere(
  authenticationState: AuthenticationState,
  rows: HomeSectionViewModel[],
) {
  if (authenticationState !== AuthenticationState.Authenticated) {
    rows.push({
      id: 'adhere',
      data: [
        {
          type: 'adhere',
        },
      ],
    })
  }
}
