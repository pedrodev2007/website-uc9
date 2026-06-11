//vem do form-aluno
var btnLogin = document.querySelector("#btnLogin");


btnLogin.addEventListener("click", (event) => {
    event.preventDefault();

    var frmUsuarios = document.querySelector("#frmUsuarios");

    if (frmUsuarios.email.value === "") {
        alert("Erro!")
        return false;
    }

    if (frmUsuarios.senha.value === "") {
        alert("Erro!")
        return false;
    }

    var usuario = getFormulario(frmUsuarios);
    //console.log(JSON.stringify(aluno));

    fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {
		if (!response.ok) {
			return response.json().then(erro => {
				throw new Error(erro.message);
			})
		}
		return response.json()
	})
        .then(dados => {
            console.log("Usuario logado:", dados);

            window.location.href = "gerenciamento-usuario.html";
        })
        .catch(erro => {
		console.error(erro)
		alert("O login falhou! Erro: " + erro.mensagem)
	});
})

function getFormulario(frmUsuarios) {
    return {
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
