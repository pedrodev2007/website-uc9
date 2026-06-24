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
        // Tenta pegar o ID tanto de params (/1) quanto de query (?usuarioId=1)
        const usuarioId = req.params.usuarioId || req.query.usuarioId;
        
        // Verificação de segurança: Se não vier ID nenhum, ele NÃO deve listar tudo, 
        // a menos que seja uma regra específica para administradores.
        if (!usuarioId || usuarioId === 'null' || usuarioId === 'undefined') {
            // O ideal é retornar erro se faltar o ID do usuário comum
            return res.status(400).json({ error: 'ID do usuário não fornecido.' });
        }

        // Caso contrário, filtra certinho pelo usuário
        const franquias = await this.listarPorUsuario(usuarioId);
        return res.json(franquias);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
}



module.exports = new FranquiaRepository();