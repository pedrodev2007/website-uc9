import { UsuarioService } from '../../../backend/model/service/usuarioService.js';

document.addEventListener('DOMContentLoaded', () => {
    // Agora pegamos pelo ID exato
    const formCadastro = document.getElementById('formCadastro');

    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede a página de recarregar
        
        // --- TESTE DE VIDA ---
        console.log("O botão foi clicado e o JavaScript assumiu o controle!");
        
        const nome = document.getElementById('inputNome').value;
        const email = document.getElementById('inputEmail').value;
        const senha = document.getElementById('inputSenha').value;

        console.log("Dados capturados:", nome, email, senha);
        // ---------------------

        try {
            const data = await UsuarioService.criar(nome, email, senha);

            if (data.success) {
                alert('Usuário cadastrado com sucesso!');
                window.location.href = '../../login/index.html'; // Aqui sim a página muda!
            } else {
                alert(data.error || 'Erro ao realizar o cadastro.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Não foi possível conectar ao servidor.');
        }
    });
});