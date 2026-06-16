const model = require('../repositories/franquias_repository');

exports.listar = (req, res) => {
	const id = parseInt(req.params.id);
	model.listar((resultado) => {
		res.status(200).json(resultado);
	}, id)
};

exports.salvar = (req, res) => {

	try {
			
		const cidade = req.body.cidade;
		const uf = req.body.uf;
		const orcamentoInicial = req.body.orcamentoInicial;
		const franqueadoId = req.params.id;
		
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