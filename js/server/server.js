const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importação apenas das rotas de usuário
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Registro dos endpoints de usuários na API
app.use('/api', usuarioRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT} focado em Usuários!`);
});