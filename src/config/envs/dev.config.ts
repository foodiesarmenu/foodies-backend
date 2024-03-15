export default () => ({
  applicationName: 'Base',
  version: process.env.VERSION || 'latest',
  env: process.env.ENV_NAME,
  NODE_ENV: 'dev',
  port: parseInt(process.env.PORT, 10) || 3000,
  logLevel: 'debug',
  baseUrl: process.env.API_BASE_URL,
  database: {
    url: process.env.MONGODB_URL,
  },
  onlineDatabase: {
    url: process.env.ONLINE_MONGODB_URL,
  },
  access: {
    ADMIN_PUBLIC_KEY: process.env.ADMIN_PUBLIC_KEY,
    ADMIN_PRIVATE_KEY: process.env.ADMIN_PRIVATE_KEY,
  },
});
