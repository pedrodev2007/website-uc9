import { UsuarioService } from '../model/service/usuarioService.js';
import { FranquiaService } from '../model/service/franquiaService.js';

document.addEventListener('DOMContentLoaded', () => {
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
                        <!-- Agora enviamos o email no botão atualizar também -->
                        <button class="btn btn-outline-primary btn-atualizar-usuario" data-id="${u.id}" data-nome="${u.nome}" data-email="${u.email}">Atualizar</button>
                        <button class="btn btn-outline-danger btn-excluir-usuario" data-id="${u.id}" data-nome="${u.nome}">Excluir</button>
                    </td>
                </tr>
            `).join('');

            configurarBotoesUsuarios();
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar usuários.</td></tr>';
        }
    }

    function configurarBotoesUsuarios() {
        // OPERAÇÃO 1: EXCLUIR USUÁRIO
        document.querySelectorAll('.btn-excluir-usuario').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const nome = e.target.getAttribute('data-nome');

                if (confirm(`Tem certeza que deseja excluir o usuário ${nome}?`)) {
                    try {
                        const response = await UsuarioService.deletar(id);
                        if (response.success) {
                            alert('Usuário excluído com sucesso!');
                            if (usuarioSelecionadoId === id) {
                                usuarioSelecionadoId = null;
                                atualizarIndicadorSelecao(null);
                            }
                            await carregarUsuarios(); 
                        } else {
                            alert(response.message || 'Erro ao excluir usuário.');
                        }
                    } catch (error) {
                        alert('Erro ao conectar com o servidor.');
                    }
                }
            });
        });

        // OPERAÇÃO 2: VER FRANQUIAS DO USUÁRIO
        document.querySelectorAll('.btn-ver-franquias').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                usuarioSelecionadoId = e.target.getAttribute('data-id');
                const nome = e.target.getAttribute('data-nome');

                atualizarIndicadorSelecao(nome);
                await carregarFranquias(usuarioSelecionadoId);
            });
        });

        // OPERAÇÃO 3: ABRIR MODAL DE ATUALIZAÇÃO
        document.querySelectorAll('.btn-atualizar-usuario').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const nome = e.target.getAttribute('data-nome');
                const email = e.target.getAttribute('data-email');

                // Preenche o formulário do Modal com os dados atuais do usuário
                document.getElementById('updateUsuarioId').value = id;
                document.getElementById('updateNome').value = nome;
                document.getElementById('updateEmail').value = email;
                document.getElementById('updateSenha').value = ''; // Limpa para a pessoa decidir se quer digitar uma nova

                // Puxa a janela (Modal) do Bootstrap para aparecer na tela
                const modal = new bootstrap.Modal(document.getElementById('modalAtualizarUsuario'));
                modal.show();
            });
        });
    }

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
        
        const tipo = sessionStorage.getItem('usuarioTipo');
        const idLogado = sessionStorage.getItem('usuarioLogadoId');
        
        try {
            let franquias;
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
    // ESCUTAS DE CLIQUES GERAIS
    // ==========================================

    const btnConsultarUsuarios = document.getElementById('btnConsultarUsuarios');
    if (btnConsultarUsuarios) btnConsultarUsuarios.addEventListener('click', carregarUsuarios);

    const btnConsultarFranquias = document.getElementById('btnConsultarFranquias');
    if (btnConsultarFranquias) btnConsultarFranquias.addEventListener('click', () => carregarFranquias(usuarioSelecionadoId));

    if (document.getElementById('formCadastroFranquia')) atualizarIndicadorSelecao(null);

    // ==========================================
    // SUBMIT DOS FORMULÁRIOS
    // ==========================================

    // Form: Criar Usuário
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
                } else alert(data.error || 'Erro ao realizar o cadastro do usuário.');
            } catch (error) {
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }

    // Form: Atualizar Usuário Existente (Dentro do Modal)
    const formAtualizarUsuario = document.getElementById('formAtualizarUsuario');
    if (formAtualizarUsuario) {
        formAtualizarUsuario.addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = document.getElementById('updateUsuarioId').value;
            const nome = document.getElementById('updateNome').value;
            const email = document.getElementById('updateEmail').value;
            const senha = document.getElementById('updateSenha').value; // Pode vir vazia

            try {
                const data = await UsuarioService.atualizar(id, nome, email, senha);

                if (data.success) {
                    alert('Dados do usuário atualizados com sucesso!');
                    
                    // Esconde a janela pop-up (Modal)
                    const modalElement = document.getElementById('modalAtualizarUsuario');
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                    
                    // Atualiza a tabela dinamicamente
                    await carregarUsuarios(); 
                } else {
                    alert(data.error || 'Erro ao atualizar o usuário.');
                }
            } catch (error) {
                alert('Erro ao conectar com o servidor.');
            }
        });
    }

    // Form: Criar Franquia
    const formCadastroFranquia = document.getElementById('formCadastroFranquia');
    if (formCadastroFranquia) {
        formCadastroFranquia.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!usuarioSelecionadoId) {
                alert('Erro: Por favor, selecione um usuário na tabela clicando no botão "Franquias" antes de cadastrar!');
                return;
            }

            const cidade = document.getElementById('inputCidade').value;
            const estado = document.getElementById('estados-brasil').value;
            const investimento = document.getElementById('investimento').value;

            try {
                const data = await FranquiaService.criar(cidade, estado, investimento, usuarioSelecionadoId);
                if (data.success) {
                    alert('Franquia cadastrada com sucesso!');
                    formCadastroFranquia.reset();
                    await carregarFranquias(usuarioSelecionadoId); 
                } else alert(data.error || 'Erro ao cadastrar a franquia.');
            } catch (error) {
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }
});