# Application deployment

# Deployment trigger rules

- `develop` branch: trigger build to **live** version of **staging** project.
- `rc/**`: trigger build to **ephemeral** version of **production** project.
- `release` in `published` state: trigger build to **live** version of **production** project. 
- PR with requested review : trigger build to **ephemeral** version of **staging** project.

## Web part

The web build uses local build with metro & tamagui compiler for assets generation.
At the time of writing this documentation, we have a compatibility bug with tamagui,
in fact we have to launch three times the build process to make it works. It's probably an issue with CSS flattening.

### Secrets used

- `GCP_SA_KEY_FIREBASE_DEPLOYER`: Firebase service account token, see [official documentation](https://github.com/FirebaseExtended/action-hosting-deploy/blob/main/docs/service-account.md) for creation & rotation.
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_OAUTH_BASE_URL`
- `EXPO_PUBLIC_OAUTH_CLIENT_ID`
- `EXPO_PUBLIC_OAUTH_CLIENT_SECRET`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_IOS_GOOGLE_API_KEY`
- `EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY`
- `EXPO_PUBLIC_FB_API_KEY`
- `EXPO_PUBLIC_FB_PROJECT_ID`
- `EXPO_PUBLIC_FB_SENDER_ID`
- `EXPO_PUBLIC_FB_APP_ID`
- `EXPO_PUBLIC_FB_MEASUREMENT_ID`
- `EXPO_PUBLIC_ENVIRONMENT`


### Deploy on firebase

The firebase deployment occur depending on cases on live of ephemeral version of firebase project.

By default, TTL is 7 days, but can be raised if needed, generally, 7 days is sufficient because every time a
commit is done, the deployment process reset the TTL value.
