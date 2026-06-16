export function addUsuarioView(dados) {
    const TABELA = document.getElementById("table-usuarios");
    const TBODY = TABELA.querySelector("tbody");

    const LINHA = document.createElement("tr");
    const CHAVES = ["nome", "email", "senha"];

    LINHA.dataset.id = dados.id;
    LINHA.dataset.cargoId = dados.cargoId;

    for (let i = 0; i < CHAVES.length; i++) {
        const INFO = document.createElement("td");
        INFO.innerHTML = dados[CHAVES[i]];
        LINHA.appendChild(INFO);
    }

    const BOTOES = document.createElement("td");

    BOTOES.appendChild(BTN_FRANQUIAS);
    BOTOES.innerHTML = "<button class='btn btn-outline-success btnFranquias'>Franquias</button><button class='btn btn-outline-primary btnAtualizar'>Atualizar</button><button class='btn btn-outline-danger btnExcluir'>Excluir</button>";
    LINHA.appendChild(BOTOES);

    TBODY.appendChild(LINHA);
}



export function addFranquiaView(dados) {
    const TABELA = document.getElementById("table-franquias");
    const TBODY = TABELA.querySelector("tbody");

    const LINHA = document.createElement("tr");
    const CHAVES = ["cidade", "uf", "orcamentoInicial"];

    LINHA.dataset.id = dados.id;
    LINHA.dataset.franqueadoId = dados.franqueadoId;

    for (let i = 0; i < CHAVES.length; i++) {
        const INFO = document.createElement("td");
        INFO.innerHTML = dados[CHAVES[i]];
        LINHA.appendChild(INFO);
    }

    const BTN_EXCLUIR = document.createElement("td");
    BTN_EXCLUIR.innerHTML = "<button class='btn btn-outline-danger btnExcluir'>Excluir</button>";
    LINHA.appendChild(BTN_EXCLUIR);
    TBODY.appendChild(LINHA);
}
/*
export function recarregarTabela() {
    TBODY.innerHTML = "";
}

export function removerAlunoView(elemento) {
    elemento.parentElement.parentElement.remove();
}*/
