import { styled, View, Card as TGCard, Text} from 'tamagui'
const Card = styled(TGCard, {
  name: 'Card',
  backgroundColor: '$white',
  borderRadius: '$10',
  padding: '$4.5',
  width: '100%',
  height: '100%',
} as const)



export default Card

