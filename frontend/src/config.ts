const config = {
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY:
    "pk_test_51KtauxL268qR0mUvZE5eh78WcJW1teF5mguhjzwIkjtixIbHOusNRGudE2CTwd6rLPqkiCV7uqR8QWZ3QClm6JNQ00GrSsmBLn",
  SENTRY_DSN:
    "https://5f5f0be4234b4bfdbac08f9bd440077a@o1226604.ingest.sentry.io/6372206",
};

export default config;
