import React, { FunctionComponent, useEffect } from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Button } from '@/components'
import Input from '@/components/base/Input/Input'
import { Sheet, YStack } from 'tamagui'
import { DoorToDoorAddressStatus } from '../../core/entities/DoorToDoor'
import { Colors, Spacing, Typography } from '../../styles'
import { margin, unit } from '../../styles/spacing'
import i18n from '../../utils/i18n'
import { BorderlessButton, PrimaryButton } from '../shared/Buttons'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import BuildingLayoutBlockCardView, { BuildingLayoutBlockCardViewModel } from './BuildingLayoutBlockCardView'
import { BuildingLayoutActionType } from './BuildingLayoutFloorCell'

export interface BuildingLayoutViewModel {
  buildings: BuildingLayoutBlockCardViewModel[]
  buildingStatus: DoorToDoorAddressStatus
}

type Props = Readonly<{
  viewModel: BuildingLayoutViewModel
  onSelect: (buildingBlock: string, floor: number) => void
  onAddBuildingBlock: () => void
  onAddBuildingFloor: (buildingBlockId: string) => void
  onRemoveBuildingBlock: (buildingBlockId: string) => void
  onRemoveBuildingFloor: (buildingBlockId: string, floor: number) => void
  onBuildingAction: (buildingBlockId: string) => void
  onOpenAddress: () => void
  onCloseAddress: () => void
  onLeaflet: (n: number) => void
  leafletsInfo: { leafletsDistributed: number; lastVisit: string }
}>

const BuildingLayoutView: FunctionComponent<Props> = ({
  viewModel,
  onSelect,
  onAddBuildingBlock,
  onAddBuildingFloor,
  onRemoveBuildingBlock,
  onRemoveBuildingFloor,
  onBuildingAction,
  onOpenAddress,
  onCloseAddress,
  onLeaflet,
  leafletsInfo,
}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <View style={styles.container}>
      <CardView backgroundColor={Colors.defaultBackground}>
        {viewModel.buildingStatus !== 'todo' &&
          viewModel.buildings.map((buildingViewModel) => {
            return (
              <BuildingLayoutBlockCardView
                key={buildingViewModel.id}
                viewModel={buildingViewModel}
                buildingStatus={viewModel.buildingStatus}
                style={styles.blockCard}
                onSelect={onSelect}
                onAddBuildingFloor={onAddBuildingFloor}
                onRemoveBuildingBlock={onRemoveBuildingBlock}
                onRemoveBuildingFloor={onRemoveBuildingFloor}
                onBuildingAction={onBuildingAction}
              />
            )
          })}
        <View style={[styles.layoutContainer, { marginTop: 0 }]}>
          <YStack gap="$3.5" backgroundColor="$white1">
            {viewModel.buildingStatus === 'todo' && !!viewModel.buildings && (
              <>
                <YStack mt="$1.5" />
                <BuildingLayoutActionType
                  onPress={() => onSelect(viewModel.buildings[0].floors[0].buildingBlock, viewModel.buildings[0].floors[0].floorNumber)}
                  viewModel={{
                    title: 'Commencer le porte à porte',
                    subtitle: '',
                  }}
                />
              </>
            )}
            <BuildingLayoutActionType
              disabled={viewModel.buildingStatus === 'completed'}
              completed={Boolean(leafletsInfo.leafletsDistributed)}
              onPress={() => setOpen(true)}
              viewModel={{
                title: leafletsInfo.leafletsDistributed ? `${leafletsInfo.leafletsDistributed} documents boités` : 'J’ai boité des documents',
                subtitle: leafletsInfo.leafletsDistributed ? leafletsInfo.lastVisit : '',
              }}
            />
          </YStack>
        </View>
      </CardView>
      {viewModel.buildingStatus === 'completed' ? (
        <BorderlessButton textStyle={styles.openAddress} title={i18n.t('building.open_address.action')} onPress={onOpenAddress} />
      ) : (
        (viewModel.buildingStatus === 'ongoing' || (leafletsInfo.leafletsDistributed ?? 0) > 0) && (
          <PrimaryButton shape="rounded" style={styles.closeAddress} onPress={onCloseAddress} title="J'ai terminé cette adresse" />
        )
      )}
      <SheetLeaflet open={open} onChange={onLeaflet} onOpenChange={setOpen} />
    </View>
  )
}

type AddBuildingCardProps = Readonly<{
  onAddBuildingBlock: () => void
}>

const SheetLeaflet = ({ open, onChange, onOpenChange }: { open: boolean; onChange: (n: number) => void; onOpenChange: (c: boolean) => void }) => {
  const [value, setValue] = React.useState(0)
  const inputRef = React.useRef<TextInput>(null)

  const handleInputChange = (value: string) => {
    const n = Number(value.replace(/[^0-9]/g, ''))
    setValue(isNaN(n) ? 0 : n)
  }

  const handleSubmit = () => {
    if (value > 0) {
      onChange(value)
    }
    setValue(0)
    onOpenChange(false)
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
    }
  })

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
  }

  return (
    <Sheet
      modal
      open={open}
      moveOnKeyboardChange
      onOpenChange={handleOpenChange}
      snapPoints={['fit']}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="medium"
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Handle />
      <Sheet.Frame padding="$4" justifyContent="center" gap="$5" pb="$8">
        <Button alignSelf="flex-end" variant="text" onPress={() => onOpenChange(false)}>
          <Button.Text>Fermer</Button.Text>
        </Button>
        <Input
          flex={1}
          ref={inputRef}
          inputMode="decimal"
          keyboardType="number-pad"
          width="100%"
          label="Nombre de track distribué"
          selectTextOnFocus
          placeholder={'0'}
          value={value.toString()}
          onChangeText={handleInputChange}
        />
        <Button onPress={handleSubmit} size="lg" width="100%">
          <Button.Text>Valider</Button.Text>
        </Button>
      </Sheet.Frame>
    </Sheet>
  )
}

const AddBuildingCard: FunctionComponent<AddBuildingCardProps> = ({ onAddBuildingBlock }) => {
  return (
    <CardView backgroundColor={Colors.defaultBackground} style={styles.newBuildingCard}>
      <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={() => onAddBuildingBlock()}>
        <View style={styles.newBuildingContainer}>
          <Image source={require('../../assets/images/iconMore.png')} style={styles.newBuildingIcon} />
          <Text style={styles.newBuildingText}>{i18n.t('building.layout.add_building')}</Text>
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const styles = StyleSheet.create({
  blockCard: {
    marginVertical: unit,
  },
  closeAddress: {
    marginVertical: Spacing.margin,
    borderRadius: 8,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    paddingBottom: 96,
    paddingHorizontal: margin,
  },
  newBuildingCard: {
    marginVertical: Spacing.unit,
  },
  newBuildingContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Spacing.margin,
  },
  newBuildingIcon: {
    marginHorizontal: Spacing.unit,
    tintColor: Colors.primaryColor,
  },
  newBuildingText: {
    ...Typography.callout,
    color: Colors.primaryColor,
  },
  openAddress: {
    ...Typography.callout,
    color: Colors.primaryColor,
  },
  layoutContainer: {
    backgroundColor: Colors.secondaryButtonBackground,
    borderRadius: 8,
    margin: margin,
    overflow: 'hidden',
  },
})

export default BuildingLayoutView
