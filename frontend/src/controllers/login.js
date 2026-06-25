import { UsuarioService } from '../../../backend/model/service/usuarioService.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.querySelector('.btn-outline-primary');
    const inputEmail = document.getElementById('inputEmail');
    const inputSenha = document.getElementById('inputSenha');
    
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => { e.preventDefault(); });
    }

    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault(); 
        const email = inputEmail.value;
        const senha = inputSenha.value;

        if (!email || !senha) {
            alert('Por favor, preencha o email e a senha.');
            return;
        }

        try {
            const data = await UsuarioService.login(email, senha);

            if (data.success) {
                // ==========================================
                // GUARDA O TOKEN NO NAVEGADOR
                // ==========================================
              
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('usuarioLogadoId', data.usuario.id);
            sessionStorage.setItem('usuarioTipo', data.usuario.tipo);
                alert('Login realizado com sucesso! Bem-vindo(a).');

                if (data.usuario.tipo === 'admin') {
                    window.location.href = '../../gerenciamento-adm/index.html';
                } else {
                    window.location.href = '../../gerenciamento-usuario/index.html';
                }
            } else {
                alert(data.message || 'Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor.');
        }
    });
});
