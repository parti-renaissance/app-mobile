import AuthenticationRepository from "@/data/AuthenticationRepository"
import { AuthenticationState } from '@/core/entities/AuthenticationState'
import { ApplicationUpgradeInteractor } from '../core/interactor/ApplicationUpgradeInteractor'
import { IdentifyUserOnErrorMonitorInteractor } from '@/core/interactor/IdentifyUserOnErrorMonitorInteractor'
const authenticationRepository = AuthenticationRepository.getInstance()


import React from "react"

type SessionContextType = {
    isLoggedIn: boolean,
    isLoading: boolean
}

const SessionContext = React.createContext<SessionContextType>(null)


export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = React.useState<boolean | undefined>(undefined)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)



    const updateFromState = (authenticationState: AuthenticationState) => {
        if (authenticationState === AuthenticationState.Unauthenticated) {
            // Analytics.disable()
            setLoggedIn(false)
        } else if (authenticationState === AuthenticationState.Anonymous) {
            // Only useful for users that migrate from old version where they were
            // logged in as anonymous users
            // Analytics.disable()
            setLoggedIn(false)
            authenticationRepository.logout()
        } else {
            // PushNotification.requestPermission()
            // Analytics.enable()
            new IdentifyUserOnErrorMonitorInteractor().execute()
            // PushRepository.getInstance()
            //     .synchronizeGeneralTopicSubscription()
            //     .catch((error) => {
            //         console.log(error)
            //     })
            setLoggedIn(true)
        }
    }

    React.useEffect(() => {
        authenticationRepository.stateListener = updateFromState
        new ApplicationUpgradeInteractor()
            .execute()
            .then(() => authenticationRepository.getAuthenticationState().then(updateFromState))
            .then(() => setIsLoading(false))
    }, [])

    return (
        <SessionContext.Provider value={{ isLoggedIn, isLoading }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    const context = React.useContext(SessionContext)
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return context
}
