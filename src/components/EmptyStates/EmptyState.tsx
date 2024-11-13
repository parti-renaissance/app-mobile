import EmptyStateIllustration from '@/assets/illustrations/EmptyStateIllustration'
import { View } from 'tamagui'

export default function EmptyState(props: { children: React.ReactNode }) {
  return (
    <View alignSelf="center" alignContent="center" gap="$medium">
      <EmptyStateIllustration />
      {props.children}
    </View>
  )
}
