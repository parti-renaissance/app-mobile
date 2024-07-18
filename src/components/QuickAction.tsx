import { useCallback, useMemo, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from '@/components/base/Text'
import { useSession } from '@/ctx/SessionProvider'
import { LinearGradient } from '@tamagui/linear-gradient'
import { ArrowLeft, ArrowRight, Plus, X } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { AnimatePresence, Circle, CircleProps, styled, XStack, YStack, YStackProps } from 'tamagui'
import * as z from 'zod'
import SkeCard from './Skeleton/CardSkeleton'

const ActionMapper = {
  actions: {
    title: 'Créer une action',
    actionType: 'custom',
    action: (scope?: string) => router.replace({ pathname: '/actions', params: { action: 'create', scope: scope } }),
  },
  messages: {
    title: 'Créer une newsletter',
    actionType: 'esp-cadre-redirect',
    action: () => '/messagerie/newsletters/create',
  },
  events: {
    title: 'Créer un événement',
    actionType: 'esp-cadre-redirect',
    action: () => '/evenements/creer',
  },
  news: {
    title: 'Créer une notification',
    actionType: 'esp-cadre-redirect',
    action: () => '/notifications',
  },
} as const

function CircleGradientButton({ children, ...rest }: CircleProps) {
  return (
    <Circle size={rest.size} elevation={'$2.5'} {...rest}>
      <Circle borderWidth={0} backgroundColor="$white1" overflow="hidden" size={rest.size} elevation={5}>
        <LinearGradient flex={1} width="100%" colors={['$blue4', '$purple6', '$blue4', '$purple6', '$blue4']} start={[1, 1]} end={[0, 0]}>
          <Circle
            margin={2}
            onPress={rest.onPress}
            backgroundColor="$white1"
            flex={1}
            hoverStyle={{
              backgroundColor: '$white1',
            }}
            pressStyle={{
              backgroundColor: '$white/48',
            }}
          >
            {children}
          </Circle>
        </LinearGradient>
      </Circle>
    </Circle>
  )
}

const FeatureActionsType = ['actions', 'messages', 'events', 'news'] as const

const isFeatureAction = (x: unknown): x is (typeof FeatureActionsType)[number] => z.enum(FeatureActionsType).safeParse(x).success

type ActionArgs =
  | {
      type: 'features'
      id: (typeof FeatureActionsType)[number]
    }
  | {
      type: 'scopes'
      id: string
    }

type ListsData =
  | {
      type: 'features'
      items: { id: (typeof FeatureActionsType)[number]; value: string }[]
    }
  | {
      type: 'scopes'
      items: { id: string; value: string }[]
    }

export default function QuickAction() {
  const [open, setOpen] = useState(false)

  const insets = useSafeAreaInsets()
  const { scope } = useSession()
  const feature = useRef<(typeof FeatureActionsType)[number] | null>(null)

  const features = useMemo(() => Array.from(new Set(scope.data?.flatMap((x) => x.features))).filter(isFeatureAction), [scope.data])
  const getScopesByFeature = useCallback(
    (feature: (typeof FeatureActionsType)[number]) => scope.data?.filter((x) => x.features.includes(feature)),
    [scope.data],
  )

  const defaultList = {
    type: 'features',
    items: features.map((feature) => ({
      id: feature,
      value: ActionMapper[feature].title,
    })),
  } as const

  const [listData, setListData] = useState<ListsData>(defaultList)
  const handleTriggerPress = useCallback(
    (toggle = true) =>
      () => {
        if (!toggle) {
          setOpen((x) => !x)
        }
        setListData(defaultList)
      },
    [defaultList],
  )

  const triggerAction = (id: (typeof FeatureActionsType)[number], scope?: string) => {
    const action = ActionMapper[id]
    if (action.actionType === 'custom') {
      action.action(scope)
    } else {
      const EC_URL = new URL(`https://staging-cadre.parti-renaissance.fr`)
      EC_URL.searchParams.set('redirect', action.action())
      if (scope) EC_URL.searchParams.set('scope', scope)
      WebBrowser.openAuthSessionAsync(EC_URL.toString())
    }
    handleTriggerPress(false)()
  }

  const handleItemPress = ({ id, type }: ActionArgs) => {
    if (type === 'features') {
      feature.current = id
      const scopes = getScopesByFeature?.(id)
      if (scopes && scopes.length < 1) {
        triggerAction(id)
        return
      }
      setListData({
        type: 'scopes',
        items: scopes ? scopes?.map((x) => ({ id: x.code, value: x.name })) : [],
      })
    } else {
      if (!feature.current) return
      triggerAction(feature.current, id)
    }
  }
  if (!features) return
  return (
    <>
      <AnimatePresence initial presenceAffectsLayout>
        {open && (
          <YStack
            key="quick-action-overlay"
            animation="quick"
            enterStyle={{ opacity: 1 }}
            exitStyle={{ opacity: 0, pointerEvents: 'none' }}
            cursor="pointer"
            onPress={handleTriggerPress(listData.type === 'scopes')}
            position="absolute"
            bg="$gray/48"
            top={0}
            left={0}
            width={'100%'}
            flex={1}
            right={0}
            bottom={0}
            zIndex={99_000}
          >
            <BlurView intensity={20} style={{ flex: 1 }} />
          </YStack>
        )}
        {open && (
          <ActionList
            pointerEvents={open ? undefined : 'none'}
            onActionPress={handleItemPress}
            key={listData.type}
            data={listData}
            loading={scope.isLoading}
            position={'absolute'}
            bottom={10 + 80 + 70 + insets.bottom}
            right={10}
            zIndex={100_000}
          />
        )}
      </AnimatePresence>
      <CircleGradientButton
        size="$5"
        animation={'quick'}
        onPress={handleTriggerPress(listData.type === 'scopes')}
        position={'absolute'}
        // opacity={open ? 0.5 : 1}
        bottom={10 + 80 + 10 + insets.bottom}
        right={10}
        gap="$2"
        bg="red"
        zIndex={100_000}
      >
        {listData.type === 'scopes' ? (
          <ArrowLeft color="$purple10" size={24} />
        ) : open ? (
          <X color="$purple10" size={24} />
        ) : (
          <Plus color="$purple10" size={24} />
        )}
      </CircleGradientButton>
    </>
  )
}

export const ItemFrame = styled(XStack, {
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  animation: 'quickest',
  borderColor: '$purple/8',
  borderBottomWidth: 1,
  gap: '$4',

  backgroundColor: '$white1',
  minHeight: '$5',
  paddingHorizontal: '$4.5',

  hoverStyle: {
    backgroundColor: '$gray1',
    borderColor: '$gray/24',
  },
  pressStyle: {
    backgroundColor: '$white/48',
    borderColor: '$gray/24',
  },
})

export const ListFrame = styled(YStack, {
  width: '100%',
  flex: 1,
  overflow: 'hidden',
  borderRadius: '$3',
})

type ActionListData<D extends string, ID extends string> = {
  type: ID
  items: Array<{ id: D; value: string }>
}

type ActionListProps<D extends string, ID extends string> = {
  onActionPress: (args: { id: D; type: ID }) => void
  data: ActionListData<D, ID>
  loading?: boolean
}

const ActionList = <D extends string, ID extends string>({ onActionPress, data, loading, ...props }: YStackProps & ActionListProps<D, ID>) => {
  const list = useMemo(
    () =>
      data?.items.map((item) => (
        <ItemFrame key={item.id} onPress={() => onActionPress({ type: data.type, id: item.id })}>
          <Text color="$purple10" fontWeight="$5">
            {item.value}
          </Text>
          <ArrowRight color="$purple10" size={24} />
        </ItemFrame>
      )) ?? null,
    [data],
  )

  return (
    <YStack
      gap="$2"
      zIndex={100_000}
      overflow="hidden"
      borderRadius="$4"
      animation="quick"
      width={300}
      enterStyle={{ opacity: 1, scale: 1 }}
      exitStyle={{ opacity: 0, scale: 0 }}
      {...props}
    >
      <LinearGradient p="$1" width="100%" colors={['$blue4', '$purple6', '$blue4', '$purple6', '$blue4']} start={[1, 1]} end={[0, 0]}>
        <ListFrame width="100%">
          {loading && <SkeCard.Title />}
          {list}
        </ListFrame>
      </LinearGradient>
    </YStack>
  )
}
