import { useMedia } from 'tamagui'
import FormationDesktopScreen from './desktop/PageDesktop'
import FormationMobileScreen from './mobile/PageMobile'
import type { FormationScreenProps } from './types'

const FormationScreen: FormationScreenProps = (props) => {
  const media = useMedia()
  return media.gtSm ? <FormationDesktopScreen {...props} /> : <FormationMobileScreen {...props} />
}

export default FormationScreen
