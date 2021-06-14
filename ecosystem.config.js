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
        STORAGE_LOCAL_ROOT: './files',
        CACHE_ENABLED: false,
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_DATABASE: 'wikiprofile',
        DB_USER: 'wikiprofile',
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
        'AddKeysToAgent=yes',
        'ForwardAgent=yes',
        'ProxyJump=deploy@bastion-server.wikiprofile.com',
        'IdentityFile=~/.ssh/id_rsa_devops',
      ],
      'pre-setup': 'mkdir -p /home/node/apps/io && pnpm run app:delete',
      'post-deploy': 'pnpm install && pnpm run app:start -- --instances=max',

      env: {
        NODE_ENV: 'production',
        STORAGE_LOCAL_ROOT: '/storage/wikiprofile/production',
        CACHE_ENABLED: true,
        DB_HOST: 'ams-db-01',
        DB_DATABASE: 'wikiprofile',
        DB_PORT: 5432,
        DB_USER: 'wikiprofile',
      },
    },
  },
};
