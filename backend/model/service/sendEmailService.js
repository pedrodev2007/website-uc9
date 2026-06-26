import { carregarAPIKey } from "./emailjsCarregarAPIKey.js";

carregarAPIKey();

export function enviarEmail() {
    emailjs.sendForm('contact_service', 'auto-reply-lavanderia', this).then(() => {
        return "sucesso";
    }, (error) => {
        return error;
    });
}

