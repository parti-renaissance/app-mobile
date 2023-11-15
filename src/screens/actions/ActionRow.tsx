import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { ActionRowViewModel } from './ActionRowViewModel'

type Props = Readonly<{
  viewModel: ActionRowViewModel
  onPress: (actionId: string) => void
}>

export const ActionRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchablePlatform
        onPress={() => onPress(viewModel.id)}
        touchHighlight={Colors.actionCardHighlight}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={viewModel.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{viewModel.title}</Text>
        </View>
      </TouchablePlatform>
    </View>
  )
}

const IMAGE_CONTAINER_SIZE = 52
const IMAGE_SIZE = 24

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.actionCardBackground,
    borderRadius: 8,
    marginBottom: Spacing.unit,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    padding: Spacing.margin,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: IMAGE_CONTAINER_SIZE / 2,
    height: IMAGE_CONTAINER_SIZE,
    justifyContent: 'center',
    width: IMAGE_CONTAINER_SIZE,
  },
  title: {
    ...Typography.title2,
    color: Colors.veryLightText,
    marginLeft: Spacing.margin,
  },
})
