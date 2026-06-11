import { UsuarioService } from '../model/service/usuarioService.js';
import { FranquiaService } from '../model/service/franquiaService.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. CONSULTAR USUÁRIOS
    const btnConsultarUsuarios = document.getElementById('btnConsultarUsuarios');
    if (btnConsultarUsuarios) {
        btnConsultarUsuarios.addEventListener('click', async () => {
            const tbody = document.querySelector('#table-usuarios tbody');
            tbody.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
            
            try {
                const usuarios = await UsuarioService.listarTodos();
                tbody.innerHTML = usuarios.map(u => `
                    <tr>
                        <td>${u.nome}</td>
                        <td>${u.email}</td>
                        <td>********</td>
                        <td>
                            <button class="btn btn-outline-primary">Atualizar</button>
                            <button class="btn btn-outline-danger">Excluir</button>
                        </td>
                    </tr>
                `).join('');
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar usuários.</td></tr>';
            }
        });
    }

    // 2. CONSULTAR FRANQUIAS
    const btnConsultarFranquias = document.getElementById('btnConsultarFranquias');
    if (btnConsultarFranquias) {
        btnConsultarFranquias.addEventListener('click', async () => {
            const tbody = document.querySelector('#table-franquias tbody');
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
                            <td>${f.orcamento_inicial}</td>
                            <td>${f.id}</td>
                        </tr>
                    `).join('');
                }
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="3">Erro ao carregar franquias.</td></tr>';
            }
        });
    }
});