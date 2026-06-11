//vem do form-aluno
var btnCadastrar = document.querySelector("#btnCadastrarUsuarios");


btnCadastrar.addEventListener("click", (event) => {
    event.preventDefault();

    var frmUsuarios = document.querySelector("#frmUsuarios");

    var usuario = getFormulario(frmUsuarios);
    //console.log(JSON.stringify(aluno));

    
    fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
        .then(response => response.json())
        .then(dados => {
            console.log("Usuario salvo:", dados);
        });

})

export function getFormulario(frmUsuarios) {
    return {
        nome: frmUsuarios.nome.value,
        email: frmUsuarios.email.value,
        senha: frmUsuarios.senha.value,
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
