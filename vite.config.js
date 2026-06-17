import {defineConfig} from 'vite'
import {dirname, resolve} from 'path'

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
	resolve: {
		alias: {
			'@view': path.resolve(__dirname, './src/view'),
			'@routers': path.resolve(__dirname, './backend/routers'),
			'@controllers': path.resolve(__dirname, './backend/controllers'),
			'@repositories': path.resolve(__dirname, './backend/repositories'),
			//'@styles': path.resolve(__dirname, './styles'),
		}
	}
	
})

