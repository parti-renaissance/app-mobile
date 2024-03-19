import Header from './Header'


export default {
  title: 'Header',
  component: Header,
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
