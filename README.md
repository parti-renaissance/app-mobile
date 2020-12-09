## Installation

### Prerequisites

#### Technologies

**JeMarche** application is built with [React Native](https://reactnative.dev/) and [Typescript](https://www.typescriptlang.org/).


[![CodeFactor](https://www.codefactor.io/repository/github/enmarche/je-marche/badge)](https://www.codefactor.io/repository/github/enmarche/je-marche)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/50263b46091244089accaa4482d8b536)](https://www.codacy.com/gh/EnMarche/Je-Marche/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=EnMarche/Je-Marche&amp;utm_campaign=Badge_Grade)

#### Installing dependencies

To be able to run the application on iOS and Android, please follow the _Installing dependencies_ part of the [React Native CLI Quickstart](https://reactnative.dev/docs/getting-started) documentation.

### Running scripts

Steps:

1.  Clone the project.
2.  Run `yarn install` to install vendor dependencies.
3.  Run `cd ./ios && bundle install && bundle exec pod install` to install iOS dependencies
4.  Add the `.env.*.local` files in the `/config/environments/` folder.
5.  Run `./cli.js prepare staging` to load the staging environment file. [optional: default environment is staging]
6.  Run `yarn start` to start de react-native bundler.

Then, you can launch the app on both iOS and Android devices:

- `yarn run:ios` for iOS devices
- `yarn run:android` for Android devices

### Utilities

- Run `yarn open:android` to open the Android project in Android Studio.
- Run `yarn open:ios` to open the iOS project in XCode.
- Run `yarn emulator` to open the Android device emulator.
- Run `yarn simulator` to open the iOS device simulator.
- Run `yarn react-native link` to synchronize the fonts to android/ios projects
