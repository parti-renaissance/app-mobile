import { Redirect } from 'expo-router'

export default function () {
  console.log('Redirecting to /tabs/home')
  return <Redirect href="/(tabs)/home" />
}
