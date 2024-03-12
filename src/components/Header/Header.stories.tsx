import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './Header'

const queryClient = new QueryClient()

export default {
  title: 'Header',
  component: Header,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
}

export function Default() {
  return <Header onClosePress={() => {}} onSearchPress={() => {}} />
}

export function WithButtonSearch() {
  return <Header onSearchPress={() => {}} />
}

export function WithButtonClose() {
  return <Header onClosePress={() => {}} />
}

export function WithoutLogo() {
  return <Header hideLogo />
}

export function WithoutAvatar() {
  return <Header hideAvatar />
}
