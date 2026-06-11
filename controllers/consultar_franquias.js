import { addFranquiaView } from '/js/view/gerenciamento-view.js';

var btnConsultar = document.querySelector("#btnConsultarFranquias");


export function listarFranquias() {

    var tbody = document.querySelector("#table-franquias tbody");

    tbody.innerHTML = "";

    obterFranquias().then(function(lista) {

        lista.forEach(function(franquia) {

            addFranquiaView(franquia)
            console.log(franquia)

        });

    });

}

btnConsultar.addEventListener("click", function () {

    listarFranquias();

});
