// Get ENV Settings
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'nuxt',
      args: process.env.NODE_ENV == 'production' ? 'start' : 'dev',
      cwd: 'frontend',
      exec_mode: 'cluster',
      instances: 'max',
      out_file: '../logs/frontend/out.log',
      error_file: '../logs/frontend/err.log',
      exp_backoff_restart_delay: 100,
      env: {
        API_URL: process.env.IO_API_URL || 'https://io.wikiprofile.com',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['94.237.41.100'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/io.git',
      path: '/var/www/frontend',
      ssh_options: ['IdentityFile=~/.ssh/id_rsa_devops'],
      'post-deploy': 'npm install && npm run start:frontend',
    },
  },
};
