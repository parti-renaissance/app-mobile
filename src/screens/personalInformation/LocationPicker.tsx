import React, { FC, useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete'
import { TouchableRipple } from 'react-native-paper'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { NavigationHeaderButton } from '../shared/NavigationHeaderButton'
import { GOOGLE_PLACES_API_KEY } from '../../Config'

type Props = Readonly<{
  address: string | undefined
  onAddressSelected: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => void
}>

const LocationPicker: FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
      <TouchableRipple
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Text
          style={[
            styles.commonText,
            props.address ? styles.selectedAddress : styles.placeholder,
          ]}
        >
          {props.address
            ? props.address
            : i18n.t('personalinformation.placeholder')}
        </Text>
      </TouchableRipple>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <NavigationHeaderButton
              source={require('../../assets/images/navigationBarBack.png')}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.headerTitle}>
              {i18n.t('personalinformation.address')}
            </Text>
          </View>
          <GooglePlacesAutocomplete
            placeholder={i18n.t('common.search')}
            fetchDetails={true}
            onPress={(data, details) => {
              props.onAddressSelected(data, details)
              setModalVisible(false)
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'fr',
            }}
            styles={{
              textInputContainer: {
                paddingTop: Spacing.unit,
                paddingHorizontal: Spacing.margin,
              },
              textInput: {
                color: Colors.darkText,
                backgroundColor: Colors.separator,
              },
            }}
          />
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.defaultBackground },
  headerContainer: {
    flexDirection: 'row',
  },
  headerTitle: {
    ...Typography.title2,
    flexGrow: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginEnd: 44,
    alignSelf: 'center',
  },
  placeholder: {
    color: Colors.lightText,
  },
  selectedAddress: {
    color: Colors.darkText,
  },
  commonText: {
    ...Typography.body,
    textAlign: 'right',
    paddingVertical: 4,
  },
})

export default LocationPicker
