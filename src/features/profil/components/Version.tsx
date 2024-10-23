import Text from '@/components/base/Text'
import clientEnv from '@/config/clientEnv'
import { nativeBuildVersion } from 'expo-application'
import Constants from 'expo-constants'
import { isWeb } from 'tamagui'

export default function Version() {
  return (
    <Text.SM alignSelf="center">
      Version {Constants.expoConfig?.version ?? '0.0.0'} [{isWeb ? '' : nativeBuildVersion}
      {isWeb ? '' : ' - '}
      {clientEnv.ENVIRONMENT}]
    </Text.SM>
  )
}
