require('dotenv').config();

const instances = process.env.WIKI_INSTANCES || 'max';
const log_dir = process.env.WIKI_LOG_DIR || 'logs/';

module.exports = {
  apps: [
    {
      name: 'io',
      script: 'node_modules/directus/dist/start.js',
      args: '',
      instances: instances,
      exec_mode: 'cluster',
      out_file: log_dir + 'out.log',
      error_file: log_dir + 'err.log',
      env: {
        CONFIG_PATH: 'config.js',
      },
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: ['10.0.0.251'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/io.git',
      path: '/home/node/apps/io',
      ssh_options: [
        'AddKeysToAgent=yes',
        'ForwardAgent=yes',
        'ProxyJump=deploy@94.237.111.62',
        'IdentityFile=~/.ssh/id_rsa_devops',
      ],
      'post-deploy':
        'pnpm install && cp ~/apps/io/.env ~/apps/io/current/ && NODE_ENV=production pnpm run io:reload',
    },
  },
};
