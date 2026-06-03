import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, './home.html'),
				login: resolve(__dirname, './login.html'),
				'quem-somos': resolve(__dirname, './quem-somos.html'),
				'entre-contato': resolve(__dirname, './entre-contato.html'),
				franquie: resolve(__dirname, './franquie.html'),
				creditos: resolve(__dirname, './creditos.html'),
			},
		},
	},
	server: {
		open: '/home.html',
	}
})

