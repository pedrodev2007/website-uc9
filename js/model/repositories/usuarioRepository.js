const db = require('../../database/db');

class UsuarioRepository {
    async listarTodos() {
        const [rows] = await db.execute('SELECT id, nome, email, tipo FROM tb_usuarios');
        return rows;
    }

    async buscarPorId(id) {
        const [rows] = await db.execute('SELECT id, nome, email, tipo FROM tb_usuarios WHERE id = ?', [id]);
        return rows[0];
    }

    async buscarPorEmail(email) {
        const [rows] = await db.execute('SELECT id, nome, email, senha, tipo FROM tb_usuarios WHERE email = ?', [email]);
        return rows[0];
    }

    async buscarPorEmailESenha(email, senha) {
        const [rows] = await db.execute('SELECT id, nome, email, tipo FROM tb_usuarios WHERE email = ? AND senha = ?', [email, senha]);
        return rows[0];
    }

    async criar(nome, email, senha, tipo = 'usuario') {
        const [result] = await db.execute('INSERT INTO tb_usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', [nome, email, senha, tipo]);
        return result.insertId;
    }

    async atualizar(id, nome, email, senha) {
        await db.execute('UPDATE tb_usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id]);
        return true;
    }

    async deletar(id) {
        await db.execute('DELETE FROM tb_usuarios WHERE id = ?', [id]);
        return true;
    }
}

module.exports = new UsuarioRepository();