import { Button } from '@/components'
import { AlertDialog, Text, XStack, YStack } from 'tamagui'

type AlertDialogProps = {
  children: React.ReactNode
  onAccept?: () => void
  onCancel?: () => void
  title: string
  description: string
}

export function VoxAlertDialog(props: Readonly<AlertDialogProps>) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>{props.children}</AlertDialog.Trigger>
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
            <Text fontSize="$3" fontWeight="$5" fontFamily="$PublicSans">
              {props.title}
            </Text>

            <AlertDialog.Description>{props.description}</AlertDialog.Description>
            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild onPress={props.onCancel}>
                <Button variant="text">
                  <Button.Text>Annuler</Button.Text>
                </Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild onPress={props.onAccept}>
                <Button variant="contained">
                  <Button.Text>Valider</Button.Text>
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
