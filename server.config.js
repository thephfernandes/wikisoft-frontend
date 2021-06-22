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
        PORT: process.env.IO_DIRECTUS_PORT || 8055,
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
        CACHE_AUTO_PURGE: true,
        CACHE_ENABLED: process.env.IO_CACHE_ENABLED || false,
        CACHE_REDIS: 'redis://10.0.0.252:6379/1',
        CACHE_STORE: 'redis',
        CACHE_TTL: '10m',
        SESSION_REDIS: 'redis://10.0.0.252:6379/2',
        SESSION_STORE: process.env.IO_SESSION_STORE || 'database',
        RATE_LIMITER_ENABLED: false,
        RATE_LIMITER_POINTS: 50,
        RATE_LIMITER_DURATION: 1,
        RATE_LIMITER_STORE: 'redis',
        RATE_LIMITER_REDIS: 'redis://10.0.0.252:6379/3',
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
        REFRESH_TOKEN_COOKIE_SECURE: true,
        REFRESH_TOKEN_COOKIE_SAME_SITE: 'Lax',
        REFRESH_TOKEN_COOKIE_DOMAIN:
          process.env.IO_REFRESH_TOKEN_COOKIE_DOMAIN || 'localhost',
      },
    },
    {
      name: 'frontend',
      script: 'nuxt',
      args: process.env.NODE_ENV == 'production' ? 'start' : 'dev',
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
      'post-deploy':
        'npm install && npm run build && npm start && caddy reload',
    },
  },
};
