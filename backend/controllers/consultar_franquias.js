import { addFranquiaView } from '../js/view/gerenciamento-view.js';
import { mostrar, fechar } from '/js/view/modal-view.js';

var tabela = document.querySelector("#table-usuarios");
var modal = document.querySelector("#franquiasModal");
var btnConsultar = document.querySelector("#btnConsultarFranquias");

tabela.addEventListener("click", function (e) {
	var elemento = e.target;

	if (elemento.classList.contains("btnFranquias")) {
		let linha = elemento.closest("tr");
		const id = linha.dataset.id;
		mostrar(modal);

		console.log(id)

		btnConsultar.addEventListener("click", function () {
		    var tbody = document.querySelector("#table-franquias tbody");
		    tbody.innerHTML = "";

		    obterFranquias(id).then(function(lista) {
		    	console.log(lista)
		        lista.forEach(function(franquia) {

		            addFranquiaView(franquia)
		            console.log(franquia)

		        });
		    });
		});
	}
}