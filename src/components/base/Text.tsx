import { styled, Text as TamaguiText, withStaticProperties } from 'tamagui'

const Text = styled(TamaguiText, {
  fontSize: '$2',
  color: '$textPrimary',
})

export const H1 = styled(Text, {
  fontSize: '$4',
  fontWeight: '$6',
})

export const H2 = styled(Text, {
  fontSize: '$3',
  fontWeight: '$5',
})

export const P = styled(Text, {
  fontSize: '$2',
  fontWeight: '$4',
  lineHeight: '$3',
  color: '$textSecondary',
})

export default withStaticProperties(Text, { H1, H2, P })
