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

## Mobile part

Mobile depend upon the version number in app.json

- 1.0.0 to 1.0.0 : archive -> new build
- 1.0.0 to 1.0.1 : patch -> expo update
- 1.0.0 to 1.1.0 : build -> new build
- 1.0.0 to 2.0.0 : build -> new build

In case of an Expo Update, environments are defined in Expo Secrets.

In Case of a build, environment is set the following:

- production : when it's a `branch` and start with `rc/` OR when it's a `tag` and start with `v`
- staging : any other cases

### Global secrets used

- `GCP_SA_KEY_FIREBASE_DEPLOYER`: Firebase service account token, see [official documentation](https://github.com/FirebaseExtended/action-hosting-deploy/blob/main/docs/service-account.md) for creation & rotation.

### Deploy on firebase

The firebase deployment occur depending on cases on live of ephemeral version of firebase project.

By default, TTL is 7 days, but can be raised if needed, generally, 7 days is sufficient because every time a
commit is done, the deployment process reset the TTL value.
