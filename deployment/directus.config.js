// Get ENV Settings
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'directus',
      script: 'node_modules/directus/dist/start.js',
      exec_mode: 'cluster',
      instances: 'max',
      out_file: '../logs/directus/out.log',
      error_file: '../logs/directus/err.log',
      exp_backoff_restart_delay: 100,
      env: {
        CONFIG_PATH: './directus/config.js',
      },
    },
  ],
  deploy: {
    production: {
      user: 'hostmaster',
      host: ['94.237.41.158'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/io.git',
      path: '/var/www/io',
      ssh_options: ['IdentityFile=~/.ssh/id_rsa_devops'],
      'post-deploy': 'npm install && npm run start:directus',
    },
  },
};
