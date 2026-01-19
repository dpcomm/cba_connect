// import { Buffer } from "buffer";
// import { ExpoConfig } from "expo/config";
// import fs from "fs";

// export default ({ config }: { config: ExpoConfig }) => {
//   const base64 = process.env.GOOGLE_SERVICES_JSON;

//   if (base64) {
//     const json = Buffer.from(base64, "base64").toString("utf-8");

//     fs.writeFileSync("google-services.json", json);
//   }

//   return {
//     ...config,
//     android: {
//       ...config.android,
//       googleServicesFile: "./google-services.json",
//     },
//   };
// };

import 'dotenv/config';
import { ExpoConfig } from 'expo/config';
import fs from 'fs';

export default ({ config }: { config: ExpoConfig }) => {
  const secretFilePath = process.env.GOOGLE_SERVICES_JSON;

  if (secretFilePath && fs.existsSync(secretFilePath)) {
    const json = fs.readFileSync(secretFilePath, 'utf-8');
    fs.writeFileSync('google-services.json', json);
  }

  return {
    ...config,

    name: 'cba-connect-application',
    slug: 'cba-connect-application',
    scheme: 'cbaconnect',

    extra: {
      ...config.extra,
      KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    },

    android: {
      ...config.android,
      googleServicesFile: './google-services.json',
    },
  };
};
