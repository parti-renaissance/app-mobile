import { TouchableOpacity } from 'react-native'
import Text from '@/components/base/Text'
import ProfilePicture from '@/components/ProfilePicture'
import Tag from '@/components/Tag/Tag'
import { activistTagShape } from '@/data/activistTagShape'
import { RestProfileTag } from '@/data/restObjects/RestProfileResponse'
import { ChevronRight, Repeat } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { Button, View, YStack } from 'tamagui'

export interface ProfileCardProps {
  firstName?: string
  lastName?: string
  src?: string
  onButtonPress?: () => void
  tags?: RestProfileTag[]
}

export default function ProfileCard({ firstName = '', lastName = '', tags, onButtonPress, src }: ProfileCardProps) {
  return (
    <YStack gap={'$4'} padding={'$4'} borderRadius={'$8'} bg={'$white1'}>
      <Link href={'/profil'} asChild>
        <TouchableOpacity>
          <View alignItems={'center'} flexDirection={'row'}>
            <YStack marginRight={'$3'}>
              <ProfilePicture
                fullName={`${firstName} ${lastName}`}
                alt="profile picture"
                size="$4"
                src={src}
                backgroundColor="$gray2"
                textColor="$gray6"
                fontWeight={600}
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
        <View flexDirection={'row'} gap={'$1.5'}>
          {tags.map((el) => (
            <Tag key={el.type} label={el.label} color={activistTagShape[el.type]?.color} bgColor={activistTagShape[el.type]?.bgColor} />
          ))}
        </View>
      )}

      {onButtonPress && (
        <View>
          <Button variant={'outlined'} borderColor={'$purple4'} onPress={onButtonPress}>
            <Button.Icon>
              <Repeat color={'$textSecondary'} />
            </Button.Icon>
            <Button.Text color={'$textSecondary'}>Mon espace cadre</Button.Text>
          </Button>
        </View>
      )}
    </YStack>
  )
}
