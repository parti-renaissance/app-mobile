import React, { ComponentProps, useId, useRef } from 'react'
import { Linking, LogBox } from 'react-native'
import Text from '@/components/base/Text'
import { Input } from '@/components/Bento/Inputs/components/inputsParts'
import Button from '@/components/Button/Button'
import { PublicSubscribeEventFormError } from '@/core/errors'
import { useSession } from '@/ctx/SessionProvider'
import { PublicSubscribtionFormData, PublicSubscribtionFormDataSchema } from '@/data/restObjects/RestEvents'
import { useSubscribePublicEvent } from '@/hooks/useEvents'
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { Formik, FormikHelpers } from 'formik'
import { Checkbox, CheckboxProps, Dialog, H2, isWeb, Label, Paragraph, ScrollView, Spinner, useMedia, View, XStack, YStack } from 'tamagui'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import FormikController from '../FormikController'
import VoxCard from '../VoxCard/VoxCard'

LogBox.ignoreLogs([/bad setState[\s\S]*Themed/])

type VoxInputProps = {
  id: string
  error?: string
  placeholder?: string
  autocomplete?: ComponentProps<typeof Input.Area>['autoComplete']
} & ComponentProps<typeof Input.Area>

function _VoxInput({ id: _id, placeholder, autocomplete, error, value, onChange, ...props }: VoxInputProps & { value: string; onChange: (x: string) => void }) {
  const uniqueId = useId()
  const id = uniqueId + _id

  return (
    <View flexDirection="column" justifyContent="center" alignItems="center" gap="$6">
      <Input
        size="$3"
        minWidth="100%"
        $group-window-gtXs={{ minWidth: 150 }}
        {...(error && {
          theme: 'red',
        })}
      >
        <Input.Box>
          <Input.Area autoComplete={autocomplete} id={id} placeholder={placeholder} value={value} onChangeText={onChange} {...props} />
        </Input.Box>
        {!!error && <Input.Info>{error}</Input.Info>}
      </Input>
    </View>
  )
}

const VoxInput = React.memo(_VoxInput)

type VoxCheckboxProps = {
  id: string
  label: string
  error?: string
} & CheckboxProps & { checked: boolean; onCheckedChange: (x: boolean) => void }

const VoxCheckbox = ({ label, id: _id, error, ...rest }: VoxCheckboxProps) => {
  const uniqueId = useId()
  const id = uniqueId + _id

  return (
    <YStack gap="$2" theme={error ? 'red' : undefined}>
      <XStack gap="$4" alignItems="center">
        <Checkbox id={id} {...rest}>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>
        <Label htmlFor={id} gap="$1" flex={1} lineHeight="$2" fontSize="$2">
          <Text>{label}</Text>
        </Label>
      </XStack>
      {!!error && <Text fontSize="$1">{error}</Text>}
    </YStack>
  )
}

const initialValues = {
  first_name: '',
  last_name: '',
  email_address: '',
  postal_code: '',
  cgu_accepted: false,
  join_newsletter: false,
} satisfies PublicSubscribtionFormData

const EventRegisterForm = (props: { onScrollTo?: (x: { x: number; y: number }) => void; eventId: string }) => {
  const { signIn } = useSession()
  const { mutateAsync } = useSubscribePublicEvent({ id: props.eventId })
  const onSubmit = (values: PublicSubscribtionFormData, action: FormikHelpers<PublicSubscribtionFormData>) => {
    action.setSubmitting(true)
    mutateAsync(values)
      .then(() => {
        action.resetForm()
        router.replace('/(tabs)/evenements')
      })
      .catch((error) => {
        if (error instanceof PublicSubscribeEventFormError) {
          error.violations.forEach((violation) => {
            if (violation.propertyPath === '') {
              return
            }
            action.setFieldError(violation.propertyPath, violation.message)
          })
        }
      })
      .finally(() => {
        action.setSubmitting(false)
      })
  }
  const media = useMedia()

  const position = useRef<null | { x: number; y: number }>(null)
  const handlePress = () => {
    if (position.current) {
      props.onScrollTo?.(position.current)
    }
  }

  return (
    <Formik<PublicSubscribtionFormData>
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(PublicSubscribtionFormDataSchema)}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <YStack gap="$4" flex={1}>
          <Text fontWeight="$6" fontSize="$3" textAlign="center" color="$textPrimary">
            M’inscrire à cet évènement
          </Text>

          <FormikController name="first_name">{({ inputProps }) => <VoxInput placeholder="Prénom" {...inputProps} />}</FormikController>

          <FormikController name="last_name">{({ inputProps }) => <VoxInput placeholder="Nom" {...inputProps} />}</FormikController>

          <FormikController name="email_address">{({ inputProps }) => <VoxInput placeholder="Email" {...inputProps} />}</FormikController>

          <FormikController name="postal_code">{({ inputProps }) => <VoxInput placeholder="Code postal" {...inputProps} />}</FormikController>
          <YStack gap="$3">
            <FormikController name="join_newsletter">
              {({ inputProps }) => (
                <VoxCheckbox
                  id={inputProps.id}
                  label="Je m’abonne à la newsletter pour ne rien rater de des actualités de Besoin d’Europe (optionnel)"
                  error={inputProps.error}
                  checked={inputProps.value}
                  onBlur={inputProps.onBlur}
                  onCheckedChange={inputProps.onChange}
                />
              )}
            </FormikController>

            <FormikController name="cgu_accepted">
              {({ inputProps }) => (
                <VoxCheckbox
                  id={inputProps.id}
                  label="J’ai lu et j’accepte la politique de protection des données et les mentions d’informations relatives au traitement de mes données."
                  error={inputProps.error}
                  checked={inputProps.value}
                  onCheckedChange={inputProps.onChange}
                />
              )}
            </FormikController>
          </YStack>

          <YStack justifyContent="center" alignContent="center">
            <Button
              width="100%"
              variant="text"
              size="md"
              onPress={async () => {
                const link = 'https://parti-renaissance.fr/politique-de-protection-des-donnees/'

                if (await Linking.canOpenURL(link)) {
                  await Linking.openURL(link)
                }
              }}
            >
              <Button.Text color="$black1" fontWeight="$4" fontSize="$1" textAlign="center" textDecorationLine="underline">
                Politique de protection des données
              </Button.Text>
            </Button>
            <DialogMentionLegale onPress={handlePress} />
          </YStack>

          <Button size="lg" width="100%" onPress={() => handleSubmit()}>
            <Button.Text>S'inscrire</Button.Text>
            {isSubmitting ? <Spinner color="$white1" /> : null}
          </Button>

          <Button variant="text" size="lg" width="100%" onPress={() => signIn()}>
            <Text fontSize="$1">
              <Text color="$textPrimary" fontWeight="$7">
                Me connecter
              </Text>{' '}
              <Text color="$textSecondary">pour m’inscrire en un clic.</Text>
            </Text>
          </Button>

          {media.lg && (
            <YStack
              id="mention-legale"
              gap="$4"
              onLayout={(l) => {
                position.current = { x: l.nativeEvent.layout.x, y: l.nativeEvent.layout.y }
              }}
            >
              <VoxCard.Separator />
              <MentionLegale />
            </YStack>
          )}
        </YStack>
      )}
    </Formik>
  )
}

function DialogMentionLegale(props: { onPress?: () => void }) {
  const media = useMedia()

  return media.gtSm ? (
    <Dialog modal>
      <Dialog.Trigger>
        <Text color="$black1" fontSize="$1" textAlign="center" textDecorationLine="underline">
          Mention d’informations relatives au traitement de mes données
        </Text>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" animation="slow" opacity={0.5} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          maxWidth={600}
        >
          <ScrollView justifyContent="center" height="100%" maxHeight={isWeb ? 'calc(100vh - 100px)' : undefined}>
            <MentionLegale />
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  ) : (
    <Button variant="text" onPress={props.onPress} width="100%" size="md">
      <Button.Text color="$black1" fontWeight="$4" fontSize="$1" textAlign="center" textDecorationLine="underline">
        Mention d’informations relatives au traitement de mes données
      </Button.Text>
    </Button>
  )
}

function MentionLegale() {
  return (
    <YStack gap="$4" flex={1} height="100%">
      <H2>Légalité</H2>
      <Paragraph>
        Les données recueillies sur ce formulaire sont traitées par Renaissance et ses équipes aux fins d’organisation de cet événement. Elles permettront à ses
        équipes de gérer les informations relatives aux participants et de vous inviter à d’autres événements qu’elles organisent. Elles permettront également à
        Renaissance de vous envoyer ses communications politiques si vous y consentez. En envoyant ce formulaire, vous acceptez que Renaissance traite vos
        données pour ces finalités. Les champs marqués d’un astérisque sont obligatoires, l’absence de réponse dans ces champs ne permettra pas de traiter votre
        demande. Vos données seront conservées jusqu’à 1 mois à compter de la fin de l’événement ou jusqu’au retrait de votre consentement lorsque vous acceptez
        de recevoir les communications politiques de Renaissance. Conformément à la réglementation en vigueur, vous pouvez retirer votre consentement à tout
        moment. Vous disposez d’un droit d’opposition et d’un droit à la limitation du traitement des données vous concernant, ainsi que d’un droit d’accès, de
        rectification et d’effacement de vos données. Vous disposez, par ailleurs, de la faculté de donner des directives sur le sort de vos données après votre
        décès. Vous pouvez exercer vos droits en contactant Renaissance à l’adresse postale : Renaissance, 68 rue du Rocher 75008 Paris, ou à l’adresse
        électronique mes-donnees@parti-renaissance.fr. Dans certaines hypothèses, une copie de votre pièce d’identité pourra vous être demandée. Pour toute
        information relative au traitement de vos données par Renaissance, vous pouvez consulter la politique de protection des données ou contacter le délégué
        à la protection des données à l’adresse dpo@parti-renaissance.fr
      </Paragraph>

      <Paragraph>
        (1) J’autorise Renaissance ou toute structure qui se substituerait à elle, à enregistrer, à fixer mon image et/ou ma voix sur tous supports, à
        l’exploiter et à la diffuser en intégralité ou par extrait sans limitation du nombre de reproduction, sur tous canaux, sites web et réseaux sociaux
        édités par les équipes de Renaissance ou ses associations partenaires, dans le cadre de sa communication politique, sous toutes formes, par quelque
        moyen technique que ce soit, et dans le monde entier, et ce, pour une durée de 2 ans. J’accepte également que cette vidéo soit partagée en intégralité
        ou par extrait, sur les réseaux sociaux par d’autres utilisateurs. Cette autorisation est consentie à titre gratuit, sans aucune exploitation
        commerciale. Si je participe en compagnie d’une personne mineure, en qualité de représentant légal de cette personne mineure, j’autorise sans réserve
        Renaissance ou toute structure qui se substituerait à elle, à enregistrer, à fixer les images de la personne participante dont j’ai la responsabilité,
        ainsi que les éléments sonores dont elle serait l’émettrice, durant l’événement autorise Renaissance à exploiter ces images et/ou éléments sonores, à
        les diffuser intégralement ou par extrait, sans limitation du nombre de reproduction, sur tous canaux, sites web et réseaux sociaux édités par
        Renaissance ou ses partenaires, dans le cadre de sa communication politique, sous toutes formes, par quelque moyen technique que ce soit, et dans le
        monde entier, et ce, pour un durée de 2 ans. J’accepte également que cette vidéo contenant l’image et/ou la voix de la personne dont j’ai la
        responsabilité soit partagée sur les réseaux sociaux par d’autres utilisateurs. Cette autorisation est consentie à titre gratuit, sans aucune
        exploitation commerciale.
      </Paragraph>
    </YStack>
  )
}

export default EventRegisterForm
