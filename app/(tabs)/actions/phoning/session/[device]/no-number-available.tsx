import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PhoningSessionModalNavigatorScreenProps } from '@/navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'
import { Colors, Spacing, Typography } from '@/styles'
import i18n from '@/utils/i18n'
import { TertiaryButton } from '@/screens/shared/Buttons'
import CircularIcon from '@/screens/shared/CircularIcon'
import { VerticalSpacer } from '@/screens/shared/Spacer'
import { usePreventGoingBack } from '@/screens/shared/usePreventGoingBack.hook'
import { useLocalSearchParams, router } from 'expo-router'

type PhoningSessionNoNumberAvailableScreenProps =
    PhoningSessionModalNavigatorScreenProps<'PhoningSessionNoNumberAvailable'>

const PhoningSessionNoNumberAvailableScreen = () => {
    const { message } = useLocalSearchParams<{ message: string }>()
    usePreventGoingBack()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {i18n.t('phoningsession.no_number.title')}
            </Text>
            <VerticalSpacer spacing={Spacing.margin} />
            <Text style={styles.body}>{message}</Text>
            <VerticalSpacer spacing={Spacing.mediumMargin} />
            <View style={styles.imageContainer}>
                <CircularIcon source={require('@/assets/images/noPhoneNumber.png')} />
            </View>
            <TertiaryButton
                title={i18n.t('phoningsession.end_session')}
                onPress={() => router.pop()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        ...Typography.body,
    },
    container: {
        backgroundColor: Colors.defaultBackground,
        flex: 1,
        paddingBottom: Spacing.margin,
        paddingHorizontal: Spacing.margin,
    },
    imageContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        ...Typography.title,
    },
})

export default PhoningSessionNoNumberAvailableScreen
