import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native'

type Props = Readonly<{
  children: any
  style?: StyleProp<ViewStyle>
}>

const KeyboardOffsetView: FunctionComponent<Props> = (props) => {
  const containerViewRef = useRef<View>(null)
  const [offset, setOffset] = useState(0)

  const measureOffset = () => {
    if (offset > 0) {
      return
    }
    containerViewRef.current?.measure((_fx, _fy, _width, _height, _px, py) => {
      setOffset(py)
    })
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      return
    }
    // wait for modal animation to finish
    InteractionManager.runAfterInteractions(measureOffset)
  })

  if (Platform.OS === 'ios') {
    return (
      <View
        style={[styles.container, props.style]}
        ref={containerViewRef}
        collapsable={false}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={offset}
          style={styles.keyboardAvoidingView}
        >
          {props.children}
        </KeyboardAvoidingView>
      </View>
    )
  } else {
    // (Pierre Felgines) 20/11/2020 On Android we do not need KeyboardAvoidingView as
    // the settings `android:windowSoftInputMode="adjustResize"` in AndroidManifest.xml
    // makes keyboard management free
    return (
      <View style={[styles.container, props.style]} ref={containerViewRef}>
        {props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
})

export default KeyboardOffsetView
