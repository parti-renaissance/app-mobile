import React, { useEffect } from 'react'
import { Keyboard } from 'react-native'
import EventFilterForm from '@/components/events/EventFilterForm/EventFilterForm'
import VoxCard from '@/components/VoxCard/VoxCard'
import { Sheet, useMedia } from 'tamagui'
import { create } from 'zustand'

type BottomSheetFilterStates = {
  open: boolean
  position: number
  setOpen: (open: boolean) => void
  setPosition: (position: number) => void
}

export const bottomSheetFilterStates = create<BottomSheetFilterStates>((set) => ({
  open: false,
  position: 1,
  setOpen: (open) => set({ open }),
  setPosition: (position) => set({ position }),
}))

const BottomSheetFilter = () => {
  const states = bottomSheetFilterStates()
  const media = useMedia()
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardWillHide', () => {
      states.setOpen(false)
    })
    return () => {
      keyboardDidShowListener.remove()
    }
  })

  return media.md ? (
    <Sheet
      dismissOnSnapToBottom
      moveOnKeyboardChange
      snapPointsMode="fit"
      animation="medium"
      onOpenChange={(open: boolean) => {
        states.setOpen(open)
        if (!open) {
          Keyboard.dismiss()
        }
      }}
      open={states.open}
      modal
      defaultOpen={false}
    >
      <Sheet.Overlay />
      <Sheet.Frame overflow="hidden" bg="$white1" position="relative" flex={1}>
        <Sheet.Handle backgroundColor="$gray9" mt="$3" height={5} />
        <VoxCard bg="$colorTransparent">
          <VoxCard.Content pt="$1">
            <EventFilterForm />
          </VoxCard.Content>
        </VoxCard>
      </Sheet.Frame>
    </Sheet>
  ) : null
}

export default BottomSheetFilter
