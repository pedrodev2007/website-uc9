import { UsuarioService } from '../model/service/usuarioService.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.querySelector('.btn-outline-primary');
    const inputEmail = document.getElementById('inputEmail');
    const inputSenha = document.getElementById('inputSenha');
    
    // --- O ESCUDO INVISÍVEL ---
    // Pega o formulário e proíbe ele de recarregar a página (seja pelo botão ou pela tecla Enter)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
        });
    }
    // --------------------------

    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault(); 

        const email = inputEmail.value;
        const senha = inputSenha.value;

        if (!email || !senha) {
            alert('Por favor, preencha o email e a senha.');
            return;
        }

        try {
            // Utiliza o serviço isolado
            const data = await UsuarioService.login(email, senha);

            if (data.success) {
                alert('Login realizado com sucesso! Bem-vindo(a).');
                // Redireciona para a página interna
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor.');
        }
    });
});