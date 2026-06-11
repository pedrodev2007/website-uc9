const conexao = require("../db/connection");

exports.listar = (callback) => {
    const sql = "SELECT * FROM tb_franquias";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.error(erro);
            callback({errooo: "parabéns, tá errado"});
        }

        callback(resultado);
    });
};


exports.salvar = (callback, cidade, uf, orcamentoInicial, franqueadoId) => {

    const sql = "insert into tb_franquias (cidade, uf, orcamentoInicial, franqueadoId) values (?, ?, ?, ?)"


    conexao.query(sql, [cidade, uf, orcamentoInicial], (erro, resultado) => {
        if (erro) {
            console.error("DEU ERRO: " + erro);
            return callback({status: "ERRO", mensagem: erro.message});
        }

        callback({status: "sucesso", dados: resultado});
    })

}

exports.excluir = (callback, id) => {
    const sql = "DELETE FROM tb_franquias WHERE id = ?";
    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error(erro);
	    return callback({status: "ERRO", mensagem: erro.message});
        }
        callback({status: "sucesso", dados: resultado});
    })
}

exports.atualizar = (callback, id, cidade, uf, orcamentoInicial) => {


    const sql = "update tb_franquias set cidade = ?, uf = ?, orcamentoInicial = ? where id = ?"

    conexao.query(sql, [cidade, uf, orcamentoInicial, id], (erro, resultado) => {
        if (erro) {
            console.error("DEU ERRO: " + erro);
            return callback({status: "ERRO", mensagem: erro.message});
        }
        callback({status: "sucesso", dados: resultado});

    })
}
