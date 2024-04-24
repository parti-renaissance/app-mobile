import type * as AddCalendarEvent from 'react-native-add-calendar-event'

export type UseCreateEvent = () => (event: AddCalendarEvent.CreateOptions & { timeZone: string }) => Promise<void | AddCalendarEvent.CreateResult | string>
