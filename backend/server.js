const express = require('express');
const cors = require('cors');
require('dotenv').config();

const emailRoutes = require('./routers/sendEmailRoute');
const usuarioRoutes = require('./routers/usuarioRoutes'); 
const franquiaRoutes = require('./routers/franquiaRoutes'); // <-- ADICIONADO



const app = express();

app.use(cors());

app.use(express.json()); 


app.use('/api', emailRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', franquiaRoutes); // <-- ADICIONADO

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});