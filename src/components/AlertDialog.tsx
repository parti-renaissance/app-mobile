import { Button } from '@/components'
import Text from '@/components/base/Text'
import { AlertDialog, ThemeName, XStack, YStack } from 'tamagui'
import { VoxButton } from './Button'

type AlertDialogProps = {
  children: React.ReactNode
  onAccept?: () => void
  onCancel?: () => void
  title: string
  description: string
  theme?: ThemeName
}

export function VoxAlertDialog(props: Readonly<AlertDialogProps>) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild theme={props.theme}>
        {props.children}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay key="overlay" animation="quick" opacity={0.75} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$4">
            <Text fontSize="$3" fontWeight="$5">
              {props.title}
            </Text>

            <AlertDialog.Description>{props.description}</AlertDialog.Description>
            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel theme="gray" asChild onPress={props.onCancel}>
                <VoxButton variant="text">Annuler</VoxButton>
              </AlertDialog.Cancel>

              <AlertDialog.Action theme="gray" asChild onPress={props.onAccept}>
                <VoxButton variant="contained">Valider</VoxButton>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
