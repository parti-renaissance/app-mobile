import React, { NamedExoticComponent } from 'react'
import Text from '@/components/base/Text'
import Button from '@/components/Button'
import { IconProps } from '@tamagui/helpers-icon'
import { CalendarDays, Clock, MapPin, UserCheck } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { Dialog, Image, Separator, View } from 'tamagui'

interface EventRegistrationSuccessProps {
  onClose?: () => void
  open: boolean
}

export default function EventRegistrationSuccess({ onClose, open }: EventRegistrationSuccessProps) {
  return (
    <Dialog modal open={open}>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" animation="slow" opacity={0.5} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

        <Dialog.Content
          elevate
          key="EventRegistrationSuccess"
          p={0}
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <View backgroundColor="$green1" alignItems={'center'} p={'$6'} borderTopLeftRadius={'$4'} borderTopRightRadius={'$4'}>
            <Image source={require('./Assets/vote-box.png')} height={147} resizeMode={'contain'} mb={'$2'} />
            <Text fontWeight={'$5'}>Félicitations vous êtes bien inscrit !</Text>
            <Text fontWeight={'$5'}>Un mail récapitulatif vient de vous être envoyé.</Text>
          </View>

          <View pt={'$4'} p={'$4'}>
            <Text mb={'$4'}>
              <Text fontWeight={'$7'}>Grand Meeting de Lille • </Text>
              <Text color={'$textSecondary'}>Lancement de campagne (34090)</Text>
            </Text>

            <EventEntry text={'Lundi 10 décembre 2024'} Icon={CalendarDays} />
            <EventEntry text={'de 10:00 à 16:00'} Icon={Clock} />
            <EventEntry text={'Montpelier 34090'} captionText={'4 Place de lorem'} Icon={MapPin} />
            <EventEntry text={'200 Participants'} Icon={UserCheck} />
          </View>

          <Separator borderStyle={'dashed'} borderColor="$gray4" />

          <View flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} p={'$4'}>
            <Button variant="text" onPress={onClose}>
              <Button.Text>Retourner sur l'événement</Button.Text>
            </Button>

            <Link href={'/evenements'}>
              <Button variant={'contained'}>
                <Button.Text>Tous les événements</Button.Text>
              </Button>
            </Link>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

const EventEntry = ({ text, captionText, Icon }: { text: string; captionText?: string; Icon: NamedExoticComponent<IconProps> }) => (
  <View flexDirection={'row'} alignItems={'center'} gap={'$2'} mb={'$2'}>
    <View>
      <Icon size={16} />
    </View>
    <View>
      <Text fontSize={12}>
        {text} {captionText ? <Text color={'$textSecondary'}>{`• ${captionText}`}</Text> : null}
      </Text>
    </View>
  </View>
)
