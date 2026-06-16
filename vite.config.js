import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				'quem-somos': resolve(__dirname, './pages/quem-somos/index.html'),
				'entre-contato': resolve(__dirname, './pages/entre-contato/index.html'),
				franquie: resolve(__dirname, './pages/franquie/index.html'),
				creditos: resolve(__dirname, './pages/creditos/index.html'),
				'gerenciamento-adm': resolve(__dirname, './pages/gerenciamento-adm/index.html'),
				'gerenciamento-usuario': resolve(__dirname, './pages/gerenciamento-usuario/index.html'),
				login: resolve(__dirname, './pages/login/index.html'),
				cadastrar: resolve(__dirname, './pages/cadastrar/index.html'),
			},
		},
	},
	
})

