const pgp = require('pg-promise')();

const configConnect = {
  host: process.env.SECRET_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  ssl: true
}

const db = pgp(configConnect);

module.exports = db;
