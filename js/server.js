const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuarioRoutes = require('./routers/usuarioRoutes'); 
const franquiaRoutes = require('./routers/franquiaRoutes'); // <-- ADICIONADO



const app = express();

app.use(cors());

app.use(express.json()); 



app.use((req, res, next) => {
    console.log("--- NOVA REQUISIÇÃO ---");
    console.log("Rota acessada:", req.url);
    console.log("O que chegou no Body:", req.body);
    next();
});




app.use('/api', usuarioRoutes);
app.use('/api', franquiaRoutes); // <-- ADICIONADO

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});