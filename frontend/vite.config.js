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
            }
        }
    }
})