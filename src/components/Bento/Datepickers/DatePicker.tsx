import { useEffect, useMemo, useState } from 'react'
import { useDatePickerContext } from '@rehookify/datepicker'
import type { DPDay } from '@rehookify/datepicker'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { Button, View } from 'tamagui'
import {
  DatePicker,
  DatePickerInput,
  HeaderTypeProvider,
  MonthPicker,
  SizableText,
  swapOnClick,
  useHeaderType,
  YearPicker,
  YearRangeSlider,
} from './common/dateParts'

function CalendarHeader() {
  const {
    data: { calendars },
    propGetters: { subtractOffset },
  } = useDatePickerContext()
  const { type: header, setHeader } = useHeaderType()
  const { year, month } = calendars[0]

  const monthNames = {
    January: 'Janvier',
    February: 'Février',
    March: 'Mars',
    April: 'Avril',
    May: 'Mai',
    June: 'Juin',
    July: 'Juillet',
    August: 'Août',
    September: 'Septembre',
    October: 'Octobre',
    November: 'Novembre',
    December: 'Décembre',
  }

  if (header === 'year') {
    return <YearRangeSlider />
  }

  if (header === 'month') {
    return (
      <SizableText width="100%" ta="center" selectable tabIndex={0} size="$5">
        Sélectionnez un mois
      </SizableText>
    )
  }

  return (
    <View flexDirection="row" width="100%" height={50} alignItems="center" justifyContent="space-between">
      <Button circular size="$4" {...swapOnClick(subtractOffset({ months: 1 }))}>
        <Button.Icon scaleIcon={1.5}>
          <ChevronLeft />
        </Button.Icon>
      </Button>
      <View flexDirection="column" height={50} alignItems="center">
        <SizableText
          onPress={() => setHeader('year')}
          selectable
          tabIndex={0}
          size="$4"
          cursor="pointer"
          color="$color11"
          hoverStyle={{
            color: '$color12',
          }}
        >
          {year}
        </SizableText>
        <SizableText
          onPress={() => setHeader('month')}
          selectable
          cursor="pointer"
          tabIndex={0}
          size="$6"
          color="$color11"
          hoverStyle={{
            color: '$color12',
          }}
        >
          {monthNames[month]}
        </SizableText>
      </View>
      <Button circular size="$4" {...swapOnClick(subtractOffset({ months: -1 }))}>
        <Button.Icon scaleIcon={1.5}>
          <ChevronRight />
        </Button.Icon>
      </Button>
    </View>
  )
}

function DayPicker() {
  const {
    data: { calendars, weekDays },
    propGetters: { dayButton },
  } = useDatePickerContext()

  const { days } = calendars[0]

  // divide days array into sub arrays that each has 7 days, for better stylings
  const subDays = useMemo(
    () =>
      days.reduce((acc, day, i) => {
        if (i % 7 === 0) {
          acc.push([])
        }
        acc[acc.length - 1].push(day)
        return acc
      }, [] as DPDay[][]),
    [days],
  )

  return (
    <View
      animation="medium"
      enterStyle={{
        opacity: 0,
      }}
    >
      <View flexDirection="row" gap="$1">
        {weekDays.map((day) => {
          const formatDay = (day: string) => {
            switch (day) {
              case 'Sun':
                return 'Dim'
              case 'Mon':
                return 'Lun'
              case 'Tue':
                return 'Mar'
              case 'Wed':
                return 'Mer'
              case 'Thu':
                return 'Jeu'
              case 'Fri':
                return 'Ven'
              case 'Sat':
                return 'Sam'
              default:
                return day
            }
          }

          const formatFR = formatDay(day)
          return (
            <SizableText key={day} ta="center" width={45} size="$6">
              {formatFR}
            </SizableText>
          )
        })}
      </View>

      <View flexDirection="column" gap="$1" flexWrap="wrap">
        {subDays.map((days) => {
          return (
            <View flexDirection="row" key={days[0].$date.toString()} gap="$1">
              {days.map((d) => (
                <Button
                  key={d.$date.toString()}
                  chromeless
                  circular
                  padding={0}
                  width={45}
                  {...swapOnClick(dayButton(d))}
                  backgroundColor={d.selected ? '$background' : 'transparent'}
                  themeInverse={d.selected}
                  disabled={!d.inCurrentMonth}
                >
                  <Button.Text color={d.selected ? '$gray12' : d.inCurrentMonth ? '$gray11' : '$gray6'}>{d.day}</Button.Text>
                </Button>
              ))}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export function DatePickerBody({ order = ['day', 'month', 'year'] }: { order?: string[] }) {
  const [header, setHeader] = useState<'day' | 'month' | 'year'>((order[0] as 'day' | 'month' | 'year') || 'day')

  const orderLocal = order || ['day', 'month', 'year']

  const components = {
    day: DayPicker,
    month: MonthPicker,
    year: YearPicker,
  }

  const orderComponents = orderLocal?.map((component) => ({
    component: components[component],
    key: component,
  }))

  return (
    <HeaderTypeProvider type={header} setHeader={setHeader}>
      <CalendarHeader />

      <View flexDirection="column" alignItems="center" gap="$5" maxWidth={'100%'} paddingVertical="$5">
        {orderComponents
          .filter((component) => component.key == header)
          .map(({ component: Component, key }) => (
            <Component key={key} onChange={() => setHeader(order[(order.indexOf(key) + 1) % orderLocal.length] as 'day' | 'month' | 'year')} />
          ))}
      </View>
    </HeaderTypeProvider>
  )
}

/** ------ EXAMPLE ------ */
export function DatePickerExample() {
  const [selectedDates, onDatesChange] = useState<Date[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [selectedDates])

  return (
    <DatePicker
      open={open}
      onOpenChange={setOpen}
      config={{
        selectedDates,
        onDatesChange,
        calendar: {
          startDay: 1,
        },
      }}
    >
      <DatePicker.Trigger asChild>
        <DatePickerInput
          placeholder="Select Date"
          value={selectedDates[0]?.toDateString() || ''}
          onReset={() => onDatesChange([])}
          onButtonPress={() => setOpen(true)}
        />
      </DatePicker.Trigger>
      <DatePicker.Content>
        <DatePicker.Content.Arrow />
        <DatePickerBody />
      </DatePicker.Content>
    </DatePicker>
  )
}

DatePickerExample.fileName = 'DatePicker'
