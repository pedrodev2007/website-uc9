const model = require('../model/service/sendEmailService');
require('dotenv').config();
const emailjs = require('@emailjs/nodejs');

class EmailController {
    async enviar(req, res) {
        const { name, email, telefone, cidade, investimento, estados_brasil } = req.body;

        emailjs.init({
            publicKey: process.env.EMAILJS_API_KEY, 
        })
        try {
            await model.enviarEmail({
                name: name,
                email: email,
                telefone: telefone,
                cidade: cidade,
                investimento: investimento,
                estados_brasil: estados_brasil
            });
            return res.status(200).json({success: true, error: null});
        } catch (error) {
            return res.status(500).json({sucess: false, error: error.message});
        }
    }
}

module.exports = new EmailController();