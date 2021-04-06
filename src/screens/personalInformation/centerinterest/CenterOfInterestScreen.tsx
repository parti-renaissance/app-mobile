import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  CentersOfInterestInteractorResult,
  GetCentersOfInterestInteractor,
} from '../../../core/interactor/GetCentersOfInterestInteractor'
import { Colors, Spacing, Styles } from '../../../styles'
import i18n from '../../../utils/i18n'
import { PrimaryButton } from '../../shared/Buttons'
import { GenericErrorMapper } from '../../shared/ErrorMapper'
import { StatefulView, ViewState } from '../../shared/StatefulView'
import { InterestViewModel } from './CentersOfInterestViewModel'
import { CentersOfInterestViewModelMapper } from './CentersOfInterestViewModelMapper'
import InterestView from './InterestView'

const CenterOfInterestContent = (
  content: CentersOfInterestInteractorResult,
) => {
  const viewModel = CentersOfInterestViewModelMapper.map(content)
  const renderItem = ({ item }: ListRenderItemInfo<InterestViewModel>) => {
    return <InterestView viewModel={item} />
  }

  return (
    <>
      <FlatList
        data={viewModel.interests}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
      />
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('centerofinterest.save')}
          onPress={() => {
            // TODO
          }}
        />
      </View>
    </>
  )
}

const CenterOfInterestScreen = () => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<CentersOfInterestInteractorResult>
  >(new ViewState.Loading())

  const fetchData = useCallback(() => {
    new GetCentersOfInterestInteractor()
      .execute()
      .then((result) => {
        setStatefulState(new ViewState.Content(result))
      })
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            setStatefulState(new ViewState.Loading())
            fetchData()
          }),
        )
      })
  }, [])
  useEffect(fetchData, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={CenterOfInterestContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default CenterOfInterestScreen
