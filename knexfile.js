// Update with your config settings.
const dotenv = require('dotenv')
dotenv.config();
module.exports = {

  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    schemaName: 'dispatcher'
  }, 
  log: {
    warn(message){
      console.log(message)
    },
    error(message){
      console.log(message)
    },
    debug(message){
      console.log(message)
    },
  }

};
