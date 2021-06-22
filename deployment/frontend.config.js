const { readdirSync } = require('fs');
const path = require('path');

// Get ENV Settings
require('dotenv').config();

module.exports = {
  apps: [
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
      env: {
        API_URL: process.env.IO_API_URL || 'https://io.wikiprofile.com'
      },
    },
  ],
  deploy: {
    production: {
      user: 'hostmaster',
      host: ['10.0.0.252'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/io.git',
      path: '/home/hostmaster/www/frontend',
      ssh_options: ['IdentityFile=~/.ssh/id_rsa_devops'],
      'post-deploy':
        'npm install && npm run build && npm run start:frontend',
    },
  },
};
