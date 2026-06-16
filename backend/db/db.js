const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	namedPlaceholders: true
});

module.exports = connection;