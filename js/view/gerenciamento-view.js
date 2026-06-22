import { UsuarioService } from '../model/service/usuarioService.js';
import { FranquiaService } from '../model/service/franquiaService.js';

document.addEventListener('DOMContentLoaded', () => {
    // Variável de controle para armazenar qual usuário foi selecionado para receber a franquia
    let usuarioSelecionadoId = null;

    // ==========================================
    // FUNÇÕES AUXILIARES DE RENDERIZAÇÃO
    // ==========================================

    async function carregarUsuarios() {
        const tbody = document.querySelector('#table-usuarios tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
        
        try {
            const usuarios = await UsuarioService.listarTodos();
            tbody.innerHTML = usuarios.map(u => `
                <tr>
                    <td>${u.nome}</td>
                    <td>${u.email}</td>
                    <td>********</td>
                    <td>
                        <button class="btn btn-outline-success btn-ver-franquias" data-id="${u.id}" data-nome="${u.nome}">Franquias</button>
                        <button class="btn btn-outline-primary btn-atualizar-usuario" data-id="${u.id}">Atualizar</button>
                        <button class="btn btn-outline-danger btn-excluir-usuario" data-id="${u.id}" data-nome="${u.nome}">Excluir</button>
                    </td>
                </tr>
            `).join('');

            // Ativa os eventos dos botões de Excluir e Seleção que acabaram de aparecer na tela
            configurarBotoesUsuarios();

        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar usuários.</td></tr>';
        }
    }

    function configurarBotoesUsuarios() {
        // OPERAÇÃO 1: Fazer o botão Excluir funcionar integrado ao banco de dados
        document.querySelectorAll('.btn-excluir-usuario').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const nome = e.target.getAttribute('data-nome');

                if (confirm(`Tem certeza que deseja excluir o usuário ${nome}?`)) {
                    try {
                        const response = await UsuarioService.deletar(id);
                        if (response.success) {
                            alert('Usuário excluído com sucesso!');
                            
                            // Se o usuário excluído era o que estava selecionado nas franquias, limpa a seleção
                            if (usuarioSelecionadoId === id) {
                                usuarioSelecionadoId = null;
                                atualizarIndicadorSelecao(null);
                            }
                            
                            await carregarUsuarios(); // Atualiza a tabela na hora
                        } else {
                            alert(response.message || 'Erro ao excluir usuário.');
                        }
                    } catch (error) {
                        console.error('Erro ao excluir:', error);
                        alert('Erro ao conectar com o servidor.');
                    }
                }
            });
        });

        // OPERAÇÃO 2: Selecionar o usuário específico para listar e cadastrar franquias
        document.querySelectorAll('.btn-ver-franquias').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                usuarioSelecionadoId = e.target.getAttribute('data-id');
                const nome = e.target.getAttribute('data-nome');

                // Mostra na tela para quem a franquia vai ser vinculada
                atualizarIndicadorSelecao(nome);
                
                // Filtra automaticamente a tabela de franquias para exibir apenas as desse usuário
                await carregarFranquias(usuarioSelecionadoId);
            });
        });
    }

    // Cria um aviso visual no topo do formulário de franquias mostrando o vínculo atual
    function atualizarIndicadorSelecao(nome) {
        let indicador = document.getElementById('indicador-usuario-franquia');
        const cadastroHeader = document.querySelector('#franquia-container #cadastro-header');
        
        if (!indicador && cadastroHeader) {
            indicador = document.createElement('div');
            indicador.id = 'indicador-usuario-franquia';
            indicador.style.padding = '10px';
            indicador.style.marginBottom = '15px';
            indicador.style.borderRadius = '5px';
            indicador.style.backgroundColor = '#e2f0d9';
            indicador.style.color = '#385723';
            indicador.style.border = '1px solid #c5e0b4';
            cadastroHeader.appendChild(indicador);
        }

        if (indicador) {
            if (nome) {
                indicador.innerHTML = `Modo Ativo: Cadastrando franquia para o usuário: <strong>${nome}</strong> (ID: ${usuarioSelecionadoId})`;
            } else {
                indicador.style.backgroundColor = '#fff3cd';
                indicador.style.color = '#856404';
                indicador.style.border = '1px solid #ffeeba';
                indicador.innerHTML = `<em>Aviso: Selecione um usuário na tabela acima clicando no botão "Franquias" antes de cadastrar uma nova franquia.</em>`;
            }
        }
    }

    async function carregarFranquias(idFiltro = null) {
        const tbody = document.querySelector('#table-franquias tbody');
        if (!tbody) return;

        tbody.innerHTML = '<tr><td colspan="3">Carregando...</td></tr>';
        
        const tipo = localStorage.getItem('usuarioTipo');
        const idLogado = localStorage.getItem('usuarioLogadoId');
        
        try {
            let franquias;
            // Se um usuário foi explicitamente selecionado pelo botão "Franquias", traz só as dele
            if (idFiltro) {
                franquias = await FranquiaService.listarPorUsuario(idFiltro);
            } else if (tipo === 'admin') {
                franquias = await FranquiaService.listarTodas();
            } else {
                franquias = await FranquiaService.listarPorUsuario(idLogado);
            }

            if (franquias.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3">Nenhuma franquia encontrada.</td></tr>';
            } else {
                tbody.innerHTML = franquias.map(f => `
                    <tr>
                        <td>${f.cidade} / ${f.estado}</td>
                        <td>${f.orcamento_inicial || f.investimento}</td>
                        <td>${f.id}</td>
                    </tr>
                `).join('');
            }
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="3">Erro ao carregar franquias.</td></tr>';
        }
    }

    // ==========================================
    // ESCUTAS DE CLIQUES (BOTÕES DE CONSULTAR)
    // ==========================================

    const btnConsultarUsuarios = document.getElementById('btnConsultarUsuarios');
    if (btnConsultarUsuarios) {
        btnConsultarUsuarios.addEventListener('click', carregarUsuarios);
    }

    const btnConsultarFranquias = document.getElementById('btnConsultarFranquias');
    if (btnConsultarFranquias) {
        btnConsultarFranquias.addEventListener('click', () => carregarFranquias(usuarioSelecionadoId));
    }

    // Exibe o aviso inicial para o admin saber que precisa selecionar alguém
    if (document.getElementById('formCadastroFranquia')) {
        atualizarIndicadorSelecao(null);
    }

    // ==========================================
    // SUBMIT DO FORMULÁRIO DE USUÁRIOS
    // ==========================================

    const formCadastroUsuario = document.getElementById('formCadastroUsuario');
    if (formCadastroUsuario) {
        formCadastroUsuario.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = formCadastroUsuario.querySelector('#inputNome').value;
            const email = formCadastroUsuario.querySelector('#inputEmail').value;
            const senha = formCadastroUsuario.querySelector('#inputSenha').value;

            try {
                const data = await UsuarioService.criar(nome, email, senha);

                if (data.success) {
                    alert('Usuário cadastrado com sucesso!');
                    formCadastroUsuario.reset();
                    await carregarUsuarios(); 
                } else {
                    alert(data.error || 'Erro ao realizar o cadastro do usuário.');
                }
            } catch (error) {
                console.error('Erro no cadastro de usuário:', error);
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }

    // ==========================================
    // SUBMIT DO FORMULÁRIO DE FRANQUIAS
    // ==========================================

    const formCadastroFranquia = document.getElementById('formCadastroFranquia');
    if (formCadastroFranquia) {
        formCadastroFranquia.addEventListener('submit', async (e) => {
            e.preventDefault();

            // VALIDAÇÃO CRÍTICA: Impede criar franquia solta sem associar a um usuário da tabela
            if (!usuarioSelecionadoId) {
                alert('Erro: Por favor, selecione um usuário na tabela clicando no botão "Franquias" antes de cadastrar!');
                return;
            }

            const cidade = document.getElementById('inputCidade').value;
            const estado = document.getElementById('estados-brasil').value;
            const investimento = document.getElementById('investimento').value;

            try {
                // Envia o ID do usuário que foi selecionado na tabela, e não o do admin logado
                const data = await FranquiaService.criar(cidade, estado, investimento, usuarioSelecionadoId);

                if (data.success) {
                    alert('Franquia cadastrada com sucesso!');
                    formCadastroFranquia.reset();
                    await carregarFranquias(usuarioSelecionadoId); // Atualiza na hora as franquias dele
                } else {
                    alert(data.error || 'Erro ao realizar o cadastro da franquia.');
                }
            } catch (error) {
                console.error('Erro no cadastro de franquia:', error);
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }
});