import { ComponentProps, useId } from 'react'
import { Input } from '@/components/Bento/Inputs/components/inputsParts'
import { useSession } from '@/ctx/SessionProvider'
import { Check as CheckIcon, Scroll } from '@tamagui/lucide-icons'
import { Formik } from 'formik'
import { Anchor, Checkbox, CheckboxProps, Dialog, H2, Label, Paragraph, ScrollView, Text, View, XStack, YStack } from 'tamagui'
import zod from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import Button from '../Button'

const registerFormSchema = zod.object({
  first_name: zod.string().min(1, { message: 'Le prénom ne doit pas être vide' }),
  email: zod.string().email({ message: "L'email n'est pas valide" }),
  postal_code: zod.string().length(5, { message: 'Le code postal doit contenir 5 chiffres' }),
  cgu: zod.boolean().refine((value) => value, { message: 'Vous devez accepter les CGU' }),
  news: zod.boolean(),
})

type VoxInputProps = {
  name: string
  error?: string
  placeholder?: string
  autocomplete?: ComponentProps<typeof Input.Area>['autoComplete']
} & ComponentProps<typeof Input>

export function VoxInput({ name, placeholder, autocomplete, error, value, ...props }: VoxInputProps) {
  const uniqueId = useId()
  const id = uniqueId + name

  return (
    <View flexDirection="column" justifyContent="center" alignItems="center" gap="$6">
      <Input
        {...props}
        size="$3"
        minWidth="100%"
        $group-window-gtXs={{ minWidth: 150 }}
        {...(error && {
          theme: 'red',
        })}
      >
        <Input.Box>
          <Input.Area autoComplete={autocomplete} id={id} placeholder={placeholder} value={value} />
        </Input.Box>
        {error && <Input.Info>{error}</Input.Info>}
      </Input>
    </View>
  )
}

type VoxCheckboxProps = {
  name: string
  label: string
  error?: string
} & CheckboxProps

const VoxCheckbox = ({ label, name, error, ...props }: VoxCheckboxProps) => {
  const uniqueId = useId()
  return (
    <YStack flex={1} gap="$2" theme={error ? 'red' : undefined}>
      <XStack gap="$3" flex={1} alignItems="center">
        <Checkbox id={name + uniqueId} {...props}>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>
        <Label htmlFor={name + uniqueId} gap="$1">
          <Text lineHeight="$2">{label}</Text>
        </Label>
      </XStack>
      {error && <Text fontSize="$1">{error}</Text>}
    </YStack>
  )
}

type RegisterForm = zod.infer<typeof registerFormSchema>

const initialValues = {
  first_name: 'Antonin',
  email: '',
  postal_code: '76910',
  cgu: true,
  news: false,
} satisfies RegisterForm

const EventRegisterForm = () => {
  const { signIn } = useSession()
  const onSubmit = (values: RegisterForm) => {
    console.log(values)
  }

  return (
    <Formik<typeof initialValues> initialValues={initialValues} validationSchema={toFormikValidationSchema(registerFormSchema)} onSubmit={onSubmit}>
      {({ values, errors, handleChange, setFieldValue }) => (
        <YStack gap="$4">
          <Text fontWeight="$6" fontSize="$3" textAlign="center" color="$textPrimary">
            M’inscrire à cet évènement
          </Text>
          <VoxInput name="first_name" placeholder="Prénom" error={errors.first_name} value={values.first_name} onChange={handleChange('first_name')} />
          <VoxInput name="email" placeholder="Email" error={errors.email} value={values.email} onChange={handleChange('email')} />
          <VoxInput name="postal_code" placeholder="Code postal" error={errors.postal_code} value={values.postal_code} onChange={handleChange('postal_code')} />
          <YStack gap="$3">
            <VoxCheckbox
              name="news"
              label="Je m’abonne à la newsletter pour ne rien rater de des actualités de Besoin d’Europe (optionnel)"
              error={errors.news}
              checked={values.news}
              onCheckedChange={(x) => setFieldValue('news', x)}
            />
            <VoxCheckbox
              name="cgu"
              label="J’ai lu et j’accepte la politique de protection des données et les mentions d’informations relatives au traitement de mes données."
              error={errors.cgu}
              checked={values.cgu}
              onCheckedChange={(x) => setFieldValue('cgu', x)}
            />
          </YStack>

          <YStack>
            <Anchor href="https://besoindeurope.fr/politique-de-protection-des-donnees" color="$black1" fontSize="$1" textAlign="center">
              Politique de protection des données
            </Anchor>
            <MentionLegale />
          </YStack>

          <Button size="lg" width="100%">
            <Button.Text>S'inscrire</Button.Text>
          </Button>

          <Button variant="text" size="lg" width="100%" onPress={signIn}>
            <Text fontSize="$1">
              <Text color="$textPrimary" fontWeight="$7">
                Me connecter
              </Text>{' '}
              <Text color="$textSecondary">pour m’inscrire en un clic.</Text>
            </Text>
          </Button>
        </YStack>
      )}
    </Formik>
  )
}

function MentionLegale() {
  return (
    <Dialog modal>
      <Dialog.Trigger>
        <Anchor color="$black1" fontSize="$1" textAlign="center" textDecorationLine="underline">
          Mention d’informations relatives au traitement de mes données
        </Anchor>
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
          gap="$4"
        >
          <ScrollView flex={1} maxWidth={800} gap="$4.5">
            <H2>Legalite</H2>
            <Paragraph>
              Les données recueillies sur ce formulaire sont traitées par Renaissance et ses équipes aux fins d’organisation de cet événement. Elles permettront
              à ses équipes de gérer les informations relatives aux participants et de vous inviter à d’autres événements qu’elles organisent. Elles permettront
              également à Renaissance de vous envoyer ses communications politiques si vous y consentez. En envoyant ce formulaire, vous acceptez que
              Renaissance traite vos données pour ces finalités. Les champs marqués d’un astérisque sont obligatoires, l’absence de réponse dans ces champs ne
              permettra pas de traiter votre demande. Vos données seront conservées jusqu’à 1 mois à compter de la fin de l’événement ou jusqu’au retrait de
              votre consentement lorsque vous acceptez de recevoir les communications politiques de Renaissance. Conformément à la réglementation en vigueur,
              vous pouvez retirer votre consentement à tout moment. Vous disposez d’un droit d’opposition et d’un droit à la limitation du traitement des
              données vous concernant, ainsi que d’un droit d’accès, de rectification et d’effacement de vos données. Vous disposez, par ailleurs, de la faculté
              de donner des directives sur le sort de vos données après votre décès. Vous pouvez exercer vos droits en contactant Renaissance à l’adresse
              postale : Renaissance, 68 rue du Rocher 75008 Paris, ou à l’adresse électronique mes-donnees@parti-renaissance.fr. Dans certaines hypothèses, une
              copie de votre pièce d’identité pourra vous être demandée. Pour toute information relative au traitement de vos données par Renaissance, vous
              pouvez consulter la politique de protection des données ou contacter le délégué à la protection des données à l’adresse dpo@parti-renaissance.fr
            </Paragraph>
            <Paragraph>
              (1) J’autorise Renaissance ou toute structure qui se substituerait à elle, à enregistrer, à fixer mon image et/ou ma voix sur tous supports, à
              l’exploiter et à la diffuser en intégralité ou par extrait sans limitation du nombre de reproduction, sur tous canaux, sites web et réseaux
              sociaux édités par les équipes de Renaissance ou ses associations partenaires, dans le cadre de sa communication politique, sous toutes formes,
              par quelque moyen technique que ce soit, et dans le monde entier, et ce, pour une durée de 2 ans. J’accepte également que cette vidéo soit
              partagée en intégralité ou par extrait, sur les réseaux sociaux par d’autres utilisateurs. Cette autorisation est consentie à titre gratuit, sans
              aucune exploitation commerciale. Si je participe en compagnie d’une personne mineure, en qualité de représentant légal de cette personne mineure,
              j’autorise sans réserve Renaissance ou toute structure qui se substituerait à elle, à enregistrer, à fixer les images de la personne participante
              dont j’ai la responsabilité, ainsi que les éléments sonores dont elle serait l’émettrice, durant l’événement autorise Renaissance à exploiter ces
              images et/ou éléments sonores, à les diffuser intégralement ou par extrait, sans limitation du nombre de reproduction, sur tous canaux, sites web
              et réseaux sociaux édités par Renaissance ou ses partenaires, dans le cadre de sa communication politique, sous toutes formes, par quelque moyen
              technique que ce soit, et dans le monde entier, et ce, pour un durée de 2 ans. J’accepte également que cette vidéo contenant l’image et/ou la voix
              de la personne dont j’ai la responsabilité soit partagée sur les réseaux sociaux par d’autres utilisateurs. Cette autorisation est consentie à
              titre gratuit, sans aucune exploitation commerciale.
            </Paragraph>
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default EventRegisterForm
