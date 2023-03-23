module.exports = {
  apps : [{
    name: "app",
    script: "bin/www",
    
    env: {
      NODE_ENV: "development",
      TOKEN_SECRET:"secreto",
    },
    env_production: {
      NODE_ENV: "production",
      
    }
  }]
}
