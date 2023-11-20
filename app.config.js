import 'dotenv/config';

export default ({ config }) => ({
    ...config,
    extra: {
      urlApi: process.env.URL_API,
    },
  });