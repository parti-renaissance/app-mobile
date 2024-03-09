import { View } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '../tamagui.config'

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => (
      <TamaguiProvider config={config} defaultTheme={'light'}>
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
