require('dotenv').config();

const instances = process.env.WIKI_INSTANCES || 1;
const log_dir = process.env.WIKI_LOG_DIR || 'logs/';
const db_password = process.env.WIKI_DB_PASSWORD || 'wikiprofile';
const files_location = process.env.WIKI_FILES_LOCATION || './files';

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
    DB_HOST: 'localhost',
    DB_DATABASE: 'wikiprofile',
    DB_PASSWORD: db_password,
    DB_PORT: 5432,
    DB_USER: 'wikiprofile',
    EMAIL_FROM: 'support@wikiprofile.com',
    KEY: '255d861b-5ea1-5996-9aa3-922530ec40b1',
    SECRET: '6116487b-cda1-52c2-b5b5-c8022c45e263',
    STORAGE_LOCAL_DRIVER: 'local',
    STORAGE_LOCAL_ROOT: files_location,
    STORAGE_LOCATION: 'local',
    SESSION_STORE: 'database',
  };

  // CACHE_AUTO_PURGE: true,
  // CACHE_ENABLED: false,
  // CACHE_REDIS: 'redis://localhost:6379',
  // CACHE_STORE: 'redis',
  // CACHE_TTL: '30m',
  // EMAIL_FROM: 'support@wikiprofile.com',
  // SESSION_REDIS: 'redis://localhost:6379',
  // SESSION_STORE: 'redis',
  // STORAGE_LOCAL_ROOT: '/storage/io_files',

  return config;
};
