import Badge from '@/components/Badge'
import { activistTagShape } from '@/data/activistTagShape'
import { RestProfilResponse } from '@/services/profile/schema'
import { View, ViewProps } from 'tamagui'

export default function ProfileTags({ tags, ...props }: { tags: RestProfilResponse['tags'] } & ViewProps) {
  return tags.length > 0 ? (
    <View flexDirection={'row'} gap={8} flexWrap={'wrap'} {...props}>
      {tags.map((el) => (
        <Badge key={el.type} theme={activistTagShape[el.type]?.theme ?? undefined}>
          {el.label}
        </Badge>
      ))}
    </View>
  ) : null
}
