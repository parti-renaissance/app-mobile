import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { DoorToDoorCampaign } from '../../../../core/entities/DoorToDoorCampaign'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { DoorToDoorTunnelModalNavigatorScreenProps } from '../../../../navigation/doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorScreenProps'
import { ViewState } from '../../../shared/ViewState'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { BuildingSelectedNavigationParams } from '../BuildingSelectedNavigationParams'
import { DoorToDoorBriefViewModel } from './DoorToDoorBriefViewModel'
import { router } from 'expo-router'

export const useDoorToDoorBriefScreen = (
  campaignId: string,
  buildingParams: BuildingSelectedNavigationParams,
  canCloseFloor: boolean,
): {
  statefulState: ViewState<DoorToDoorBriefViewModel>
  onAction: () => void
} => {
  const [statefulState, setStatefulState] = useState<
    ViewState<DoorToDoorCampaign>
  >(ViewState.Loading())
  const navigation =
    useNavigation<
      DoorToDoorTunnelModalNavigatorScreenProps<'TunnelDoorBrief'>['navigation']
    >()

  const fetchData = useCallback(() => {
    setStatefulState(ViewState.Loading())
    DoorToDoorRepository.getInstance()
      .getCampaign(campaignId)
      .then((campaign) => {
        setStatefulState(ViewState.Content(campaign))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(ViewState.Loading())
            fetchData()
          }),
        )
      })
  }, [campaignId])

  useFocusEffect(fetchData)

  const onAction = () => {
    switch (buildingParams.type) {
      case 'house': {
        router.navigate({
          pathname: '/actions/door-to-door/tunnel/opening',
        })
        break
      }
      case 'building': {
        router.navigate({
          pathname: '/actions/door-to-door/tunnel/selection',
        })
        break
      }
    }
  }

  return {
    statefulState: ViewState.map(statefulState, (campaign) => {
      return { markdown: campaign.brief }
    }),
    onAction,
  }
}
