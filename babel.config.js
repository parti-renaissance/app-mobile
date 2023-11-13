module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: ["@babel/plugin-proposal-unicode-property-regex"],
  env: {
    production: {
      plugins: [
        "react-native-paper/babel",
        "transform-remove-console",
        "@babel/plugin-proposal-unicode-property-regex",
      ],
    },
  },
};
