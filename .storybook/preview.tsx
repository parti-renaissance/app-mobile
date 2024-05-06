import React from 'react-native'
import { Stack } from 'tamagui'

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    noBackground: true,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story) => (
      <Stack flex={1} width="100%" backgroundColor="$white1" justifyContent="center" alignItems="center">
        <Stack flex={1} width="100%" $gtSm={{ maxWidth: 800 }} backgroundColor="$white1" justifyContent="center" alignItems="center">
          <Story />
        </Stack>
      </Stack>
    ),
  ],
}

export default preview
