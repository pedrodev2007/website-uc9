const TABELA = document.getElementById("table-usuarios");
const TBODY = TABELA.querySelector("tbody");


export function addUsuarioView(dados) {
    const LINHA = document.createElement("tr");

    for (let i = 0; i < dados.length; i++) {
        const INFO = document.createElement("td");
        INFO.innerHTML = dados[i];
        LINHA.appendChild(INFO);
    }

    const BOTOES = document.createElement("td");
    BOTOES.innerHTML = "<button class='btn btn-outline-success'>Franquias</button><button class='btn btn-outline-primary'>Atualizar</button><button class='btn btn-outline-danger'>Excluir</button>"
    LINHA.appendChild(BOTOES);

    TBODY.appendChild(LINHA)
}



export function addFranquiaView(dados) {
    const LINHA = document.createElement("tr");

    for (let i = 0; i < dados.length; i++) {
        const INFO = document.createElement("td");
        INFO.innerHTML = dados[i];
        LINHA.appendChild(INFO);
    }

    TBODY.appendChild(LINHA)
}

export function recarregarTabela() {
    TBODY.innerHTML = "";
}

export function removerAlunoView(elemento) {
    elemento.parentElement.parentElement.remove();
}