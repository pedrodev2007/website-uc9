import { addUsuarioView } from '/js/view/gerenciamento-view.js';

var btnConsultar = document.querySelector("#btnConsultarUsuarios");


export function listarUsuarios() {
    var tbody = document.querySelector("#table-usuarios tbody");
    tbody.innerHTML = "";

    obterUsuarios().then(function(lista) {
    	console.log(lista)
        lista.forEach(function(usuario) {

            addUsuarioView(usuario)
            console.log(usuario)

        });
    });
}

btnConsultar.addEventListener("click", function () {
    listarUsuarios();

});