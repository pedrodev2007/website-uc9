const usuarioRepository = require('../model/repositories/usuarioRepository');
const usuarioValidation = require('../validations/usuarioValidation');

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
        const { email, senha } = req.body; // Extraindo apenas email e senha

        // GARANTA que você está chamando o método de login, e não o de cadastro
        const validacao = usuarioValidation.validarLogin(email, senha);
        
        if (!validacao.valido) {
            return res.status(400).json({ success: false, message: validacao.erro });
        }

        const usuario = await usuarioRepository.buscarPorEmailESenha(email, senha);
        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Email ou senha incorretos!' });
        }

        return res.json({ success: true, usuario });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

    async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            // Validação de entrada
            const validacao = usuarioValidation.validarCadastro(nome, email, senha);
            if (!validacao.valido) {
                return res.status(400).json({ success: false, error: validacao.erro });
            }

            // Verifica se o e-mail já está cadastrado
            const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(400).json({ success: false, error: 'Este e-mail já está em uso.' });
            }

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