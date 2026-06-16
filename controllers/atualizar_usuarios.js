var tabela = document.querySelector("#table-usuarios");
//var btnAtualizarAluno = document.querySelector("#btnAtualizarAluno");
var modal = document.querySelector("#atualizarModal");
var frmUsuarioUpdate = document.querySelector("#frmUsuarioUpdate");
import  { mostrar, fechar } from '/js/view/modal-view.js';
import  { getFormulario } from '/controllers/cadastrar_usuarios.js';

tabela.addEventListener("click", function (e) {


    var elemento = e.target;
/*
    var frmAluno = document.querySelector("#frmAluno");
    if (validarFormularioAluno(frmAluno) == false) {
        return;
    }
    var aluno = obtemAlunoDoFormulario(frmAluno);
*/
    if (elemento.classList.contains("btnAtualizar")) {


        console.log(elemento)

        let linha = elemento.closest("tr")
        const id = linha.dataset.id;
        mostrar(modal)
        
 
        const btnCancelar = modal.querySelector("#btnCancelar");
        const btnAtualizar = modal.querySelector("#btnAtualizar");

        btnCancelar.addEventListener("click", () => {
            fechar(modal);
        })

        btnAtualizar.addEventListener("click", () => {
            var usuario = getFormulario(frmUsuarioUpdate)

            if(usuario.nome == '' || usuario.senha == '' || usuario.email == '') {
                alert('Preencha todos os campos')
                return
            }

            fetch(`http://localhost:3000/usuarios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            })
            .then(response => response.json())
            .then(dados => {
                console.log("Usuario atualizado:", dados);
            })
            .catch(erro => {
                console.error(erro);
            });

            frmUsuarioUpdate.reset()

            fechar(modal);
        })
    }
})
