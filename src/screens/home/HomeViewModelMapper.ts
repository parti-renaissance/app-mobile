import { News } from '../../core/entities/News'
import { Poll } from '../../core/entities/Poll'
import { Profile } from '../../core/entities/Profile'
import { Region } from '../../core/entities/Region'
import { StatefulQuickPoll } from '../../core/entities/StatefulQuickPoll'
import { Tool } from '../../core/entities/Tool'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import NumberFormatter from '../../utils/NumerFormatter'
import { PollRowViewModelMapper } from '../polls/PollRowViewModelMapper'
import { RegionViewModelMapper } from '../regions/RegionViewModelMapper'
import { HomeNewsRowViewModelMapper } from './news/HomeNewsRowViewModelMapper'
import { HomeSectionViewModel } from './HomeRowViewModel'
import { HomeToolRowViewModelMapper } from './tools/HomeToolRowViewModelMapper'
import { HomeViewModel } from './HomeViewModel'
import { ShortEvent } from '../../core/entities/Event'
import { EventRowViewModelMapper } from '../events/EventRowViewModelMapper'

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
    quickPoll: StatefulQuickPoll | undefined,
    event: ShortEvent | undefined,
  ): HomeViewModel => {
    const rows: Array<HomeSectionViewModel> = []

    appendRetaliation(rows)
    appendEvent(event, rows)
    appendQuickPoll(quickPoll, rows)
    appendRegion(region, rows)
    appendNews(news, rows)
    appendPolls(polls, rows, theme)
    appendTools(tools, rows)

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

function appendEvent(
  event: ShortEvent | undefined,
  rows: HomeSectionViewModel[],
) {
  if (!event) {
    return
  }
  rows.push({
    id: event.uuid,
    sectionViewModel: { sectionName: i18n.t('home.event.section') },
    data: [
      {
        type: 'event',
        value: { event: EventRowViewModelMapper.map(event, 'hour') },
      },
    ],
  })
}

function appendRetaliation(rows: HomeSectionViewModel[]) {
  rows.push({
    id: 'id',
    data: [
      {
        type: 'retaliation',
        value: {
          id: 'id',
          title: 'title',
        },
      },
    ],
  })
}

function appendQuickPoll(
  quickPoll: StatefulQuickPoll | undefined,
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
          type: quickPoll.state === 'answered' ? 'results' : 'question',
          title: quickPoll.question,
          leadingAnswerViewModel: {
            id: leadingAnswer.id,
            title: leadingAnswer.value,
            formattedPercentage: NumberFormatter.formatPercent(
              leadingAnswer.votesPercentage / 100,
            ),
            percentage: leadingAnswer.votesPercentage,
          },
          trailingAnswerViewModel: {
            id: trailingAnswer.id,
            title: trailingAnswer.value,
            formattedPercentage: NumberFormatter.formatPercent(
              trailingAnswer.votesPercentage / 100,
            ),
            percentage: trailingAnswer.votesPercentage,
          },
          totalVotes: i18n.t('home.quick_poll.votes_count', {
            count: quickPoll.result.totalVotesCount,
            format: NumberFormatter.formatDecimal(
              quickPoll.result.totalVotesCount,
            ),
          }),
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
      sectionViewModel: { sectionName: undefined },
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
