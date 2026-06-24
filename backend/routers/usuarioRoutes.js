const express = require('express');
const router = express.Router();
const usuarioController = require('../../js/controllers/usuarioController');
const authMiddleware = require('../../js/middlewares/authMiddleware'); // <-- MIDDLEWARE

// ROTAS PÚBLICAS (Qualquer um pode aceder para fazer login ou criar conta)
router.post('/usuarios/login', usuarioController.login);
router.post('/usuarios', usuarioController.criar);

// ROTAS PROTEGIDAS (Apenas com token JWT válido)
router.get('/usuarios', authMiddleware, usuarioController.listar);
router.get('/usuarios/:id', authMiddleware, usuarioController.buscarPorId);
router.put('/usuarios/:id', authMiddleware, usuarioController.atualizar);
router.delete('/usuarios/:id', authMiddleware, usuarioController.deletar);

module.exports = router;