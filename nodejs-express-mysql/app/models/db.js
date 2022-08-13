const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  port:dbConfig.port,
  user: dbConfig.USER,
  password: dbConfig.password,
  database: dbConfig.DB
});

module.exports = connection;
