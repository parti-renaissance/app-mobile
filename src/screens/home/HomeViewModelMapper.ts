import { ShortEvent } from '../../core/entities/Event'
import { HeaderInfos } from '../../core/entities/HeaderInfos'
import { Profile } from '../../core/entities/Profile'
import { Region } from '../../core/entities/Region'
import { StatefulQuickPoll } from '../../core/entities/StatefulQuickPoll'
import { TimelineFeedItem } from '../../core/entities/TimelineFeedItem'
import i18n from '../../utils/i18n'
import { NumberFormatter } from '../../utils/NumberFormatter'
import { EventRowViewModelMapper } from '../events/EventRowViewModelMapper'
import { RegionViewModelMapper } from '../regions/RegionViewModelMapper'
import { ViewState, ViewStateError } from '../shared/ViewState'
import { EventRowViewModelFromTimelineEventMapper } from './feed/mappers/EventRowViewModelFromTimelineEventMapper'
import { HomeFeedActionCampaignCardViewModelFromTimelineItemMapper } from './feed/mappers/HomeFeedActionCampaignCardViewModelFromTimelineItemMapper'
import { HomeRetaliationCardViewModelFromTimelineRetaliationMapper } from './feed/mappers/HomeRetaliationCardViewModelFromTimelineRetaliationMapper'
import { NewsRowViewModelFromTimelineNewsMapper } from './feed/mappers/NewsRowViewModelFromTimelineNewsMapper'
import { HomeHeaderViewModelMapper } from './HomeHeaderViewModelMapper'
import { HomeRowViewModel, HomeSectionViewModel } from './HomeRowViewModel'
import { HomeViewModel } from './HomeViewModel'

export const HomeViewModelMapper = {
  map: (
    headerInfos: HeaderInfos | undefined,
    profile: Profile | undefined,
    region: Region | undefined,
    quickPoll: StatefulQuickPoll | undefined,
    event: ShortEvent | undefined,
    timelineFeedState: ViewState<Array<TimelineFeedItem>>,
  ): HomeViewModel => {
    const rows: Array<HomeSectionViewModel> = []

    appendEvent(event, rows)
    appendQuickPoll(quickPoll, rows)
    appendRegion(region, rows)
    appendTimelineFeed(timelineFeedState, rows)

    return {
      header: HomeHeaderViewModelMapper.map(headerInfos, profile),
      rows: rows,
    }
  },
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

function appendTimelineFeed(
  timelineFeedState: ViewState<Array<TimelineFeedItem>>,
  rows: HomeSectionViewModel[],
) {
  switch (timelineFeedState.state) {
    case 'loading':
      // no op
      break
    case 'error':
      appendTimelineFeedError(timelineFeedState, rows)
      break
    case 'content':
      appendTimelineFeedItems(timelineFeedState.content, rows)
      break
  }
}

function appendTimelineFeedError(
  state: ViewStateError,
  rows: HomeSectionViewModel[],
) {
  rows.push({
    id: 'feed',
    sectionViewModel: {
      sectionName: i18n.t('home.feed.section'),
      isHighlighted: false,
    },
    data: [
      {
        type: 'error',
        value: state,
      },
    ],
  })
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
          value: NewsRowViewModelFromTimelineNewsMapper.map(item.value),
        }
      case 'event':
        return {
          type: 'feedEvent',
          value: EventRowViewModelFromTimelineEventMapper.map(item.value),
        }
      case 'retaliation':
        return {
          type: 'feedRetaliation',
          value: HomeRetaliationCardViewModelFromTimelineRetaliationMapper.map(
            item.value,
          ),
        }
      case 'phoning':
        return {
          type: 'feedPhoningCampaign',
          value: HomeFeedActionCampaignCardViewModelFromTimelineItemMapper.map(
            item.value,
          ),
        }
      case 'doorToDoor':
        return {
          type: 'feedDoorToDoorCampaign',
          value: HomeFeedActionCampaignCardViewModelFromTimelineItemMapper.map(
            item.value,
          ),
        }
      case 'survey':
        return {
          type: 'feedPoll',
          value: HomeFeedActionCampaignCardViewModelFromTimelineItemMapper.map(
            item.value,
          ),
        }
    }
  })
  if (data.length > 0) {
    rows.push({
      id: 'feed',
      sectionViewModel: {
        sectionName: i18n.t('home.feed.section'),
        isHighlighted: false,
      },
      data,
    })
  }
}
