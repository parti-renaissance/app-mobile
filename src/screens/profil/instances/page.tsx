import React, { Fragment, useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { useGetInstances } from '@/services/profile/hook'
import { RestInstancesResponse } from '@/services/profile/schema'
import { Circle, Diamond, Triangle } from '@tamagui/lucide-icons'
import { isWeb, ScrollView, useMedia, YStack } from 'tamagui'
import InstanceCard from './components/InstanceCard'

type Instance = RestInstancesResponse[number]

const isCommittee = (instance: any): instance is Instance & { type: 'committee' } => instance.type === 'committee'
const isAssembly = (instance: any): instance is Instance & { type: 'assembly' } => instance.type === 'assembly'
const isCirconscription = (instance: any): instance is Instance & { type: 'circonscription' } => instance.type === 'circonscription'

const InstancesScreen = () => {
  const media = useMedia()

  const { data } = useGetInstances()
  const [assembly] = data.filter(isAssembly)
  const [committee] = data.filter(isCommittee)
  const [circonscription] = data.filter(isCirconscription)

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$5' : undefined,
      pl: media.gtSm ? '$5' : undefined,
      pr: media.gtSm ? '$5' : undefined,
      pb: isWeb ? '$10' : '$12',
    }),
    [media],
  )

  return (
    <PageLayout.MainSingleColumn position="relative">
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={scrollViewContainerStyle}>
          <YStack gap="$4" flex={1} $sm={{ pt: '$4' }}>
            <InstanceCard
              title="Mon assemblée"
              icon={Circle}
              description="Les Assemblées départementales, des Outr-Mer et celle des Français de l’Étranger sont le visage de notre parti à l’échelle local. Elle est pilotée par un bureau et son Président, élus directement par les adhérents."
              footer={
                <Text.P>Cette Assemblée vous a été attribuée en fonction de votre lieu de résidence. Modifiez votre adresse postale pour en changer.</Text.P>
              }
            >
              {assembly ? (
                <InstanceCard.Content title={assembly.name} />
              ) : (
                <InstanceCard.EmptyState message="Vous n’avez pas d’Assemblée rattachée. Il s’agit certainement d’un bug, contactez adherents@parti-renaissance.fr." />
              )}
            </InstanceCard>
            <InstanceCard
              title="Mon délégué de circonscription"
              icon={Triangle}
              middleIconOffset={2.5}
              description="Chaque circonscription législative peut avoir un délégué de circonscription. Il s’agit du Député Ensemble de la circonscription ou d’un adhérent nommé par le bureau de l’Assemblée."
              footer={
                <YStack>
                  <Text.P>
                    Cette circonscription vous a été attribuée en fonction de votre lieu de résidence. Modifiez votre adresse postale pour en changer.
                  </Text.P>
                </YStack>
              }
            >
              {circonscription ? (
                <InstanceCard.Content title={circonscription.name} />
              ) : (
                <InstanceCard.EmptyState message="Vous n’avez pas de circonscription rattachée." />
              )}
            </InstanceCard>

            <InstanceCard
              title="Mon comité"
              icon={Diamond}
              description="Échelon de proximité, les comités locaux sont le lieux privilégié de l’action militant. Ils animent la vie du parti et contribuent à notre implantation territoriale."
              footer={
                <YStack gap={16}>
                  <Text.P>
                    Le comité de votre lieu de résidence vous est attribué par défaut. Vous pouvez néanmoins en changer pour un autre comité de votre
                    département.
                  </Text.P>
                  {committee && committee.assembly_committees_count > 1 ? (
                    <VoxButton variant="outlined">Choisir parmi {committee.assembly_committees_count} comités</VoxButton>
                  ) : null}
                </YStack>
              }
            >
              {committee && committee.assembly_committees_count > 0 ? (
                <InstanceCard.Content title={committee.name} description={`${committee.members_count} Adhérents`} />
              ) : (
                <InstanceCard.EmptyState
                  message={committee === undefined ? 'Vous n’êtes rattaché à aucun comité.' : 'Malheureusement, votre comité ne dispose d’aucun comité.'}
                />
              )}
            </InstanceCard>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default InstancesScreen
