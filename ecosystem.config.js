module.exports = {
  apps: [
    {
      name: 'gateway',
      script: 'server.js',
      args: 'start',
      out_file: './logs/out.log',
      instances: 'max',
      exec_mode: 'cluster',
      watch: 'extensions',
      instance_var: 'INSTANCE_ID',
      error_file: './logs/err.log',
      exp_backoff_restart_delay: 100,
      env: {
        CONFIG_PATH: 'config.js',
      },
    },
    {
      name: 'directus',
      script: './node_modules/directus/dist/start.js',
      args: 'start',
      out_file: './logs/out.log',
      instances: 'max',
      exec_mode: 'cluster',
      watch: 'extensions',
      instance_var: 'INSTANCE_ID',
      error_file: './logs/err.log',
      exp_backoff_restart_delay: 100,
      env: {
        CONFIG_PATH: 'config.js',
      },
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
      'post-setup': 'npm run cluster:delete',
      'post-deploy': 'npm install && npm run cluster:start',
    },
  },
};
