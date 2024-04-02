import { Stack } from 'tamagui'
import ProfilePicture from './ProfilePicture'

export default {
  title: 'ProfilePicture',
  component: ProfilePicture,
}

export function Default() {
  return (
    <Stack gap="$4">
      <ProfilePicture fullName="Brandon S" alt="Brandon S" rounded />
      <ProfilePicture fullName="John Doe" src="https://via.placeholder.com/128" alt="John Doe" rounded />
      <ProfilePicture fullName="Brandon S" textColor="$gray7" bgColor="$gray3" alt="Brandon S" rounded={false} />
      <ProfilePicture fullName="Brandon S" size={50} src="https://via.placeholder.com/128" alt="Jane Doe" rounded={false} />
    </Stack>
  )
}
