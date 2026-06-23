const usuarioRepository = require('../model/repositories/usuarioRepository');
const usuarioValidation = require('../validations/usuarioValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const SALT_ROUNDS = 10;

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

            const validacao = usuarioValidation.validarLogin(email, senha);
            if (!validacao.valido) {
                return res.status(400).json({ success: false, message: validacao.erro });
            }

            const usuario = await usuarioRepository.buscarPorEmail(email);
            if (!usuario) {
                return res.status(401).json({ success: false, message: 'Email ou senha incorretos!' });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ success: false, message: 'Email ou senha incorretos!' });
            }

            // ==========================================
            // GERAÇÃO DO TOKEN DE ACESSO (JWT)
            // ==========================================
            const segredo = process.env.JWT_SECRET || 'chave_secreta_clean_lavanderia_2026';
            const token = jwt.sign(
                { id: usuario.id, tipo: usuario.tipo }, // Dados guardados dentro do token
                segredo,
                { expiresIn: '4h' } // O token expira em 4 horas
            );

            delete usuario.senha;

            // Retorna o token junto com os dados do utilizador
            return res.json({ success: true, usuario, token });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            const validacao = usuarioValidation.validarCadastro(nome, email, senha);
            if (!validacao.valido) {
                return res.status(400).json({ success: false, error: validacao.erro });
            }

            const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(400).json({ success: false, error: 'Este e-mail já está em uso.' });
            }

            const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
            const novoId = await usuarioRepository.criar(nome, email, senhaHash);
            
            return res.status(201).json({ success: true, id: novoId });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            let senhaFinal = senha;
            if (senha) {
                senhaFinal = await bcrypt.hash(senha, SALT_ROUNDS);
            }
            
            await usuarioRepository.atualizar(req.params.id, nome, email, senhaFinal);
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