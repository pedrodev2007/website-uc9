// Aguarda o HTML carregar completamente antes de rodar o código
document.addEventListener('DOMContentLoaded', () => {
    // Captura os elementos da tela
    const btnLogin = document.querySelector('.btn-outline-primary');
    const inputEmail = document.getElementById('inputEmail');
    const inputSenha = document.getElementById('inputSenha');

    // Cria o evento de clique no botão "Realizar login"
    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault(); // Evita que a página recarregue do zero

        const email = inputEmail.value;
        const senha = inputSenha.value;

        // Validação básica
        if (!email || !senha) {
            alert('Por favor, preencha o email e a senha.');
            return;
        }

        try {
            // Dispara os dados para a sua API Node.js
            const response = await fetch('http://localhost:3000/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            // Recebe a resposta do servidor
            const data = await response.json();

            // Verifica se o login deu certo segundo a regra do seu controller
            if (data.success) {
                alert('Login realizado com sucesso! Bem-vindo(a).');
                // Aqui você pode redirecionar para a página principal:
                // window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor. Verifique se a API está rodando.');
        }
    });
});
