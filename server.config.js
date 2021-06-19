// Get ENV Settings
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'directus',
      script: 'directus',
      args: 'start',
      cwd: './directus/',
      exec_mode: process.env.IO_DIRECTUS_INSTANCES > 1 ? 'cluster' : 'fork',
      instances:
        process.env.IO_DIRECTUS_INSTANCES > 1
          ? process.env.IO_DIRECTUS_INSTANCES
          : 1,
      instance_var: 'INSTANCE_ID',
      out_file: '../logs/directus/out.log',
      error_file: '../logs/directus/err.log',
      exp_backoff_restart_delay: 100,
      env: {
        PORT: 8055,
        NODE_ENV: 'development',
        LOG_LEVEL: 'info',
        LOG_STYLE: 'pretty',
        PUBLIC_URL: '/',
        ROOT_REDIRECT: false,
        ADMIN_EMAIL: 'hostmaster@wikisoft.com',
        ADMIN_PASSWORD: 'wikiprofile',
        DB_CLIENT: 'pg',
        EMAIL_FROM: 'support@wikiprofile.com',
        KEY: '255d861b-5ea1-5996-9aa3-922530ec40b1',
        SECRET: '6116487b-cda1-52c2-b5b5-c8022c45e263',
        STORAGE_LOCATIONS: 'googlecloud',
        STORAGE_GOOGLECLOUD_DRIVER: 'gcs',
        STORAGE_GOOGLECLOUD_BUCKET: 'wikiprofile-production',
        STORAGE_GOOGLECLOUD_KEY_FILENAME: '../google_cloud_storage_key.json',
        CACHE_ENABLED: false,
        EMAIL_FROM: 'support@wikiprofile.com',
        SESSION_STORE: 'database',
        RATE_LIMITER_ENABLED: false,
        CACHE_ENABLED: false,
        DB_CONNECTION_STRING:
          process.env.IO_DB_CONNECTION_STRING ||
          'DB_CONNECTION_STRING=postgres://wikiprofile:wikiprofile@localhost:5432/wikiprofile',
        SESSION_STORE: 'database',
      },
    },
    {
      name: 'frontend',
      script: 'server.js',
      cwd: './frontend/',
      exec_mode: process.env.IO_FRONTEND_INSTANCES > 1 ? 'cluster' : 'fork',
      instances:
        process.env.IO_FRONTEND_INSTANCES > 1
          ? process.env.IO_FRONTEND_INSTANCES
          : 1,
      instance_var: 'INSTANCE_ID',
      out_file: '../logs/frontend/out.log',
      error_file: '../logs/frontend/err.log',
      exp_backoff_restart_delay: 100,
      env: {},
    },
    {
      name: 'server',
      script: 'server.js',
      exec_mode: process.env.IO_SERVER_INSTANCES > 1 ? 'cluster' : 'fork',
      instances:
        process.env.IO_SERVER_INSTANCES > 1
          ? process.env.IO_SERVER_INSTANCES
          : 1,
      instance_var: 'INSTANCE_ID',
      out_file: './logs/server/out.log',
      error_file: './logs/server/err.log',
      exp_backoff_restart_delay: 100,
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: ['10.0.0.252'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/io.git',
      path: '/home/node/apps/io',
      ssh_options: ['IdentityFile=~/.ssh/id_rsa_devops'],
      'post-setup': 'npm run delete',
      'post-deploy': 'npm install && npm run build && npm start',
    },
  },
};
