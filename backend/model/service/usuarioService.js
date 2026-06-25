require('dotenv').config();
const API_URL = `http://localhost:${process.env.PORT}/api/usuarios`;

// Função auxiliar para enviar o Token JWT nos cabeçalhos
function getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

export const UsuarioService = {
    async login(email, senha) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Login não precisa de token
            body: JSON.stringify({ email, senha })
        });
        return await response.json();
    },

    async criar(nome, email, senha) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Cadastro público não precisa de token
            body: JSON.stringify({ nome, email, senha })
        });
        const data = await response.json();
        if (!response.ok) {
            return { success: false, error: data.error || data.message };
        }
        return data;
    },

    async listarTodos() {
        const response = await fetch(API_URL, { headers: getAuthHeaders() });
        return await response.json();
    },

    async buscarPorId(id) {
        const response = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return await response.json();
    },

    async atualizar(id, nome, email, senha) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ nome, email, senha })
        });
        return await response.json();
    },

    async deletar(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return await response.json();
    }
};
