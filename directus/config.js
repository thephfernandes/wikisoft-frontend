// Get ENV Settings
require('dotenv').config();

module.exports = function (env) {
  return {
    PORT: process.env.IO_DIRECTUS_PORT || 8055,
    LOG_LEVEL: 'info',
    LOG_STYLE: 'pretty',
    PUBLIC_URL: '/',
    ROOT_REDIRECT: 'https://beta.wikiprofile.com',
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
    CACHE_ENABLED: false,
    RATE_LIMITER_ENABLED: false,
    DB_CONNECTION_STRING:
      process.env.IO_DB_CONNECTION_STRING ||
      'DB_CONNECTION_STRING=postgres://wikiprofile:wikiprofile@localhost:5432/wikiprofile',
    EMAIL_TRANSPORT: 'smtp',
    EMAIL_SMTP_HOST: 'smtp.mailersend.net',
    EMAIL_SMTP_PORT: '587',
    EMAIL_SMTP_USER: 'MS_qAXFOT@wikiprofile.com',
    EMAIL_SMTP_PASSWORD: process.env.IO_SMTP_PASSWORD || '',
    EMAIL_SMTP_POOL: true,
    EMAIL_SMTP_SECURE: true,
    REFRESH_TOKEN_COOKIE_SECURE: false,
    REFRESH_TOKEN_COOKIE_SAME_SITE: 'Lax',
    //REFRESH_TOKEN_COOKIE_DOMAIN:
    //process.env.REFRESH_TOKEN_COOKIE_DOMAIN || 'localhost',
    EXTENSIONS_PATH: './directus/extensions',

    LINKEDIN_API_KEY="efkHqi8YRkELKnFJ",
    LINKEDIN_CLIEND_ID="77690ucczt94sq",
    OAUTH_LINKEDIN_KEY="77690ucczt94sq",
    OAUTH_LINKEDIN_SECRET="efkHqi8YRkELKnFJ",
    OAUTH_LINKEDIN_ENDPOINT="https://api.linkedin.com/",
    OAUTH_LINKEDIN_AUTHORIZE_URL ="/auth/oauth/linkedin",
    OUATH_LINKEDIN_ACCESS_URL ="/"
  };
};
