import {defineConfig} from 'vite'
import {dirname, resolve} from 'path'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				'quem-somos': resolve(__dirname, './quem-somos/index.html'),
				'entre-contato': resolve(__dirname, './entre-contato/index.html'),
				franquie: resolve(__dirname, './franquie/index.html'),
				creditos: resolve(__dirname, './creditos/index.html'),
				'gerenciamento-adm': resolve(__dirname, './gerenciamento-adm/index.html'),
				'gerenciamento-usuario': resolve(__dirname, './gerenciamento-usuario/index.html'),
				login: resolve(__dirname, './login/index.html'),
				cadastrar: resolve(__dirname, './cadastrar/index.html'),
			},
		},
	},
})

