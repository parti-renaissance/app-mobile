import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Marker } from 'react-native-maps'
import { ClusterType } from '../../core/entities/DoorToDoor'
import { Colors, Typography } from '../../styles'
import CardView from '../shared/CardView'

export const CustomCluster = memo((cluster: ClusterType) => (
  <Marker
    coordinate={{
      longitude: cluster.geometry.coordinates[0],
      latitude: cluster.geometry.coordinates[1],
    }}
    onPress={cluster.onPress}
  >
    <CardView backgroundColor={Colors.defaultBackground}>
      <View style={styles.cluster}>
        <Text style={{ ...Typography.title, textAlign: 'center' }}>
          {cluster.properties.point_count}
        </Text>
      </View>
    </CardView>
  </Marker>
))

const styles = StyleSheet.create({
  cluster: {
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
})
