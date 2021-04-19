import i18n from '../../utils/i18n'
import { EventQuickFiltersViewModel } from './EventQuickFiltersViewModel'

export const EventQuickFiltersViewModelMapper = {
  map: (_: Array<string>): EventQuickFiltersViewModel => {
    return {
      sections: [
        {
          id: SECTION_EVENT_TYPE_ID,
          title: i18n.t('events.filters.section_event'),
          data: [
            {
              code: EVENT_TYPE_ONLINE_ID,
              image: require('../../assets/images/iconOnline.png'),
              label: i18n.t('events.filters.event_online'),
              isSelected: false,
            },
            {
              code: EVENT_TYPE_MEETING_ID,
              image: require('../../assets/images/iconMeeting.png'),
              label: i18n.t('events.filters.event_meeting'),
              isSelected: false,
            },
          ],
        },
      ],
    }
  },
}

const SECTION_EVENT_TYPE_ID = 'event_type'
const EVENT_TYPE_ONLINE_ID = 'online'
const EVENT_TYPE_MEETING_ID = 'meeting'
