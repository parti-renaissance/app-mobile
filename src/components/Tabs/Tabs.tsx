import { createContext, memo, ReactElement, useCallback, useContext } from 'react'
import { styled, withStaticProperties, XStack, YStackProps } from 'tamagui'
import _Tab, { TabProps } from './Tab'

const TabMemo = memo(_Tab)

export const TabsContext = createContext({
  activeTab: '',
  grouped: false as boolean | undefined,
  setActiveTab: (id: string) => {},
})

type TabsFrameProps<A extends string> = YStackProps & {
  onChange: (id: A) => void
  value: A
  children: ReactElement<_TabProps<A>>[]
  grouped?: boolean
}

const StyledFrame = styled(XStack, {
  gap: '$3',
  padding: '$3.5',
  variants: {
    grouped: {
      true: {
        bg: '$white1',
        gap: 0,
        padding: 0,
      },
    },
  },
} as const)

function TabsFrame<A extends string>({ children, value, onChange, grouped, ...rest }: TabsFrameProps<A>) {
  return (
    <TabsContext.Provider value={{ activeTab: value, setActiveTab: onChange, grouped }}>
      <StyledFrame grouped={grouped} {...rest}>
        {children}
      </StyledFrame>
    </TabsContext.Provider>
  )
}

type _TabProps<A extends string> = {
  id: A
} & TabProps

export const Tab = <A extends string>(props: _TabProps<A>) => {
  const ctx = useContext(TabsContext)
  const handlePress = useCallback(() => ctx.setActiveTab(props.id), [props.id])
  return <TabMemo {...props} grouped={ctx.grouped} active={ctx.activeTab === props.id} onPress={handlePress} />
}

export const Tabs = withStaticProperties(TabsFrame, {
  Tab,
})
