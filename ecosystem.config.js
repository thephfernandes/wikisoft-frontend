module.exports = {
  apps: [
    {
      name: 'io',
      script: 'node_modules/directus/dist/start.js',
      out_file: './logs/out.log',
      error_file: './logs/err.log',
      env: {
        NODE_ENV: 'development',
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
      'pre-setup': 'mkdir -p /home/node/apps/io && pnpm run app:delete',
      'post-setup':
        'cp ~/apps/io/.env ~/apps/io/current/ && pnpm install && pnpm run app:start -- --instances=max',
      'post-deploy': 'pnpm install && pnpm run app:reload',

      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
