import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PhoningParamList, Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import PhoningScreen from './PhoningScreen'
import PhoningTutorialScreen from '../phoningTutorial/PhoningTutorialScreen'
import PhoningCampaignBriefScreen from '../phoningCampaignBrief/PhoningCampaignBriefScreen'
import PhoningCampaignScoreboardScreen from '../phoningCampaignScoreboard/PhoningCampaignScoreboardScreen'
import PhoningCharterScreen from '../phoningCharter/PhoningCharterScreen'

const PhoningStack = createStackNavigator<PhoningParamList>()

const PhoningNavigator: FunctionComponent = () => {
  return (
    <PhoningStack.Navigator screenOptions={headerBlank}>
      <PhoningStack.Screen
        name={Screen.phoning}
        component={PhoningScreen}
        options={{ headerShown: true }}
      />
      <PhoningStack.Screen
        name={Screen.phoningCharter}
        component={PhoningCharterScreen}
      />
      <PhoningStack.Screen
        name={Screen.phoningTutorial}
        component={PhoningTutorialScreen}
      />
      <PhoningStack.Screen
        name={Screen.phoningCampaignBrief}
        component={PhoningCampaignBriefScreen}
      />
      <PhoningStack.Screen
        name={Screen.phoningCampaignScoreboard}
        component={PhoningCampaignScoreboardScreen}
      />
    </PhoningStack.Navigator>
  )
}

export default PhoningNavigator
