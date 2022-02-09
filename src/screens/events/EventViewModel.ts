export type EventSectionViewModel = {
  id: string
  sectionViewModel?: EventSectionRowViewModel
  data: Array<EventRowContainerViewModel>
}

export interface EventSectionRowViewModel {
  sectionName: string
}

export type EventRowContainerViewModel =
  | {
      type: 'grouped'
      value: EventGroupedRowContainerViewModel
    }
  | {
      type: 'event'
      value: EventRowViewModel
    }

export interface EventGroupedRowContainerViewModel {
  events: Array<EventRowViewModel>
}

export interface EventRowViewModel {
  id: string
  title: string
  category: string
  isOnline: boolean
  tag: string
  imageUrl?: string
  isSubscribed: boolean
  date: string
  dateTimestamp: number
}
