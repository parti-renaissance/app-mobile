import { LinearGradient } from '@tamagui/linear-gradient'
import { Button, ButtonProps } from 'tamagui'

export default function GradientButton({ children, ...rest }: ButtonProps) {
  return (
    <LinearGradient borderRadius={9} colors={['$blue4', '$purple6', '$blue4', '$purple6', '$blue4']} start={[1, 1]} end={[0, 0]} p={1}>
      <Button
        variant={'outlined'}
        borderWidth={0}
        backgroundColor="$white1"
        borderRadius={8}
        hoverStyle={{
          backgroundColor: '$white1',
        }}
        {...rest}
      >
        {children}
      </Button>
    </LinearGradient>
  )
}
