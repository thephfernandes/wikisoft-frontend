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
    STORAGE_LOCATIONS: 'googlecloud',
    STORAGE_GOOGLECLOUD_DRIVER: 'gcs',
    STORAGE_GOOGLECLOUD_BUCKET: 'wikiprofile-production',
    STORAGE_GOOGLECLOUD_KEY_FILENAME: 'google_cloud_storage_key.json',
    CACHE_AUTO_PURGE: true,
    CACHE_REDIS: 'redis://localhost:6379',
    CACHE_STORE: 'redis',
    CACHE_TTL: '30m',
    EMAIL_FROM: 'support@wikiprofile.com',
    SESSION_STORE: 'redis',
    SESSION_REDIS: 'redis://localhost:6379/1',
    RATE_LIMITER_ENABLED: false,
    RATE_LIMITER_POINTS: 50,
    RATE_LIMITER_DURATION: 1,
    RATE_LIMITER_STORE: 'redis',
    RATE_LIMITER_REDIS: 'redis://localhost:6379/2',
    CACHE_ENABLED: false,
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_DATABASE: 'wikiprofile',
    DB_USER: 'wikiprofile',
    SESSION_STORE: 'database',
  };

  return config;
};
