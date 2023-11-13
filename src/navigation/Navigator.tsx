import React, { FunctionComponent, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { AuthenticationState } from "../core/entities/AuthenticationState";
import { ApplicationUpgradeInteractor } from "../core/interactor/ApplicationUpgradeInteractor";
import { IdentifyUserOnErrorMonitorInteractor } from "../core/interactor/IdentifyUserOnErrorMonitorInteractor";
import AuthenticationRepository from "../data/AuthenticationRepository";
import PushRepository from "../data/PushRepository";
import { Analytics } from "../utils/Analytics";
import { PushNotification } from "../utils/PushNotification";
import { AuthenticatedRootNavigator } from "./authenticatedRoot/AuthenticatedRootNavigator";
import { UnauthenticatedRootNavigator } from "./unauthenticatedRoot/UnauthenticatedRootNavigator";

const authenticationRepository = AuthenticationRepository.getInstance();

const Navigator: FunctionComponent = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  authenticationRepository.stateListener = (state) => {
    updateFromState(state);
  };

  const updateFromState = (authenticationState: AuthenticationState) => {
    if (authenticationState === AuthenticationState.Unauthenticated) {
      Analytics.disable();
      setLoggedIn(false);
    } else if (authenticationState === AuthenticationState.Anonymous) {
      // Only useful for users that migrate from old version where they were
      // logged in as anonymous users
      Analytics.disable();
      setLoggedIn(false);
      authenticationRepository.logout();
    } else {
      PushNotification.requestPermission();
      Analytics.enable();
      new IdentifyUserOnErrorMonitorInteractor().execute();
      PushRepository.getInstance()
        .synchronizeGeneralTopicSubscription()
        .catch((error) => {
          console.log(error);
        });
      setLoggedIn(true);
    }
    SplashScreen.hide();
  };

  useEffect(() => {
    new ApplicationUpgradeInteractor().execute().then(() => {
      authenticationRepository.getAuthenticationState().then(updateFromState);
    });
  }, []);

  if (isLoggedIn === undefined) {
    return null;
  } else if (isLoggedIn) {
    return <AuthenticatedRootNavigator />;
  } else {
    return <UnauthenticatedRootNavigator />;
  }
};

export default Navigator;
