module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.ts',
      watch: true,
      restart_delay: 2000,
      env: {
        NODE_ENV: 'development',
        PORT: '5000',
      },
    },
  ],
};
