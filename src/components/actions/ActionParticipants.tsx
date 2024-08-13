import React from 'react'
import Text from '@/components/base/Text'
import ProfilePicture from '@/components/ProfilePicture'
import { RestActionAuthor, RestActionParticipant } from '@/services/actions/schema'
import { YStack, YStackProps } from 'tamagui'

export default function ActionParticipants({ participant, ...props }: Readonly<{ participant: RestActionParticipant | RestActionAuthor }> & YStackProps) {
  const getIsAuthor = (guy: RestActionParticipant | RestActionAuthor): guy is RestActionAuthor => 'first_name' in guy
  const isAuthor = getIsAuthor(participant)
  const namesContainer = isAuthor ? participant : participant.adherent
  const fullName = `${namesContainer.first_name} ${namesContainer.last_name}`
  return (
    <YStack justifyContent="center" alignItems="center" gap="$2" {...props} overflow="hidden" width={90}>
      <YStack position="relative" width={'100%'} justifyContent="center" alignItems="center">
        <ProfilePicture
          size="$5"
          src={namesContainer.image_url ?? undefined}
          fullName={fullName}
          alt={`Photo de ${fullName}`}
          rounded
          borderBlockColor="$textPrimary"
          borderWidth={isAuthor ? 1 : 0}
        />
        {isAuthor && (
          <YStack position="absolute" bottom={0} width="100%" justifyContent="center" alignContent="center" alignItems="center">
            <YStack
              borderBlockColor="$textPrimary"
              borderWidth={1}
              borderRadius="$4"
              justifyContent="center"
              alignContent="center"
              bg="$white1"
              p={2}
              paddingHorizontal="$2.5"
            >
              <Text fontSize="$1" color="$textPrimary" textAlign="center" fontWeight="$5">
                Auteur
              </Text>
            </YStack>
          </YStack>
        )}
      </YStack>
      <YStack justifyContent="center" alignItems="center" gap="$2">
        <Text numberOfLines={1} color={isAuthor ? '$textPrimary' : '$textSecondary'}>
          {namesContainer.first_name}
        </Text>
        <Text numberOfLines={1} color={isAuthor ? '$textPrimary' : '$textSecondary'}>
          {namesContainer.last_name}
        </Text>
      </YStack>
    </YStack>
  )
}
