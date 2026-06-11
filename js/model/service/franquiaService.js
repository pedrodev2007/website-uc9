const API_URL = 'http://localhost:3000/api/franquias';

export const FranquiaService = {
    // ... (listarTodas e listarPorUsuario devem estar aqui) ...

    async criar(cidade, estado, investimento, usuario_id) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cidade, estado, investimento, usuario_id })
        });
        return await response.json();
    }
};