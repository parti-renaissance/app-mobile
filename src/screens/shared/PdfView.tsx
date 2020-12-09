import React, { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Pdf from 'react-native-pdf'
import { ExternalLink } from './ExternalLink'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  assetFileName: string
}>

const PdfView: FunctionComponent<Props> = (props) => {
  return (
    <Pdf
      style={props.style}
      maxScale={1}
      minScale={1}
      source={{ uri: 'bundle-assets://' + props.assetFileName }}
      spacing={0}
      onPressLink={(link) => {
        if (link.startsWith('http')) {
          ExternalLink.openUrl(link)
        }
      }}
    />
  )
}

export default PdfView
