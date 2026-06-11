const model = require('../repositories/franquias_repository');

exports.listar = (req, res) => {
	model.listar((resultado) => {
		res.status(200).json(resultado);
	})
};

exports.salvar = (req, res) => {

	try {
		
	const cidade = req.body.cidade;
	const uf = req.body.uf;
	const orcamentoInicial = req.body.orcamentoInicial;
	const franqueadoId = req.body.franqueadoId;
	
	model.salvar((resultado) => {
		res.status(201).json(resultado);
	}, cidade, uf, orcamentoInicial, franqueadoId);

	} catch(erro) {
		return res.status(500).json({status: "erro!", mensagem: erro.message});
	}
    
};


exports.excluir = (req, res) => {

	try {
		
	const id = parseInt(req.params.id);
	model.excluir((resultado) => {
		res.status(201).json(resultado);
	}, id)

    
	} catch (erro) {
		return res.status(500).json({status: "erro!", mensagem: erro.message});
	}

};

exports.atualizar = (req, res) => {

	try {
		const id = parseInt(req.params.id);
		const cidade = req.body.cidade;
		const uf = req.body.uf;
		const orcamentoInicial = req.body.orcamentoInicial;

		model.atualizar((resultado) => {
			if (erro) {
				return res.status(400).json(erro);
			}
			return res.status(201).json(resultado);
		}, id, cidade, uf, orcamentoInicial)
	} catch (erro) {
		return res.status(500).json({status: "erro!", mensagem: erro.message});
	}


}
