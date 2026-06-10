const mysql = require('mysql2/promise');
require('dotenv').config();

// Cria um "pool" de conexões com o banco de dados
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // Coloque sua senha do MySQL aqui
    database: process.env.DB_NAME || 'lavanderia',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
