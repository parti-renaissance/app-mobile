/* eslint-env node */
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path')
const { generate } = require("@storybook/react-native/scripts/generate");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname, {
    // [Web-only]: Enables CSS support in Metro.
    isCSSEnabled: false,
});

// 1. Enable Storybook
generate({
  configPath: path.resolve(__dirname, "./.storybook"),
  useJs: true,
});


// 2. Enable Tamagui
const { withTamagui } = require('@tamagui/metro-plugin')
module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
})
