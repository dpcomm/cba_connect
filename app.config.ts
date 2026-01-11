import 'dotenv/config';

export default {
  expo: {
    name: 'cba-connect-application',
    slug: 'cba-connect-application',
    scheme: 'cbaconnect',
    extra: {
      KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    },
  },
};
