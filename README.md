#### Technologies

**Vox** application is built with [Expo](https://docs.expo.dev/) and [Typescript](https://www.typescriptlang.org/).

[![CodeFactor](https://www.codefactor.io/repository/github/parti-renaissance/app-mobile/badge)](https://www.codefactor.io/repository/github//parti-renaissance/app-mobile)

## Getting started

### Installing dependencies

To be able to run the application on iOS and Android:

- install [Bun](https://bun.sh/docs/installation)
- run `bun install` to install the project dependencies

### Building/Running the app locally

- copy the `.env` file to `.env.*.local` and fill in the environment variables
- download the `GoogleService-Info.plist` and `google-services.json` files from the Firebase console and place them in the `config/` folder
- run `bun prepare` to load the environment file
- run `bun start` to start the react-native bundler
- run `bun ios` to start the iOS app
- run `bun android` to start the Android app
- run `bun web` to start the web app

### Building/Running the app with EAS Expo (Expo Application Services)

- install the EAS CLI with `bun install -g eas-cli`
- run `bun start` to start the react-native bundler
- run `bun eas build --profile development` to build the app for the simulators

## Deploy the app for updates

### Deploying the app for internal testing

- make a pull request to the `staging` branch

### Deploying the app for production

- make a pull request to the `main` branch

## Build the app if native dependencies are updated

### Deploying the app for internal testing

- run `eas build --profile staging`

### Deploying the app for internal testing

- run `eas build --profile production` to build the app for the platforms

## Web info

- use web folder for static files, vite generates the files in the public folder
- `bun build:web` to build the static files like service worker, manifest, etc

## Contribution

- make a pull request to the `develop` branch
- make sure to run prettier while developing with `bun prettier-watch` or use `bun format` to format the code
- please avoid to :
  - use `any` type
  - use `console.log` for debugging
  - use `@ts-ignore` or `@ts-nocheck` to ignore typescript errors
  - use `classes` as much as possible
