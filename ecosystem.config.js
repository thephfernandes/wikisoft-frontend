require('dotenv').config();

const instances = process.env.WIKI_INSTANCES || 1;
const log_dir = process.env.WIKI_LOG_DIR || 'logs/';
const db_password = process.env.WIKI_DB_PASSWORD;

module.exports = {
  apps: [
    {
      name: 'io',
      script: 'node_modules/directus/dist/start.js',
      instances: instances,
      exec_mode: 'cluster',
      out_file: log_dir + 'out.log',
      error_file: log_dir + 'err.log',
      env: {
        PORT: 8055,
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
        STORAGE_LOCAL_ROOT: '/storage/directus',
        STORAGE_LOCATION: 'local',
      },
    },
  ],
  deploy: {
    testing: {
      user: 'node',
      host: ['10.0.0.201'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/wikiprofile.git',
      path: 'apps/io',
      'post-deploy': 'npm install',
    },
    production: {
      user: 'node',
      host: ['10.0.0.201'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/wikiprofile.git',
      path: 'apps /io',
      'post-deploy': 'npm install',
    },
  },
};
