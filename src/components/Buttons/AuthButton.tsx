import { ComponentProps } from 'react'
import Button, { VoxButton } from '@/components/Button'
import { useSession } from '@/ctx/SessionProvider'

export const SignInButton = (props: Omit<ComponentProps<typeof VoxButton>, 'children'>) => {
  const { signIn } = useSession()
  return (
    <VoxButton onPress={signIn} variant="text" size="md" {...props}>
      Me connecter
    </VoxButton>
  )
}

export const SignUpButton = (props: Omit<ComponentProps<typeof VoxButton>, 'children'>) => {
  const { signUp } = useSession()
  return (
    <VoxButton onPress={signUp} variant="contained" size="md" theme="blue" {...props}>
      Créer un compte
    </VoxButton>
  )
}

export default {
  SignInButton,
  SignUpButton,
}
