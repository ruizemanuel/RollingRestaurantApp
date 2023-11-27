import 'dotenv/config';

const apikey = process.env.EXPO_PUBLIC_API;

export default ({ config }) => ({
    ...config,
    extra: {
      apiKey: apikey,
      eas: {
        projectId: "4ed445b7-348e-4f7d-b463-079ece557f37"
      }
    },
    updates: {
      url: "https://u.expo.dev/4ed445b7-348e-4f7d-b463-079ece557f37"
    },
    runtimeVersion: {
      policy: "appVersion"
    }
  });