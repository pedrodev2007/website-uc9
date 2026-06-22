import { UsuarioService } from '../model/service/usuarioService.js';
import { FranquiaService } from '../model/service/franquiaService.js';

document.addEventListener('DOMContentLoaded', () => {

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
                        <button class="btn btn-outline-success">Franquias</button>
                        <button class="btn btn-outline-primary">Atualizar</button>
                        <button class="btn btn-outline-danger">Excluir</button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar usuários.</td></tr>';
        }
    }

    async function carregarFranquias() {
        const tbody = document.querySelector('#table-franquias tbody');
        if (!tbody) return;

        tbody.innerHTML = '<tr><td colspan="3">Carregando...</td></tr>';
        
        const tipo = localStorage.getItem('usuarioTipo');
        const id = localStorage.getItem('usuarioLogadoId');
        
        try {
            let franquias;
            if (tipo === 'admin') {
                franquias = await FranquiaService.listarTodas();
            } else {
                franquias = await FranquiaService.listarPorUsuario(id);
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
    // ESCUTAS DE CLIQUES (CONSULTAR)
    // ==========================================

    const btnConsultarUsuarios = document.getElementById('btnConsultarUsuarios');
    if (btnConsultarUsuarios) {
        btnConsultarUsuarios.addEventListener('click', carregarUsuarios);
    }

    const btnConsultarFranquias = document.getElementById('btnConsultarFranquias');
    if (btnConsultarFranquias) {
        btnConsultarFranquias.addEventListener('click', carregarFranquias);
    }

    // ==========================================
    // SUBMIT DO FORMULÁRIO DE USUÁRIOS
    // ==========================================

    const formCadastroUsuario = document.getElementById('formCadastroUsuario');
    if (formCadastroUsuario) {
        formCadastroUsuario.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Captura os dados com escopo específico do formulário de administração
            const nome = formCadastroUsuario.querySelector('#inputNome').value;
            const email = formCadastroUsuario.querySelector('#inputEmail').value;
            const senha = formCadastroUsuario.querySelector('#inputSenha').value;

            try {
                const data = await UsuarioService.criar(nome, email, senha);

                if (data.success) {
                    alert('Usuário cadastrado com sucesso!');
                    formCadastroUsuario.reset();
                    // Atualiza a tabela dinamicamente sem recarregar a página
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

            const cidade = document.getElementById('inputCidade').value;
            const estado = document.getElementById('estados-brasil').value;
            const investimento = document.getElementById('investimento').value;
            
            // Vincula a franquia criada ao ID do usuário administrador logado no momento
            const usuario_id = localStorage.getItem('usuarioLogadoId');

            if (!usuario_id) {
                alert('Erro: ID do usuário logado não encontrado. Faça login novamente.');
                return;
            }

            try {
                const data = await FranquiaService.criar(cidade, estado, investimento, usuario_id);

                if (data.success) {
                    alert('Franquia cadastrada com sucesso!');
                    formCadastroFranquia.reset();
                    // Atualiza instantaneamente a listagem de franquias
                    await carregarFranquias();
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