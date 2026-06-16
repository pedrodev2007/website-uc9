var tabela = document.querySelector("#table-usuarios");
var modal = document.querySelector("#franquiasModal")

import { mostrar, fechar } from '/js/view/modal-view.js';

tabela.addEventListener("click", function (e) {
    var tbodyFranquias = document.querySelector("#table-franquias tbody");
    var elemento = e.target;

    if (elemento.classList.contains("btnFranquias")) {
        let linha = elemento.closest("tr");
        const id = linha.dataset.id;
        mostrar(modal);

        const btnCancelar = modal.querySelector("#btnCancelar");
        const btnCadastrar = modal.querySelector("#btnCadastrar");

        btnCancelar.addEventListener("click", () => {
            frmFranquias.reset();
            tbodyFranquias.innerHTML = "";
            fechar(modal);
        })

        btnCadastrar.addEventListener("click", (event) => {
            event.preventDefault();

            var frmFranquias = document.querySelector("#frmFranquias");

            if (frmFranquias.cidade.value === "") {
                alert("Erro!")
                return false;
            }

            if (frmFranquias.uf.value === "") {
                alert("Erro!")
                return false;
            }

            if (frmFranquias.orcamentoInicial.value === "") {
                alert("Erro!")
                return false;
            }

            var franquia = getFormulario(frmFranquias);
            //console.log(JSON.stringify(aluno));

            
            fetch(`http://localhost:3000/franquias/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(franquia)
            })
                .then(response => response.json())
                .then(dados => {
                    console.log("Franquia salva:", dados);
                });
            frmFranquias.reset();
        })
    }
})

export function getFormulario(frmFranquias) {
    return {
        nome: frmFranquias.cidade.value,
        email: frmFranquias.uf.value,
        senha: frmFranquias.orcamentoInicial.value,
        cargoId: parseInt("1")
    };
}

/*
function validarFormularioAluno(frmUsuarios) {
    var divMensagens = document.querySelector("#divMensagens");
    divMensagens.textContent = "";

    if (frmUsuarios.nome.value.length == 0) {
        criaMensagem("Nome inválido");
        return false;
    }
    if (validarNotaTrabalho(frmUsuarios.trabalho.value) == false) {
        criaMensagem("Nota do trabalho inválida.");
        return false;
    }
    if (validarNotaProva(frmUsuarios.prova.value) == false) {
        criaMensagem("Nota da prova inválida.");
        return false;
    }
    return true;
}
*/
/*
function validarFormularioUpdateAluno(frmUsuarios) {
    var divMensagens = document.querySelector("#divMensagensUpdates");
    divMensagens.textContent = "";

    if (frmUsuarios.nome.value.length == 0) {
        criaMensagem("Nome inválido");
        return false;
    }
    if (validarNotaTrabalho(frmUsuarios.trabalho.value) == false) {
        criaMensagem("Nota do trabalho inválida.");
        return false;
    }
    if (validarNotaProva(frmUsuarios.prova.value) == false) {
        criaMensagem("Nota da prova inválida.");
        return false;
    }
    return true;
}
*/
/*
function criaMensagem(texto) {
    var msg = document.createElement("div");
    msg.classList.add("alert", "alert-warning");
    msg.textContent = texto;

    document.querySelector("#divMensagens").appendChild(msg);
}

*/
