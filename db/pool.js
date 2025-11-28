const { Pool } = require("pg");

require("dotenv").config();

const connectionString = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.SQL_PORT}/${process.env.DATABASE}`;

module.exports = new Pool({
  connectionString: connectionString,
});
