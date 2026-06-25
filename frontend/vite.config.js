import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, './index.html'),
				'quem-somos': resolve(__dirname, './quem-somos/index.html'),
				'entre-contato': resolve(__dirname, './entre-contato/index.html'),
				franquie: resolve(__dirname, './franquie/index.html'),
				creditos: resolve(__dirname, './creditos/index.html'),
				'gerenciamento-adm': resolve(__dirname, './gerenciamento-adm/index.html'),
				'nossas-lavanderias': resolve(__dirname, './nossas-lavanderias/index.html'),
				'vantagens': resolve(__dirname, './vantagens/index.html'),
				'gerenciamento-usuario': resolve(__dirname, './gerenciamento-usuario/index.html'),
				login: resolve(__dirname, './login/index.html'),
				cadastrar: resolve(__dirname, './cadastrar/index.html'),
			},
		},
	},
})
