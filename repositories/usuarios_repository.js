const conexao = require("../db/connection");

exports.listar = (callback) => {
    const sql = "SELECT * FROM tb_usuarios";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.error(erro);
            callback({errooo: "parabéns, tá errado"});
        }

        callback(resultado);
    });
};


exports.salvar = (callback, nome, email, senha) => {

    const sql = "insert into tb_usuarios (nome, email, senha) values (?, ?, ?)"


    conexao.query(sql, [nome, email, senha], (erro, resultado) => {
        if (erro) {
            console.error("DEU ERRO: " + erro);
            callback({status: "ERRO", mensagem: erro.message});
        }

        callback({status: "sucesso", dados: resultado});
    })

}

exports.excluir = (callback, id) => {
    const sql = "DELETE FROM tb_usuarios WHERE id = ?";
    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error(erro);
	    callback({status: "ERRO", mensagem: erro.message});
        }
        callback({status: "sucesso", dados: resultado});
    })
}

exports.atualizar = (callback, id, nome, email, senha) => {

    const sql = "update tb_usuarios set nome = ?, email = ?, senha = ? where id = ?"

    conexao.query(sql, [nome, email, senha, id], (erro, resultado) => {
        if (erro) {
            console.error("DEU ERRO: " + erro);
            return callback({status: "ERRO", mensagem: erro.message}, null);
        }
	
        callback(null, {status: "sucesso", dados: resultado});

    })
}

exports.login = (callback, email, senha) => {
	const sql = "select * from tb_usuarios where email = ? and senha = ?"

	conexao.query(sql, [email, senha], (erro, resultado) => {
		if (erro) {
			console.error("DEU ERRO: " + erro);
            		return callback({status: "ERRO", mensagem: erro.message}, null);
		}
		if (resultado.length === 0) {
				return callback(new Error("Usuario nao encontrado"), null);
		}
		callback(null, {status: "login feito com sucesso", dados: "funcionou"});
	})
}