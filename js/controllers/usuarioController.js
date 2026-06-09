const usuarioRepository = require('../repositories/usuarioRepository');

class UsuarioController {
    async listar(req, res) {
        try {
            const usuarios = await usuarioRepository.listarTodos();
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const usuario = await usuarioRepository.buscarPorId(req.params.id);
            if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await usuarioRepository.buscarPorEmailESenha(email, senha);
            if (!usuario) return res.status(401).json({ success: false, message: 'Incorreto!' });
            return res.json({ success: true, usuario });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const novoId = await usuarioRepository.criar(nome, email, senha);
            return res.status(201).json({ success: true, id: novoId });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            await usuarioRepository.atualizar(req.params.id, nome, email, senha);
            return res.json({ success: true, message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            await usuarioRepository.deletar(req.params.id);
            return res.json({ success: true, message: 'Usuário deletado' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UsuarioController();