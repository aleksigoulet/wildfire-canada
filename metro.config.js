// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// imports for reanimated
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');


/** @type {import('expo/metro-config').MetroConfig} */
const config = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };

  return config;
})();

module.exports = wrapWithReanimatedMetroConfig(config);
// module.exports = config;
