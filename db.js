const mysql = require("mysql");

const config = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "",
	database: "minder",
});

module.exports = {
	config,
};
