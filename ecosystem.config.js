module.exports = {
  apps: [
    {
      name: 'directus',
      script: 'npm',
      args: 'start',
      out_file: './logs/out.log',
      instances: 'max',
      exec_mode: 'cluster',
      watch: 'extensions',
      instance_var: 'INSTANCE_ID',
      error_file: './logs/err.log',
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: 'development',
        CONFIG_PATH: 'config.js',
      },
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: ['ams-io-01'],
      ref: 'origin/main',
      repo: 'git@github.com:wikisoft-code/io.git',
      path: '/home/node/apps/io',
      ssh_options: [
        'ProxyJump=deploy@bastion-server.wikiprofile.com',
        'IdentityFile=~/.ssh/id_rsa_devops',
      ],
      'post-setup': 'npm run cluster:delete',
      'post-deploy': 'npm install && npm run cluster:start',
    },
  },
};
