const express = require('express');
const router = express.Router();
const franquiaController = require('../controllers/franquiaController');

router.get('/franquias', franquiaController.listarFranquias); // Admin lista todas
router.get('/franquias/usuario/:usuarioId', franquiaController.listarFranquias); // Usuário lista as dele
router.post('/franquias', franquiaController.criar);

module.exports = router;