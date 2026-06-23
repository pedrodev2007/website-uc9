const express = require('express');
const router = express.Router();
const franquiaController = require('../../js/controllers/franquiaController');
const authMiddleware = require('../../js/middlewares/authMiddleware'); // <-- MIDDLEWARE

// Todas as rotas de franquias são protegidas, exigem Token
router.get('/franquias', authMiddleware, franquiaController.listarFranquias); 
router.get('/franquias/usuario/:usuarioId', authMiddleware, franquiaController.listarFranquias); 
router.post('/franquias', authMiddleware, franquiaController.criar);

module.exports = router;