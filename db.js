const mysql = require("mysql");

const config = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "",
  database: "akash"
});

module.exports = {
  config
};
