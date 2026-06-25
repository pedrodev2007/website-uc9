const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    // 1. Pega o token do cabeçalho da requisição (front-end)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // O formato esperado é "Bearer TOKEN_AQUI"

    // 2. Se não houver token, bloqueia o acesso
    if (!token) {
        return res.status(401).json({ success: false, message: 'Acesso negado. Faça login para continuar.' });
    }

    try {
        // 3. Verifica se o token é válido e não foi adulterado
        const segredo = process.env.JWT_SECRET || 'chave_secreta_clean_lavanderia_2026';
        const usuarioDecodificado = jwt.verify(token, segredo);
        
        // 4. Se for válido, guarda os dados do utilizador na requisição e deixa passar
        req.usuario = usuarioDecodificado;
        next(); 
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Token inválido ou expirado.' });
    }
}

module.exports = verificarToken;