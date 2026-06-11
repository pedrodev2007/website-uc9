const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: DB_HOST,
	port: POST,
	user: DB_USER,
	password: '',
	database: DB_NAME,
	namedPlaceholders: true
});

module.exports = connection;