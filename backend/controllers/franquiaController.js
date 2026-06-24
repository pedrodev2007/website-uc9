const franquiaRepository = require('../model/repositories/franquiaRepository');

class FranquiaController {
    async listarFranquias(req, res) {
        try {
            // Se for admin e não mandar ID, lista todas. Se mandar ID, lista do usuário
            const usuarioId = req.params.usuarioId;
            let franquias;

            if (usuarioId) {
                franquias = await franquiaRepository.listarPorUsuario(usuarioId);
            } else {
                franquias = await franquiaRepository.listarTodas();
            }
            
            return res.json(franquias);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async criar(req, res) {
        try {
            const { cidade, estado, investimento, usuario_id } = req.body;
            
            if (!cidade || !estado || !investimento || !usuario_id) {
                return res.status(400).json({ success: false, error: 'Preencha todos os campos da franquia.' });
            }

            const novoId = await franquiaRepository.criar(cidade, estado, investimento, usuario_id);
            return res.status(201).json({ success: true, id: novoId });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FranquiaController();