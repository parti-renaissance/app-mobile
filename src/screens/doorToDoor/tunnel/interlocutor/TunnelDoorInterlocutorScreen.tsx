import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Screen,
  TunnelDoorInterlocutorScreenProp,
} from '../../../../navigation'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../../styles'
import Theme from '../../../../themes/Theme'
import { useThemedStyles } from '../../../../themes'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'
import i18n from '../../../../utils/i18n'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { DoorToDoorPollConfigResponseStatus } from '../../../../core/entities/DoorToDoorPollConfig'
import { useDoorToDoorTunnelNavigationOptions } from '../DoorToDoorTunnelNavigationHook'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'

const ANSWER_CODE_ACCEPT = 'accept_to_answer'

const TunnelDoorInterlocutorScreen: FunctionComponent<TunnelDoorInterlocutorScreenProp> = ({
  route,
  navigation,
}) => {
  const styles = useThemedStyles(stylesFactory)
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<Array<DoorToDoorPollConfigResponseStatus>>
  >(new ViewState.Loading())

  useDoorToDoorTunnelNavigationOptions(navigation)

  useEffect(() => {
    const fetchData = () => {
      DoorToDoorRepository.getInstance()
        .getDoorToDoorPollConfig(route.params.campaignId)
        .then((result) => {
          setStatefulState(new ViewState.Content(result.before.responseStatus))
        })
        .catch((error) =>
          setStatefulState(ViewStateUtils.networkError(error, fetchData)),
        )
    }
    fetchData()
  }, [route.params.campaignId])

  const onChoice = (code: string) => {
    // TODO store choice somewhere
    if (code === ANSWER_CODE_ACCEPT) {
      navigation.navigate(Screen.tunnelDoorPoll, {
        campaignId: route.params.campaignId,
        interlocutorStatus: code,
        buildingParams: route.params.buildingParams,
      })
    } else {
      navigation.goBack()
    }
  }

  const renderContentItems = (
    items: Array<DoorToDoorPollConfigResponseStatus>,
  ) => {
    return items.map((item, index) => (
      <View
        key={item.code}
        style={[
          styles.itemContainer,
          index === items.length - 1 ? styles.itemContainerExpanded : {},
        ]}
      >
        <TouchablePlatform
          style={styles.itemContent}
          onPress={() => {
            onChoice(item.code)
          }}
          touchHighlight={Colors.touchHighlight}
        >
          <Text style={styles.itemText}>{item.label}</Text>
        </TouchablePlatform>
      </View>
    ))
  }

  const renderContentComponent = (
    items: Array<DoorToDoorPollConfigResponseStatus>,
  ) => (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title} key={'title'}>
        {i18n.t('doorToDoor.tunnel.interlocutor.title')}
      </Text>
      {renderContentItems(items)}
    </ScrollView>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(content) => renderContentComponent(content)}
      />
    </SafeAreaView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    content: {
      flex: 1,
      marginHorizontal: Spacing.margin,
    },
    exit: {
      color: theme.primaryColor,
    },
    itemContainer: {
      backgroundColor: Colors.secondaryButtonBackground,
      borderRadius: 40,
      marginBottom: Spacing.margin,
      overflow: 'hidden',
    },
    itemContainerExpanded: {
      flexGrow: 1,
      flex: 1,
    },
    itemContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: Spacing.margin,
    },
    itemText: {
      ...Typography.title2,
      textAlign: 'center',
    },
    separator: {
      height: Spacing.margin,
    },
    title: {
      ...Typography.title2,
      marginVertical: Spacing.margin,
    },
  })
}

export default TunnelDoorInterlocutorScreen
