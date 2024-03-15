export default () => ({
  applicationName: 'Base',
  version: process.env.VERSION || 'latest',
  env: process.env.ENV_NAME,
  NODE_ENV: 'production',
  port: parseInt(process.env.PORT, 10) || 5000,
  logLevel: 'debug',
  baseUrl: process.env.API_BASE_URL,

  database: {
    url: process.env.MONGODB_URL,
  },
});
