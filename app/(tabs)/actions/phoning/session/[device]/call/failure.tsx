import React, { FunctionComponent, useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PhoningSessionModalNavigatorScreenProps } from '@/navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'
import { Colors, Spacing, Typography } from '@/styles'
import i18n from '@/utils/i18n'
import { PrimaryButton } from '@/screens/shared/Buttons'
import { CloseButton } from '@/screens/shared/NavigationHeaderButton'
import { VerticalSpacer } from '@/screens/shared/Spacer'
import { usePreventGoingBack } from '@/screens/shared/usePreventGoingBack.hook'
import { useLocalSearchParams, router, Stack} from 'expo-router'


 const BackButton = () => <CloseButton onPress={() => router.pop()} />
    

const PhoneCallFailureScreen= () => {
    usePreventGoingBack()
    const {device} = useLocalSearchParams<{device: 'current' | 'externel'}>()
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerLeft: BackButton }} />
            <Text style={styles.title}>{i18n.t('phoningsession.failure.title')}</Text>
            <VerticalSpacer spacing={Spacing.margin} />
            <Text style={styles.body}>
                {i18n.t('phoningsession.failure.new_call_description')}
            </Text>
            <VerticalSpacer spacing={Spacing.largeMargin} />
            <PrimaryButton
                title={i18n.t('phoningsession.new_call')}
                onPress={() =>
                    router.replace({
                        pathname: '/(tabs)/actions/phoning/session/[device]/loader',
                        params: { device }
                    })
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        ...Typography.body,
    },
    container: {
        backgroundColor: Colors.defaultBackground,
        flex: 1,
        paddingHorizontal: Spacing.margin,
    },
    title: {
        ...Typography.title,
    },
})

export default PhoneCallFailureScreen
