import { Profile } from '../../core/entities/Profile'
import { Region } from '../../core/entities/Region'
import { StatefulQuickPoll } from '../../core/entities/StatefulQuickPoll'
import i18n from '../../utils/i18n'
import NumberFormatter from '../../utils/NumerFormatter'
import { RegionViewModelMapper } from '../regions/RegionViewModelMapper'
import { HomeRowViewModel, HomeSectionViewModel } from './HomeRowViewModel'
import { HomeViewModel } from './HomeViewModel'
import { ShortEvent } from '../../core/entities/Event'
import { EventRowViewModelMapper } from '../events/EventRowViewModelMapper'
import { TimelineFeedItem } from '../../core/entities/TimelineFeedItem'
import { NewsRowViewModelFromTimelineNewsMapper } from './feed/mappers/NewsRowViewModelFromTimelineNewsMapper'
import { EventRowViewModelFromTimelineEventMapper } from './feed/mappers/EventRowViewModelFromTimelineEventMapper'
import { HomeRetaliationCardViewModelFromTimelineRetaliationMapper } from './feed/mappers/HomeRetaliationCardViewModelFromTimelineRetaliationMapper'
import { HomeFeedActionCampaignCardViewModelFromTimelineItemMapper } from './feed/mappers/HomeFeedActionCampaignCardViewModelFromTimelineItemMapper'

export const HomeViewModelMapper = {
  map: (
    profile: Profile | undefined,
    region: Region | undefined,
    quickPoll: StatefulQuickPoll | undefined,
    event: ShortEvent | undefined,
    timelineFeedItems: Array<TimelineFeedItem>,
  ): HomeViewModel => {
    const rows: Array<HomeSectionViewModel> = []

    appendEvent(event, rows)
    appendQuickPoll(quickPoll, rows)
    appendRegion(region, rows)
    appendTimelineFeedItems(timelineFeedItems, rows)

    return {
      header: {
        imageUri: 'https://via.placeholder.com/700',
        bannerHeading: i18n.t('home.banner.heading'),
        bannerTitle: i18n.t('home.banner.title'),
        greeting: greeting(profile),
      },
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
    sectionViewModel: {
      sectionName: i18n.t('home.event.section'),
      isHighlighted: true,
    },
    data: [
      {
        type: 'event',
        value: { event: EventRowViewModelMapper.map(event) },
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
    sectionViewModel: {
      sectionName: i18n.t('home.section_quick_poll'),
      isHighlighted: false,
    },
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
      data: [
        {
          type: 'region',
          value: RegionViewModelMapper.map(region.name, region.campaign),
        },
      ],
    })
  }
}

function appendTimelineFeedItems(
  timelineFeedItems: Array<TimelineFeedItem>,
  rows: HomeSectionViewModel[],
) {
  const data: HomeRowViewModel[] = timelineFeedItems.map((item) => {
    switch (item.type) {
      case 'news':
        return {
          type: 'feedNews',
          value: NewsRowViewModelFromTimelineNewsMapper.map(item),
        }
      case 'event':
        return {
          type: 'feedEvent',
          value: EventRowViewModelFromTimelineEventMapper.map(item),
        }
      case 'riposte':
        return {
          type: 'feedRetaliation',
          value: HomeRetaliationCardViewModelFromTimelineRetaliationMapper.map(
            item,
          ),
        }
      case 'phoning-campaign':
        return {
          type: 'feedPhoningCampaign',
          value: HomeFeedActionCampaignCardViewModelFromTimelineItemMapper.map(
            item,
          ),
        }
      case 'pap-campaign':
        return {
          type: 'feedDoorToDoorCampaign',
          value: HomeFeedActionCampaignCardViewModelFromTimelineItemMapper.map(
            item,
          ),
        }
      case 'survey':
        return {
          type: 'feedPoll',
          value: HomeFeedActionCampaignCardViewModelFromTimelineItemMapper.map(
            item,
          ),
        }
    }
  })
  rows.push({
    id: 'feed',
    sectionViewModel: {
      sectionName: i18n.t('home.feed.section'),
      isHighlighted: false,
    },
    data,
  })
}
