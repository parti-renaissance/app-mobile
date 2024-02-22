import { useEffect, useState } from 'react'
import { useDtdTunnelStore } from '@/data/store/door-to-door'
import { router, useNavigation } from 'expo-router'
import { DoorToDoorPollConfigDoorStatus } from '../../../../core/entities/DoorToDoorPollConfig'
import { SendDoorPollAnswersInteractor } from '../../../../core/interactor/SendDoorPollAnswersInteractor'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { DateProvider } from '../../../../utils/DateProvider'
import { AlertUtils } from '../../../shared/AlertUtils'
import { ViewState } from '../../../shared/ViewState'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { useDoorToDoorTunnelNavigationOptions } from '../useDoorToDoorTunnelNavigationOptions.hook'
import { TunnelDoorOpeningChoiceCardViewModel } from './TunnelDoorOpeningChoiceCardViewModel'
import { TunnelDoorOpeningChoiceCardViewModelMapper } from './TunnelDoorOpeningChoiceCardViewModelMapper'

export const useTunnelDoorOpeningScreen = (): {
  statefulState: ViewState<TunnelDoorOpeningChoiceCardViewModel[]>
  isSendingChoice: boolean
  onStatusSelected: (statusCode: string) => void
} => {
  const navigation = useNavigation()
  const { tunnel, setTunnel } = useDtdTunnelStore()
  const [statefulState, setStatefulState] = useState<
    ViewState<DoorToDoorPollConfigDoorStatus[]>
  >(ViewState.Loading())
  const [isSendingChoice, setIsSendingChoice] = useState(false)

  useDoorToDoorTunnelNavigationOptions()

  useEffect(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorPollConfig(tunnel.campaignId)
      .then((pollConfig) => {
        setStatefulState(ViewState.Content(pollConfig.before.doorStatus))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error))
      })
  }, [tunnel.campaignId])

  const navigateToInterlocutor = () => {
    router.push({
      pathname: '/actions/door-to-door/tunnel/interlocutor',
      params: {
        visitStartDateISOString: DateProvider.now().toISOString(),
      },
    })
  }

  const sendStatus = (status: DoorToDoorPollConfigDoorStatus) => {
    setIsSendingChoice(true)
    new SendDoorPollAnswersInteractor()
      .execute({
        campaignId: tunnel.campaignId,
        doorStatus: status.code,
        buildingParams: tunnel.buildingParams,
        visitStartDateISOString: DateProvider.now().toISOString(),
      })
      .then(() => {
        switch (tunnel.buildingParams.type) {
          case 'house': {
            navigation.getParent()?.goBack()
            break
          }
          case 'building': {
            setTunnel({
              ...tunnel,
              buildingParams: {
                ...tunnel.buildingParams,
                door: tunnel.buildingParams.door + 1,
              },
              canCloseFloor: true,
            })
            router.push('/actions/door-to-door/tunnel/selection')
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
