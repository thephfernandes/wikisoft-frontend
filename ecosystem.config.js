require('dotenv').config();

const instances = process.env.WIKI_INSTANCES || 1;
const log_dir = process.env.WIKI_LOG_DIR || 'logs/';
const db_password = process.env.WIKI_DB_PASSWORD;
const deploy_key_path = process.env.WIKI_DEPLOY_KEY_PATH || '~/.ssh/id_rsa';

const deploy_target_testing = process.env.WIKI_DEPLOY_TARGET_TESTING || [
  '10.0.0.201',
];
const deploy_target_production = process.env.WIKI_DEPLOY_TARGET_PRODUCTION || [
  '10.0.0.201',
];

console.log(db_password);

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
        PORT: 8080,
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
        STORAGE_LOCAL_ROOT: '/storage/directus',
        STORAGE_LOCATION: 'local',
        SESSION_STORE: 'database',
      },
      env_production: {
        NODE_ENV: 'production',
        CACHE_AUTO_PURGE: true,
        CACHE_ENABLED: false,
        CACHE_REDIS: 'redis://localhost:6379',
        CACHE_STORE: 'redis',
        CACHE_TTL: '30m',
        EMAIL_FROM: 'support@wikiprofile.com',
      },
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: ['10.0.0.201'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/io.git',
      path: '/home/node/apps/io',
      ssh_options: [
        'AddKeysToAgent=yes',
        'ForwardAgent=yes',
        'ProxyJump=deploy@94.237.111.62',
      ],
      'post-deploy':
        'npm install && cp .env current/ && pm2 startOrReload ecosystem.config.js --env production && pm2 save',
    },
  },
};
