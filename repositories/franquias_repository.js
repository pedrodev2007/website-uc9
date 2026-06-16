const conexao = require("../db/connection");

exports.listar = (callback, id) => {
    const sql = "SELECT cidade, uf, orcamentoInicial FROM tb_franquias WHERE franqueadoId = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return callback({errooo: "parabéns, tá errado"});
        }

        callback(resultado);
    });
};


exports.salvar = (callback, cidade, uf, orcamentoInicial, franqueadoId) => {

    const sql = "insert into tb_franquias (cidade, uf, orcamentoInicial, franqueadoId) values (?, ?, ?, ?)"


    conexao.query(sql, [cidade, uf, orcamentoInicial, franqueadoId], (erro, resultado) => {
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
