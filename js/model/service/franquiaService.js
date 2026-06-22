const API_URL = 'http://localhost:3000/api/franquias';

export const FranquiaService = {
    async listarTodas() {
        const response = await fetch(API_URL);
        return await response.json();
    },

    async listarPorUsuario(usuarioId) {
        const response = await fetch(`${API_URL}/usuario/${usuarioId}`);
        return await response.json();
    },

    async criar(cidade, estado, investimento, usuario_id) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cidade, estado, investimento, usuario_id })
        });
        return await response.json();
    }
};