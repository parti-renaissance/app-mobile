import React, { useMemo, useState } from 'react'
import Text from '@/components/base/Text'
import { ChevronDown, ChevronUp, Search, X } from '@tamagui/lucide-icons'
import { RovingFocusGroup } from '@tamagui/roving-focus'
import { getCountryCodeForRegionCode, getSupportedRegionCodes } from 'awesome-phonenumber'
import { Adapt, Image, isWeb, Popover, ScrollView, View } from 'tamagui'
import { Input } from './components/inputsParts'

const phoneCodes = getSupportedRegionCodes().map((code) => {
  return {
    name: code,
    flag: `https://flagsapi.com/${code}/flat/64.png`,
  }
})

type RegionFilterInputProps = {
  setRegionCode: (regionCode: string) => void
  setOpen: (open: boolean) => void
  open: boolean
}

function RegionFilterInput(props: RegionFilterInputProps) {
  const { setRegionCode, setOpen, open } = props
  const [filter, setFilter] = useState('')
  const [reset, setReset] = useState(0)

  const phoneCodesFiltered = useMemo(() => {
    return phoneCodes.filter((item) => {
      return item.name.toLowerCase().includes(filter.toLowerCase())
    })
  }, [filter])

  const list = useMemo(() => {
    return phoneCodesFiltered.map((item, i) => {
      return (
        <RovingFocusGroup.Item
          key={item.name}
          onPress={() => {
            setRegionCode(item.name)
            setOpen(false)
          }}
          {...(isWeb && {
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                setRegionCode(item.name)
                setOpen(false)
              }
            },
          })}
          focusStyle={{
            outlineColor: '$outlineColor',
            outlineOffset: -2,
          }}
        >
          <View
            borderColor="$borderColor"
            borderWidth={0}
            borderBottomWidth={1}
            flexDirection="row"
            hoverStyle={{
              backgroundColor: '$gray2',
            }}
            focusStyle={{
              backgroundColor: '$gray2',
            }}
            gap="$3"
            paddingHorizontal="$4"
            paddingVertical="$2"
            cursor="pointer"
          >
            <Image backgroundColor="$color5" resizeMode="cover" source={{ uri: item.flag }} width={24} height={17} />
            <Text
              color="$gray10"
              $group-item-hover={{
                color: '$gray12',
              }}
              marginRight="auto"
            >
              {item.name}
            </Text>
          </View>
        </RovingFocusGroup.Item>
      )
    })
  }, [phoneCodesFiltered])

  return (
    <RovingFocusGroup height="100%" flexDirection="column" paddingTop="$4" width="100%" gap="$3" backgroundColor="$gray1">
      <Input marginHorizontal="$3" size="$2">
        <Input.Box>
          <Input.Area
            defaultValue={filter}
            borderRadius={0}
            // Note: when key changes, the input remounts and the value will be reset
            // we can achive better performance using this approach instead binding the value to state
            key={reset}
            onChangeText={setFilter}
            width="100%"
            placeholder="Rechercher"
          />
          <Input.Icon
            onPress={() => {
              setFilter('')
              setReset(reset === 0 ? 1 : 0)
            }}
            pointerEvents="auto"
            zIndex={10}
            theme="alt1"
          >
            {filter ? <X /> : <Search />}
          </Input.Icon>
        </Input.Box>
      </Input>
      {open && <ScrollView height="100%">{list}</ScrollView>}
    </RovingFocusGroup>
  )
}

type RegionSelectBoxProps = {
  regionCode: string
  setRegionCode: (regionCode: string) => void
  containerWidth?: number
}

function _RegionSelectBox(props: RegionSelectBoxProps) {
  const { regionCode, setRegionCode, containerWidth } = props

  const [open, setOpen] = useState(false)

  return (
    <Popover
      offset={{
        mainAxis: 5,
      }}
      open={open}
      onOpenChange={setOpen}
      allowFlip
      placement="bottom-start"
      {...props}
    >
      <Popover.Trigger>
        <View
          borderBottomWidth={1}
          paddingVertical={14.5}
          borderBottomColor="$gray3"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width={'100%'}
          gap="$2"
          hoverStyle={{
            backgroundColor: '$colorTransparent',
          }}
          pressStyle={{
            backgroundColor: '$colorTransparent',
            borderBottomColor: '$gray8',
          }}
          onPress={() => setOpen(!open)}
        >
          <Text color="$gray6" fontSize={'$1'}>
            +{getCountryCodeForRegionCode(regionCode)}
          </Text>

          {open ? <ChevronUp size={14} color="$gray10" /> : <ChevronDown size={14} color="$gray10" />}
        </View>
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        width={containerWidth}
        borderWidth={1}
        height={300}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        padding={0}
      >
        <RegionFilterInput open={open} setOpen={setOpen} setRegionCode={setRegionCode} />
      </Popover.Content>
    </Popover>
  )
}

export const RegionSelectBox = React.memo(_RegionSelectBox)
