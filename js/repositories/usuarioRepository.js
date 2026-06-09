const db = require('../config/db');

class UsuarioRepository {
    async listarTodos() {
        const [rows] = await db.execute('SELECT id, nome, email FROM tb_usuarios');
        return rows;
    }

    async buscarPorId(id) {
        const [rows] = await db.execute('SELECT id, nome, email FROM tb_usuarios WHERE id = ?', [id]);
        return rows[0];
    }

    async buscarPorEmailESenha(email, senha) {
        const [rows] = await db.execute('SELECT id, nome, email FROM tb_usuarios WHERE email = ? AND senha = ?', [email, senha]);
        return rows[0];
    }

    async criar(nome, email, senha) {
        const [result] = await db.execute('INSERT INTO tb_usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
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