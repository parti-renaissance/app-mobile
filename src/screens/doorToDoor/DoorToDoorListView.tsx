import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import CardView from '../shared/CardView'

const DoorToDoorListView = () => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={{ margin: Spacing.unit }}>
      <CardView style={{}} backgroundColor={Colors.defaultBackground}>
        <View
          style={{
            padding: Spacing.margin,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <Image
                  style={styles.building}
                  source={require('../../assets/images/papHomeIcon.png')}
                />
                <Text style={styles.title}>33 bd de Sébastopol</Text>
              </View>
              <Text style={styles.subtitle}>Aucun passage</Text>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require('../../assets/images/papDoneIcon.png')}
              />
              <Text style={styles.text}>PORTES FRAPPÉES</Text>
              <Text style={styles.indicator}>10</Text>
            </View>
          </View>
        </View>
      </CardView>
    </View>
  )
}
const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.lightBackground,
      borderRadius: Spacing.unit,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginLeft: Spacing.unit,
      width: 100,
      paddingVertical: Spacing.small,
    },
    title: {
      ...Typography.title2,
    },
    subtitle: {
      ...Typography.lightCallout,
    },
    building: {
      height: 14,
      width: 14,
      marginBottom: Spacing.unit,
    },
    image: {
      height: 35,
      width: 35,
    },
    text: {
      ...Typography.lightCallout,
      textAlign: 'center',
      marginVertical: Spacing.small,
    },
    indicator: {},
  })
}

export default DoorToDoorListView
