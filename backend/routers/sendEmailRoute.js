const express = require('express');
const router = express.Router();
const controller = require('../controllers/emailController');

router.post('/email', controller.enviar);

module.exports = router;