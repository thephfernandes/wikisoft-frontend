const { readdirSync } = require('fs');
const path = require('path');

// Get ENV Settings
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'directus',
      script: '../node_modules/directus/dist/start.js',
      cwd: path.join(__dirname, 'directus'),
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
        LOG_LEVEL: 'info',
        LOG_STYLE: 'pretty',
        PUBLIC_URL: '/api',
        ROOT_REDIRECT: '/',
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
        CACHE_AUTO_PURGE: true,
        CACHE_ENABLED: process.env.IO_CACHE_ENABLED || false,
        CACHE_REDIS: 'redis://10.0.0.252:6379/1',
        CACHE_STORE: 'redis',
        CACHE_TTL: '10m',
        EMAIL_FROM: 'support@wikiprofile.com',
        SESSION_REDIS: 'redis://10.0.0.252:6379/2',
        RATE_LIMITER_ENABLED: false,
        RATE_LIMITER_POINTS: 50,
        RATE_LIMITER_DURATION: 1,
        RATE_LIMITER_STORE: 'redis',
        RATE_LIMITER_REDIS: 'redis://10.0.0.252:6379/3',
        EMAIL_FROM: 'support@wikiprofile.com',
        SESSION_STORE: process.env.IO_SESSION_STORE || 'database',
        DB_CONNECTION_STRING:
          process.env.IO_DB_CONNECTION_STRING ||
          'DB_CONNECTION_STRING=postgres://wikiprofile:wikiprofile@localhost:5432/wikiprofile',
      },
    },
    {
      name: 'frontend',
      script: 'server.js',
      cwd: path.join(__dirname, 'frontend'),
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
