import { Paragraph, Theme, XStack, XStackProps } from 'tamagui'

export type InternAlertProps = {
  type?: 'info' | 'warning' | 'danger' | 'success'
  borderLess?: boolean
} & XStackProps

const AlertToColor = {
  info: 'blue',
  warning: 'orange',
  danger: 'red',
  success: 'green',
} as const

const InternAlert = (props: InternAlertProps) => {
  const { type, children, borderLess = false, ...XStackProps } = props
  const themeColor = type ? AlertToColor[type] : 'gray'
  return (
    <Theme name={themeColor}>
      <Theme name="InternAlert">
        <XStack
          {...XStackProps}
          borderRadius="$3"
          padding="$medium"
          borderWidth={borderLess ? 0 : '$1'}
          borderColor={'$borderColor'}
          backgroundColor={'$background'}
        >
          <Paragraph size="$medium" color="$color" textAlign="center" flex={1}>
            {children}
          </Paragraph>
        </XStack>
      </Theme>
    </Theme>
  )
}

export default InternAlert
