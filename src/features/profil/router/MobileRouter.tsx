import { Stack } from 'expo-router'
import { omit } from 'lodash'
import PageHeader from '../components/PageHeader'
import { pageConfigs } from '../configs'

const configArray = Object.entries(omit(pageConfigs, ['index']))

export default function MobileProfilRouter() {
  return (
    <Stack screenOptions={{ animation: 'slide_from_right' }}>
      {configArray.map(([screenName, config]) => (
        <Stack.Screen
          key={screenName}
          name={screenName}
          options={{
            header: () => <PageHeader {...config} backArrow={screenName !== 'index'} />,
          }}
        />
      ))}
    </Stack>
  )
}
