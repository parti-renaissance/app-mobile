import React, { View } from 'react-native'
import TamaguiProvider from '../src/tamagui/provider'

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
    (Story, { parameters }) => (
      <TamaguiProvider>
        <View
          style={{
            flex: 1,
            backgroundColor:
              parameters.noBackground === true ? undefined : '#26c6da',
            padding: 8,
          }}
        >
          <Story />
        </View>
      </TamaguiProvider>
    ),
  ],
}

export default preview
