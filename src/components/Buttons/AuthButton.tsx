import { ComponentProps } from 'react'
import Button from '@/components/Button'
import { useSession } from '@/ctx/SessionProvider'

export const SignInButton = (props: ComponentProps<typeof Button>) => {
  const { signIn } = useSession()
  return (
    <Button onPress={signIn} variant="text" size="md" {...props}>
      <Button.Text>Me connecter</Button.Text>
    </Button>
  )
}

export const SignUpButton = (props: ComponentProps<typeof Button>) => {
  const { signUp } = useSession()
  return (
    <Button onPress={signUp} variant="contained" size="md" bg="$blue7" {...props}>
      <Button.Text>Créer un compte</Button.Text>
    </Button>
  )
}

export default {
  SignInButton,
  SignUpButton,
}
