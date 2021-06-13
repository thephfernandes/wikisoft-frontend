require('dotenv').config();

module.exports = function (env) {
  const config = {
    PORT: 8055,
    NODE_ENV: 'development',
    LOG_LEVEL: 'info',
    LOG_STYLE: 'pretty',
    PUBLIC_URL: '/',
    ROOT_REDIRECT: '/admin',
    ADMIN_EMAIL: 'hostmaster@wikisoft.com',
    ADMIN_PASSWORD: 'wikiprofile',
    DB_CLIENT: 'pg',
    EMAIL_FROM: 'support@wikiprofile.com',
    KEY: '255d861b-5ea1-5996-9aa3-922530ec40b1',
    SECRET: '6116487b-cda1-52c2-b5b5-c8022c45e263',
    STORAGE_LOCAL_DRIVER: 'local',
    STORAGE_LOCATION: 'local',
    CACHE_AUTO_PURGE: true,
    CACHE_REDIS: 'redis://localhost:6379',
    CACHE_STORE: 'redis',
    CACHE_TTL: '30m',
    EMAIL_FROM: 'support@wikiprofile.com',
  };

  return config;
};
