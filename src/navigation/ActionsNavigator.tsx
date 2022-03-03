import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import ActionsScreen from '../screens/actions/ActionsScreen'
import PollsScreen from '../screens/polls/PollsScreen'
import { headerBlank } from '../styles/navigationAppearance'
import PhoningScreen from '../screens/phoning/PhoningScreen'
import PhoningCharterScreen from '../screens/phoningCharter/PhoningCharterScreen'
import PhoningTutorialScreen from '../screens/phoningTutorial/PhoningTutorialScreen'
import PhoningCampaignBriefScreen from '../screens/phoningCampaignBrief/PhoningCampaignBriefScreen'
import PhoningCampaignScoreboardScreen from '../screens/phoningCampaignScoreboard/PhoningCampaignScoreboardScreen'
import DoorToDoorScreen from '../screens/doorToDoor/DoorToDoorScreen'
import BuildingDetailScreen from '../screens/buildingDetail/BuildingDetailScreen'
import { PhoningCharterNavigationData } from '../screens/phoningCharter/PhoningCharterNavigationData'
import { PhoningCampaignBriefNavigationData } from '../screens/phoningCampaignBrief/PhoningCampaignBriefNavigationData'
import { PhoningCampaignScoreboardNavigationData } from '../screens/phoningCampaignScoreboard/PhoningCampaignScoreboardNavigationData'
import { DoorToDoorAddress } from '../core/entities/DoorToDoor'
import { CompositeScreenProps } from '@react-navigation/native'
import { TabBarNavigatorScreenProps } from './TabBarNavigator'
import { RetaliationsScreen } from '../screens/retaliations/RetaliationsScreen'
import RetaliationDetailScreen from '../screens/retaliation/RetaliationDetailScreen'

export type ActionsNavigatorParamList = {
  Actions: undefined
  Polls: undefined
  Phoning: undefined
  PhoningCharter: { data: PhoningCharterNavigationData }
  PhoningTutorial: undefined
  PhoningCampaignBrief: { data: PhoningCampaignBriefNavigationData }
  PhoningCampaignScoreboard: { data: PhoningCampaignScoreboardNavigationData }
  DoorToDoor: undefined
  BuildingDetail: { address: DoorToDoorAddress }
  Retaliations: undefined
  RetaliationDetail: { retaliationId: string }
}

export type ActionsNavigatorScreenProps<
  T extends keyof ActionsNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<ActionsNavigatorParamList, T>,
  TabBarNavigatorScreenProps
>

const Stack = createStackNavigator<ActionsNavigatorParamList>()

const ActionsNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={'Actions'}
        component={ActionsScreen}
        options={{ headerShown: false }}
      />
      {/* Polls */}
      <Stack.Screen
        name={'Polls'}
        component={PollsScreen}
        options={{ headerTransparent: true }}
      />
      {/* Phoning */}
      <Stack.Screen
        name={'Phoning'}
        component={PhoningScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={'PhoningCharter'} component={PhoningCharterScreen} />
      <Stack.Screen
        name={'PhoningTutorial'}
        component={PhoningTutorialScreen}
      />
      <Stack.Screen
        name={'PhoningCampaignBrief'}
        component={PhoningCampaignBriefScreen}
      />
      <Stack.Screen
        name={'PhoningCampaignScoreboard'}
        component={PhoningCampaignScoreboardScreen}
      />
      {/* DoorToDoor */}
      <Stack.Screen
        name={'DoorToDoor'}
        component={DoorToDoorScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={'BuildingDetail'}
        component={BuildingDetailScreen}
        options={{ headerShown: true }}
      />
      {/* Retaliation */}
      <Stack.Screen name={'Retaliations'} component={RetaliationsScreen} />
      <Stack.Screen
        name={'RetaliationDetail'}
        component={RetaliationDetailScreen}
      />
    </Stack.Navigator>
  )
}

export default ActionsNavigator
