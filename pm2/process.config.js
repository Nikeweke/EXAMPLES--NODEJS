
// http://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: 'APP',
      script: "app.js",
      // qunatity of instancess - not using at "fork mode"
      // instances: "max",
      // if something changed, restart process
      watch: true,

      // Cluster - можно запустить несколько клонов приложения на одном порту
      // Fork - запустить несколько приложений на разных портах,  на 
      exec_mode: "fork"
    },

    {
      name: 'API',
      script: "api.js",
      // qunatity of instancess
      instances: "max",
      // if something changed, restart process
      watch: true,

      // Cluster - можно запустить несколько клонов приложения на одном порту
      // Fork - запустить несколько приложений на разных портах,  на 
      exec_mode: "cluster"
    }
  ]
}
