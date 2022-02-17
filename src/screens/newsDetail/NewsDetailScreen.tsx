import React, { FunctionComponent, useLayoutEffect } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import Markdown from 'react-native-markdown-display'
import SafeAreaView from 'react-native-safe-area-view'
import { NewsDetailModalNavigatorScreenProps } from '../../navigation/NewsDetailModalNavigator'
import { Colors, Spacing, Typography } from '../../styles'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { VerticalSpacer } from '../shared/Spacer'
import { StatefulView } from '../shared/StatefulView'
import { useNewsDetailScreen } from './useNewsDetailScreen.hook'

type NewsDetailScreenProps = NewsDetailModalNavigatorScreenProps<'NewsDetail'>

const NewsDetailScreen: FunctionComponent<NewsDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { statefulState } = useNewsDetailScreen(route.params.newsId)

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      })
    }
    updateNavigationHeader()
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(viewModel) => (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>{viewModel.title}</Text>
            <VerticalSpacer spacing={Spacing.unit} />
            <Text style={styles.caption}>{viewModel.caption}</Text>
            <Markdown style={{ body: styles.markdown }}>
              {viewModel.markdown}
            </Markdown>
          </ScrollView>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.margin,
  },
  title: {
    ...Typography.title,
    color: Colors.titleText,
  },
  caption: {
    ...Typography.body,
    color: Colors.lightText,
  },
  markdown: {
    ...Typography.body,
    color: Colors.darkText,
  },
})

export default NewsDetailScreen
