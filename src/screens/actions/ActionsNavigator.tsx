import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Screen } from '../../navigation'
import ActionsScreen from './ActionsScreen'
import PollsScreen from '../polls/PollsScreen'
import { headerBlank } from '../../styles/navigationAppearance'
import PhoningScreen from '../phoning/PhoningScreen'
import PhoningCharterScreen from '../phoningCharter/PhoningCharterScreen'
import PhoningTutorialScreen from '../phoningTutorial/PhoningTutorialScreen'
import PhoningCampaignBriefScreen from '../phoningCampaignBrief/PhoningCampaignBriefScreen'
import PhoningCampaignScoreboardScreen from '../phoningCampaignScoreboard/PhoningCampaignScoreboardScreen'
import DoorToDoorScreen from '../doorToDoor/DoorToDoorScreen'
import BuildingDetailScreen from '../buildingDetail/BuildingDetailScreen'

const ActionsStack = createStackNavigator()

const ActionsNavigator: FunctionComponent = () => {
  return (
    <ActionsStack.Navigator screenOptions={headerBlank}>
      <ActionsStack.Screen
        name={Screen.actions}
        component={ActionsScreen}
        options={{ headerShown: false }}
      />
      {/* Polls */}
      <ActionsStack.Screen
        name={Screen.polls}
        component={PollsScreen}
        options={{ headerTransparent: true }}
      />
      {/* Phoning */}
      <ActionsStack.Screen
        name={Screen.phoning}
        component={PhoningScreen}
        options={{ headerShown: true }}
      />
      <ActionsStack.Screen
        name={Screen.phoningCharter}
        component={PhoningCharterScreen}
      />
      <ActionsStack.Screen
        name={Screen.phoningTutorial}
        component={PhoningTutorialScreen}
      />
      <ActionsStack.Screen
        name={Screen.phoningCampaignBrief}
        component={PhoningCampaignBriefScreen}
      />
      <ActionsStack.Screen
        name={Screen.phoningCampaignScoreboard}
        component={PhoningCampaignScoreboardScreen}
      />
      {/* DoorToDoor */}
      <ActionsStack.Screen
        name={Screen.doorToDoor}
        component={DoorToDoorScreen}
        options={{ headerShown: true }}
      />
      <ActionsStack.Screen
        name={Screen.buildingDetail}
        component={BuildingDetailScreen}
        options={{ headerShown: true }}
      />
    </ActionsStack.Navigator>
  )
}

export default ActionsNavigator
