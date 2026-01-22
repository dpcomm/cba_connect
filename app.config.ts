import "dotenv/config";
import { ExpoConfig } from "expo/config";
import fs from "fs";

export default ({ config }: { config: ExpoConfig }) => {
  const v = process.env.GOOGLE_SERVICES_JSON;

  if (v) {
    if (fs.existsSync(v)) {
      const json = fs.readFileSync(v, "utf-8");
      fs.writeFileSync("google-services.json", json);
    }
  }

  return {
    ...config,

    name: "CBA Connect",
    slug: "cba-connect-application",
    scheme: "cbaconnect",

    extra: {
      ...config.extra,
      KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    },

    ios: {
      ...config.ios,
      config: {
        ...(config.ios as any)?.config,
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },

    android: {
      ...config.android,
      googleServicesFile: "./google-services.json",
      config: {
        ...(config.android as any)?.config,
        googleMaps: {
          ...((config.android as any)?.config?.googleMaps ?? {}),
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
  };
};
