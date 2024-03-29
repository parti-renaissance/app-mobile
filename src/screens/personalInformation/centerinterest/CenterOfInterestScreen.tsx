import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  CentersOfInterestInteractorResult,
  GetCentersOfInterestInteractor,
} from '../../../core/interactor/GetCentersOfInterestInteractor'
import PersonalInformationRepository from '../../../data/PersonalInformationRepository'
import { ProfileModalNavigatorScreenProps } from '../../../navigation/profileModal/ProfileModalNavigatorScreenProps'
import { Colors, Spacing, Styles, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { AlertUtils } from '../../shared/AlertUtils'
import { PrimaryButton } from '../../shared/Buttons'
import LoadingOverlay from '../../shared/LoadingOverlay'
import SelectableIconLabelView, {
  SelectableIconLabelViewModel,
} from '../../shared/SelectableIconLabelView'
import { StatefulView } from '../../shared/StatefulView'
import { ViewState } from '../../shared/ViewState'
import { ViewStateUtils } from '../../shared/ViewStateUtils'
import { CentersOfInterestViewModelMapper } from './CentersOfInterestViewModelMapper'
import { useNavigation } from 'expo-router'

const CenterOfInterestContent = (
  content: CentersOfInterestInteractorResult,
  onSumitSuccessful: () => void,
) => {
  const [viewModel, setViewModel] = useState(
    CentersOfInterestViewModelMapper.map(content),
  )
  const [isLoading, setIsLoading] = useState(false)
  const onInterestSelected = (code: string) => {
    const index = viewModel.interests.findIndex((value) => value.code === code)
    if (index === -1) return
    setViewModel({
      ...viewModel,
      interests: toggleSelectionAtIndex(viewModel.interests, index),
    })
  }

  const submit = useCallback(() => {
    setIsLoading(true)
    PersonalInformationRepository.getInstance()
      .updateCentersOfInterest(
        content.profileUuid,
        viewModel.interests
          .filter((interest) => interest.isSelected)
          .map((interest) => interest.code),
      )
      .then(onSumitSuccessful)
      .catch((error) => AlertUtils.showNetworkAlert(error, submit))
      .finally(() => setIsLoading(false))
  }, [content, viewModel, onSumitSuccessful])

  const renderItem = ({
    item,
  }: ListRenderItemInfo<SelectableIconLabelViewModel>) => {
    return (
      <SelectableIconLabelView
        viewModel={item}
        onSelected={onInterestSelected}
      />
    )
  }

  return (
    <View style={styles.contentContainer}>
      <LoadingOverlay visible={isLoading} />
      <FlatList
        contentContainerStyle={styles.grid}
        data={viewModel.interests}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
        numColumns={3}
        ListHeaderComponent={() => {
          return (
            <Text style={styles.title}>
              {i18n.t('centerofinterest.description')}
            </Text>
          )
        }}
      />
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('centerofinterest.save')}
          onPress={submit}
        />
      </View>
    </View>
  )
}

type CentersOfInterestScreenProps =
  ProfileModalNavigatorScreenProps<'CenterOfInterest'>

const CenterOfInterestScreen = ({
}: CentersOfInterestScreenProps) => {
  const navigation = useNavigation()
  const [statefulState, setStatefulState] = useState<
    ViewState<CentersOfInterestInteractorResult>
  >(ViewState.Loading())

  const fetchData = useCallback(() => {
    new GetCentersOfInterestInteractor()
      .execute()
      .then((result) => {
        setStatefulState(ViewState.Content(result))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(ViewState.Loading())
            fetchData()
          }),
        )
      })
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData, [])
  const onSumitSuccessful = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatefulView
        state={statefulState}
        contentComponent={(result) => {
          return CenterOfInterestContent(result, onSumitSuccessful)
        }}
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
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  grid: {
    paddingHorizontal: Spacing.unit,
  },
  title: {
    ...Typography.headline,
    marginHorizontal: Spacing.unit,
    marginVertical: Spacing.unit,
  },
})

function toggleSelectionAtIndex(
  interests: SelectableIconLabelViewModel[],
  indexToToggle: number,
): SelectableIconLabelViewModel[] {
  const newInterests: Array<SelectableIconLabelViewModel> = []
  interests.forEach((value, index) => {
    if (index === indexToToggle) {
      newInterests.push({
        ...value,
        isSelected: !value.isSelected,
      })
    } else {
      newInterests.push(value)
    }
  })
  return newInterests
}

export default CenterOfInterestScreen
