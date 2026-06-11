const API_URL = 'http://localhost:3000/api/usuarios';

export const UsuarioService = {
    async login(email, senha) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        return await response.json();
    },

    async criar(nome, email, senha) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        // Retorna o json junto com o status HTTP para a view validar
        const data = await response.json();
        if (!response.ok) {
            return { success: false, error: data.error || data.message };
        }
        return data;
    },

    async listarTodos() {
        const response = await fetch(API_URL);
        return await response.json();
    },

    async buscarPorId(id) {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    },

    async atualizar(id, nome, email, senha) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        return await response.json();
    },

    async deletar(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
};
