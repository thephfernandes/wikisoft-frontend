// Get ENV Settings
require('dotenv').config();
module.exports = {
  apps: [
    {
      name: 'IO Server',
      script: 'server.js',
      out_file: './logs/out.log',
      exec_mode: process.env.IO_INSTANCES > 1 ? 'cluster' : 'fork',
      instances: process.env.IO_INSTANCES > 1 ? process.env.IO_INSTANCES : 1,
      instance_var: 'INSTANCE_ID',
      error_file: './logs/err.log',
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
      'post-deploy': 'npm install && npm run start',
    },
  },
};
