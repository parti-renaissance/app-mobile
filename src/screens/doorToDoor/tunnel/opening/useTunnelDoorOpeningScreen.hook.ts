import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { DoorToDoorPollConfigDoorStatus } from '../../../../core/entities/DoorToDoorPollConfig'
import { SendDoorPollAnswersInteractor } from '../../../../core/interactor/SendDoorPollAnswersInteractor'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { DoorToDoorTunnelModalNavigatorScreenProps } from '../../../../navigation/doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorScreenProps'
import { DateProvider } from '../../../../utils/DateProvider'
import { AlertUtils } from '../../../shared/AlertUtils'
import { ViewState } from '../../../shared/ViewState'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { BuildingSelectedNavigationParams } from '../BuildingSelectedNavigationParams'
import { useDoorToDoorTunnelNavigationOptions } from '../useDoorToDoorTunnelNavigationOptions.hook'
import { TunnelDoorOpeningChoiceCardViewModel } from './TunnelDoorOpeningChoiceCardViewModel'
import { TunnelDoorOpeningChoiceCardViewModelMapper } from './TunnelDoorOpeningChoiceCardViewModelMapper'

export const useTunnelDoorOpeningScreen = (
  campaignId: string,
  buildingParams: BuildingSelectedNavigationParams,
): {
  statefulState: ViewState<TunnelDoorOpeningChoiceCardViewModel[]>
  isSendingChoice: boolean
  onStatusSelected: (statusCode: string) => void
} => {
  const [statefulState, setStatefulState] = useState<
    ViewState<DoorToDoorPollConfigDoorStatus[]>
  >(ViewState.Loading())
  const [isSendingChoice, setIsSendingChoice] = useState(false)
  const navigation =
    useNavigation<
      DoorToDoorTunnelModalNavigatorScreenProps<'TunnelDoorOpening'>['navigation']
    >()

  useDoorToDoorTunnelNavigationOptions(navigation)

  useEffect(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorPollConfig(campaignId)
      .then((pollConfig) => {
        setStatefulState(ViewState.Content(pollConfig.before.doorStatus))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error))
      })
  }, [campaignId])

  const navigateToInterlocutor = () => {
    navigation.navigate('TunnelDoorInterlocutor', {
      campaignId,
      buildingParams,
      visitStartDateISOString: DateProvider.now().toISOString(),
    })
  }

  const sendStatus = (status: DoorToDoorPollConfigDoorStatus) => {
    setIsSendingChoice(true)
    new SendDoorPollAnswersInteractor()
      .execute({
        campaignId,
        doorStatus: status.code,
        buildingParams,
        visitStartDateISOString: DateProvider.now().toISOString(),
      })
      .then(() => {
        switch (buildingParams.type) {
          case 'house': {
            navigation.getParent()?.goBack()
            break
          }
          case 'building': {
            navigation.navigate('TunnelDoorSelection', {
              campaignId,
              buildingParams: {
                ...buildingParams,
                door: buildingParams.door + 1,
              },
              canCloseFloor: true,
            })
            break
          }
        }
      })
      .catch((error) =>
        AlertUtils.showNetworkAlert(error, () => {
          sendStatus(status)
        }),
      )
      .finally(() => setIsSendingChoice(false))
  }

  const onStatusSelected = (statusCode: string) => {
    const status = (ViewState.unwrap(statefulState) ?? []).find(
      (s) => s.code === statusCode,
    )
    if (status === undefined) {
      return
    }
    if (status.success) {
      navigateToInterlocutor()
    } else {
      sendStatus(status)
    }
  }

  return {
    statefulState: ViewState.map(statefulState, (statuses) => {
      return statuses.map(TunnelDoorOpeningChoiceCardViewModelMapper.map)
    }),
    isSendingChoice,
    onStatusSelected,
  }
}
