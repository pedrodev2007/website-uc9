const db = require('../../database/db');




class FranquiaRepository {
    async listarPorUsuario(usuario_id) {
        const [rows] = await db.execute('SELECT * FROM tb_franquias WHERE usuario_id = ?', [usuario_id]);
        return rows;
    }

    async listarTodas() {
        const [rows] = await db.execute('SELECT * FROM tb_franquias');
        return rows;
    }

    async criar(cidade, estado, orcamento_inicial, usuario_id) {
        const [result] = await db.execute(
            'INSERT INTO tb_franquias (cidade, estado, orcamento_inicial, usuario_id) VALUES (?, ?, ?, ?)', 
            [cidade, estado, orcamento_inicial, usuario_id]
        );
        return result.insertId;
    }

    async listarFranquias(req, res) {
    try {
        const usuarioId = req.params.usuarioId;
        
        // Se o usuarioId for 'null', 'undefined' ou inexistente, lista tudo
        if (!usuarioId || usuarioId === 'null' || usuarioId === 'undefined') {
            const franquias = await franquiaRepository.listarTodas();
            return res.json(franquias);
        }

        // Caso contrário, filtra pelo usuário
        const franquias = await franquiaRepository.listarPorUsuario(usuarioId);
        return res.json(franquias);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
}



module.exports = new FranquiaRepository();