const model = require('../repositories/usuarios_repository');

exports.listar = (req, res) => {
	model.listar((resultado) => {
		res.status(200).json(resultado);
	})
};

exports.salvar = (req, res) => {

	try {
		
	const nome = req.body.nome;
	const email = req.body.email;
	const senha = req.body.senha;
	
	model.salvar((resultado) => {
		res.status(201).json(resultado);
	}, nome, email, senha);

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
		const nome = req.body.nome;
		const email = req.body.email;
		const senha = req.body.senha;

		model.atualizar((resultado) => {
			if (erro) {
				return res.status(400).json(erro);
			}
			return res.status(201).json(resultado);
		}, id, nome, email, senha)
	} catch (erro) {
		return res.status(500).json({status: "erro!", mensagem: erro.message});
	}
}

exports.login = (req, res) => {
	try {
		
		const email = req.body.email;
		const senha = req.body.senha;
		
		model.login((erro, resultado) => {
			if (erro) {
				return res.status(401).json({status: "ERRO", mensagem: erro.message})
			}
			res.status(200).json(resultado);
		}, email, senha);

	} catch(erro) {
		return res.status(500).json({status: "erro!", mensagem: erro.message});
	}
}
