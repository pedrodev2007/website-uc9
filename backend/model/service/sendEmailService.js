const emailjs = require('@emailjs/nodejs');

class EmailService {
    async enviarEmail(dados) {
        return await emailjs.send('contact_service', 'auto-reply-lavanderia', dados)
    }
}

module.exports = new EmailService();
