class UsuarioValidation {
    validarCadastro(nome, email, senha) {
        if (!nome || !email || !senha) {
            return { valido: false, erro: 'Todos os campos (nome, email e senha) são obrigatórios.' };
        }
        if (senha.length < 6) {
            return { valido: false, erro: 'A senha deve ter no mínimo 6 caracteres.' };
        }
        return { valido: true };
    }

    validarLogin(email, senha) {
        if (!email || !senha) {
            return { valido: false, erro: 'Por favor, preencha o email e a senha.' };
        }
        return { valido: true };
    }
}

module.exports = new UsuarioValidation();
