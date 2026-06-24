export function carregarAPIKey() {
    emailjs.init({
        publicKey: process.env.EMAILJS_API_KEY, 
    })
}


