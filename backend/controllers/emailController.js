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
            console.log(req.body);
            return res.status(200).json({success: true, error: null});
        } catch (error) {
            console.log(req.body);
            console.log(error);
            console.log(error.text);
            return res.status(500).json({success: false, error: error.text});
        }
    }
}

module.exports = new EmailController();
