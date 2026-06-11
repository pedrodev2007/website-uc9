import { listarUsuarios} from '/controllers/consultar_usuarios.js';

var tabela = document.querySelector("#table-usuarios");

tabela.addEventListener("click", function (event) {

    event.preventDefault();
    event.stopPropagation();

    var elementoClicado = event.target;

    if (elementoClicado.classList.contains("btnExcluir")) {

        console.log(elementoClicado)
        var linha = elementoClicado.closest("tr");

        var id = linha.dataset.id;

        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(dados => {

            //console.log(dados);

            listarUsuarios();

        })
        .catch(erro => {
            console.log(erro);
        });

    }

});
