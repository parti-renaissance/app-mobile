import { Paragraph, Theme, XStack, XStackProps } from 'tamagui'

export type InternAlertProps = {
  type: 'info' | 'warning' | 'danger' | 'success'
} & XStackProps

const AlertToColor = {
  info: 'blue',
  warning: 'orange',
  danger: 'red',
  success: 'green',
} as const

const InternAlert = (props: InternAlertProps) => {
  const { type, children, ...XStackProps } = props
  const themeColor = AlertToColor[type]
  return (
    <Theme name={themeColor}>
      <Theme name="InternAlert">
        <XStack {...XStackProps} borderRadius="$3" padding="$3" borderWidth="$1" borderColor={'$borderColor'} backgroundColor={'$background'}>
          <Paragraph size="$4" color="$color">
            {children}
          </Paragraph>
        </XStack>
      </Theme>
    </Theme>
  )
}

export default InternAlert
