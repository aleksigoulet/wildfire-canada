// implementation of app.config.ts adapted from following post:
// https://stackoverflow.com/questions/67781801/how-to-add-environment-variables-to-app-json-file


import { ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext) => {
  // get current plugins
  const plugins = config.plugins;

  // add the necessary plugin for rn mapbox
  // this method allows for the use of environment variables to avoid storing API keys remotely
  plugins?.push(
    [
      "@rnmapbox/maps",
      {
        "RNMapboxMapsDownloadToken": process.env.MB_PRIVATE_TOKEN ?? process.env.EXPO_PUBLIC_MB_PRIVATE_TOKEN
      }
    ]
  )

  return {
    ...config,
    plugins: plugins
  }
}