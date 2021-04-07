import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  CentersOfInterestInteractorResult,
  GetCentersOfInterestInteractor,
} from '../../../core/interactor/GetCentersOfInterestInteractor'
import PersonalInformationRepository from '../../../data/PersonalInformationRepository'
import { CentersOfInterestScreenProps } from '../../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { PrimaryButton } from '../../shared/Buttons'
import { GenericErrorMapper } from '../../shared/ErrorMapper'
import LoadingOverlay from '../../shared/LoadingOverlay'
import { StatefulView, ViewState } from '../../shared/StatefulView'
import { InterestViewModel } from './CentersOfInterestViewModel'
import { CentersOfInterestViewModelMapper } from './CentersOfInterestViewModelMapper'
import InterestView from './InterestView'

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
    const displayError = (error: string) => {
      Alert.alert(
        i18n.t('common.error_title'),
        error,
        [
          {
            text: i18n.t('common.error_retry'),
            onPress: submit,
          },
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      )
    }
    setIsLoading(true)
    PersonalInformationRepository.getInstance()
      .updateCentersOfInterest(
        content.profileUuid,
        viewModel.interests
          .filter((interest) => interest.isSelected)
          .map((interest) => interest.code),
      )
      .then(onSumitSuccessful)
      .catch((error) => displayError(GenericErrorMapper.mapErrorMessage(error)))
      .finally(() => setIsLoading(false))
  }, [content, viewModel, onSumitSuccessful])

  const renderItem = ({ item }: ListRenderItemInfo<InterestViewModel>) => {
    return (
      <InterestView viewModel={item} onInterestSelected={onInterestSelected} />
    )
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <FlatList
        style={styles.grid}
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
    </>
  )
}

const CenterOfInterestScreen = ({
  navigation,
}: CentersOfInterestScreenProps) => {
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
  const onSumitSuccessful = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={styles.container}>
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
    paddingTop: Spacing.margin,
  },
  grid: {
    marginHorizontal: Spacing.unit,
  },
  title: {
    ...Typography.headline,
    marginHorizontal: Spacing.unit,
    marginVertical: Spacing.unit,
  },
})

function toggleSelectionAtIndex(
  interests: InterestViewModel[],
  indexToToggle: number,
): InterestViewModel[] {
  const newInterests: Array<InterestViewModel> = []
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
