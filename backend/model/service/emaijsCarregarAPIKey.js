require('dotenv').config();

export function carregarAPIKey() {
    emailjs.init({
        publicKey: process.env.EMAILJS_API_KEY, 
    })
}


