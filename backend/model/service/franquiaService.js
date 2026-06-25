const API_URL = 'https://website-uc9.onrender.com/api/franquias';

function getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

export const FranquiaService = {
    async listarTodas() {
        const response = await fetch(API_URL, { headers: getAuthHeaders() });
        return await response.json();
    },

    async listarPorUsuario(usuarioId) {
        const response = await fetch(`${API_URL}/usuario/${usuarioId}`, { headers: getAuthHeaders() });
        return await response.json();
    },

    async criar(cidade, estado, investimento, usuario_id) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ cidade, estado, investimento, usuario_id })
        });
        return await response.json();
    }
};
