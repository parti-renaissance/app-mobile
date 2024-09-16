import { TouchableOpacity } from 'react-native'
import Badge from '@/components/Badge'
import Text from '@/components/base/Text'
import Button, { VoxButton } from '@/components/Button'
import ProfilePicture from '@/components/ProfilePicture'
import VoxCard from '@/components/VoxCard/VoxCard'
import { activistTagShape } from '@/data/activistTagShape'
import { RestProfileTag } from '@/data/restObjects/RestProfileResponse'
import { ChevronRight, Repeat } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { View, YStack } from 'tamagui'

export interface ProfileCardProps {
  firstName?: string
  lastName?: string
  src?: string
  onButtonPress?: () => void
  tags?: RestProfileTag[]
}

export default function ProfileCard({ firstName = '', lastName = '', tags, onButtonPress, src }: ProfileCardProps) {
  return (
    <VoxCard inside bg={'$white1'}>
      <VoxCard.Content gap={'$4'}>
        <Link href={'/profil'} asChild>
          <TouchableOpacity>
            <View alignItems={'center'} flexDirection={'row'}>
              <YStack marginRight={'$3'}>
                <ProfilePicture
                  fullName={`${firstName} ${lastName}`}
                  alt="profile picture"
                  size="$4"
                  src={src}
                  backgroundColor="$gray1"
                  textColor="$gray3"
                  fontWeight={'$6'}
                  rounded
                />
              </YStack>
              <YStack>
                <Text fontFamily={'$PublicSans'} color={'$textPrimary'} fontWeight={'500'} fontSize={14}>
                  {firstName} {lastName}
                </Text>
              </YStack>
              <YStack flex={1} alignItems={'flex-end'}>
                <ChevronRight color={'$textSecondary'} />
              </YStack>
            </View>
          </TouchableOpacity>
        </Link>

        {tags && (
          <View flexDirection={'row'} gap={'$1.5'} flexWrap={'wrap'}>
            {tags.map((el) => (
              <Badge key={el.type} theme={activistTagShape[el.type]?.theme}>
                {el.label}
              </Badge>
            ))}
          </View>
        )}

        {onButtonPress && (
          <View flex={1}>
            <VoxButton width="100%" pop variant="soft" theme="purple" iconLeft={Repeat} onPress={onButtonPress}>
              Mon espace cadre
            </VoxButton>
          </View>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}
