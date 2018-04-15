module.exports = {
  apps : [
    {
      name : 'fwastats-tracker',
      script : 'app.js',
      env : {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
