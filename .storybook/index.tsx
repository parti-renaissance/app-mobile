import AsyncStorage from '@react-native-async-storage/async-storage'
import { view } from './storybook.requires'

const StorybookUIRoot = view.getStorybookUI({
  port: 7007,
  host: 'localhost',
  tabOpen: -1,
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
})

export default StorybookUIRoot
