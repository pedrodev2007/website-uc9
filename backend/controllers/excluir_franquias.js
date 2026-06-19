import { listarFranquias } from './consultar_franquias.js';

var tabela = document.querySelector("#table-franquias");

tabela.addEventListener("click", function (event) {

    event.preventDefault();
    event.stopPropagation();

    var elementoClicado = event.target;

    if (elementoClicado.classList.contains("btnExcluir")) {

        console.log(elementoClicado)
        var linha = elementoClicado.closest("tr");

        var id = linha.dataset.id;

        fetch(`http://localhost:3000/franquias/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(dados => {
            listarFranquias();

        })
        .catch(erro => {
            console.log(erro);
        });
    }
});
