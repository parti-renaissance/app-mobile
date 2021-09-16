import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PhoningParamList, Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import PhoningScreen from './PhoningScreen'
import PhoningTutorialScreen from '../phoningTutorial/PhoningTutorialScreen'
import PhoningCampaignBriefScreen from '../phoningCampaignBrief/PhoningCampaignBriefScreen'
import PhoningCampaignScoreboardScreen from '../phoningCampaignScoreboard/PhoningCampaignScoreboardScreen'

const Stack = createStackNavigator<PhoningParamList>()

const PhoningNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={Screen.phoning}
        component={PhoningScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.phoningTutorial}
        component={PhoningTutorialScreen}
        options={{ headerTransparent: false }}
      />
      <Stack.Screen
        name={Screen.phoningCampaignBrief}
        component={PhoningCampaignBriefScreen}
      />
      <Stack.Screen
        name={Screen.phoningCampaignScoreboard}
        component={PhoningCampaignScoreboardScreen}
      />
    </Stack.Navigator>
  )
}

export default PhoningNavigator
