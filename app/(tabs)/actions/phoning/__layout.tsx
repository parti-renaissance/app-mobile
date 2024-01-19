import React, { FunctionComponent } from 'react'
import { headerBlank } from '@/styles/navigationAppearance'

import { Stack } from 'expo-router'
const PhoningSessionModal: FunctionComponent = () => {
    return (
        <Stack screenOptions={headerBlank}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name='charter' />
            <Stack.Screen name='tutorial' />
            <Stack.Screen name='campaign/brief' />
            <Stack.Screen name='campaign/scoreboard' />
            <Stack.Screen
                name='poll/detail'
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name={'session/loader-permanent-campaign'}
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name={'poll/success'}
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name='session/loader'
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name='session/number-found'
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name='session/number-found-other-device'
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name='call/status-picker'
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name="call/failure"
                options={{ headerLeft: () => null }}
            />
            <Stack.Screen
                name={'session/no-number-available'}
                options={{ headerLeft: () => null }}
            />
        </Stack>
    )
}

export default PhoningSessionModal
